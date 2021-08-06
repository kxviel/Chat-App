interface FriendProps {
  list: any;
  onFriendClick: any;
}

const Friends = (props: FriendProps) => {
  return (
    <div className="chats">
      {props.list.map((x: any, i: any) => (
        <div onClick={() => props.onFriendClick(x)} className="chat" key={i}>
          {x}
        </div>
      ))}
    </div>
  );
};

export default Friends;
