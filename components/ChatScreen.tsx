import { useState } from "react";
import ChatBody from "./ChatBody";
import Friends from "./Friends";

const ChatScreen = () => {
  const [currentFriend, setCurrentFriend] = useState(
    "Welcome to C Y N E F I N"
  );
  return (
    <>
      <div className="home">
        <div className="appbar">Cynefin</div>
        <div className="main">
          <Friends
            onFriendClick={(data: any) => setCurrentFriend(data)}
            list={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          />
          <ChatBody selectedFriend={currentFriend} />
        </div>
      </div>
    </>
  );
};

export default ChatScreen;
