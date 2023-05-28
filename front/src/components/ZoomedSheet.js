import React, {useState} from 'react'
import {Card, Modal, TextField, Typography} from '@mui/material'
import {Task} from './Task'

export const ZoomedSheet = (props) => {
    const {
        sheet,
        zoomed,
        setZoomed,
        setSheets,
        sheetIndex,
        sheets
    } = props
    const [sheetData, setSheetData] = useState(sheet)
    const [isTitleFocused, setIsTitleFocused] = useState(false)
    const [tasks, setTasks] = useState(sheet.tasks)

    const handleTitleChange = (e) => {
        setSheetData({
            ...sheetData,
            title: e.target.value
        })
    }

    const handleClose = () => {
        setSheets((prevSheets) => {
            const updatedSheets = [...prevSheets] // Create a new array to avoid mutation
            updatedSheets[sheetIndex] = sheetData
            return updatedSheets
        })
        setZoomed(false)
    }

    const addTask = () => {
        setSheetData((prevSheetData) => {
            const updatedSheetData = {...prevSheetData}
            updatedSheetData.tasks.push({
                title:       'New Task',
                description: 'Description',
                completed:   false
            })
            return updatedSheetData
        })
    }

    return (<Modal open={zoomed} onClose={handleClose} sx={{
        display:        'flex',
        mx:             'auto',
        mt:             '2rem',
        position:       'absolute',
        justifyContent: 'center',
        width:          '50%',
    }}>
        <Card elevation={8} sx={{
            position:               'relative',
            p:                      2,
            display:                'flex',
            flexDirection:          'column',
            height:                 '70vh',
            maxHeight:              '75vh',
            overflowY:              'auto',
            '&::-webkit-scrollbar': {display: 'none'}
        }}>
            {!isTitleFocused ? (<TextField id="title" variant="standard" gutterBottom
                                           sx={{
                                               textAlign:      'center',
                                               fontSize:       '3rem',
                                               display:        'inline-block',
                                               justifyContent: 'center',
                                           }}
                                           InputProps={{disableUnderline: true}}
                                           placeholder={'Title'}
                                           inputProps={{
                                               style: {
                                                   textAlign: 'center',
                                                   fontSize:  '3rem',
                                                   mb:        '0',
                                                   p:         '0',
                                                   gap:       '0',
                                                   display:   'inline-block',
                                               }
                                           }}
                                           value={sheetData.title}
                                           onClick={() => setIsTitleFocused(true)}>{sheetData.title}</TextField>) : (
                <TextField id="standard-basic" variant="standard" value={sheetData.title} autoFocus={true}
                           InputProps={{disableUnderline: true}}
                           placeholder={'Title'}
                           inputProps={{
                               style: {
                                   textAlign: 'center',
                                   fontSize:  '3rem',
                                   m:         '0',
                                   p:         '0',
                                   gap:       '0',
                               }
                           }}
                           sx={{textAlign: 'center'}} onChange={handleTitleChange}
                           onBlur={() => setIsTitleFocused(false)}/>)}
            {sheets[sheetIndex].tasks.map((task, index) => {
                return (<Task task={task} key={index} setTasks={setTasks} tasks={sheets[sheetIndex].tasks} index={index}
                              zoomed={true} setSheets={setSheets} taskIndex={index} sheetIndex={sheetIndex}
                              sheets={sheets}/>)
            })}
            <Typography variant={'h3'} sx={{
                textAlign: 'center',
                cursor:    'pointer',
                display:   'inline-block',
            }}
                        onClick={addTask}
            >Add a task</Typography>
        </Card>
    </Modal>)
}