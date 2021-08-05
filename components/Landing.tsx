interface LandingProps {
  signIn: any;
}

const Landing = (props: LandingProps) => {
  return (
    <>
      <div className="auth-root">
        <div className="header">
          <p className="my-brand">
            <span>お</span>
            <span>喋</span>
            <span>り</span>
          </p>
          <button className="login" onClick={props.signIn}>
            Lets Chat
          </button>
        </div>
      </div>
    </>
  );
};

export default Landing;
