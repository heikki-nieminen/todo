const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const getTokenFromHeaders = async (req) => {
    if (req.headers.authorization) {
        return req.headers.authorization.split(' ')[1]
    }
    return null
}

const checkUser = async (req, res, next) => {
    try {
        const token = await getTokenFromHeaders(req)
        let user = null
        try {
            user = jwt.verify(token, process.env.USERSECRET)
            req.user = user
            next()
        } catch (err) {
            return res.status(403).json({error: 'Access denied'});
        }
    } catch (err) {
        return res.status(401).json({error: 'Unauthorized'});
    }
}

const hashPassword = async (password) => {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}

const auth = {
    userAuth: checkUser
}

module.exports = {
    auth,
    hashPassword,
    comparePassword
}
