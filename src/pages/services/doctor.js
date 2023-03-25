import axios from "axios"
// (async () => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/comments?' + new URLSearchParams({
//         postId: 1
//     }))

//     const data = await response.json()

//     console.log(data)
// })()

export async function getDoc(username) {
    //get doctor using username
    // change to `http://localhost:3000/doctor?username=${username}`
    const response = axios.get(`http://localhost:3000/doctor?username=${username}`,
    {
    headers: {
        'Content-Type': 'application/json'
    },
    }).then(response => response.data)
    .catch(err => {
        console.log("error code : " + err.response.status);
        return "error";

    });
    return response
}