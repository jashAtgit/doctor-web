import { AppShell, Navbar, Header } from '@mantine/core';
import NavBarSimple from './NavBar';
import { PatientsTable } from './patient-table';
import {data as pats} from "../api/patients.json"

function Dashboard({token}) {
  return (
    <AppShell
      padding="md"
      navbar={<Navbar width={{ base: 300 }} height={700} p="xs">{ <NavBarSimple/>}</Navbar>}
      // header={<Header height={60} p="xs">{/* Header content */}</Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {<PatientsTable data={pats}/>}
    </AppShell>
  );
}

export default Dashboard;