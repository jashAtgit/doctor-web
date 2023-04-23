import axios from "axios";


export async function pushAssignments(assignment_list) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    console.log(assignment_list);
    console.log(JSON.stringify(assignment_list));
    
    const response = axios.post('/assignment', assignment_list,
    {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
   
    }).then(response => response.data.success)
    .catch(err => {
        console.log("error code : " + err.response.status);
        return "error";

    });
    return response
}

export default pushAssignments;