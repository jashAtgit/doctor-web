import {
    Table,
    Group,
    Text,
    ScrollArea,
    Avatar,
  } from "@mantine/core"

import {
  IconUser,
  IconMoodHappy,
  IconMoodSmileBeam,
  IconMoodConfuzed,
  IconMoodSad,
  IconMoodCry,
  IconMoodNervous,
} from "@tabler/icons-react"
import Link from "next/link"
 
export function PatientsTable({ data, userId}) {

  const doctor_id = userId;
  

  const rows = data.map(item => (
    <tr key={item.userId}>
      <td>
        <Group spacing="sm">
          <Avatar src={item.moods[item.moods.length-1].moodValue === 1 ? 'avatar-1.png' :
            item.moods[item.moods.length-1].moodValue === 2 ? 'avatar-2.png' :
            item.moods[item.moods.length-1].moodValue === 3 ? 'avatar-3.png' :
            item.moods[item.moods.length-1].moodValue === 4 ? 'avatar-4.png' :
            item.moods[item.moods.length-1].moodValue === 5 ? 'avatar-5.png' :
            'avatar-6.png'
          }
           size={80} radius="lg"/>
          <div>
            <Text fz="xl" fw={500}>
              {`${item.firstName} ${item.lastName}`}
            </Text>
            <Text fz="sm" c="dimmed">
              ID: {item.userId}
            </Text>
          </div>
        </Group>
      </td>

      <td>
        <Text size="xl">{`${item.age} years`}</Text>
      </td>
      <td><Text size="xl">{item.gender}</Text></td>
      <td><Text size="xl">{item.moods != undefined  && item.moods.length > 0 && (
        item.moods[item.moods.length-1].moodValue === 1 ? <IconMoodCry size={40}/> :
        item.moods[item.moods.length-1].moodValue === 2 ? <IconMoodNervous size={40}/>:
        item.moods[item.moods.length-1].moodValue === 3 ? <IconMoodSad size={40}/> :
        item.moods[item.moods.length-1].moodValue === 4 ? <IconMoodConfuzed size={40}/>  :
        item.moods[item.moods.length-1].moodValue === 5 ? <IconMoodSmileBeam size={40}/> :
        <IconMoodHappy size={40}/>
      )}</Text>
      </td>
      <td>
        <Link legacyBehavior href={{ pathname: '/patient-profile/', query: { patientId: `${item.userId}`, doctor_id: doctor_id }}}>
          <a className='link'>View Details</a>
        </Link>
      </td>
    </tr>
  ))

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="md">
        <thead>
          <tr>
            <th><Text size="xl">Patient Name</Text></th>
            <th><Text size="xl">Age</Text></th>
            <th><Text size="xl">Gender</Text></th>
            <th><Text size="xl">Mood</Text></th>
            <th><Text size="xl">Options</Text></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}