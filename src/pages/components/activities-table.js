import { useState, useRef } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Group, Avatar, Text, rem, Select, SelectItem, Button, Space, Paper } from '@mantine/core';

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

export function ActivitySelectionTable({ data }) {

    const [selectedValues, setSelectedValues] = useState(
        new Array(data.length).fill(options[0].value)
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

    console.log(selectedValues);

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
            {/* <Avatar size={26} src={item.avatar} radius={26} /> */}
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>{item.desc}</td>
        <td>
            {/* <Select
            data={options} 
            defaultValue={`${options[0].value}`}
            value={selectedValue}
            onChange={setSelectedValue}
            /> */}
            <Select
          data={options}
          value={selectedValues[item.activity_id-1]}
          onChange={(value) => {
            setSelectedValues((current) => ({
              ...current,
              [item.activity_id-1]: value,
            }));
          }}
           />

        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
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

      <Space h='xl'/>
      <div style={{ textAlign: 'center' }}>
        <Button>
                Assign
        </Button>
      </div>
      
    </ScrollArea>
  );
}