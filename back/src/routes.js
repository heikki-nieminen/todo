const router = require('express').Router()
const {
    auth,
    hashPassword
} = require('./authentication')
const {sendEmail} = require('./email')
const {
    registerUser,
    loginUser,
    verifyEmail,
    getSheets,
    addSheet,
    deleteSheet,
    editSheet,
    addTask,
    getTasks,
    deleteTask,
    editTask,
} = require('./queries')

// User related routes
// Register new user
// Expected body: {password: string, email: string}
router.post('/register', async (req, res, next) => {
    let userInfo = req.body
    userInfo.password = await hashPassword(userInfo.password)

    const registerUserResult = await registerUser(userInfo)
    if (registerUserResult.error) {
        return next(registerUserResult)
    }

    // Send verification email
    try {
        await sendEmail(userInfo.email, 'Email verification', `Click here to verify your email: https://todo.versus-gaming.eu/verify_email/${registerUserResult.data.id}`, `<a href="https://todo.versus-gaming.eu/verify_email/${registerUserResult.data.id}">Click here to verify your email</a>`)
    } catch (err) {
        console.log(err)
    }

    return res.status(201).end()
})

// Login user
// Expected body: {password: string, email: string}
router.post('/login', async (req, res, next) => {
    const loginUserResult = await loginUser(req.body)
    if (loginUserResult?.error) {
        return next(loginUserResult)
    }
    if (loginUserResult?.wrongUserOrPass) {
        return next({type: 'wrongUserOrPass'})
    }
    if (loginUserResult?.notVerified) {
        return next({type: 'notVerified'})
    }

    return res.status(201).send({
        correct: true,
        token:   loginUserResult.data.token
    })

})

// Verify email
// Expected params: {userId: number}
router.get('/verify_email/:userId', async (req, res, next) => {
    const verifyEmailResult = await verifyEmail(req.params.userId)
    if (verifyEmailResult.error) {
        return next(verifyEmailResult)
    }

    return res.status(200).end()
})

// Sheet related routes
// Get all user sheets
router.get('/get_sheets', auth.userAuth, async (req, res, next) => {
    const getSheetsResult = await getSheets(req.user.id)
    if (getSheetsResult.error) {
        return next(getSheetsResult)
    }

    return res.status(200).send(getSheetsResult.data)
})

// Add new sheet
// Expected body: {sheetName: string}
router.post('/add_sheet', auth.userAuth, async (req, res, next) => {
    const addSheetResult = await addSheet(req.user.id, req.body.sheetName)
    if (addSheetResult.error) {
        return next(addSheetResult)
    }

    return res.status(201).send(addSheetResult.data)
})

// Delete sheet
// Expected body: {sheetId: number}
router.delete('/delete_sheet', auth.userAuth, async (req, res, next) => {
    const deleteSheetResult = await deleteSheet(req.body.sheetId)
    if (deleteSheetResult.error) {
        return next(deleteSheetResult)
    }

    return res.status(200).end()
})

// Update sheet
// Expected body: {sheetId: number, sheetName: string}
router.put('/update_sheet', auth.userAuth, async (req, res, next) => {
    const editSheetResult = await editSheet(req.body.sheetId, req.body.sheetName)
    if (editSheetResult.error) {
        return next(editSheetResult)
    }

    return res.status(200).end()
})

// Task related routes
// Get all tasks from sheet
router.get('/get_tasks/:sheetId', auth.userAuth, async (req, res, next) => {
    const getTasksResult = await getTasks(req.params.sheetId)
    if (getTasksResult.error) {
        return next(getTasksResult)
    }

    return res.status(200).send(getTasksResult.data)
})

// Add new task
// Expected body: {sheetId: number, taskName: string, taskDescription: string, taskPriority: number, taskStatus: number}
router.post('/add_task', auth.userAuth, async (req, res, next) => {
    const addTaskResult = await addTask(req.body)
    if (addTaskResult.error) {
        return next(addTaskResult)
    }

    return res.status(201).send(addTaskResult.data)
})

// Delete task
// Expected body: {taskId: number}
router.delete('/delete_task', auth.userAuth, async (req, res, next) => {
    const deleteTaskResult = await deleteTask(req.body.taskId)
    if (deleteTaskResult.error) {
        return next(deleteTaskResult)
    }

    return res.status(200).end()
})

// Update task
// Expected body: {taskId: number, taskName: string, taskDescription: string, taskPriority: number, taskStatus: number}
router.put('/update_task', auth.userAuth, async (req, res, next) => {
    const editTaskResult = await editTask(req.body)
    if (editTaskResult.error) {
        return next(editTaskResult)
    }

    return res.status(200).end()
})

module.exports = router