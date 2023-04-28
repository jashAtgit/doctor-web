import axios from "axios";

export default async function getAllActivities() {

    const token = typeof window !== undefined ? localStorage.getItem('token') : null;
    //get all available activities
    const response = axios.get(`/activities`,
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

export async function getQuestionsByActId(activityId) {

    const token = typeof window !== undefined ? localStorage.getItem('token') : null;
    //get all available activities
    const response = axios.get(`/activities/${activityId}/questions`,
    {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': true,
    },
    }).then(response => response.data)
    .catch(err => {
        console.log("error code : " + err.response.status);
        return "error";

    });

    return response
}

getAllActivities.getInitialProps = async () => {
    return {};
  };