import {Input, Box} from "@chakra-ui/react"
import { useDispatch } from 'react-redux'
import { changeFilterText } from '../redux/notes/notesSlice'

function SearchForm() {


    const dispatch = useDispatch()


    const handleChange = (value) => {
        dispatch(changeFilterText(value))
      

    }


  return (
    <Box mt={35}>
        <Input onChange={(e) => handleChange(e.target.value)} backgroundColor="white" placeholder='Search' name='search'/>
    </Box>
  )
}

export default SearchForm