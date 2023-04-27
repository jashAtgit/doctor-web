import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Button,
    Text,
    Anchor,
    rem,
    Image,
} from "@mantine/core"
import { loginDoctor } from '../services/doctor';
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";



export default function Login({ props }) {

    const [bgNo, setBgNo] = useState(2);

    const useStyles = createStyles(theme => ({
        wrapper: {
            minWidth: rem(1900),
            minHeight: rem(1080),
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(bg-${bgNo}.svg)`
        },

        form: {
            minHeight: rem(700),
            maxWidth: 600,
            paddingTop: rem(200),

            background: 'transparent',
        },

    }))


    const setToken = props.setToken;
    const email = props.email;
    const setEmail = props.setEmail;
    const password = props.password;
    const setPassword = props.setPassword;
    const token = props.token;

    const role = 'doctor';

    function getRandomInt() {
        let n = Math.floor(Math.random() * 3) + 1;
        return n;
    }

    useEffect(()=>{
        setBgNo(getRandomInt());
    },[])


    function valid(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    function handleNewAccount() {
        const email = "jaswanth.chapiri@iiitb.ac.in";
        const subject = "I want to get registered as a Doctor in Better-U, my details are attached.";
      
        const url = `mailto:${email}?subject=${subject}`;
      
        window.location.href = url;
    }

    const handleLogin = async e => {

        
          

        e.preventDefault();

        if (!valid(email) || !password) {
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
        if (token == 'error') {
            console.log("inside error");
            notifications.show({
                title: "Login failed",
                message: "Please enter valid credentials",
                color: 'red',
            });

            return <Login setToken={setToken} />
        }
        setToken(token['token']);
        localStorage.setItem('email', email)
    }

    const { classes } = useStyles()
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30} style={{ marginLeft: 40 }}>
                <Image maw={250} mx="auto" src="logo-welcome.svg" alt="logo" style={{ marginTop: 25 }} />

                <TextInput
                    placeholder="doctor@gmail.com"
                    size="lg"
                    radius="lg"
                    withAsterisk
                    style={{ marginTop: 60 }}
                    value={email || ''}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    error={!valid(email)}
                    label="Your email"
                />
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    mt="md"
                    size="lg"
                    radius="lg"
                    withAsterisk
                    required
                    onChange={e => setPassword(e.target.value)}
                />
                <div align="center">
                    <Button className="button-login" mt="xl" size="lg" onClick={handleLogin} style={{ width: '200px' }}>
                        Login
                    </Button>
                </div>

                <Text ta="center" mt="md">
                    Don&apos;t have an account?{" "}
                    <Anchor
                        href="#"
                        weight={700}
                        onClick={event => {event.preventDefault(); handleNewAccount()}}
                    >
                        Contact admin
                    </Anchor>
                </Text>
            </Paper>
        </div>

    )
}

Login.getInitialProps = async () => {
    return {};
  };


