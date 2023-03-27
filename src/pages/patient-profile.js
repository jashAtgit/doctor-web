import { useRouter } from "next/router";
import Head from "next/head";
import { Card, Text, Container, Space } from "@mantine/core";
import { PatientCard } from "./components/patient-card";
import { useEffect, useState } from "react";
import { getPatientMedHist, getPatientMood } from "./services/patient";

function PatientProfile(){

    const router = useRouter();

    const [medData, setMedData] = useState();
    const [patient_id, setPatientId] = useState();

    //get patient details - (medical and all) and display on this page
    useEffect(() => {

        // const { worker } = require('./mocks/browser')
        // worker.start();
        
        async function fetchData(patient_id){
            const medData = await getPatientMedHist(patient_id);
            setMedData(medData);
        }

        
        const {patient_id} = router.query;
        setPatientId(patient_id);
        
        fetchData(patient_id);

    }, [router.query])

    const patientData = {
        pid: patient_id,
        ...medData,
    };

    if(!medData || medData === 'undefined'){
        return <h1> Loading....</h1>
    }
    
    return (
        <>
            <Space h="md" />
            <Head>
                <title>Patient Profile</title>
            </Head>
            <Container>
                <PatientCard patientData={patientData}/>
            </Container>

        
        </>
    );
    
}

export default PatientProfile;