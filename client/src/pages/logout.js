import axios from "axios";
import React from "react";

const baseURL = "http://localhost:5000/employee/logout";

export default function Logout() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${baseURL}`).then((response) => {
      setPost(response.data);
    });
  }, []);

  function deletePost() {
    axios
      .delete(`${baseURL}`)
      .then(() => {
        alert("Cookie deleted!");
        setPost(null)
      }).catch(function(error){
        console.log(error.response.data);
      });
  }
  if (!post) return "No cookie!"

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={deletePost}>Delete cookie</button>
    </div>
  );
}