import React, { useState } from "react";

const App = () => {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  let [users, setUsers] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    let newUser = {
      name: uname,
      email: email,
    };

    setUsers([...users, newUser]);

    setUname("");
    setEmail("");
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="m-5 mt-0 flex bg-gray-900 rounded-2xl shadow-xl p-8 gap-6"
      >
        <input
          type="text"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
          placeholder="Enter name"
          className="w-[250px] px-4 py-2 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:border-sky-400"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-[250px] px-4 py-2 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:border-sky-400"
        />

        <button
          type="submit"
          className="w-[200px] bg-sky-500 hover:bg-sky-600 transition text-black font-semibold px-3 py-2 rounded-lg"
        >
          Add User
        </button>
      </form>

      {/* Cards Section */}
      <div className="m-5 flex flex-wrap gap-4">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-gray-700 rounded-lg p-4 w-[250px] text-center"
          >
            <h1 className="text-lg font-medium">{user.name}</h1>
            <h4 className="text-gray-400 text-sm mb-3">
              {user.email}
            </h4>

            <button className="bg-sky-500 hover:bg-sky-600 text-black text-sm px-4 py-1 rounded">
              Contact Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
