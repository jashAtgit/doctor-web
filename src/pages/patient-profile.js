import { useRouter } from "next/router";
import Head from "next/head";
import { Container, Space , LoadingOverlay, BackgroundImage} from "@mantine/core";
import { PatientCard } from "./components/patient-card";
import { useEffect, useState } from "react";
import { getPatientMedHist} from "./services/patient";
import { Notifications } from '@mantine/notifications';
import Axios from "axios";
"use strict";


function PatientProfile(){
    const router = useRouter();

    const [medData, setMedData] = useState();
    const [patientId, setPatientId] = useState();
    let doctor_id = router.query.doctor_id;

    Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_ADDR;

    //get patient details - (medical and all) and display on this page
    useEffect(() => {

        async function fetchData(patientId){
            const medData = await getPatientMedHist(patientId);
            setMedData(medData);
        }
        
        setPatientId(router.query.patientId);
        fetchData(router.query.patientId);

    }, [router.query])

    const patientData = {
        doctor_id,
        ...medData,
    };
    

    if(!medData || medData == 'undefined'){
        return (
            <LoadingOverlay visible={true} overlayBlur={2} /> 
        );
    }
    
    return (
        <div style={{backgroundColor: '#edede9'}}>  
            <Notifications />
                <Space h="lg" />
                <Head>
                    <title>Patient Profile</title>
                </Head>
                
                <Container>
                    <PatientCard patientData={patientData}/>
                </Container>
        </div>
                
    );
    
}

export default PatientProfile;