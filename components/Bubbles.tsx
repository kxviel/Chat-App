interface BubbleProps {
  data: any;
}

const Bubbles = (props: BubbleProps) => {
  return (
    <>
      {props.data.map((x: any, i: any) => (
        <div key={i} className="message">
          {x.text}
        </div>
      ))}
    </>
  );
};

export default Bubbles;
