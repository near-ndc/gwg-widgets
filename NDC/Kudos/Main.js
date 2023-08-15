const { transactionHashes } = props;

const kudosContract = "kudos.ndctools.near";
const registryContract = "registry.i-am-human.near";

const widgets = {
  header: "kudos.ndctools.near/widget/NDC.Kudos.Header",
  filter: "election.ndctools.near/widget/NDC.Elections.Filter",
  navigation: "kudos.ndctools.near/widget/NDC.Kudos.Navigation",
  card: "kudos.ndctools.near/widget/NDC.Kudos.Card",
  addKudo: "kudos.ndctools.near/widget/NDC.Kudos.AddKudo",
  congratsMintModal: "kudos.ndctools.near/widget/NDC.Kudos.CongratsMintModal",
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
};

State.init({
  selectedItem: "Latest",
  searchAccId: "",
  emptyResult: false,
  isIAmHuman: false,
  kudos: [],
  isOpen: false,
  kind: "",
  congratsMintModal: false,
  init: true,
});

const getKudos = () => {
  let data = Social.getr(`${kudosContract}/kudos`);
  let formattedKudos = [];

  if (data && Object.entries(data).length > 0) {
    Object.entries(data).map(([receiverId, kudoObject], index) => {
      Object.entries(kudoObject).map(([id, kudo]) => {
        formattedKudos.push({
          id,
          created_at: kudo.created_at,
          icon: kudo.icon,
          kind: kudo.kind,
          message: kudo.message,
          sender_id: kudo.sender_id,
          receiver_id: receiverId,
          tags: kudo.tags,
          comments: kudo.comments ? Object.entries(kudo.comments) : [],
          upvotes: kudo.upvotes ? Object.keys(kudo.upvotes) : [],
        });
      });
    });
  }

  let filteredKudos = [];

  switch (state.selectedItem) {
    case "My":
      filteredKudos = formattedKudos.filter(
        (kudo) =>
          kudo.receiver_id === context.accountId ||
          kudo.sender_id === context.accountId
      );
      break;
    case "Trending":
      filteredKudos = formattedKudos.sort(
        (a, b) => b.upvotes.length - a.upvotes.length
      );
      break;
    case "Latest":
      filteredKudos = formattedKudos.sort(
        (a, b) => b.created_at - a.created_at
      );
      break;
  }

  if (state.searchAccId) {
    filteredKudos = filteredKudos.filter((kudo) =>
      kudo.receiver_id.includes(state.searchAccId)
    );
  }

  if (formattedKudos.length === 0)
    State.update({ kudos: [], emptyResult: false });
  else
    State.update({
      kudos: filteredKudos,
      emptyResult: filteredKudos.length === 0,
    });
};

const isHuman = Near.view(registryContract, "is_human", {
  account: context.accountId,
});
const sbts = Near.view(registryContract, "sbt_tokens", {
  issuer: kudosContract,
});

State.update({
  isKudoMinted: sbts && sbts.some((sbt) => sbt.owner === context.accountId),
  isIAmHuman: isHuman && isHuman[0][1].length > 0,
});

getKudos();

const checkTxnMethod = (res, name) => {
  const txn = res.body.result.transaction;

  return (
    res.body.result.status.SuccessValue &&
    txn.signer_id === context.accountId &&
    txn.actions[0].FunctionCall.method_name === name
  );
};

asyncFetch("https://rpc.testnet.near.org", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "dontcare",
    method: "tx",
    params: [transactionHashes, context.accountId],
  }),
}).then((res) => {
  if (checkTxnMethod(res, "exchange_kudos_for_sbt"))
    State.update({ congratsMintModal: true });

  console.log(res);
  // if (checkTxnMethod(res, "add_kudo"))
  //   State.update({ congratsMintModal: true });
});

const Container = styled.div`
  margin: 20px 0;
`;

const LeftSection = styled.div`
  padding: 20px;
  background: #f8f8f9;
  border-radius: 10px;

  @media (max-width: 768px) {
    background: #f8f8f9;
    padding: 16px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const CenterSection = styled.div`
  background: #fff;
  min-height: 100%;

  @media (max-width: 768px) {
    background: #f8f8f9;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
`;

const H5 = styled.h5`
  padding-bottom: 10px;

  &.thin {
    font-weight: 400;
  }
`;

const H4 = styled.h5`
  padding-bottom: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;
const H3 = styled.h5`
  padding: 20px 0px 0 10px;

  @media (max-width: 768px) {
    display: none;
  }
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
            handleFilter: (e) => State.update({ searchAccId: e.target.value }),
            candidateId: state.searchAccId,
            placeholder: "Search by account name",
          }}
        />
      </div>
      {state.isIAmHuman && (
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
      )}
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
        <H4>Home</H4>
        <Widget
          src={widgets.navigation}
          props={{
            selectedItem: state.selectedItem,
            handleSelect: (itemType) =>
              State.update({ selectedItem: itemType }),
          }}
        />
      </LeftSection>
      <CenterSection className="col-lg-9">
        <>
          <H3>{state.selectedItem} Kudos</H3>
          {state.emptyResult ? (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
              <div className="text-center d-flex flex-column gap-2">
                <i className="bi bi-search fs-1"></i>
                <H5 className="text-secondary thin">
                  There are no kudos <br />
                  matches searching request
                </H5>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-wrap">
              {state.kudos.length > 0 ? (
                state.kudos.map((kudo, index) => (
                  <div className="col col-lg-6 p-2">
                    <Widget
                      key={index}
                      src={widgets.card}
                      props={{
                        isIAmHuman: state.isIAmHuman,
                        isKudoMinted: state.isKudoMinted,
                        kudosContract,
                        kudo,
                      }}
                    />
                  </div>
                ))
              ) : (
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                  <div className="text-center d-flex flex-column gap-2">
                    <i className="bi bi-search fs-1"></i>
                    <H5 className="text-secondary thin">There are no kudos</H5>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      </CenterSection>
    </Container>

    {state.congratsMintModal && state.init && (
      <Widget
        src={widgets.congratsMintModal}
        props={{
          onHide: () => State.update({ congratsMintModal: false, init: false }),
        }}
      />
    )}
  </div>
);
