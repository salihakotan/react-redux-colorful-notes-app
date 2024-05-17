import { Box, Button, Textarea } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import ColorButtons from './ColorButtons'
import { useDispatch, useSelector } from 'react-redux'
import { addNoteAsync } from '../redux/notes/notesSlice'

function NoteAddForm() {

    const [text,setText] = useState("")
    
    
   
    const isLoading = useSelector((state) => state.notes.addNote.isLoading)
    const error = useSelector((state) => state.notes.addNote.error)
   


    const dispatch = useDispatch()

    const handleClick = () => { //add async note
        if(!text.trim()) return
        const color = localStorage.getItem("color") || "#ff0"
        dispatch(addNoteAsync({text:text, color:color}))
        setText("")
       
    }
   


    if(error) return <div>Error : {error}</div>
  

  return (
    <Box borderRadius={10} p={4}  backgroundColor="white" mt={6}>
        <Textarea id='noteTextArea' autoFocus  onKeyDown={(e) => {
            if( e.key === "Enter") {
                e.preventDefault() 
                handleClick()
            }
        }}
        onChange={(e)=> setText(e.target.value)} value={text} height={100} placeholder='Enter a note'/>
        <Box mt={2} display="flex" justifyContent="space-between">
            <ColorButtons/>
            <Button isDisabled={isLoading} type='submit' onClick={handleClick} width={90} colorScheme='pink'>Add</Button>
        </Box>
    </Box>
  )
}

export default NoteAddForm