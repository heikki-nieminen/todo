import {Card, Grid, Typography} from '@mui/material'
import {useState} from 'react'
import {Task} from './Task'

export const Sheet = (props) => {
    const {
        sheet,
        handleZoom,
        sheetIndex,
        setZoomedIndex,
        setSheet,
        sheets
    } = props

    const handleClick = () => {
        setZoomedIndex(sheetIndex)
        handleZoom(sheet)
    }

    return (<Grid item xs={3} sx={{}}>
            <Card elevation={8}
                  sx={{
                      p:                      2,
                      m:                      2,
                      height:                 400,
                      cursor:                 'pointer',
                      overflowY:              'auto',
                      '&::-webkit-scrollbar': {display: 'none'}
                  }}
                  onClick={handleClick}>
                <Grid container sx={{
                    display:       'flex',
                    flexDirection: 'column',
                }}>
                    <Grid item sx={{
                        textAlign: 'center',
                    }}>
                        <Typography id="title" variant="standard" gutterBottom
                                    sx={{
                                        textAlign: 'center',
                                        fontSize:  '1.5rem'
                                    }}
                                    InputProps={{disableUnderline: true}}
                                    placeholder={'Title'}
                                    inputProps={{
                                        style: {
                                            fontSize: '1.5rem',
                                            m:        '0',
                                            p:        '0',
                                            gap:      '0'
                                        }
                                    }}>{sheets[sheetIndex].title}</Typography>
                    </Grid>
                    <Grid item>
                        {sheets[sheetIndex].tasks.map((task, index) => {
                            return <Task key={index} task={task} zoomed={false} setSheets={setSheet} sheetIndex={sheetIndex} taskIndex={index}/>

                        })}
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )

}