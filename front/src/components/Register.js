import {Box, Button, Grid, OutlinedInput, Paper, Tooltip, Typography} from '@mui/material'
import {useState} from 'react'
import axios from 'axios'

export const Register = (props) => {
    const [user, setUser] = useState({
        email:            '',
        password:         '',
        passwordAgain:    '',
        passwordOk:       false,
        secondPasswordOk: false,
        emailOk:          false
    })

    const okStyle = {
        mb: '1rem'
    }

    const notOkStyle = {
        mb:                                               '1rem',
        '& .MuiOutlinedInput-notchedOutline':             {
            borderColor: 'red'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'red'
        }
    }

    const checkPassword = (password) => {
        const re = new RegExp('^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$')
        return !re.test(password)
    }

    const checkEmail = (email) => {
        const re = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        return re.test(email)
    }

    const handleChange = (e) => {
        if (e.target.name === 'password') {
            setUser({
                ...user,
                password: e.target.value,
                passwordOk: checkPassword(e.target.value)
            })
        } else if (e.target.name === 'passwordAgain') {
            setUser({
                ...user,
                passwordAgain: e.target.value,
                secondPasswordOk: e.target.value === user.password
            })
        } else if (e.target.name === 'email') {
            setUser({
                ...user,
                email: e.target.value,
                emailOk: checkEmail(e.target.value)
            })
        }
    }

    const handleRegister = () => {
        let result
        try {
            result = axios({
                method: 'post',
                url:    'http://localhost:3002/register',
                data:   user
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Paper>
            <Box sx={{
                p:         2,
                textAlign: 'center'
            }}>
                <Typography variant={'h3'}>Register</Typography>
                <OutlinedInput placeholder={'Email'}
                               type={'email'}
                               name={'email'}
                               fullWidth={true}
                               sx={user.emailOk ? okStyle : notOkStyle}
                               value={user.email}
                               onChange={handleChange}/>
                <Tooltip
                    title={user.passwordOk ? '' : 'Salasanan on oltava vähintään 8 merkkiä pitkä. Sen täytyy sisältää' +
                        ' sekä isoja, että pieniä kirjaimia ja vähintään yhden numeron.'}>
                    <OutlinedInput placeholder={'Password'}
                                   name={'password'}
                                   type={'password'}
                                   fullWidth={true}
                                   value={user.password}
                                   onChange={handleChange}
                                   sx={user.passwordOk ? okStyle : notOkStyle}/>
                </Tooltip>
                <Tooltip title={user.secondPasswordOk ? '' : 'Salasanat eivät täsmää.'}>
                    <OutlinedInput placeholder={'Password again'}
                                   name={'passwordAgain'}
                                   type={'password'}
                                   fullWidth={true}
                                   value={user.passwordAgain}
                                   onChange={handleChange}
                                   sx={user.secondPasswordOk ? okStyle : notOkStyle}/>
                </Tooltip>
                <Grid container>
                    <Grid item xs={6} sx={{p: 1}}>
                        <Button variant={'contained'} sx={{
                            mt:    1,
                            width: '100%'
                        }} onClick={handleRegister}>Register</Button>
                    </Grid>
                    <Typography variant={'h6'} sx={{p: 1}}>Do you have an account?</Typography>
                    <Tooltip title={'Login'}>
                        <Typography variant={'h6'} sx={{
                            pt:     1,
                            cursor: 'pointer',
                            color:  'blue'
                        }} onClick={() => props.setLogin(true)}>Login</Typography>
                    </Tooltip>
                </Grid>
            </Box>
        </Paper>
    )
}