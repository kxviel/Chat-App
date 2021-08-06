import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { myFireauth, myFirestore } from "../services/Firebase";
import Bubbles from "./Bubbles";
import firebase from "firebase";

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
    const { uid, photoURL }: any = myFireauth.currentUser;

    if (data.text.length) {
      const messageToSend = {
        from: uid,
        text: data.text,
        timeStamp: await firebase.firestore.FieldValue.serverTimestamp(),
      };
      await myFirestore.collection("messages").add(messageToSend);
    } else {
      alert("Enter a Valid Message Bitch");
    }
  };
  return (
    <>
      <div className="chat-area">
        <div className="header">
          {props.selectedFriend ?? "Welcome to C Y N E F I N"}
        </div>
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
