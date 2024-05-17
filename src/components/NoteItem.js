import React, { useRef, useState } from 'react'
import { GridItem,Box, Link,   Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, 
    FormControl,
    FormLabel,
    Input,
    Button,
    Textarea,
    useDisclosure} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useDispatch } from 'react-redux'
import { deleteNoteAsync, editNoteAsync } from '../redux/notes/notesSlice'


function NoteItem({note}) {

    const { isOpen: isModal1Open, onOpen: onModal1Open, onClose: onModal1Close } = useDisclosure()
    const { isOpen: isModal2Open, onOpen: onModal2Open, onClose: onModal2Close } = useDisclosure()

    
    const dispatch = useDispatch()

   

    const deleteNoteItem = async(id) => {
        //delete note
        await dispatch(deleteNoteAsync(id))
        onModal2Close()
    }

    
    const [noteText, setNoteText] = useState(note.text)
    
    const editNoteItem = async(id,text) => {
        //note edit
        await dispatch(editNoteAsync({id,data:{text}}))
        onModal1Close()
    }


  return (
    <>
         <GridItem className='note-grid-item' justifyContent="space-between" display="flex" flexDirection="column"  key={note.id} borderRadius={10} backgroundColor={note.color}>
                <Box css={{
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: "#00000036",
      borderRadius: '20px',
    },
  }} overflow="auto" height="130px" style={{paddingBottom:"20px"}} p={3}>{note.text}</Box>
                <Box bottom="0" position="sticky" padding="7px" justifyContent="end" display="flex">
                   
                   <Link onClick={onModal1Open} href='/#'><EditIcon color="gray.700"/></Link>
                    <Link onClick={onModal2Open} href='/#'><DeleteIcon  color="gray.700"/></Link>
                </Box>
             </GridItem>

         
         <Modal isOpen={isModal1Open} onClose={onModal1Close}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Edit note</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                <FormLabel>Note content</FormLabel>
                <Textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder='Enter your updated note here' />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button onClick={()=> editNoteItem(note.id,noteText)} colorScheme='pink' mr={3}>
                Save
                </Button>
                <Button onClick={onModal1Close}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
      </Modal>


      <Modal isOpen={isModal2Open} onClose={onModal2Close}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Delete note</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              
                <FormLabel>Are you sure to delete this note?</FormLabel>
                
            </ModalBody>

            <ModalFooter>
                <Button onClick={()=> deleteNoteItem(note.id)} colorScheme='pink' mr={3}>
                Delete
                </Button>
                <Button onClick={onModal2Close}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
      </Modal>

    </>
  )
}

export default NoteItem