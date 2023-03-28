import { useState, useRef } from 'react';
import { notifications } from '@mantine/notifications';
import { createStyles, Table, Checkbox, ScrollArea, Group, Divider, Text, rem, Select, SelectItem, Button, Space, Paper } from '@mantine/core';
import { pushAssignments } from '../services/assignment';
import { IconCheck, IconX } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

const options = [
    { value: '1', label: 'Level 1' },
    { value: '2', label: 'Level 2' },
    { value: '3', label: 'Level 3' },
    { value: '4', label: 'Level 4' },
    { value: '5', label: 'Level 5' },
  ];

async function handleAssign(doctor_id, patient_id, selection, levels){
  let json_list = [];

  for(let i=0; i<selection.length; i++){
    json_list.push({
      patient_id: patient_id,
      doctor_id: doctor_id,
      item_id: selection[i],
      item_level: levels[selection[i]],
    });
  }
    console.log(json_list);

    const response = await pushAssignments(json_list);
    if(response.status === 200){
      notifications.show({
        color: 'blue',
        title: 'Success',
        message: 'Assigments have been pushed',
        icon: <IconCheck size="1rem" />,
      })
    }
    else{
      notifications.show({
        color: 'red',
        title: 'Failed',
        message: 'Please check inputs',
        icon: <IconX size="1rem" />,
      })
    }

}


export function ActivitySelectionTable({ data, doctor_id, patient_id }) {

  //using hashTable to map <activity_id : value choice>
  const [selectedValues, setSelectedValues] = useState(
    data.reduce((obj, item) => ({ ...obj, [item.activity_id]: options[0].value }), {})
  );

  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState([]);
  const toggleRow = (activity_id) =>
    setSelection((current) =>
      current.includes(activity_id) ? current.filter((item) => item !== activity_id) : [...current, activity_id]
    );
  const toggleAll = () =>
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.activity_id)));

  const rows = data.map((item) => {
    const selected = selection.includes(item.activity_id);

    // console.log(selectedValues);
   
    return (
      <tr key={item.activity_id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.activity_id)}
            onChange={() => toggleRow(item.activity_id)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>{item.desc}</td>
        <td>
            <Select
          data={options}
          value={selectedValues[item.activity_id]}
          onChange={(value) => {
            setSelectedValues((current) => ({
              ...current,
              [item.activity_id]: value,
            }));
          }}
          withinPortal={true}
           />
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="lg">
        <thead>
          <tr>
            <th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={selection.length > 0 && selection.length !== data.length}
                transitionDuration={0}
              />
            </th>
            <th>Activity Name</th>
            <th>Description</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>

        
      </Table>
      
      <Divider my="sm" />
      <Space h='sm' variant='dotted'/>
      <div style={{ textAlign: 'center' }}>
        <Button uppercase onClick={(event) => {event.preventDefault();
          handleAssign(doctor_id, patient_id, selection, selectedValues)}}>
              Assign
        </Button>
      </div>
      
    </ScrollArea>
    
  );
}