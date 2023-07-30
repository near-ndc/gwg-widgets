const { onHide, kind } = props;

const kudosContract = "kudos-v1.gwg.testnet";
const widgets = {
  styledComponents: "kudos-v1.gwg.testnet/widget/NDC.StyledComponents",
};

State.init({
  receiverId: "",
  message: "",
  imageCid: null,
  tags: "",
});

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
  margin: 20% auto;
  padding: 20px;
  border-radius: 10px;
  width: 50%;

  @media (max-width: 768px) {
    width: 90%;
  }

  .content {
    margin: 18px 0;

    h6 {
      margin-bottom: -10px;
    }
  }
`;

const InputField = styled.div`
  margin: 20px 0;
`;

const Section = styled.div`
  margin: 12px 0;
`;

const handleAddKudo = () => {
  Near.call(
    kudosContract,
    "give_kudos",
    {
      receiver_id: state.receiverId,
      message: state.message,
      icon_cid: state.imageCid,
      kind,
      hashtags: state.tags.replace(/\s/g, "").split(","),
    },
    "70000000000000",
    100000000000000000000000
  ).then((data) => onHide());
};

return (
  <Modal>
    <ComponentWrapper>
      <ModalContent>
        <h4>Give a {kind === "k" ? "Kudo" : "Ding"}</h4>
        <div className="content">
          <Section>
            <Widget
              src={widgets.styledComponents}
              props={{
                Input: {
                  label: "NEAR account",
                  value: state.receiverId,
                  handleChange: (e) =>
                    State.update({ receiverId: e.target.value }),
                },
              }}
            />
          </Section>
          <Section>
            <Widget
              src={widgets.styledComponents}
              props={{
                TextArea: {
                  label: "Add a Kudo Description",
                  value: state.message,
                  handleChange: (e) =>
                    State.update({ message: e.target.value }),
                },
              }}
            />
          </Section>
          <Section>
            <Widget
              src={widgets.styledComponents}
              props={{
                Input: {
                  label: "Add Image CID",
                  placeholder: "Enter image CID",
                  value: state.imageCid,
                  handleChange: (e) =>
                    State.update({ imageCid: e.target.value }),
                },
              }}
            />
          </Section>
          <Section>
            <Widget
              src={widgets.styledComponents}
              props={{
                Input: {
                  label: "Tags",
                  placeholder: "Enter tags using comma separator",
                  value: state.tags,
                  handleChange: (e) => State.update({ tags: e.target.value }),
                },
              }}
            />
          </Section>
        </div>
        <div className="d-grid gap-3 d-flex align-items-center justify-content-end">
          <Widget
            src={widgets.styledComponents}
            props={{
              Button: {
                text: "Cancel",
                className: "secondary dark",
                onClick: onHide,
              },
            }}
          />
          <Widget
            src={widgets.styledComponents}
            props={{
              Button: {
                text: "Submit",
                onClick: handleAddKudo,
              },
            }}
          />
        </div>
      </ModalContent>
    </ComponentWrapper>
  </Modal>
);
