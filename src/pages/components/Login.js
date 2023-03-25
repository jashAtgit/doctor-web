import { useState } from 'react'
import Link from 'next/link'
import { loginDoctor } from '../services/doctor';
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
import { notifications } from '@mantine/notifications';

function Login({props})  {
    
    const setToken = props.setToken;
    const email = props.email;
    const setEmail = props.setEmail;
    const password = props.password;
    const setPassword = props.setPassword;
    const token = props.token;

    const role = 'doctor';

    
    function valid(email){
      return /\S+@\S+\.\S+/.test(email);
    }

    const handleLogin = async e => {

        e.preventDefault();

        if(!valid(email) || !password){
          console.log("inside validation");
          notifications.show({
            title: "Login failed",
            message: "Please enter valid credentials",
            color: 'red',
          });
          
          return;
        }

        const token = await loginDoctor({
          email,
          password,
          role,
        });
        if(token == 'error'){
            return <Login setToken={setToken}/>
        }
        setToken(token['token']);
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
            <TextInput value={email || ''}
            onChange={(event) => setEmail(event.currentTarget.value)}
            withAsterisk
            error={!valid(email)}
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

