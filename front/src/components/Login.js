import {Box, Button, Grid, OutlinedInput, Paper, Tooltip, Typography} from '@mui/material'
import {useState} from 'react'
import axios from 'axios'

export const Login = (props) => {
    const [user, setUser] = useState({
        email:    '',
        password: ''
    })

    const handleLogin = async () => {
        let result
        try {
            result = await axios({
                method: 'post',
                url:    'http://localhost:3002/login',
                data:   user
            })
            console.log(result)
            if (result.data.correct) {
                localStorage.setItem('userToken', result.data.token)
                axios.defaults.headers.common['Authorization'] = `Token ${result.data.token}`
                props.setLoggedIn(true)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Paper>
            <Box sx={{
                p:         2,
                textAlign: 'center'
            }}>
                <Typography variant={'h3'}>Login</Typography>
                <OutlinedInput placeholder={'Email'}
                               type={'email'}
                               name={'email'}
                               fullWidth={true}
                               sx={{mt: 1}}
                               value={user.email}
                               onChange={handleChange}/>
                <OutlinedInput placeholder={'Password'}
                               name={'password'}
                               type={'password'}
                               fullWidth={true}
                               value={user.password}
                               onChange={handleChange}
                               sx={{mt: 1}}/>
                <Grid container>
                    <Grid item xs={6} sx={{p: 1}}>
                        <Button variant={'contained'} sx={{
                            mt:    1,
                            width: '100%'
                        }} onClick={handleLogin}>Login</Button>
                    </Grid>
                    <Typography variant={'h6'} sx={{p: 1}}>Don't have an account?</Typography>
                    <Tooltip title={'Login'}>
                        <Typography variant={'h6'} sx={{
                            pt:     1,
                            cursor: 'pointer',
                            color:  'blue'
                        }} onClick={() => props.setLogin(false)}>Register</Typography>
                    </Tooltip>
                </Grid>
            </Box>
        </Paper>
    )
}