import { AppShell, Navbar, LoadingOverlay } from '@mantine/core';
import NavBarSimple from './NavBar';
import { PatientsTable } from './patient-table';

import { getPatientMood } from '../services/patient';
import { getDemographics } from '../services/user';
import { getPatientIdsByDocId, getDocIdByEmail } from '../services/doctor';
import { useEffect, useState } from 'react';
import { DoctorProfile } from './DoctorProfile';


function Dashboard({props}) {

  const setToken = props.setToken;
  const email = props.email || localStorage.getItem('email');

  const [userId, setUserId] = useState();
  const [patient_list, setPatientList] = useState([]);
  const [active, setActive] = useState("Patients")


  function clearToken(){
    localStorage.removeItem('token');
  }

  //get data from backend required for dashbaord display
  useEffect( () => {

    async function fetchData() {
      const data = await getDocIdByEmail(email);
      setUserId(data.userId);

      const patient_ids = await getPatientIdsByDocId(data.userId);

      let demographicsData = [];
      for (const patientId of patient_ids) {
        const patientDemographics = await getDemographics(patientId);
        // const mood = await getPatientMood(patientId);
        // patientDemographics['mood'] = mood;
        demographicsData.push(patientDemographics);
      }
      setPatientList(demographicsData);
    }
    fetchData();
  }, []);

  console.log(email);

  if(!patient_list || patient_list === 'undefined' || patient_list.length === 0){
    return (
      <LoadingOverlay visible={true} overlayBlur={2} />
    )
  }
  
  
  return (
    <AppShell
      padding="md"
      navbar={<Navbar width={{ base: 250 }} height={700} p="xs">{ <NavBarSimple clearToken={clearToken} setToken={setToken} active={active} setActive={setActive}  />}</Navbar>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {<>
       {active === 'Patients' ? <PatientsTable data={patient_list} userId={userId} /> : <DoctorProfile userId={userId} email={email}/> }
       </>}
    </AppShell>
  );
  
}

export default Dashboard;