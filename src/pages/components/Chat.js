import { useEffect, useRef, useState } from 'react';
import Talk from 'talkjs';
import { LoadingOverlay } from '@mantine/core';

export default function Chat({patientId, doctorId, patientName, docName}) {

   
    const chatboxEl = useRef(null);
    const [talkLoaded, markTalkLoaded] = useState(false);


    useEffect(() => {
      Talk.ready.then(() => {
        // rest of the code goes here
        markTalkLoaded(true);

        if (talkLoaded) {
            
            const currentUser = new Talk.User({
                id: doctorId,
                name: docName,
                role: 'doctor',
            });
            
            const otherUser = new Talk.User({
                id: patientId,
                name: patientName,
                role: 'patient',
            });

            const session = new Talk.Session({
                appId: 'tPMMa6GJ',
                me: currentUser,
            });

            const conversation = session.getOrCreateConversation(
                Talk.oneOnOneId(currentUser, otherUser)
            );
            
            conversation.setParticipant(currentUser);
            conversation.setParticipant(otherUser);

            const chatbox = session.createChatbox();
            chatbox.select(conversation);
            chatbox.mount(chatboxEl.current);
        }
      });
    }, [talkLoaded]);

    return (
          <div style={{height: '500px'}}  ref={chatboxEl} />
      )

  }
  



