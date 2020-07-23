import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Form/Form'
import UserItem from './UserItem.js'
import { initialUsers } from './initials'
import './App.css';

function App() {
  // eslint-disable-next-line
  const [users, setUsers] = useState(initialUsers)

  useEffect(() => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        setUsers(res.data.data)
      })
      .catch(err => {
        debugger
      })
  },[])
  return (
    <div className="App">
      <Form users={users} setUsers={setUsers}/>
      {users.map(v => (<UserItem
        key={v.id}
        name={v.name || v.first_name}
        email={v.email}
        role={v.role}
      />))}
    </div>
  );
}

export default App;
