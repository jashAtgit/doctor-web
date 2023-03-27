import axios from "axios"
import { useEffect, useState } from "react";



export async function getDoc(username) {

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    //get doctor using username
    console.log("inside service");
    const response = axios.get(`/doctors/${username}`,
    {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    }).then(response => response.data)
    .catch(err => {
        console.log("error code : " + err.response.status);
        return "error";

    });
    return response
}

export async function loginDoctor(credentials) {
    
    const response = axios.post('/doctors/login', {
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

export async function getPatientIdsByDocId(doc_id) {
    //get list of patients with this doc_id
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const response = axios.get(`/doctors/${doc_id}/patients`,
    {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    }).then(response => response.data)
    .catch(err => {
        console.log("error code : " + err.response.status);
        return "error";

    });

    return response
}