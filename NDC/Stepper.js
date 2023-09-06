const Step = styled.li`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  text-align: center;

  &:before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1.5px solid;
    border-color: ${(props) => (props.completed ? "#5bc65f" : "#4BA6EE")};
    background-color: ${(props) => (props.completed ? "#5bc65f" : "#fff")};
    margin: 0 auto 10px;
  }

  &:not(:last-child) {
    &:after {
      content: "";
      position: relative;
      top: calc(20px / 2);
      width: calc(100% - 20px - calc(clamp(0.25rem, 2vw, 0.5rem) * 2));
      left: calc(50% + calc(20px / 2 + clamp(0.25rem, 2vw, 0.5rem)));
      height: 1.5px;
      background-color: #e0e0e0;
      order: -1;
    }
  }

  i {
    color: #fff;
    position: absolute;
    left: calc(50% - calc(16px / 2));
  }

  h6 {
    font-size: 12px;
  }
`;

return (
  <div className="d-flex">
    {props.steps.map((step) => (
      <Step completed={step.completed}>
        <small className={step.completed ? "fw-bolder" : "text-secondary"}>
          {step.title}
        </small>
        <h6 className="text-secondary">{step.description}</h6>
        {step.completed && <i className="bi bi-check" />}
      </Step>
    ))}
  </div>
);
