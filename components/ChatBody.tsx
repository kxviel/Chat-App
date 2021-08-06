import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { myFirestore } from "../services/Firebase";
import Bubbles from "./Bubbles";

interface ChatBodyProps {
  selectedFriend: any;
}

const ChatBody = (props: ChatBodyProps) => {
  const { register, handleSubmit } = useForm();
  const [myMessages, setMessages] = useState<any>([]);
  useEffect(() => {
    myFirestore
      .collection("messages")
      .orderBy("timeStamp")
      .limit(50)
      .onSnapshot((snapShot) => {
        setMessages(snapShot.docs.map((x) => x.data()));
      });
  }, []);
  const onMessageSend = async (data: any) => {
    if (data.text.length) {
      const messageToSend = {
        // uniqueRoomId: props.commonId,
        // from: props.auth.responseData.userEmail,
        // to: props.data.clickedUserEmail,
        text: data.text,
        timeStamp: new Date().toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((myMessages: any) => [...myMessages, messageToSend]);
    } else {
      alert("Enter a Valid Message Bitch");
    }
  };
  return (
    <>
      <div className="chat-area">
        <div className="header">{props.selectedFriend}</div>
        <div className="display">
          <Bubbles data={myMessages} />
        </div>
        <div className="textarea">
          <form onSubmit={handleSubmit(onMessageSend)}>
            <input
              {...register("text", { required: true })}
              className="text-area"
              placeholder="Start Texting..."
            />
            <button className="send-btn" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
