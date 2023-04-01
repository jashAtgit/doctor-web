import { useRouter } from "next/router";
import Head from "next/head";
import { Container, Space , LoadingOverlay} from "@mantine/core";
import { PatientCard } from "./components/patient-card";
import { useEffect, useState } from "react";
import { getPatientMedHist} from "./services/patient";
import { MantineProvider, ColorSchemeProvider, } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Axios from "axios";
import { DarkToggle } from "./components/darkToggle";
"use strict";


function PatientProfile(){
    const [colorScheme, setColorScheme] = useState('light');
    const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    const router = useRouter();

    const [medData, setMedData] = useState();
    const [patientId, setPatientId] = useState();
    let doctor_id = router.query.doctor_id;

    Axios.defaults.baseURL = "http://localhost:8888";

    //get patient details - (medical and all) and display on this page
    useEffect(() => {

        // const { worker } = require('./mocks/browser')
        // worker.start();
        
        async function fetchData(patientId){
            const medData = await getPatientMedHist(patientId);
            setMedData(medData);
        }

        
        setPatientId(router.query.patientId);
        fetchData(router.query.patientId);

    }, [router.query])

    const patientData = {
        // pid: patientId,
        doctor_id,
        ...medData,
    };

    

    if(!medData || medData == 'undefined'){
        return (
            <LoadingOverlay visible={true} overlayBlur={2} /> 
        );
    }
    
    return (
        <>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <Notifications />
      
            <Space h="md" />
            <Head>
                <title>Patient Profile</title>
            </Head>
            
            <Container>
                <div style={{ textAlign: 'right' }}>
                    <DarkToggle/>
                </div>
                <PatientCard patientData={patientData}/>
            </Container>
            </MantineProvider>
            </ColorSchemeProvider>
        
        </>
    );
    
}

export default PatientProfile;