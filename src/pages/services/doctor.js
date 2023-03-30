import axios from "axios"

export async function getDocIdByEmail(username) {

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    //get doctor using username
    console.log(username);
    const response = axios.get(`/users/${username}`,
    {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    }).then(response => response.data.response)
    .catch(err => {
        console.log("error code : " + err.response.status);
        return "error";

    });
    return response
}

export async function loginDoctor(credentials) {
    
    const response = await axios.post('/users/login', credentials, {
    headers: {
        'Content-Type': 'application/json',
    },
    })
    .then(response => response.data.response)
    .catch(err => {
        console.log("error code : " + err.response.status);
        return "error";

    });
    return response
}

export async function getPatientIdsByDocId(doc_id) {
    //get list of patients with this doc_id
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const response = axios.get(`/doctors/${doc_id}/patients`,
    {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    }).then(response => response.data.response)
    .catch(err => {
        console.log("error code : " + err.response.status);
        return "error";

    });

    return response
}