import { Text, Button, Paper, Space, Title, Flex, Divider} from '@mantine/core';
import { IconUser, IconSmoking, IconSmokingNo, IconBeer, IconBeerOff,  IconRulerMeasure, IconWeight } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { getAllActivities } from '../services/item';
import { getPatientDemographics } from '../services/patient';
import { ActivitySelectionTable } from './activities-table';



export function PatientCard({patientData}) {

  const {doctor_id, ...medData} = patientData;
  const [demographicsData, setDemographicData] = useState();
  const [activities, setActivities] = useState();

  console.log("doctor id in patient card = " + doctor_id);
  

  useEffect(() => {
    async function fetchData(patient_id){
      const demographics = await getPatientDemographics(patient_id);
      console.log(demographics);
      setDemographicData(demographics);

      const activities = await getAllActivities();
      setActivities(activities);

    }

    fetchData(medData.id);
    
  }, [medData.id])


  if(!activities || activities === 'undefined'){
    return (
      <h1>Loading....</h1>
    )
  }


  return (
    <Paper
      radius="xl"
      // shadow="xl"
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
        <div style={{ textAlign: 'center' }}>
            <IconUser size={50} radius={10} />
        </div>
      
      <Text ta="center" fz="lg" weight={500} mt="md">
        {`${demographicsData.firstName} ${demographicsData.lastName}`}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {`${demographicsData.age} years • ${demographicsData.gender}`}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {`User-Id : ${medData.id}`}
      </Text>
      

      <Button variant="default" fullWidth mt="md" radius="xl" shadow="sm">
        Send message
      </Button>

      <Space h="xl" />
      <Paper
      radius="xl"
      shadow="sm"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
      
      >   
        <Title order={2} tt="uppercase" fw={700} c="dimmed" size="h4" align="center">Health Details</Title>
        <Divider my="sm" />
            <Flex  gap="xl"
              justify="center"
              align="center"
              direction="row"
              wrap="nowrap"
              mih={100}
              
              >
              <div style={{display: "flex", justifyContent: "center"}}>
              <Text fz="md"> {<IconRulerMeasure/>}</Text>
              {medData.height} Cms 
              </div>
              <div style={{display: "flex", justifyContent: "center"}}>
              <Text fz="md"> {<IconWeight/>}</Text>
              {medData.weight} Kg
              </div>
              <Text fz="md"> {medData.smoker ? <IconSmoking/> : <IconSmokingNo/>}</Text>
              <Text fz="md"> {medData.drinksAlcohol ? <IconBeer/> : <IconBeerOff/>} </Text>
            </Flex>

      </Paper>

    <Space h="xl"/>
      <Paper      
        radius="xl"
        withBorder
        p="lg"
        shadow="xl"
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        })}
      
        >
          <Title order={2} tt="uppercase" fw={700} c="dimmed" size="h4" align="center">Push Activities</Title>  
          <Divider my="sm" />
          <ActivitySelectionTable data={activities} doctor_id={doctor_id} patient_id={medData.id}/>
        </Paper>
    </Paper>


  );
}