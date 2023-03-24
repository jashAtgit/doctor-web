import { AppShell, Navbar, Header, em } from '@mantine/core';
import NavBarSimple from './NavBar';
import { PatientsTable } from './patient-table';
import {data as pats} from "../api/data/patients.json"
import { getDoc } from '../services/doctor';

function Dashboard({props}) {

  const setToken = props.setToken;
  const email = props.email;
  const password = props.password;
  const setPassword = props.setPassword;
  const token = props.token

  

  // dev comment
  // if(!token || token.token == null){
  //   return <Home/>
  // }
  console.log("email from dashboard()" + email);

  (async () => {
    const response = await getDoc(email);
    const data = response.data

    console.log("doc api fetch resp = " + data);
})()
  

  return (
    <AppShell
      padding="md"
      navbar={<Navbar width={{ base: 300 }} height={700} p="xs">{ <NavBarSimple/>}</Navbar>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {<><PatientsTable data={pats}/> <h1>Hello {email}</h1></>}
    </AppShell>
  );
}

export default Dashboard;