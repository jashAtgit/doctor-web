import { AppShell, Navbar, Header, em } from '@mantine/core';
import NavBarSimple from './NavBar';
import { PatientsTable } from './patient-table';
import {data as pats} from "../api/data/patients.json"

import { getDoc } from '../services/doctor';
import { getPatientsByDocId } from '../services/patient';

import { useEffect, useState } from 'react';


function Dashboard({props}) {

  const setToken = props.setToken;
  const email = props.email;
  const password = props.password;
  const setPassword = props.setPassword;
  const token = props.token;

  const [user_id, setUserId] = useState();
  const [patient_list, setPatientList] = useState([]);


  // dev comment
  // if(!token || token.token == null){
  //   return <Home/>
  // }


  function clearToken(){
    localStorage.removeItem('token');
  }


    //get data from backend required for dashbaord display
  useEffect( () => {

    async function fetchData() {
      const data = await getDoc(email);
      setUserId(data.user_id);
  
      const patient_data = await getPatientsByDocId(user_id);
      setPatientList(patient_data);
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
      {<><PatientsTable data={patient_list} /> <h1>Hello {email}!!</h1></>}
    </AppShell>
  );
}

export default Dashboard;