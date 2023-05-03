import {
    createStyles,
    Card,
    Avatar,
    Text,
    Group,
    rem,
    LoadingOverlay,
    Container,
    SimpleGrid,
    Badge,
    Flex,
    Stack,
    Grid,
  } from "@mantine/core"
import { useEffect, useState } from "react"
import getDemographics from "../services/user"
import { getDoctorDetails } from "../services/doctor"
  
  const useStyles = createStyles(theme => ({
    card: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    },
  
    avatar: {
      border: `${rem(2)} solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`
    }
  }))
  
  export default function DoctorProfile({userId, email, patientCount, happyCount}) {
    const { classes, theme } = useStyles()
    const [demographics, setDemographics] = useState();
    const [doctorDetails, setDoctorDetails] = useState();

    
    

    useEffect(() => {
        async function fetchData(userId){
            const demographics = await getDemographics(userId);
            setDemographics(demographics);
            const doctorDetails = await getDoctorDetails(userId);
            setDoctorDetails(doctorDetails);
        }

        fetchData(userId);
    }, []);



    if(!doctorDetails || doctorDetails === undefined){
        return (
          <LoadingOverlay visible={true} overlayBlur={2} />
        )
      }
  
    return (

      <Container size="content">
        <SimpleGrid
          cols={1}
          spacing="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <Card withBorder padding="xl" radius="md" className={classes.card}>
            <Card.Section sx={{ background: `url(doctor-profile-background.jpg)`, backgroundSize: 'cover', height: 200 }} />
            <Avatar
              src='doctor-avatar.jpg'
              size={150}
              radius={80}
              mx="auto"
              mt={-30}
              className={classes.avatar}
            />
            <Group position="center">
              <Stack spacing="1px">
                <Text ta="center" fz="xl" fw={500} mt="sm">
                  Dr. {demographics.firstName + " " + demographics.lastName}
                </Text>
                <Text ta="center" fz="lg" c="dimmed">
                  {`${email} • ${demographics.age} years`}
                </Text>
              </Stack>
            </Group>

            <div align="center">
              <Badge color="green" variant="light" size="lg">
                Online
              </Badge>
            </div>


            <Group mt="md" position="center" spacing={30}>
              <div>

                <Text ta="center" fz="xl" fw={500}>
                  Qualification
                </Text>
                <Text ta="center" fz="lg" c="dimmed">
                  {doctorDetails.qualification}
                </Text>
              </div>
              <div>
                <Text ta="center" fz="xl" fw={500}>
                  Specialization
                </Text>
                <Text ta="center" fz="lg" c="dimmed">
                  {doctorDetails.specialization}
                </Text>
              </div>

              <div>
                <Text ta="center" fz="xl" fw={500}>
                  Experience
                </Text>
                <Text ta="center" fz="lg" c="dimmed">
                  {`${doctorDetails.experienceInYears} years`}
                </Text>
              </div>
            </Group>

          </Card>
          <Grid justify="center">
            <Grid.Col span={3}>
              <Card withBorder padding="xl" radius="md" className={classes.card}>
                <Flex gap={80}>
                <div>
                <Text ta="left" size="xl" weight={700}>Number of Patients</Text>
                <Text ta="left" fz="lg" c="dimmed">
                  Today
                </Text>
                </div>
                <Text ta="right" fz={50}>{patientCount}</Text>
                </Flex>
              </Card>
            </Grid.Col>

            <Grid.Col span={3}>
              <Card withBorder padding="xl" radius="md" className={classes.card}>
              <Flex gap={80}>
                <div>
                <Text ta="left" size="xl" weight={700}>Happy Patients</Text>
                <Text ta="left" fz="lg" c="dimmed">
                  Today
                </Text>
                </div>
                <Text ta="right" fz={50}>{happyCount}</Text>
                </Flex>
              </Card>
            </Grid.Col>
          </Grid>
        </SimpleGrid>

      </Container>
    )
  }
  