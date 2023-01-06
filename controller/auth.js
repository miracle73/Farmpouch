const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const errorHandler = require('../error/customError')
const { User } = require('../models/users')
const { Wallet } = require('../models/users')
const { StatusCodes } = require('http-status-codes')
const crypto = require('crypto')
const sendEmail = require('../middleware/email')
var users
const success = async (req, res) => {
    const data = {
        name: req.user._json.name,
        email: req.user._json.email,
        email_verified: req.user._json.email_verified
    };
    users = await User.create(data)
    const { name, email, email_verified, role } = users
    res.status(200).json({ users: { name, email, email_verified, role } });
    // return res.status(200).redirect('/api/v1/users/login');
}
const error = async (req, res) => {
    res.send("error logging in")
}
const logout = async (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(); }
        // res.redirect('/api/v1/users/login')
        res.status(200).json({ msg: 'Successfully logged out' })
    });
}
const login = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const token = jwt.sign({ username, password }, process.env.JWT_SECRET, { expiresIn: '1d' })
    if (users) {


        const secondUser = await User.findOne({
            where: {
                id: users.id
            }
        })
        users = undefined;
        if (secondUser.username === null || secondUser.password === null) {
            const data = { username, password }
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const data2 = { username, password: hashedPassword }
            const thirdUser = await User.update(data2, {
                where: {
                    id: secondUser.id
                }
            })
            const fourthUser = await User.findOne({
                where: {
                    id: secondUser.id
                }
            })

            console.log(fourthUser.password)
            const wallet = await Wallet.create({ balance: 0, username: data.username, applicationUserId: fourthUser.id })
            res.status(200).json({ msg: 'Successfully signed in for the first time', token })

        }
    } else {
        const username = req.body.username
        const password = req.body.password
        const token = jwt.sign({ username, password }, process.env.JWT_SECRET, { expiresIn: '1d' })
        const thirdUser = await User.findOne({
            where: {
                username
            }
        })
        const matched = await bcrypt.compare(password, thirdUser.password)
        console.log(thirdUser.password)
        if (matched) {
            res.status(200).json({ msg: 'Successfully signed in', token })
        } else {
            res.status(200).json({ msg: 'Not signed in' })
        }

        console.log('here')
    }


}
const forgotPassword = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    if (!user) {
        throw new errorHandler('Such Email does not Exist', StatusCodes.EXPECTATION_FAILED)
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    console.log(hashedToken)
    user.password = hashedToken
    await user.save()
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`;
    const message = `Click on the link below to rest your password \n ${resetURL}\n Kindly ignore this message if you were not expecting it`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset Link',
            message
        })
        res.status(200).json({ msg: 'Email sent successfully' })
    } catch (err) {
        throw new errorHandler('Something went wrong', StatusCodes.BAD_REQUEST)
    }
}
const resetPassword = async (req, res, next) => {
    const token = req.params.token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    console.log(hashedToken)
    const user = await User.findOne({
        where: {
            password: hashedToken
        }
    })
    if (!user) {
        throw new errorHandler('Such Email does not Exist', StatusCodes.EXPECTATION_FAILED)
    }
    const {username, password} = user
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        user.password = hashedPassword
        const tokened = jwt.sign({ username, password }, process.env.JWT_SECRET, { expiresIn: '1d' })
        user.save()
        res.status(200).json({ msg: 'Successfully signed in', token: tokened})
    } catch (err) {
        throw new errorHandler('Something went wrong', StatusCodes.BAD_REQUEST)
    }


}
module.exports = { success, error, logout, login, forgotPassword, resetPassword }