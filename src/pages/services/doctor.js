import axios from "axios"

export async function getDoc(username) {
    //get doctor using username
    const response = axios.get(`http://localhost:3000/doctors/${username}`,
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

export async function loginDoctor(credentials) {
    const response = axios.post('http://localhost:3000/doctors/login', {
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

export async function getPatientsByDocId(doc_id) {
    //get list of patients with this doc_id
    const response = axios.get(`http://localhost:3000/doctors/${doc_id}/patients`,
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