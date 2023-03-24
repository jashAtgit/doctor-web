import axios from "axios"

export async function loginUser(credentials) {
    const response = axios.post('http://localhost:3000/api/user', {
    validateStatus:false,
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
    })
    .then(response => response.data)
    .catch(err => {
        console.log("error code : " + err.response.status);
        return "error";

    });
    return response
}