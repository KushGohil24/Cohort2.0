import { useEffect } from "react";
import React from "react";
import axios from "axios";


const App = () => {
  const [users, setUsers] = React.useState([]);
  useEffect(()=>{
    axios.get("/api/users")
      .then(res => setUsers(res.data.users))
      .catch(err => console.log(err));
  }, [])
  return (
    <div>
      <h1>App</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App;