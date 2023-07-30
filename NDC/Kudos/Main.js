const kudosContract = "kudos-v1.gwg.testnet";
const registryContract = "registry-unstable.i-am-human.testnet";

const widgets = {
  header: "kudos-v1.gwg.testnet/widget/NDC.Kudos.Header",
  filter: "kudos-v1.gwg.testnet/widget/NDC.Kudos.Filter",
  navigation: "kudos-v1.gwg.testnet/widget/NDC.Kudos.Navigation",
  card: "kudos-v1.gwg.testnet/widget/NDC.Kudos.Card",
  addKudo: "kudos-v1.gwg.testnet/widget/NDC.Kudos.AddKudo",
  styledComponents: "kudos-v1.gwg.testnet/widget/NDC.StyledComponents",
};

State.init({
  selectedItem: "My",
  isIAmHuman: false,
  kudos: [],
  isOpen: false,
  kind: "",
});

let data = Social.getr(`${kudosContract}/kudos`);
const hashtags = Social.getr(`${kudosContract}/hashtags`);
const formattedKudos = [];

if (data) {
  Object.entries(data).map(([receiverId, kudoId], index) => {
    const kudo = Object.values(kudoId)[0];
    console.log(kudo);

    formattedKudos.push({
      created_at: kudo.created_at,
      icon: kudo.icon,
      kind: kudo.kind,
      message: kudo.message,
      sender_id: kudo.sender_id,
      receiver_id: receiverId,
      tags: kudo.tags,
      id: Object.keys(kudoId)[0],
      comments: kudo.comments ? Object.entries(kudo.comments) : {},
      upvotes: kudo.upvotes ? Object.keys(kudo.upvotes).length : 0,
    });
  });
}

State.update({ kudos: formattedKudos });

const handleSelect = (itemType) => {
  let _kudos;
  if (itemType === "My")
    _kudos = state.kudos.filter(
      (kudo) => kudo.receiver_id === context.accountId
    );
  if (itemType === "Trending")
    _kudos = state.kudos.sort((a, b) => b.upvotes - a.upvotes);

  State.update({ selectedItem: itemType, kudos: _kudos });
};

const isHuman = Near.view(registryContract, "is_human", {
  account: context.accountId,
});

console.log(isHuman);

State.update({ isIAmHuman: isHuman[0][1].length > 0 });

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
  padding: 16px;
  width: 340px;
  border-radius: 8px;
  background: #f8f8f9;

  @media only screen and (max-width: 1061px) {
    width: 100%;
  }
`;

const Filter = styled.div`
  margin-top: 20px;

  @media only screen and (max-width: 1061px) {
    flex-direction: column;
  }
`;

const Toolbar = styled.div`
  margin-left: 20px;
  @media only screen and (max-width: 1061px) {
    margin: 10px 0 0 0;
  }
`;

return (
  <div>
    <Widget src={widgets.header} props={{ isIAmHuman: state.isIAmHuman }} />
    <Filter className="d-flex">
      <div className="w-100">
        <Widget
          src={widgets.filter}
          props={{
            handleFilter,
            candidateId: state.candidateId,
            placeholder: "Search by account name",
          }}
        />
      </div>
      <Toolbar>
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
      </Toolbar>
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
        <>
          <h4>{state.selectedItem} Kudos</h4>
          <div className="d-flex flex-wrap">
            {state.kudos.map((kudo, index) => (
              <div className="col col-lg-6 p-2">
                <Widget
                  key={index}
                  src={widgets.card}
                  props={{
                    isIAmHuman: state.isIAmHuman,
                    kudosContract,
                    kudo,
                  }}
                />
              </div>
            ))}
          </div>
        </>
      </CenterSection>
    </Container>
  </div>
);
