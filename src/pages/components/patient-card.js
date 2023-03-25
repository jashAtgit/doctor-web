import { Avatar, Text, Button, Paper } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';



export function PatientCard({user_id}) {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
        <div style={{ textAlign: 'center' }}>
            <IconUser size={100} radius={1000} />
        </div>
      
      <Text ta="center" fz="lg" weight={500} mt="md">
        name
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        age • gender
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {`User-Id : ${user_id}`}
      </Text>
      

      <Button variant="default" fullWidth mt="md">
        Send message
      </Button>
    </Paper>
  );
}