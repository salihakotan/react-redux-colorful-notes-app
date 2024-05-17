import { filter } from "@chakra-ui/react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

export const getNotesAsync = createAsyncThunk("notes/getNotesAsync", async()=> {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/notes`)
    return await res.data
})


export const addNoteAsync = createAsyncThunk("notes/addNoteAsync", async (data) => {
   const res =  await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/notes`,data)
   return await res.data
})

export const editNoteAsync = createAsyncThunk("notes/editNoteAsync", async({id,data}) => {
    const res = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/notes/${id}`,data)
    return await res.data
})


export const deleteNoteAsync = createAsyncThunk("notes/deleteNoteAsync", async(id) => {
    await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/notes/${id}`)
    return id
})

export const notesSlice = createSlice({
    name:"notes",
    initialState: {
        items: [],
        filterText:"",
        isLoading:false,
        error:null,
        addNote: {
            isLoading:false,
            error:null,
        }
    },
    reducers: {
        changeFilterText: (state,action) => {
            state.filterText = action.payload
    }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getNotesAsync.fulfilled, (state,action) => {
            state.items = action.payload
            state.isLoading =false
        })
        .addCase(getNotesAsync.pending, (state,action) => {
            state.isLoading = true
        })
        .addCase(getNotesAsync.rejected, (state,action) => {
            state.isLoading = false
            state.error = action.error.message
        })
        .addCase(addNoteAsync.fulfilled, (state,action) => {
            state.items.push(action.payload)
            document.getElementById("noteTextArea").focus()
            state.addNote.isLoading = false
        })
        .addCase(addNoteAsync.pending, (state,action) => {
            state.addNote.isLoading= true
        })
        .addCase(addNoteAsync.rejected, (state,action) => {
            state.addNote.isLoading = false
            state.addNote.error = action.error.message
        })

        .addCase(editNoteAsync.fulfilled, (state,action) => {
            const {id,text} = action.payload
            const index = state.items.findIndex((item) => item.id === id)
            state.items[index].text = text

        })
        .addCase(deleteNoteAsync.fulfilled, (state,action) => {
           const id = action.payload
           const index = state.items.findIndex((item) => item.id ===id)
           state.items.splice(index,1)
        })
        
      
    }
})


export const selectNotes =  (state) => {
    return state.notes.items.filter((note) => (
        note.text.toLowerCase().includes(state.notes.filterText.toLowerCase())
       ))
     

     

       
}
export const {changeFilterText} = notesSlice.actions

export default notesSlice.reducer