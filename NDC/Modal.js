const { title, description, content, Button } = props;

const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
};

const Modal = styled.div`
  position: fixed;
  display: flex;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
`;

const ComponentWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalContent = styled.div`
  background: #f8f8f9;
  margin: 100px auto;
  padding: 20px;
  border-radius: 10px;
  width: 30%;

  @media (max-width: 1200px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }

  h3 {
    margin-bottom: 20px;
    font-weight: 700;
  }

  h6 {
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
  }
`;

return (
  <Modal>
    <ComponentWrapper>
      <ModalContent>
        <div className="w-100 d-flex justify-content-end">
          <div className="pb-3" onClick={Button.onCancel}>
            <i class="bi bi-x-lg"></i>
          </div>
        </div>
        <h3 className="text-center">{title}</h3>
        <h6 className="text-secondary text-center px-2">{description}</h6>
        {content}
        <div className="d-flex justify-content-center gap-2 w-100">
          <Widget
            src={widgets.styledComponents}
            props={{
              Button: {
                className: "secondary dark",
                text: "Cancel",
                onClick: Button.onCancel,
              },
            }}
          />
          <Widget
            src={widgets.styledComponents}
            props={{
              Button: {
                disabled: Button.disabled,
                text: Button.title,
                onClick: Button.onSubmit,
              },
            }}
          />
        </div>
      </ModalContent>
    </ComponentWrapper>
  </Modal>
);
