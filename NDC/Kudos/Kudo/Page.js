const { kudoId, accountId } = props;

const kudosContract = "kudos.ndctools.near";
const registryContract = "registry.i-am-human.near";

const widgets = {
  header: "kudos.ndctools.near/widget/NDC.Kudos.Header",
  navigation: "kudos.ndctools.near/widget/NDC.Kudos.Navigation",
  card: "kudos.ndctools.near/widget/NDC.Kudos.Card",
  commentCard: "kudos.ndctools.near/widget/NDC.Kudos.CommentCard",
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
  addKudo: "kudos.ndctools.near/widget/NDC.Kudos.AddKudo",
  back: "https://near.org/kudos.ndctools.near/widget/NDC.Kudos.Main",
};

State.init({
  isIAmHuman: false,
  isOpen: false,
  kind: "",
  loading: false,
  kudo: null,
});

const isHuman = Near.view(registryContract, "is_human", {
  account: context.accountId,
});

let kudo = Social.getr(`${kudosContract}/kudos/${accountId}/${kudoId}`);

kudo = {
  created_at: kudo.created_at,
  icon: kudo.icon || null,
  kind: kudo.kind,
  message: kudo.message,
  sender_id: kudo.sender_id,
  receiver_id: accountId,
  tags: kudo.tags,
  id: kudoId,
  comments: kudo.comments ? Object.entries(kudo.comments) : [],
  upvotes: kudo.upvotes ? Object.keys(kudo.upvotes) : [],
};

State.update({ isIAmHuman: isHuman[0][1].length > 0, kudo });

const BackLink = styled.a`
  color: black;
  font-weight: 600;

  &:hover {
    text-decoration: none;
    color: black;
  }
`;

const Container = styled.div`
  margin: 20px 0;
`;

const CenterSection = styled.div`
  padding: 0;
  @media (max-width: 768px) {
    margin: 20px 0;
  }
`;

const Section = styled.div`
  padding: 20px;
  background: #f8f8f9;
  border-radius: 10px;
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

const KudoTitle = styled.h5`
  padding-bottom: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CommentTitle = styled.h5`
  padding-bottom: 10px;
`;

const base64decode = (encodedValue) => {
  let buff = Buffer.from(encodedValue, "base64");
  return JSON.parse(buff.toString("utf-8"));
};

const Loader = () => (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

return (
  <div>
    <Widget src={widgets.header} props={{ isIAmHuman: state.isIAmHuman }} />
    {state.isIAmHuman && (
      <Filter className="d-flex justify-content-end gap-2">
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
              kind: state.kind,
            }}
          />
        )}
      </Filter>
    )}
    <Container className="d-flex row">
      <CenterSection className="w-100">
        <BackLink href={widgets.back}>
          <i className="bi bi-chevron-left mr-2" />
          <span>Back</span>
        </BackLink>
        <div className="d-flex flex-wrap mt-4 gap-2">
          <Section className="col p-3">
            <KudoTitle>Kudo</KudoTitle>
            {state.kudo ? (
              <Widget
                src={widgets.card}
                props={{
                  isIAmHuman: state.isIAmHuman,
                  kudosContract,
                  kudo: state.kudo,
                  hideMintBtn: true,
                  inverseColor: true,
                }}
              />
            ) : (
              <Loader />
            )}
          </Section>
          <Section className="col p-3">
            <CommentTitle>Comments ({kudo.comments.length})</CommentTitle>
            <div className="d-flex flex-column gap-3">
              {kudo.comments.map(([id, comment]) => (
                <Widget
                  src={widgets.commentCard}
                  props={{
                    isIAmHuman: state.isIAmHuman,
                    kudosContract,
                    kudo: {
                      id: kudoId,
                      receiver_id: accountId,
                    },
                    comment: {
                      id,
                      parent_comment: kudo.comments.find(
                        ([id, _comment]) => id === base64decode(comment).p
                      )[1],
                      owner_id: base64decode(comment).s,
                      created_at: base64decode(comment).t,
                      message: base64decode(comment).m,
                    },
                  }}
                />
              ))}
            </div>
          </Section>
        </div>
      </CenterSection>
    </Container>
  </div>
);
