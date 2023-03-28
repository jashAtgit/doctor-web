import axios from "axios";


export async function pushAssignments(assignment_list) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    console.log(JSON.stringify(assignment_list));
    
    const response = axios.post('/assignment', {
    validateStatus:false,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(assignment_list)
    })
    .catch(err => {
        console.log("error code : " + err.response.status);
        return "error";

    });
    return response
}