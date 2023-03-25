import { useRouter } from "next/router";

function PatientProfile(){

    const router = useRouter();
    const { patient_id } = router.query;

    return (
        <h1> Patient {patient_id} !!</h1>
    );
    
}

export default PatientProfile;