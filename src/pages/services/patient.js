import axios from "axios"

export default async function getPatientMoods(patient_id) {
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
    return response
}

// get pateint's demographics data using pateint id


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

// get all activities assigned to patient with given ID
export async function getPatientActivities(patientId) {

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    //get all available activities
    const response = axios.get(`/patients/${patientId}/assignments`,
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


// /patients/{patientId}/answers/{questionId}
export async function getAnswerByQuestionId(patientId, questionId) {

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    //get all available activities
    const response = axios.get(`/patients/${patientId}/answers/${questionId}`,
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

getPatientMoods.getInitialProps = async () => {
    return {};
  };



