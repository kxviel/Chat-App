import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { myFireauth, myFirestore } from "../services/Firebase";
import Bubbles from "./Bubbles";
import firebase from "firebase";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Image from "next/image";

interface ChatBodyProps {
  selectedFriend: any;
}

const ChatBody = (props: ChatBodyProps) => {
  const { register, handleSubmit } = useForm();
  const [myMessages, setMessages] = useState<any>([]);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (data: any) => {
    setChosenEmoji(data.native);
  };

  useEffect(() => {
    const { uid, photoURL, email, displayName }: any = myFireauth.currentUser;
    myFirestore
      .collection("messages")
      .orderBy("timeStamp")
      .limit(50)
      .onSnapshot((snapShot) => {
        console.log(snapShot.docs.map((x) => x.data()));
        setMessages(snapShot.docs.map((x) => x.data()));
      });
  }, [props.selectedFriend]);
  const onMessageSend = async (data: any) => {
    const { uid, photoURL, email, displayName }: any =
      await myFireauth.currentUser;
    if (data.text.length) {
      const messageToSend = {
        from: `${email}`,
        to: `${props.selectedFriend[1]}`,
        text: data.text,
        timeStamp: await firebase.firestore.FieldValue.serverTimestamp(),
      };
      await myFirestore.collection("messages").add(messageToSend);
    } else {
      alert("Enter a Valid Message");
    }
  };
  return (
    <>
      <div className="chat-area">
        <div className="header">
          {props.selectedFriend[0] ?? "Welcome to C Y N E F I N"}
        </div>
        <div className="display">
          {props.selectedFriend[0] == null ? (
            <>
              <Image height="49" width="49" alt="" src="/vercel.svg" />
            </>
          ) : (
            <Bubbles data={myMessages} />
          )}
        </div>
        <form className="textarea" onSubmit={handleSubmit(onMessageSend)}>
          <div className="textarea">
            <input
              {...register("text", { required: true })}
              className="text-area"
              placeholder="Start Texting..."
            />
            {/* <Picker set="apple" theme="dark" onSelect={onEmojiClick} /> */}
            <button className="send-btn" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatBody;
