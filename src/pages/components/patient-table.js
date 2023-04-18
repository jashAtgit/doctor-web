import {
    Table,
    Group,
    Text,
    ScrollArea,
  } from "@mantine/core"

import {
  IconUser,
  IconMoodHappy,
  IconMoodSmileBeam,
  IconMoodEmpty,
  IconMoodConfuzed,
  IconMoodSad,
  IconMoodCry,
} from "@tabler/icons-react"
import Link from "next/link"
 
export function PatientsTable({ data, userId}) {

  const doctor_id = userId;

  const rows = data.map(item => (
    <tr key={item.userId}>
      <td>
        <Group spacing="sm">
          <IconUser size={40} />
          <div>
            <Text fz="sm" fw={500}>
              {`${item.firstName} ${item.lastName}`}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.gender}
            </Text>
          </div>
        </Group>
      </td>

      <td>
        {`${item.age} years`}
      </td>
      <td>{item.gender}</td>
      <td>{item.moods != undefined  && item.moods.length > 0 && (
        item.moods[item.moods.length-1].moodValue === 1 ? <IconMoodCry/> :
        item.moods[item.moods.length-1].moodValue === 2 ? <IconMoodSad/> :
        item.moods[item.moods.length-1].moodValue === 3 ? <IconMoodConfuzed/> :
        item.moods[item.moods.length-1].moodValue === 4 ? <IconMoodEmpty/> :
        item.moods[item.moods.length-1].moodValue === 5 ? <IconMoodSmileBeam/> :
        <IconMoodHappy/> 
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
      <Table miw={800} verticalSpacing="sm">
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