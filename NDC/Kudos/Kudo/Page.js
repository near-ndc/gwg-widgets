const { kudoId, accountId } = props;

const kudosContract = "kudos-v1.gwg.testnet";
const registryContract = "registry-unstable.i-am-human.testnet";

const widgets = {
  header: "kudos-v1.gwg.testnet/widget/NDC.Kudos.Header",
  navigation: "kudos-v1.gwg.testnet/widget/NDC.Kudos.Navigation",
  card: "kudos-v1.gwg.testnet/widget/NDC.Kudos.Card",
  commentCard: "kudos-v1.gwg.testnet/widget/NDC.Kudos.CommentCard",
  styledComponents: "kudos-v1.gwg.testnet/widget/NDC.StyledComponents",
  back: "#/kudos-v1.gwg.testnet/widget/NDC.Kudos.Main",
};

State.init({
  selectedItem: "My",
  kudo: null,
  isIAmHuman: false,
  isOpen: false,
});

let kudo = Social.getr(`${kudosContract}/kudos/${accountId}/${kudoId}`);
console.log(kudo);
kudo = {
  created_at: kudo.created_at,
  icon: kudo.icon,
  kind: kudo.kind,
  message: kudo.message,
  sender_id: kudo.sender_id,
  receiver_id: accountId,
  tags: kudo.tags,
  id: kudoId,
  comments: kudo.comments ? Object.entries(kudo.comments) : {},
  upvotes: kudo.upvotes ? Object.keys(kudo.upvotes).length : 0,
};

const handleSelect = (itemType) => {
  let _kudos;
  if (itemType === "My")
    _kudos = kudos.filter((kudo) => kudo.receiver_id === context.accountId);
  if (itemType === "Trending")
    _kudos = kudos.sort((a, b) => b.upvotes - a.upvotes);

  State.update({ selectedItem: itemType, kudos: _kudos });
};

const isHuman = Near.view(registryContract, "is_human", {
  account: context.accountId,
});

State.update({ isIAmHuman: isHuman[0][1].length > 0 });

const BackLink = styled.a`
  color: black;

  &:hover {
    text-decoration: none;
    color: black;
  }
`;

const Container = styled.div`
  margin: 20px 0;
`;

const LeftSection = styled.div`
  padding: 20px;
  background: #f8f8f9;
  border-radius: 10px;
`;

const CenterSection = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;

  @media (max-width: 768px) {
    margin: 20px 0;
    background: #f8f8f9;
  }
`;

const H5 = styled.h5`
  margin-bottom: 20px;
`;

const FilterButtonContainer = styled.div`
  width: 340px;

  @media only screen and (max-width: 1061px) {
    width: 100%;
  }
`;

const Filter = styled.div`
  margin-top: 20px;
  padding: 16px;
  background: #f8f8f9;
  border-radius: 8px;

  @media only screen and (max-width: 1061px) {
    flex-direction: column;
  }
`;

const ComponentWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const base64decode = (encodedValue) => {
  let buff = Buffer.from(encodedValue, "base64");
  return JSON.parse(buff.toString("utf-8"));
};

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

return (
  <div>
    <Widget src={widgets.header} props={{ isIAmHuman: state.isIAmHuman }} />
    <Filter className="d-flex justify-content-between gap-2">
      <Widget
        src={widgets.styledComponents}
        props={{
          Link: {
            text: "Go Back",
            className: "secondary dark flex-row-reverse",
            icon: <i className="bi bi-arrow-90deg-up" />,
            href: widgets.back,
          },
        }}
      />
      <FilterButtonContainer className="d-flex gap-2">
        <Widget
          src={widgets.styledComponents}
          disabled={!state.isIAmHuman}
          props={{
            Button: {
              text: "Give a Kudo",
              className: "primary justify-content-center w-100",
              image: {
                url: "https://bafkreieynbjyuycbo7naqp5dtiajcsmpiwyt7n2mk35746463nkcjte2yy.ipfs.nftstorage.link/",
              },
              onClick: () => State.update({ isOpen: true, kind: "k" }),
            },
          }}
        />
        <Widget
          src={widgets.styledComponents}
          disabled={!state.isIAmHuman}
          props={{
            Button: {
              text: "Give a Ding",
              className: "justify-content-center w-100 primary danger",
              image: {
                url: "https://bafkreigkzvete56d25gwabrb3msxegxley4t6csppqdik4mh45amimjubq.ipfs.nftstorage.link/",
              },
              onClick: () => State.update({ isOpen: true, kind: "d" }),
            },
          }}
        />
      </FilterButtonContainer>

      {state.isOpen && (
        <Widget
          src={widgets.addKudo}
          props={{
            onHide: () => State.update({ isOpen: false }),
          }}
        />
      )}
    </Filter>
    <Container className="d-flex row">
      <LeftSection className="col-lg-3">
        <H5>Home</H5>
        <Widget
          src={widgets.navigation}
          props={{
            selectedItem: state.selectedItem,
            handleSelect,
          }}
        />
      </LeftSection>
      <CenterSection className="col-lg-9">
        <div className="d-flex flex-wrap">
          <div className="col p-3">
            <h4 className="pb-3">Kudo</h4>
            <Widget
              src={widgets.card}
              props={{
                isIAmHuman: state.isIAmHuman,
                kudosContract,
                kudo,
                hideFooter: true,
              }}
            />
          </div>
          <div className="col p-3">
            <h4 className="pb-3">Comments</h4>
            {kudo.comments.map(([id, comment]) => (
              <Widget
                src={widgets.commentCard}
                props={{
                  isIAmHuman: state.isIAmHuman,
                  kudosContract,
                  kudo: {
                    id,
                    receiver_id: accountId,
                  },
                  comment: {
                    owner_id: base64decode(comment).s,
                    created_at: base64decode(comment).t,
                    message: base64decode(comment).m,
                  },
                }}
              />
            ))}
          </div>
        </div>
      </CenterSection>
    </Container>
  </div>
);
