import { useRouter } from "next/router";
import Head from "next/head";
import { Card, Text, Container, Space } from "@mantine/core";
import { PatientCard } from "./components/patient-card";
import { useEffect, useState } from "react";
import { getPatientMedHist} from "./services/patient";
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

function PatientProfile(){

    const router = useRouter();

    const [medData, setMedData] = useState();
    const [patient_id, setPatientId] = useState();
    let {_, doctor_id} = router.query;

    //get patient details - (medical and all) and display on this page
    useEffect(() => {

        // const { worker } = require('./mocks/browser')
        // worker.start();
        
        async function fetchData(patient_id){
            const medData = await getPatientMedHist(patient_id);
            setMedData(medData);
        }

        
        const {patient_id, doctor_id} = router.query;
        setPatientId(patient_id);
        
        fetchData(patient_id);

    }, [router.query])

    const patientData = {
        pid: patient_id,
        doctor_id,
        ...medData,
    };

    

    if(!medData || medData === 'undefined'){
        return <h1> Loading....</h1>
    }
    
    return (
        <>
            <MantineProvider withNormalizeCSS withGlobalStyles>
            <Notifications />
      
            <Space h="md" />
            <Head>
                <title>Patient Profile</title>
            </Head>
            <Container>
                <PatientCard patientData={patientData}/>
            </Container>
            </MantineProvider>
        
        </>
    );
    
}

export default PatientProfile;