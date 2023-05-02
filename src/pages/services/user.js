import axios from "axios";

export default async function getDemographics(user_id) {
    const token = typeof window !== undefined ? localStorage.getItem('token') : null;

    const response = axios.get(`/users/${user_id}/demographics`,
    {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': true,
    },
    }).then(response => response.data.response)
    .catch(err => {
        console.log("error code : " + err.response.status);
        return "error";

    });
    return response
}

export async function changePassword(data) {
    const token = typeof window !== undefined ? localStorage.getItem('token') : null;

    const response = axios.put(`/users/change-password`, data,
    {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': true,
    },
    })
    .catch(err => {
        console.log("error code : " + err.response.status);
        return "error";

    });
    return response
}

getDemographics.getInitialProps = async () => {
    return {};
  };