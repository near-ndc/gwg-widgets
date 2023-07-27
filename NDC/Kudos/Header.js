const { isIAmHuman, kudosContract } = props;

const widget = {
  styledComponents: "kudos-v1.gwg.testnet/widget/NDC.StyledComponents",
};

const Header = styled.div`
  background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);
`;

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
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

State.init({
  isOpen: false,
  receiverId: "",
  comment: "",
  tags: "",
});

const handleAddKudo = () => {
  Near.call(
    kudosContract,
    "give_kudos",
    {
      receiver_id: state.receiverId,
      text: state.comment,
      hashtags: state.tags.replace(/\s/g, "").split(","),
    },
    "70000000000000",
    88000000000000000000000
  ).then((data) => {
    console.log(data);
    State.update({ isOpen: false });
  });
};

const Content = () => (
  <ModalContent>
    <h4>Give a Kudo</h4>
    <div className="content">
      <Section>
        <Widget
          src={widget.styledComponents}
          props={{
            Input: {
              label: "NEAR account",
              value: state.receiverId,
              handleChange: (e) => State.update({ receiverId: e.target.value }),
            },
          }}
        />
      </Section>
      <Section>
        <Widget
          src={widget.styledComponents}
          props={{
            TextArea: {
              label: "Add a Kudo Description",
              value: state.comment,
              handleChange: (e) => State.update({ comment: e.target.value }),
            },
          }}
        />
      </Section>
      <Section>
        <Widget
          src={widget.styledComponents}
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
        src={widget.styledComponents}
        props={{
          Button: {
            text: "Cancel",
            className: "secondary dark",
            onClick: () => State.update({ isOpen: false }),
          },
        }}
      />
      <Widget
        src={widget.styledComponents}
        props={{
          Button: {
            text: "Submit",
            onClick: () => handleAddKudo(),
          },
        }}
      />
    </div>
  </ModalContent>
);

return (
  <>
    <Header className="d-flex p-3 px-4 align-items-center rounded justify-content-between">
      <Widget
        src="rubycoptest.testnet/widget/Image"
        props={{
          image: {
            url: "https://bafkreicrlj3lgygabo37j6gelyamwvm5qj4vtd3sid62dlbr7s6wi3qjhm.ipfs.nftstorage.link/",
          },
          alt: "kudos",
          style: {
            height: "30px",
            objectFit: "cover",
          },
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
        }}
      />
      {isIAmHuman ? (
        <Widget
          src={widget.styledComponents}
          props={{
            Button: {
              text: "Give a Kudo",
              image: {
                url: "https://bafkreieynbjyuycbo7naqp5dtiajcsmpiwyt7n2mk35746463nkcjte2yy.ipfs.nftstorage.link/",
              },
              onClick: () => State.update({ isOpen: true }),
            },
          }}
        />
      ) : (
        <Widget
          src={widget.styledComponents}
          props={{
            Link: {
              text: "Verify as Human",
              href: "https://i-am-human.app/",
            },
          }}
        />
      )}
    </Header>

    {state.isOpen && (
      <Modal isOpen={state.isOpen}>
        <ComponentWrapper>
          <Content />
        </ComponentWrapper>
      </Modal>
    )}
  </>
);
