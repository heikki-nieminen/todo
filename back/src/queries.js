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
        console.log('Miksi: ', err)
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
                if (result.rows[0].verified) {
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

const verifyEmail = async (userId) => {
    const query = `UPDATE public.user SET verified = true WHERE id = $1 RETURNING *`
    const parameters = [userId]
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

const addSheet = async (sheet) => {
    const query = `INSERT INTO sheet (name, user_id) VALUES ($1, $2) RETURNING *`
    const parameters = [sheet.name, sheet.userId]
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

const getSheets = async (userId) => {
    const query = `SELECT * FROM sheet WHERE user_id = $1`
    const parameters = [userId]
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
        data:  result.rows.map(sheet => {
            return {
                id:   sheet.id,
                name: sheet.name
            }
        })
    }
}

const deleteSheet = async (sheetId) => {
    const query = `DELETE FROM sheet WHERE id = $1`
    const parameters = [sheetId]
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

const editSheet = async (sheet) => {
    const query = `UPDATE sheet SET name = $1 WHERE id = $2 RETURNING *`
    const parameters = [sheet.name, sheet.id]
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

const addTask = async (task) => {
    const query = `INSERT INTO task (title, description, order, sheet_id) VALUES ($1, $2, $3, $4) RETURNING *`
    const parameters = [task.title, task.description, task.order, task.sheetId]
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

const getTasks = async (sheetId) => {
    const query = `SELECT * FROM task WHERE sheet_id = $1`
    const parameters = [sheetId]
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
        data:  result.rows.map(task => {
            return {
                id:          task.id,
                title:       task.title,
                description: task.description,
                order:       task.order
            }
        })
    }
}

const deleteTask = async (taskId) => {
    const query = `DELETE FROM task WHERE id = $1`
    const parameters = [taskId]
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

const editTask = async (task) => {
    const query = `UPDATE task SET title = $1, description = $2, order = $3 WHERE id = $4 RETURNING *`
    const parameters = [task.title, task.description, task.order, task.id]
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

module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
    addSheet,
    getSheets,
    deleteSheet,
    editSheet,
    addTask,
    getTasks,
    deleteTask,
    editTask
}