interface BubbleProps {
  data: any;
}

const Bubbles = (props: BubbleProps) => {
  return (
    <>
      {props.data.map(({ id, text, photoURL }: any, i: any) => (
        <div key={i} className="message">
          {text}
        </div>
      ))}
    </>
  );
};

export default Bubbles;
