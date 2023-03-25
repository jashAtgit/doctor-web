import { useRouter } from "next/router";
import Head from "next/head";
import { Card, Text, Container, } from "@mantine/core";
import { PatientCard } from "./components/patient-card";

function PatientProfile(){

    const router = useRouter();
    const { patient_id } = router.query;

    //get patient details - (medical and all) and display on this page
    
    return (
        // <h1> Patient {patient_id} !!</h1>
        <>
            <Head>
                <title>Patient Profile</title>
            </Head>
            <Container>
                <PatientCard user_id={patient_id}/>
            </Container>
        
        </>
    );
    
}

export default PatientProfile;