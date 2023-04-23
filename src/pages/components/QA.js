import { Text,
        Checkbox,
        Group,
        Divider,
       } from "@mantine/core";


export default function QA({qa}){

    return (
        <>
        <Text size="xl">Q: {qa.question}</Text>
        {Object.entries(qa.options).map(([key, option]) => (
            <Checkbox key={key} checked={qa.choice == key} disabled label={option} size={qa.choice == key ? "xl" : "lg"}/>
        ))}
        <Divider my="sm" variant="dotted"/>
        
        </>
    );
}

QA.getInitialProps = async () => {
    return {};
  };