import {
    Table,
    Group,
    Text,
    ScrollArea,
  } from "@mantine/core"

import {
  IconSquareCheck,
  IconSquare,
  IconClipboardList,
} from "@tabler/icons-react"
 
export function AssignmentsTable({ data }) {


  const rows = data.map(item => (
    <tr key={item.assignmentId}>
      <td>
        <Group>
            <IconClipboardList/>
            <Text>{item.assignmentId}</Text>
        </Group>
      </td>

      <td>
        {item.item.activity.name}
      </td>
      <td>{item.itemLevel}</td>
      <td>
        {item.completed ? <IconSquareCheck/> : <IconSquare/> }
      </td>
    </tr>
  ))

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Assignment ID</th>
            <th>Activity Name</th>
            <th>Level</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}