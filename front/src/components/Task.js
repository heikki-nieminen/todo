import {useState} from 'react';
import {Checkbox, Grid, TextField, Tooltip, Typography} from '@mui/material'
import {Telegram} from '@mui/icons-material'

export const Task = (props) => {
    const {zoomed, setSheets, taskIndex, sheetIndex} = props
    const [task, setTask] = useState(props.task)

    console.log('Task: ', task)

    const handleCheckChange = (e) => {
        setTask({
            ...task,
            completed: e.target.checked
        })
        setSheets((sheets) => {
            sheets[sheetIndex].tasks[taskIndex].completed = e.target.checked
            return sheets
        })
    }

    const handleTitleChange = (e) => {
        setTask({
            ...task,
            title: e.target.value
        })
        setSheets((sheets) => {
            sheets[sheetIndex].tasks[taskIndex].title = e.target.value
            return sheets
        })
    }

    const handleDescriptionChange = (e) => {
        setTask({
            ...task,
            description: e.target.value
        })
        setSheets((sheets) => {
            sheets[sheetIndex].tasks[taskIndex].description = e.target.value
            return sheets
        })
    }

    return (
        <Grid container>
            <Grid container sx={{
                display:       'flex',
                flexDirection: 'row',
            }}>
                <Grid item>
                    {zoomed ?
                        <Checkbox checked={task.completed} name={'completed'} sx={{
                            cursor: 'pointer'
                        }} onChange={handleCheckChange}/>
                        :
                        <Checkbox checked={task.completed} sx={{
                            cursor: 'pointer'
                        }} onChange={handleCheckChange} onClick={(e)=>e.stopPropagation()}/>
                    }
                </Grid>
                <Grid item sx={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    display:        'flex',
                    alignItems:     'center',
                }}>
                {zoomed ?
                    <>
                    <TextField id="title" variant="standard" gutterBottom
                    sx={{
                    fontSize:       '1rem',
                    display:        'inline-block',
                    justifyContent: 'center',
                }}

                    placeholder={'Title'}
                    inputProps={{
                    style: {
                    fontSize:  '1rem',
                    m:        '0',
                    p:         '0',
                    gap:       '0',
                    display:   'inline-block',
                }
                }}
                    value={task.title}
                    onChange={handleTitleChange}>{task.title}</TextField>
                    </>
                    :
                    <Tooltip title={<Typography sx={{ whiteSpace: 'pre-line' }}>{task.description}</Typography>} placement={'top'}>
                        <Typography variant={'body1'}>{task.title}</Typography>
                    </Tooltip>
                }

                </Grid>
            </Grid>
            {zoomed &&
                <Grid item sx={{
                    ml: 7,
                }}>
                    <TextField id="description" variant="standard" gutterBottom
                               sx={{
                                   fontSize:       '1rem',
                                   display:        'inline-block',
                                   justifyContent: 'center',
                               }}
                               InputProps={{disableUnderline: true}}
                               placeholder={'Description'}
                               multiline={true}
                               inputProps={{
                                   style: {
                                       fontSize:  '1rem',
                                       m:        '0',
                                       p:         '0',
                                       gap:       '0',
                                       display:   'inline-block',
                                   }
                               }}
                               value={task.description}
                               onChange={handleDescriptionChange}>{task.description}</TextField>
                </Grid>}
        </Grid>
    )
}
