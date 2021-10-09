import { myFireauth, myFirestore } from "../services/Firebase";
import { Flex } from "@chakra-ui/react";
import ChatBody from "./Subcomponents/ChatBody";
import Friends from "./Subcomponents/Friends";
import { useEffect, useState } from "react";
import ChatNav from "../layout/ChatNav";

const ChatScreen = () => {
  const [currentFriend, setCurrentFriend] = useState<any>({});

  async function getDoc(uid: any, photoURL: any, displayName: any, email: any) {
    const doc = await myFirestore.collection("users").doc(email).get();
    if (!doc.exists) {
      myFirestore.collection("users").doc(email).set({
        name: displayName,
        email: email,
        photoURL: photoURL,
        uid: uid,
      });
    } else {
      console.log("Already Exists");
    }
  }
  useEffect(() => {
    const { uid, photoURL, displayName, email }: any = myFireauth.currentUser;
    getDoc(uid, photoURL, displayName, email);
  }, []);

  return (
    <>
      <ChatNav />
      <Flex
        h={["76vh", "88vh"]}
        w="100vw"
        p="0.7rem"
        className="chat"
        justify="space-between"
      >
        <Friends onFriendClick={(data: any) => setCurrentFriend(data)} />
        <ChatBody selectedFriend={[currentFriend.name, currentFriend.email]} />
      </Flex>
    </>
  );
};

export default ChatScreen;
