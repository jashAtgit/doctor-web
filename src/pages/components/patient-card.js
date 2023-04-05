import { useDisclosure } from '@mantine/hooks';
import { Text, Button, Paper, Space, Title, Flex, Divider, LoadingOverlay, Modal} from '@mantine/core';
import { IconUser, IconSmoking, IconSmokingNo, IconBeer, IconBeerOff,  IconRulerMeasure, IconWeight } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { getAllActivities } from '../services/item';
import { getDemographics } from '../services/patient';
import { ActivitySelectionTable } from './activities-table';
import Chat from './Chat';

export function PatientCard({patientData}) {

  const {doctor_id, ...medData} = patientData;
  const [demographicsData, setDemographicData] = useState();
  const [activities, setActivities] = useState();
  const [docName, setDocName] = useState();

  const [opened, { open, close }] = useDisclosure(false);



  useEffect(() => {
    async function fetchData(patient_id, doctorId){
      const demographics = await getDemographics(patient_id);
      setDemographicData(demographics);

      const activities = await getAllActivities();
      setActivities(activities);

      const docDemographics = await getDemographics(doctorId);
      setDocName(docDemographics.firstName + " " + docDemographics.lastName);
      
    }
    fetchData(medData.id, doctor_id);
    
  }, [medData.id])

  if(!docName || docName === undefined){
    return (
      <LoadingOverlay visible={true} overlayBlur={2} />
    )
  }


  return (
    <Paper
      radius={0}
      shadow="xl"
      withBorder
      p="xl"
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
      
      <Modal opened={opened} onClose={close} title="Have a Chat..." centered
      overlayProps={{
        blur: 3,
      }}
      >
        <Chat patientId={medData.id} doctorId={doctor_id} patientName={`${demographicsData.firstName} ${demographicsData.lastName}`} docName={docName}/>
      </Modal>

      <Button onClick={open} variant="default" fullWidth mt="md" radius="xl" shadow="sm">
        Send message
      </Button>

      <Space h="xl" />
      <Paper
      radius={0}
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
            <div style={{display: "flex", justifyContent: "center"}}>
              <Text fz="md" fw={700} >Disease History:</Text> <Space w="md"/><Text fz="md"> {medData.diseases}</Text>
              </div>
            <Space h="sm"/>
      </Paper>

    <Space h="xl"/>
      <Paper      
        radius={0}
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