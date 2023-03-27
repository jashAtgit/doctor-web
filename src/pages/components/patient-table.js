import {
    Avatar,
    Badge,
    Table,
    Group,
    Text,
    Select,
    ScrollArea,
  } from "@mantine/core"

import {
  IconAnkh, IconUser,
} from "@tabler/icons-react"
import Link from "next/link"
 
export function PatientsTable({ data }) {

  
  const rows = data.map(item => (
    <tr key={item.patient_id}>
      <td>
        <Group spacing="sm">
          <IconUser size={40} />
          <div>
            <Text fz="sm" fw={500}>
              {`${item.fname} ${item.lname}`}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.sex}
            </Text>
          </div>
        </Group>
      </td>

      <td>
        {`${item.age} years`}
      </td>
      <td>{item.sex}</td>
      <td>
        <Link href={{ pathname: '/patient-profile/', query: { patient_id: `${item.patient_id}`} }}>View Details</Link>
      </td>
    </tr>
  ))

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}