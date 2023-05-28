import {Box, Card, Grid, Typography} from '@mui/material'
import {useState} from 'react'
import {Login} from './components/Login'
import {Register} from './components/Register'
import {Sheet} from './components/Sheet'
import {ZoomedSheet} from './components/ZoomedSheet'
import {Add} from '@mui/icons-material'

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [login, setLogin] = useState(true)
    const [sheets, setSheets] = useState([])
    const [zoomed, setZoomed] = useState(false)
    const [zoomedSheet, setZoomedSheet] = useState({})
    const [zoomedIndex, setZoomedIndex] = useState(0)

    const handleZoom = (sheet) => {
        setZoomedSheet(sheet)
        setZoomed(true)
    }

    const addSheet = () => {
        setSheets([
            ...sheets, {
                title: 'New Sheet',
                tasks: [
                    {
                        title:       'New Task',
                        description: 'New Content',
                        completed:   false
                    }]
            }])
    }

    return (
        <Box sx={{
            height:                 '100vh',
            width:                  '100vw',
            overflow:               'auto',
            mt:                     2,
            '&::-webkit-scrollbar': {display: 'none'}
        }}>
            <Typography variant={'h1'} sx={{textAlign: 'center'}}>Todo</Typography>
            {!loggedIn ?
                (<Card elevation={8} sx={{
                    width:  400,
                    margin: 'auto'
                }}>
                    {login ? <Login setLogin={setLogin} setLoggedIn={setLoggedIn}/> : <Register setLogin={setLogin}/>}
                </Card>)
                :
                (<Grid container sx={{
                    width:  '95vw',
                    margin: 'auto'
                }}>
                    {!zoomed ?
                        <>
                            {sheets.map((sheet, index) => {
                                return (<Sheet sheet={sheet} key={index} handleZoom={handleZoom}
                                               setZoomedIndex={setZoomedIndex} sheetIndex={index} setSheet={setSheets}
                                               sheets={sheets}/>)
                            })}
                            <Grid item xs={3} sx={{textAlign: 'center'}}>
                                <Card elevation={8} sx={{
                                    p:              2,
                                    m:              2,
                                    cursor:         'pointer',
                                    height:         400,
                                    justifyContent: 'center',
                                    alignItems:     'center',
                                    display:        'flex'
                                }} onClick={addSheet}>

                                    <Add sx={{
                                        fontSize: '25rem',
                                        display:  'flex',
                                    }}/>

                                </Card>
                            </Grid>
                        </>
                        :
                        (<ZoomedSheet sheet={zoomedSheet} handleZoom={handleZoom} zoomed={zoomed} setZoomed={setZoomed}
                                      setSheets={setSheets} sheetIndex={zoomedIndex} sheets={sheets}/>)
                    }
                </Grid>)

            }
        </Box>
    )
}

export default App
