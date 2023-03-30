import axios from "axios";

export async function getAllActivities() {

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    //get all available activities
    const response = axios.get(`/activities`,
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