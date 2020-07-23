import React from 'react'

const UserItem = props => {
  const { name, email } = props

  return(
    <div className='userItem'>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  )
}
export default UserItem