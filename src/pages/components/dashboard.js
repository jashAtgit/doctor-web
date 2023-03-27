import { AppShell, Navbar, Header, em } from '@mantine/core';
import NavBarSimple from './NavBar';
import { PatientsTable } from './patient-table';

import { getPatientDemographics } from '../services/patient';
import { getPatientIdsByDocId, getDoc } from '../services/doctor';
import { useEffect, useState } from 'react';


function Dashboard({props}) {

  const setToken = props.setToken;
  const email = props.email;
  const password = props.password;
  const setPassword = props.setPassword;
  const token = props.token;

  const [user_id, setUserId] = useState();
  const [patient_list, setPatientList] = useState([]);


  function clearToken(){
    localStorage.removeItem('token');
  }



  //get data from backend required for dashbaord display
  useEffect( () => {

    async function fetchData() {
      const data = await getDoc(email);
      setUserId(data.user_id);

      const patient_ids = await getPatientIdsByDocId(user_id);

      let demographicsData = [];
      for (const patientId of patient_ids) {
        const patientDemographics = await getPatientDemographics(patientId);
        demographicsData.push(patientDemographics);
      }
      setPatientList(demographicsData);
    }
    fetchData();
  }, []);
  

  return (
    <AppShell
      padding="md"
      navbar={<Navbar width={{ base: 300 }} height={700} p="xs">{ <NavBarSimple clearToken={clearToken} setToken={setToken}   />}</Navbar>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {<><PatientsTable data={patient_list} /> </>}
    </AppShell>
  );
}

export default Dashboard;