import axios from "axios"



export async function getPatientMood(patient_id) {
    //get patient's mood on current date(or latest)
    const response = axios.get(`http://localhost:3000/patients/${patient_id}/mood`,
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


