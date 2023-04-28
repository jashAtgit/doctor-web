import axios from "axios";


export default async function pushAssignments(assignment_list) {
    const token = typeof window !== undefined ? localStorage.getItem('token') : null;

    
    const response = axios.post('/assignment', assignment_list,
    {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': true,
    },
   
    }).then(response => response.data.success)
    .catch(err => {
        console.log("error code : " + err.response.status);
        return "error";

    });
    return response
}

pushAssignments.getInitialProps = async () => {
    return {};
  };
