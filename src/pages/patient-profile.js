import { useRouter } from "next/router";
import Head from "next/head";
import {
    Container,
    Space,
    LoadingOverlay,
    BackgroundImage,
    AppShell,
    Navbar, Header,
    createStyles,

} from "@mantine/core";
import PatientCard from "./components/patient-card";
import { useEffect, useState } from "react";
import { getPatientMedHist } from "./services/patient";
import { Notifications } from '@mantine/notifications';
import Axios from "axios";
import NavBar2 from "./components/NavBar2";
"use strict";


function PatientProfile(){
    const router = useRouter();

    const [medData, setMedData] = useState();
    const [patientId, setPatientId] = useState();
    let doctor_id = router.query.doctor_id;
    

    Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_ADDR;


    useEffect(() => {
        if (router.query.patientId) {
            setPatientId(router.query.patientId);
        }
    }, [router.query.patientId]);

    //get patient details - (medical and all) and display on this page
    useEffect(() => {

        async function fetchData(patientId){
            const medData = await getPatientMedHist(patientId);
            setMedData(medData);
        }
        
        if (patientId) {
            fetchData(patientId);
        }

    }, [patientId])

    const patientData = {
        doctor_id,
        ...medData,
    };
    
    const useStyles = createStyles(theme => ({

    pageBackground:{
        
        background: ` url("wavy-background.png"), linear-gradient(180deg, #C2D3FC 0%, #FBFDFF 100%)`,
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      },
    }))
    const { classes, cx } = useStyles();
    

    if(!medData || medData == 'undefined'){
        return (
            <LoadingOverlay visible={true} overlayBlur={2} /> 
        );
    }
    
    return (
        <div className={cx(classes.pageBackground)}>
            <Notifications />
            <Head>
                <title>Patient Profile</title>
            </Head>
            <AppShell
                padding="md"
                navbar={<Navbar width={{ base: 350 }} height={700} p="xs">{ <NavBar2/>}</Navbar>}
                
                // styles={(theme) => ({
                //     main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                // })}
            >
                <PatientCard patientData={patientData} />
            </AppShell>
        </div>
                
    );
    
}

export default PatientProfile;