import { useRouter } from "next/router";
import Head from "next/head";
import { Card, Text, Container, Space } from "@mantine/core";
import { PatientCard } from "./components/patient-card";
import { useEffect, useState } from "react";
import { getPatientMedHist} from "./services/patient";
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Axios from "axios";

function PatientProfile(){

    const router = useRouter();

    const [medData, setMedData] = useState();
    const [patientId, setPatientId] = useState();
    let doctor_id = router.query.doctor_id;

    Axios.defaults.baseURL = "https://a5c6-119-161-98-68.in.ngrok.io";

    //get patient details - (medical and all) and display on this page
    useEffect(() => {

        // const { worker } = require('./mocks/browser')
        // worker.start();
        
        async function fetchData(patientId){
            const medData = await getPatientMedHist(patientId);
            console.log(medData);
            setMedData(medData);
        }

        
        setPatientId(router.query.patientId);
        console.log("patient id in useEff = " + router.query.patientId);
        fetchData(router.query.patientId);
        console.log(medData);

    }, [router.query])

    const patientData = {
        // pid: patientId,
        doctor_id,
        ...medData,
    };

    

    if(!medData || medData == 'undefined'){
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