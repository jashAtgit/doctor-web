import axios from "axios"
// (async () => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/comments?' + new URLSearchParams({
//         postId: 1
//     }))

//     const data = await response.json()

//     console.log(data)
// })()

export async function getDoc(username) {

    console.log("username recvd : " + username);
    const response = axios.get(`http://localhost:3000/doctor`,
    {
    headers: {
        'Content-Type': 'application/json'
    },
    })
    .then(response => response.data)
    .catch(err => {
        console.log("error code : " + err.response.status);
        return "error";

    });

    console.log("data recvd -- ");
    console.log(response.data);
    return response
}