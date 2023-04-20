import {
    Table,
    Group,
    Text,
    ScrollArea,
    Button,
    Modal,
    Stack,
    Title,
    Divider,
    Blockquote,

  } from "@mantine/core"

import {
  IconSquareCheck,
  IconSquare,
  IconClipboardList,
} from "@tabler/icons-react"

import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { getQuestionsByActId } from "../services/item";
import { getAnswerByQuestionId } from "../services/patient";
import QA from "./QA";
 
export function AssignmentsTable({ data, patientId }) {

  const [currActId, setCurrActId] = useState();
  const [currActivity, setCurrentActivity] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [qa, setQA] = useState();

  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);

  let actId_to_QA = {};

  useEffect(() => {
      async function fetchData(){
        const ids = data.map(item => item.item.itemId);
        
        for(let id of ids){
          const questionSet = await getQuestionsByActId(id);

          for(let question of questionSet){
            const answer = await getAnswerByQuestionId(patientId, question.questionId);
            question['choice'] = answer['choice'];
          }
          actId_to_QA[id] = questionSet;
        }
        console.log(actId_to_QA);
        setIsLoading(false);
        setQA(actId_to_QA);

      }

      fetchData();
      
  }, [])

 

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
      <td>
        <Button className="button-eval" 
        onClick={() => 
        {setCurrActId(item.item.itemId); setCurrentActivity(item.item.activity.name); setSlowTransitionOpened(true)}}>
          Responses
        </Button>
        
      </td>
    </tr>
  ))

  if(isLoading){
    return <h1>Loading....</h1>
  }

  return (
    <>
    <Modal 
    opened={slowTransitionOpened}
    onClose={() => setSlowTransitionOpened(false)}
    transitionProps={{ transition: 'rotate-left' }}
    centered size="lg"
    title="  "
    scrollAreaComponent={ScrollArea.Autosize}
    overlayProps={{
      opacity: 0.55,
      blur: 4,
    }}
    >
        <Title order={2}>{currActivity}</Title>
        <Divider my="sm"/>
          <ScrollArea>
            <Stack>
              {currActId > 0 && qa !== undefined && qa[currActId].length > 0 ? (
                qa[currActId].map(qa => (
                  <QA qa={qa}/>
                ))
              ) :
              <Blockquote color="indigo" cite="– Patient">
                Activity Incomplete
              </Blockquote>}
            </Stack>
          </ScrollArea>
        </Modal>
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Assignment ID</th>
            <th>Activity Name</th>
            <th>Level</th>
            <th>Status</th>
            <th>Evaluate Responses</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
    </>
  )
}