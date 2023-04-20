import { Text,
        Checkbox,
        Group,
        Divider,
       } from "@mantine/core";


export default function QA({qa}){

    return (
        <>
        <Text>Q: {qa.question}</Text>
        {Object.entries(qa.options).map(([key, option]) => (
            <Checkbox key={key} checked={qa.choice == key} disabled label={option} size={qa.choice == key ? "md" : "sm"}/>
        ))}
        <Divider my="sm" variant="dotted"/>
        
        </>
    );
}