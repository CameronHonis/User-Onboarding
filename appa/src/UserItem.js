import React from 'react'

const UserItem = props => {
  const { name, email, role } = props

  return(
    <div className='userItem'>
      <h2>{name}</h2>
      <p>{email}</p>
      <p>{role}</p>
    </div>
  )
}
export default UserItem