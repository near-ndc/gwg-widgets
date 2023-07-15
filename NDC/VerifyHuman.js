const { title } = props;

const Container = styled.div`
  background: #fdfeff;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;
  h3,
  h4 {
    margin: 0 3px;
  }
  h3 {
    font-weight: 900;
  }
  .text-secondary {
    margin: 0 10px;
  }
  &.not-verified {
    h4 {
      font-size: 16px;
      margin: 0 0 5px 0;
      font-weight: 600;
    }
    h5 {
      margin: 0;
      font-size: 12px;
    }
  }
`;
const PrimaryLink = styled.a`
  width: max-content;
  padding: 8px 20px;
  font-size: 14px;
  border-radius: 10px;
  font-weight: 500;
  line-height: 24px;
  border: 0;
  background: #ffd50d;
  color: black;
  &:hover {
    background: #e7c211;
    text-decoration: none;
    color: inherit;
  }
`;
const VerifyHuman = () => (
  <Container className="not-verified d-flex align-items-center justify-content-between">
    <div>
      <h4>{title}</h4>
      <h5 className="text-secondary">Click on Verify as a Human to proceed.</h5>
    </div>
    <PrimaryLink href="https://i-am-human.app/">Verify as Human</PrimaryLink>
  </Container>
);
return <VerifyHuman />;
