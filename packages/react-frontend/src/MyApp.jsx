// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(userId) {
    fetch(`http://localhost:8000/users/${userId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.status === 204) {
          const updated = characters.filter(character=> character._id !== userId);
          setCharacters(updated);
        } else if (response.status === 404) {
            console.error('Resource not found');
        } else {
            console.error('Error:', response.status);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }

  
  function updateList(person) { 
    postUser(person)
      .then((data) => setCharacters([...characters, data]))
      .catch((error) => {
        console.log(error);
      })
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [characters] );

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
    .then((response) => {
      if (response.status === 201) {
        return response.json()
      } else {
        throw new Error("Failed to insert user");
      }
      

    })
    .catch(e => {throw new Error("Failure")});
    return promise;
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;