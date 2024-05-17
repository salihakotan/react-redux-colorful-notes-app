import { Box, Grid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { getNotesAsync, selectNotes } from '../redux/notes/notesSlice'
import NoteItem from './NoteItem'

function NotesList() {

    const dispatch = useDispatch()

    const notes = useSelector(selectNotes)

    useEffect(()=> {
        dispatch(getNotesAsync())
    }, [dispatch])

  return (
    <>
    <Box mt={7}>
        <Grid textAlign="left" templateColumns="repeat(5,1fr)" gap={6}>
        {
            notes.map((note) => 

                    <NoteItem key={note.id} note={note}/>
               
            )
        }
        </Grid>
        </Box>
    </>
  )
}

export default NotesList