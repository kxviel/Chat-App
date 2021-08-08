import { useEffect, useState } from "react";
import { myFireauth, myFirestore } from "../services/Firebase";
import ChatBody from "./ChatBody";
import Friends from "./Friends";

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
      <div className="home">
        <div className="appbar">
          <p>Cynefin</p>
          <button className="logout" onClick={() => myFireauth.signOut()}>
            Logout
          </button>
        </div>
        <div className="main">
          <Friends onFriendClick={(data: any) => setCurrentFriend(data)} />
          <ChatBody
            selectedFriend={[currentFriend.name, currentFriend.email]}
          />
        </div>
      </div>
    </>
  );
};

export default ChatScreen;
