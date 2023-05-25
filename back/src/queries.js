const db = require('./db')
const jwt = require('jsonwebtoken')
const {comparePassword} = require('./authentication')

const registerUser = async (user) => {
    const query = `INSERT INTO public.user (email, password) VALUES ($1, $2) RETURNING *`
    const parameters = [user.email, user.password]
    let result

    try {
        result = await db.query(query, parameters)
    } catch (err) {
        return {
            error:   true,
            message: err.message
        }
    }
    return {
        error: false,
        data:  result.rows[0]
    }
}

const loginUser = async (user) => {
    const query = `SELECT * FROM public.user WHERE email = $1`
    const parameters = [user.email]
    let result

    try {
        result = await db.query(query, parameters)
        if (result.rows.length > 0) {
            const match = await comparePassword(user.password, result.rows[0].password)
            if (match) {
                if(result.rows[0].email_verified) {
                    const token = jwt.sign({id: result.rows[0].id}, process.env.USERSECRET)
                    return {
                        error: false,
                        data:  {token}
                    }
                } else {
                    return {notVerified: true}
                }
            } else {
                return {wrongUserOrPass: true}
            }
        } else {
            return {wrongUserOrPass: true}
        }
    } catch (err) {
        return {
            error:   true,
            message: err.message
        }
    }
}

const verifyEmail = async (user) => {
    const query = `UPDATE public.user SET email_verified = true WHERE id = $1 RETURNING *`
    const parameters = [user.id]
    let result

    try {
        result = await db.query(query, parameters)
        return {
            error: false,
            data:  result.rows[0]
        }
    } catch (err) {
        return {
            error:   true,
            message: err.message
        }
    }
}



module.exports = {
    registerUser,
    loginUser
}