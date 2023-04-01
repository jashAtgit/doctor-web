import axios from "axios"

export async function getPatientMood(patient_id) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    //get patient's mood on current date(or latest)
    const response = axios.get(`/patients/${patient_id}/mood`,
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
    return response.response
}

// get pateint's demographics data using pateint id
export async function getPatientDemographics(patient_id) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const response = axios.get(`/users/${patient_id}/demographics`,
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

export async function getPatientMedHist(patient_id) {
    // get patient's medical history by patient_id
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const response = axios.get(`/patients/${patient_id}/medical-history`,
    {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    }).then(response => response.data.response)
    .catch(err => {
        console.log("error code : " + err.response.status);
        return "error hai";

    });
    return response
}


