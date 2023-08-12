const { onHide, kind } = props;

const kudosContract = "kudos.ndctools.near";
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
      icon_cid: state.img.cid,
      kind,
      hashtags: state.tags.replace(/\s/g, "").split(","),
    },
    "70000000000000",
    100000000000000000000000
  ).then((data) => onHide());
};

State.init({
  receiverId: "",
  message: "",
  img: null,
  tags: "",
});

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
              src={"rubycop.near/widget/Common.Compose"}
              props={{
                placeholder: "Left a comment",
                handleChange: (text) => {
                  if (text.length > 1000) return;
                  State.update({ message: text });
                },
              }}
            />
          </Section>
          <Section>
            <div className="h-25">
              <IpfsImageUpload image={state.img} />
            </div>
          </Section>
          <Section>
            <Widget
              src={"sayalot.near/widget/TagsEditor"}
              props={{
                label: "Tags",
                placeholder: "Enter tags",
                setTagsObject: (tags) => {
                  if (state.tags.length > 0)
                    State.update({ tags: Object.keys(tags) });
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
