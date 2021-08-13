import { myFireauth } from "../services/Firebase";

interface BubbleProps {
  data: any;
}

const Bubbles = (props: BubbleProps) => {
  const { uid, photoURL, email, displayName }: any = myFireauth.currentUser;
  console.log(props.data);

  return (
    <>
      {props.data.map((x: any, i: any) => (
        <div
          key={i}
          className={x.from === email ? "message-from" : "message-to"}
        >
          {x.text}
        </div>
      ))}
    </>
  );
};

export default Bubbles;
