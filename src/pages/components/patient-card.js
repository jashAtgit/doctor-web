import { useDisclosure } from '@mantine/hooks';
import {
  Text, Button, Paper, Space, Title, Flex, Divider, LoadingOverlay, Modal,
  Container,
  Grid,
  SimpleGrid,
  useMantineTheme,
  rem,
  Avatar,
  Stack,
  Group,

} from '@mantine/core';
import { useEffect, useState } from 'react';
import { getAllActivities } from '../services/item';
import { getPatientActivities, getPatientMoods } from '../services/patient';
import { getDemographics } from '../services/user';
import { ActivitySelectionTable } from './activities-table';
import Chat from './Chat';
import { AssignmentsTable } from './AssignmentsTable';
import { MoodChart } from './MoodChart';

export default function PatientCard({ patientData }) {
  const PRIMARY_COL_HEIGHT = rem(300)
  const theme = useMantineTheme()
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`

  const { doctor_id, ...medData } = patientData;
  const [demographicsData, setDemographicData] = useState();
  const [activities, setActivities] = useState();
  const [docName, setDocName] = useState();
  const [moodValue, setMoodVal] = useState();

  const [chatOpened, chatModal] = useDisclosure(false);

  const [assginedActivies, setAssignedActivities] = useState([]);

  useEffect(() => {
    async function fetchData(patient_id, doctorId) {
      const demographics = await getDemographics(patient_id);
      setDemographicData(demographics);

      const activities = await getAllActivities();
      setActivities(activities);

      const docDemographics = await getDemographics(doctorId);
      setDocName(docDemographics.firstName + " " + docDemographics.lastName);

      const moods = await getPatientMoods(patient_id);
      setMoodVal(moods[moods.length - 1].moodValue);



    }
    fetchData(medData.id, doctor_id);

  }, [medData.id])

  useEffect(() => {
    async function getAssignedActivities(patient_id) {
      const assginedActivies_ = await getPatientActivities(patient_id);
      setAssignedActivities(assginedActivies_);
    }

    getAssignedActivities(medData.id);
  }, [])

  if (!docName || docName === undefined) {
    return (
      <LoadingOverlay visible={true} overlayBlur={2} />
    )
  }


  return (
    <>
      <Container size="auto">
        <SimpleGrid
          cols={2}
          spacing="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <Grid>
            <Grid.Col span={12}>
              <Paper
                radius={20}
                shadow="sm"
                withBorder
                p="lg"
                sx={(theme) => ({
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
                })}

              >

                <Group position='apart'>
                  <div>
                    <Flex gap="xl">
                      <Avatar src={moodValue === 1 ? 'avatar-1.png' :
                        moodValue === 2 ? 'avatar-2.png' :
                          moodValue === 3 ? 'avatar-3.png' :
                            moodValue === 4 ? 'avatar-4.png' :
                              moodValue === 5 ? 'avatar-5.png' :
                                'avatar-6.png'
                      }
                        size={120} radius="lg" />
                      <Stack spacing="1px">
                        <Text ta="left" fz="xl" weight={500} mt="md">
                          {`${demographicsData.firstName} ${demographicsData.lastName}`}
                        </Text>
                        <Group>
                          <Text ta="center" c="dimmed" fz="md">
                            {`${demographicsData.age} years • ${demographicsData.gender}`}
                          </Text>
                          <Text ta="center" c="dimmed" fz="md">
                            {`User-Id : ${medData.id}`}
                          </Text>
                        </Group>
                      </Stack>
                    </Flex>
                  </div>

                  <Button className="button-eval" onClick={chatModal.open} variant="default" mt="xl" radius="xl" shadow="sm">
                    Send message
                  </Button>
                </Group>



              </Paper>
            </Grid.Col>

            <Grid.Col span="auto">
              <Paper
                radius={20}
                shadow="sm"
                withBorder
                p="lg"
                sx={(theme) => ({
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
                })}

              >
                <Title order={2} tt="uppercase" fw={700} c="dimmed" size="h2" align="center">Health Details</Title>
                <Divider my="sm" />
                <Flex gap="xl"
                  justify="center"
                  align="center"
                  direction="row"
                  wrap="nowrap"
                  mih={100}

                >
                  <Group>
                    <div>
                      <Text fz="xl" fw={500}> Height </Text>
                      <Text ta="center" c="dimmed" fz="lg">
                        {medData.height} cm
                      </Text>
                    </div>
                    <Divider orientation="vertical" />
                    <div>
                      <Text fz="xl" fw={500}> Weight </Text>
                      <Text ta="center" c="dimmed" fz="lg">
                        {medData.weight} kg
                      </Text>
                    </div>
                    <Divider orientation="vertical" />
                    <div >
                      <Text fz="xl" fw={500}> Smoker </Text>
                      <Text ta="center" c="dimmed" fz="lg">
                        {medData.smoker ? 'Yes' : 'No'}
                      </Text>
                    </div>
                    <Divider orientation="vertical" />
                    <div>
                      <Text fz="xl" fw={500}> Drinker </Text>
                      <Text ta="center" c="dimmed" fz="lg">
                        {medData.drinksAlcohol ? "Yes" : "No"}
                      </Text>
                    </div>

                  </Group>
                </Flex>
                <Group position="center">
                  <div>
                    <Text fz="xl" fw={500} >Disease History</Text>
                    <Text ta="center" c="dimmed" fz="lg"> {medData.diseases}</Text>
                  </div>
                </Group>
                <Space h="sm" />
              </Paper>
            </Grid.Col>

          </Grid>

          <Grid gutter="md" align="flex-end">
            <Grid.Col span="auto">
              <Paper
                radius={20}
                withBorder
                p="lg"
                shadow="xl"
                sx={(theme) => ({
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
                })}

              >
                <Title order={2} tt="uppercase" fw={700} c="dimmed" size="h2" align="center">Mood Tracker</Title>
                <Divider my="sm" />
                <MoodChart patientId={medData.id} />
              </Paper>
            </Grid.Col>
          </Grid>
        </SimpleGrid>

        <Space h="xl" />
        <SimpleGrid
          cols={1}
          spacing="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >

          <Paper
            radius={20}
            withBorder
            p="xl"
            shadow="xl"
            sx={(theme) => ({
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
            })}

          >
            <Title order={2} tt="uppercase" fw={700} c="dimmed" size="h2" align="center">Push Activities</Title>
            <Divider my="sm" />
            <ActivitySelectionTable data={activities} doctor_id={doctor_id} patient_id={medData.id} />
          </Paper>

          {assginedActivies.length !== 0 ?
            <>
              <Space h="xl" />
              <Paper
                radius={20}
                withBorder
                p="xl"
                shadow="xl"
                sx={(theme) => ({
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
                })}

              >
                <Title order={2} tt="uppercase" fw={700} c="dimmed" size="h2" align="center">Assigned Activities</Title>
                <Divider my="sm" />
                <AssignmentsTable data={assginedActivies} patientId={medData.id} />
              </Paper>
            </>
            : null}

          <Space h="xl" />

        </SimpleGrid>
      </Container>
      <Space h="xl" />

      <Modal opened={chatOpened} onClose={chatModal.close} title="  " centered size="auto"
        overlayProps={{
          blur: 3,
        }}
      >
        <Title order={3}>Inbox</Title>
        <Space h="md" />
        <Chat patientId={medData.id} doctorId={doctor_id} patientName={`${demographicsData.firstName} ${demographicsData.lastName}`} docName={docName} />
      </Modal>
    </>
  );
}