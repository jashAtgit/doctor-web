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
           size={65} radius="lg"/>
          <div>
            <Text fz="sm" fw={500}>
              {`${item.firstName} ${item.lastName}`}
            </Text>
            <Text fz="xs" c="dimmed">
              ID: {item.userId}
            </Text>
          </div>
        </Group>
      </td>

      <td>
        {`${item.age} years`}
      </td>
      <td>{item.gender}</td>
      <td>{item.moods != undefined  && item.moods.length > 0 && (
        item.moods[item.moods.length-1].moodValue === 1 ? <IconMoodCry size={30}/> :
        item.moods[item.moods.length-1].moodValue === 2 ? <IconMoodNervous size={30}/>:
        item.moods[item.moods.length-1].moodValue === 3 ? <IconMoodSad size={30}/> :
        item.moods[item.moods.length-1].moodValue === 4 ? <IconMoodConfuzed size={30}/>  :
        item.moods[item.moods.length-1].moodValue === 5 ? <IconMoodSmileBeam size={30}/> :
        <IconMoodHappy size={30}/>
      )}
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
            <th>Patient Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Mood</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}