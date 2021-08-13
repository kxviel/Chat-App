import { useEffect, useRef, useState } from "react";
import { myFireauth } from "../services/Firebase";

interface BubbleProps {
  data: any;
}

const Bubbles = (props: BubbleProps) => {
  const { email }: any = myFireauth.currentUser;
  const [sorted, setSorted] = useState<any>([]);

  useEffect(() => {
    props.data.sort(
      (a: { timeStamp: number }, b: { timeStamp: number }) =>
        b.timeStamp - a.timeStamp
    );
    setSorted(props.data);
  }, [props.data]);

  return (
    <>
      {sorted.map((x: any, i: any) => (
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
