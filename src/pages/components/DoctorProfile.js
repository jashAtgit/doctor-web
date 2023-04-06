import {
    createStyles,
    Card,
    Avatar,
    Text,
    Group,
    rem,
    LoadingOverlay,
  } from "@mantine/core"
import { useEffect, useState } from "react"
import { getDemographics } from "../services/user"
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
  
  export function DoctorProfile({userId, email}) {
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
      <Card withBorder padding="xl" radius="md" className={classes.card}>
        <Card.Section sx={{ backgroundImage: `url(doctor-profile-background.jpg)`, height: 250 }} />
        <Avatar
          src='doctor.png'
          size={120}
          radius={80}
          mx="auto"
          mt={-30}
          className={classes.avatar}
        />
        <Text ta="center" fz="lg" fw={500} mt="sm">
          {demographics.firstName + " " + demographics.lastName}
        </Text>
        <Text ta="center" fz="sm" c="dimmed">
          {`${email} • ${demographics.age} years`} 
        </Text>
        <Group mt="md" position="center" spacing={30}>
            <div>
            
            <Text ta="center" fz="lg" fw={500}>
            Qualification
            </Text>
            <Text ta="center" fz="sm" c="dimmed">
            {doctorDetails.qualification}
            </Text>
            </div>
            <div>
            <Text ta="center" fz="lg" fw={500}>
            Specialization
            </Text>
            <Text ta="center" fz="sm" c="dimmed">
            {doctorDetails.specialization}
            </Text>
            </div>

            <div>
            <Text ta="center" fz="lg" fw={500}>
            Experience
            </Text>
            <Text ta="center" fz="sm" c="dimmed">
            {`${doctorDetails.experienceInYears} years`}
            </Text>
            </div>
        </Group>
        
      </Card>
    )
  }
  