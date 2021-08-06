import { useEffect, useState } from "react";
import { myFireauth } from "../services/Firebase";

interface FriendProps {
  onFriendClick: any;
}

const Friends = (props: FriendProps) => {
  const [list, setList] = useState<any>([]);
  useEffect(() => {
    const { uid, photoURL, displayName, email }: any = myFireauth.currentUser;
    setList((list: any) => [...list, { uid, photoURL, displayName, email }]);
  }, []);
  return (
    <div className="chats">
      {list.map((x: any, i: any) => (
        <div onClick={() => props.onFriendClick(x)} className="chat" key={i}>
          {x.displayName}
        </div>
      ))}
    </div>
  );
};

export default Friends;
