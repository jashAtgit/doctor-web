import {
    Box,
    Progress,
    PasswordInput,
    Group,
    Text,
    Center,
    Card,
    Container,
    Stack,
    Divider,
    Button,
} from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import { IconCheck, IconX } from "@tabler/icons-react"
import { notifications } from "@mantine/notifications"

function PasswordRequirement({ meets, label }) {
    return (
        <Text color={meets ? "teal" : "red"} mt={5} size="sm">
            <Center inline>
                {meets ? (
                    <IconCheck size="0.9rem" stroke={1.5} />
                ) : (
                    <IconX size="0.9rem" stroke={1.5} />
                )}
                <Box ml={7}>{label}</Box>
            </Center>
        </Text>
    )
}

const requirements = [
    { re: /[0-9]/, label: "Includes number" },
    { re: /[a-z]/, label: "Includes lowercase letter" },
    { re: /[A-Z]/, label: "Includes uppercase letter" },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" }
]

function getStrength(password) {
    let multiplier = password.length > 5 ? 0 : 1

    requirements.forEach(requirement => {
        if (!requirement.re.test(password)) {
            multiplier += 1
        }
    })

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0)
}

export default function ChangePassword() {
    const [value, setValue] = useInputState("")
    const [confirmValue, setConfirmValue] = useInputState("")
    const [oldPass, setOldPass] = useInputState("")
    const strength = getStrength(value)
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(value)}
        />
    ))
    const bars = Array(4)
        .fill(0)
        .map((_, index) => (
            <Progress
                styles={{ bar: { transitionDuration: "0ms" } }}
                value={
                    value.length > 0 && index === 0
                        ? 100
                        : strength >= ((index + 1) / 4) * 100
                            ? 100
                            : 0
                }
                color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
                key={index}
                size={4}
            />
        ))

    function handleClick() {
        console.log("button-clicked!!");
        if (value === confirmValue && value.trim() != "") {
            //hit api and based on response show notification
            notifications.show({
                color: 'green',
                title: 'Success',
                autoClose: 5000,
                message: 'Password has been Changed!!',
                icon: <IconCheck size="1rem" />,
            })

            console.log(checks);
        }
        else {
            notifications.show({
                color: 'red',
                title: 'Failed',
                autoClose: 5000,
                message: 'Check inputs and try again!!',
                icon: <IconX size="1rem" />,
            })
        }

    }

    return (
        <Container size="content">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Stack maw={500} mx="auto" spacing="xl">
                    <PasswordInput
                        value={oldPass}
                        onChange={setOldPass}
                        placeholder="Old Password"
                        label="Old Password"
                        required
                    />
                    <Divider />

                    <PasswordInput
                        value={value}
                        onChange={setValue}
                        placeholder="Your password"
                        label="Password"
                        required
                    />

                    <Group spacing={5} grow mt="xs" mb="md">
                        {bars}
                    </Group>

                    <PasswordRequirement
                        label="Has at least 6 characters"
                        meets={value.length > 5}
                    />
                    {checks}


                    <PasswordInput
                        value={confirmValue}
                        onChange={setConfirmValue}
                        placeholder="Password"
                        label="Confirm Password"
                        required
                    />
                    <Button className="button-eval" variant="default" mt="xl" radius="xl" shadow="sm" onClick={handleClick}>
                        Change Password
                    </Button>
                </Stack>
            </Card>
        </Container>
    )
}