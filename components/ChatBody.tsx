import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { myFireauth, myFirestore } from "../services/Firebase";
import Bubbles from "./Bubbles";
import firebase from "firebase/app";
import "emoji-mart/css/emoji-mart.css";

interface ChatBodyProps {
  selectedFriend: any;
}

const ChatBody = (props: ChatBodyProps) => {
  const { register, handleSubmit, reset } = useForm();
  const [myMessages, setMyMessages] = useState<any>([]);
  const [theirMessages, setTheirMessages] = useState<any>([]);

  useEffect(() => {
    const { email }: any = myFireauth.currentUser;
    if (props.selectedFriend[1] !== undefined) {
      myFirestore
        .collection("messages")
        .orderBy("timeStamp")
        .limit(1000)
        .onSnapshot((snapShot) => {
          console.log(
            snapShot.docs
              .map((x) => x.data())
              .filter(
                (x) => x.from === email && x.to === props.selectedFriend[1]
              )
          );

          //To Me<=>From Them
          setTheirMessages(
            snapShot.docs
              .map((x) => x.data())
              .filter(
                (x) => x.to === email && x.from === props.selectedFriend[1]
              )
          );
          //To Them<=>From Me
          setMyMessages(
            snapShot.docs
              .map((x) => x.data())
              .filter(
                (x) => x.to === props.selectedFriend[1] && x.from === email
              )
          );
        });
    }
  }, [props.selectedFriend]);

  const onMessageSend = async (data: any) => {
    const { email }: any = myFireauth.currentUser;
    if (data.text.length) {
      const messageToSend = {
        from: `${email}`,
        to: `${props.selectedFriend[1]}`,
        text: data.text,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      reset([""], {
        keepValues: false,
      });
      await myFirestore.collection("messages").add(messageToSend);
    } else {
      alert("Enter a Valid Message");
    }
  };
  return (
    <>
      <div className="chat-area">
        {props.selectedFriend[0] == null ? (
          <div className="holder">
            <h1>Welcome, Lets Chat!</h1>
          </div>
        ) : (
          <>
            <div className="header">{props.selectedFriend[0]}</div>
            <div className="display">
              <Bubbles data={[...myMessages, ...theirMessages]} />
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
          </>
        )}
      </div>
    </>
  );
};

export default ChatBody;
