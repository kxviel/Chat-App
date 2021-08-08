import { useEffect, useState } from "react";
import { myFireauth, myFirestore } from "../services/Firebase";
import Image from "next/image";

interface FriendProps {
  onFriendClick: any;
}

const Friends = (props: FriendProps) => {
  const [list, setList] = useState<any>([]);
  useEffect(() => {
    const { uid, photoURL, displayName, email }: any = myFireauth.currentUser;
    myFirestore.collection("users").onSnapshot((snapShot) => {
      setList(
        snapShot.docs.map((x) => x.data()).filter((y) => y.email != email)
      );
    });
  }, []);
  return (
    <div className="chats">
      {list.map((x: any, i: any) => (
        <div onClick={() => props.onFriendClick(x)} className="chat" key={i}>
          <Image height="35" width="35" src={x.photoURL} alt="dp" />
          {x.name}
        </div>
      ))}
    </div>
  );
};

export default Friends;
