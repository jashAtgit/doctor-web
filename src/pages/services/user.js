import axios from "axios";

export async function getDemographics(user_id) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const response = axios.get(`/users/${user_id}/demographics`,
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