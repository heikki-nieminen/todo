const router = require('express').Router()
const {
    auth,
    hashPassword
} = require('./authentication')
const {sendEmail} = require('./email')
const {
    registerUser,
    loginUser
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
    console.log('registeUSerResult', registerUserResult)
    // Link to verification
    const link = `${process.env.HOST_ADDRESS}verify-email/${registerUserResult.data}`

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

})

// Sheet related routes
// Get all user sheets
router.get('/get_sheets', auth.userAuth, async (req, res, next) => {

})

// Add new sheet
// Expected body: {sheetName: string}
router.post('/add_sheet', auth.userAuth, async (req, res, next) => {

})

// Delete sheet
// Expected body: {sheetId: number}
router.delete('/delete_sheet', auth.userAuth, async (req, res, next) => {

})

// Update sheet
// Expected body: {sheetId: number, sheetName: string}
router.put('/update_sheet', auth.userAuth, async (req, res, next) => {

})

// Task related routes
// Get all tasks from sheet
router.get('/get_tasks/:sheetId', auth.userAuth, async (req, res, next) => {

})

// Add new task
// Expected body: {sheetId: number, taskName: string, taskDescription: string, taskPriority: number, taskStatus: number}
router.post('/add_task', auth.userAuth, async (req, res, next) => {

})

// Delete task
// Expected body: {taskId: number}
router.delete('/delete_task', auth.userAuth, async (req, res, next) => {

})

// Update task
// Expected body: {taskId: number, taskName: string, taskDescription: string, taskPriority: number, taskStatus: number}
router.put('/update_task', auth.userAuth, async (req, res, next) => {

})

module.exports = router