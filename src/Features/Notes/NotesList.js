import React from 'react'
import {useGetNotesQuery} from './NotesApiSlice'
import Note from './Note'
import useAuth from '../../hooks/useAuth'

const NotesList = () => {
  const {isAdmin,isManager} = useAuth()
   const {
    data:note,
    isLoading,
    isSuccess,
    isError,
    error} = useGetNotesQuery('NoteList',{
      pollingInterval:15000,
      refetchOnFocus:true,
      refetchOnMountOrArgChange:true
    })
    
    let content

    if(isLoading) content = <p>loading.......</p>
     
    if(isError){
      content = <p className='errmsg'>{error?.data?.message}</p>
    }

    if(isSuccess){
      const {ids,entities} = note

        let filteredIds
        let username
        if(isManager || isAdmin){
          filteredIds = [...ids]
        }else{
          filteredIds = ids.filter(notedId => entities[notedId].username === username)
        }

     const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId}/>) 
     
    return (
      (
        <table className='table table--notes'>
         <thead className='table__thead'>
          <tr>
            <th scope='col' className='table__th notes__status'>userename</th>
            <th scope='col' className='table__th notes__created'>Created</th>
            <th scope='col' className='table__th notes__updated'>Updated</th>
            <th scope='col' className='table__th notes__title'>Title</th>
            <th scope='col' className='table__th notes__username'>Owner</th>
            <th scope='col' className='table__th notes__edit'>Edit</th>
          </tr>
         </thead>
         <tbody>
          {tableContent}
         </tbody>
        </table>
      )
    )
    }
}

export default NotesList