
import './App.css';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import NoteAddForm from './components/NoteAddForm';
import NotesList from './components/NotesList';
import Footer from './components/Footer';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box display="flex">
        <Box boxShadow="1px 3px 20px #ff609f" borderRadius={10} justifyContent="center" mx="auto" backgroundColor="#ffe1ed" width="1200px" p={10} mt={10} textAlign="center">
          <Header/>
          <SearchForm/>
          <NoteAddForm/>
          
          <NotesList/>
          <Footer/>
        </Box>
     </Box>    
  );
}

export default App;
