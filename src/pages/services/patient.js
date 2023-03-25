import axios from "axios"

export async function getPatientsByDocId(doc_id) {
    //get list of patients with this doc_id
    const response = axios.get(`http://localhost:3000/patients?doc_id=${doc_id}`,
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