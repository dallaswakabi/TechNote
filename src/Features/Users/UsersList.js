import React from 'react'
import {useGetUsersQuery} from './userApiSlice'
import User from './User'


const UsersList = () => {
  const {
    data:users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery('UserList',{
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
    const {ids} = users
   const tableContent = ids?.length && ids?.map(userId => <User key={userId} userId={userId}/>) 
   
  return (
    (
      <table className='table table--users'>
       <thead className='table__thead'>
        <tr>
          <th scope='col' className='table__th user__username'>Username</th>
          <th scope='col' className='table__th user__roles'>Roles</th>
          <th scope='col' className='table__th user__edit'>edit</th>
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

export default UsersList