import { Text, Button, Paper, Space, SimpleGrid, Stack, ScrollArea } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { getAllActivities } from '../services/item';
import { getPatientDemographics } from '../services/patient';
import { ActivitySelectionTable } from './activities-table';



export function PatientCard({patientData}) {

  const { pid, ...medData } = patientData;
  const [demographicsData, setDemographicData] = useState();
  const [activities, setActivities] = useState();

  

  useEffect(() => {
    async function fetchData(patient_id){
      const demographics = await getPatientDemographics(patient_id);
      setDemographicData(demographics);

      const activities = await getAllActivities();
      setActivities(activities);

    }

    fetchData(pid);
    
  }, [pid])

  if(!activities || activities === 'undefined'){
    return (
      <h1>Loading....</h1>
    )
  }


  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
        <div style={{ textAlign: 'center' }}>
            <IconUser size={50} radius={10} />
        </div>
      
      <Text ta="center" fz="lg" weight={500} mt="md">
        {`${demographicsData.fname} ${demographicsData.lname}`}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {`${demographicsData.age} years • ${demographicsData.sex}`}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {`User-Id : ${pid}`}
      </Text>
      

      <Button variant="default" fullWidth mt="md">
        Send message
      </Button>

      <Space h="xl" />
      <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
      >   
        <h1>Medical Details</h1>
            <Stack h={200} align="flex-start" justify="flex-start">
              <Text fz="md"> {`Height : ${medData.height} cms`}</Text>
              <Text fz="md"> {`Weight : ${medData.weight} Kg`} </Text>
              <Text fz="md"> {`Smoker : ${medData.is_smoker}`} </Text>
              <Text fz="md"> {`Alcohol : ${medData.drinks_alcohol}`} </Text>
            </Stack>

    </Paper>

    <Space h="xl" />
    <Paper      
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
      grow component={ScrollArea}
      >  
      <ActivitySelectionTable data={activities} />
      </Paper>
    </Paper>


  );
}