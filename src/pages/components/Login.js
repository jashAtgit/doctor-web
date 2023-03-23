import { useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types';
import { loginUser } from '../services/user';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { useValidatedState } from '@mantine/hooks';
import { Notification } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { showNotification, notifications } from '@mantine/notifications';

function Login({setToken}) {
    // const [email, setEmail] = useState('')
    const [{ email, lastValidEmail, valid }, setEmail] = useValidatedState(
      '',
      (val) => /^\S+@\S+$/.test(val),
      true
    );
    const [password, setPassword] = useState('');
    
    //T0-DO email validation on submit
    // console.log(email);
    // notifications.show({message: "hello!!"});
    

    const handleLogin = async e => {
      // console.log(email);

        e.preventDefault();

        // valid email and empty pass check and notify
        if(!valid || !password){
          console.log("inside validation");
          notifications.show({
            title: "Login failed",
            message: "Please enter valid credentials",
            color: 'red',
          });
          
          return;
        }
        const token = await loginUser({
          lastValidEmail,
          password
        });
        if(token == 'error'){
            return <Login setToken={setToken}/>
        }
        console.log(token);
        setToken(token);
      }

      


      return (
        <Container size={420} my={40}>
          <Title
            align="center"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
          >
            Welcome Doctor!
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Do not have an account yet?{' '}
            
            <Link href={"register"}>
            <Anchor size="sm" component="button">
            Create account
            </Anchor>
            </Link>
          </Text>
    
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            withAsterisk
            error={!valid}
            placeholder="email@example.com"
            label="Your email"/>
            <PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={e => setPassword(e.target.value)}/>
            <Group position="apart" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" onClick={handleLogin}>
              Sign in
            </Button>
          </Paper>
        </Container>
      );
}

export default Login;

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
