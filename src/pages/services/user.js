import axios from "axios"

export async function loginUser(credentials) {
    console.log("inside api")
    console.log(credentials.email);
    console.log(credentials.password);
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