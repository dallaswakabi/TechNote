import { createSelector,createEntityAdapter, } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


const notesAdapter = createEntityAdapter({})
const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints:builder => ({
        GetNotes:builder.query({
          query:()=> '/notes',
          validateStatus:(response,result)=>{
            return response.status === 200 && !result.isError
          },
          transformResponse:responseData =>{
            const loadedNotes = responseData.map(note=>{
                note.id = note._id
                return note
            })
            return notesAdapter.setAll(initialState,loadedNotes)
          },
          providesTags:(result,error,arg)=>{
            if(result?.id){
                return [
                    {type:'Note',id:'LIST'},
                    ...result.ids.map(id =>({type:'Note',id}))
                ]
            }else return [{type:'Note',id:'LIST'}]
          }
        }),
        AddNewNote:builder.mutation({
          query:initialNoteData =>({
           url:'/notes',
           method:'POST',
           body:{...initialNoteData}
          }),
          invalidatesTags:[
           {type:'Note',id:'LIST'}
          ]
         }),
         updateNote:builder.mutation({
           query:initialNoteData =>({
             url:'/notes',
             method:'PATCH',
             body:{...initialNoteData}
           }),
           invalidatesTags:(result,error,args)=>[
             {
               type:'Note',id:args.id
             }
           ]
         }),
         deleteNote:builder.mutation({
           query:({id})=>({
             url:'/notes',
             method:'DELETE',
             body:{id}
           }),
           invalidatesTags:(result,error,args)=>[
             {
               type:'Note',id:args.id
             }
           ]
         })
    }),
})

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation
} = notesApiSlice
// returns the query result object

export const selectNotesResult = notesApiSlice.endpoints.GetNotes.select()

// create memoized selector
export const selectNotesData = createSelector(
  selectNotesResult,
  notesResult => notesResult.data
)

export const{
  selectAll:selectAllNotes,
  selectById:selectNotesById,
  selectIds:selectNotesIds
} = notesAdapter.getSelectors(state =>selectNotesData(state)?? initialState)