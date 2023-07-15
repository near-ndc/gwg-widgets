const kudosContract = "dev-1688676408230-76568802486659";
const registryContract = "registry-unstable.i-am-human.testnet";

const widgets = {
  header: "rubycoptest.testnet/widget/Kudos.Header",
  filter: "rubycoptest.testnet/widget/Kudos.Filter",
  navigation: "rubycoptest.testnet/widget/Kudos.Navigation",
  item: "rubycoptest.testnet/widget/Kudos.Kudo.Item",
  mintSBT: "rubycoptest.testnet/widget/Kudos.MintSBT",
};

State.init({
  selectedItem: "My",
  selectedKudo: null,
  isIAmHuman: false,
  kudos: [],
});

const data = Social.getr(`${kudosContract}/kudos`);
const hashtags = Social.getr(`${kudosContract}/hashtags`);
console.log(data);

const formattedKudos = [];

asyncFetch("https://rpc.testnet.near.org", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "dontcare",
    method: "query",
    params: {
      request_type: "view_account",
      finality: "final",
      account_id: context.accountId,
    },
  }),
}).then((data) =>
  asyncFetch("https://rpc.testnet.near.org", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "tx",
      params: [data.body.result.block_hash, context.accountId],
    }),
  }).then((data) => console.log(data.body))
);

if (data)
  Object.entries(data).map(([receiverId, id]) => {
    const kudo = Object.values(id)[0];

    formattedKudos.push({
      id: Object.keys(id)[0],
      accountId: receiverId,
      requesterId: kudo.sender_id,
      upvotes: kudo.upvotes ?? 0,
      description: kudo.text,
      tags: [],
      createdAt: kudo.created_at,
      comments: Object.entries(kudo.comments ?? {}),
    });
  });

console.log(data);
State.update({ kudos: formattedKudos });

const handleSelect = (itemType) => {
  let _kudos;
  if (itemType === "My")
    _kudos = state.kudos.filter((kudo) => kudo.accountId === context.accountId);
  if (itemType === "Trending")
    _kudos = state.kudos.sort((a, b) => b.upvotes - a.upvotes);

  State.update({ selectedItem: itemType, kudos: _kudos });
};

// uncomment in mainnet
//
// const isHuman = Near.view(registryContract, "is_human", {
//   account: context.accountId,
// });
const isHuman = [[[1], [1]]];

State.update({ isIAmHuman: isHuman[0][1].length > 0 });

const Container = styled.div`
  margin: 20px;
`;

const Section = styled.div`
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

const base64decode = (encodedValue) => {
  let buff = Buffer.from(encodedValue, "base64");
  return JSON.parse(buff.toString("utf-8"));
};

return (
  <div>
    <Widget
      src={widgets.header}
      props={{ isIAmHuman: state.isIAmHuman, kudosContract }}
    />
    <Container className="d-flex row">
      <Section className="col-lg-3">
        <H5>Home</H5>
        <Widget
          src={widgets.navigation}
          props={{
            selectedItem: state.selectedItem,
            handleSelect,
          }}
        />
      </Section>
      <CenterSection className="col-lg-9">
        {state.selectedKudo ? (
          <>
            <span
              type="button"
              onClick={() => State.update({ selectedKudo: null })}
            >
              <i class="bi bi-chevron-left"></i>
              Go Back
            </span>
            <div className="d-flex flex-wrap">
              <div className="col p-3">
                <h4 className="pb-3">Kudo</h4>
                <Widget
                  src={widgets.item}
                  props={{
                    isIAmHuman: state.isIAmHuman,
                    kudosContract,
                    kudo: state.selectedKudo,
                  }}
                />
              </div>
              {state.selectedKudo && (
                <div className="col p-3 d-grid gap-3">
                  <h4>Comments</h4>
                  {state.selectedKudo.comments.map((comment) => (
                    <Widget
                      src={widgets.item}
                      props={{
                        isIAmHuman: state.isIAmHuman,
                        kudosContract,
                        kudo: {
                          id: comment[0],
                          description: base64decode(comment[1]).t,
                          accountId: base64decode(comment[1]).s,
                          createdAt: null,
                        },
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h4>{state.selectedItem} Kudos</h4>
            <div className="d-flex flex-wrap">
              {state.kudos.map((kudo, index) => (
                <div className="col col-lg-6 p-2">
                  <Widget
                    key={index}
                    src={widgets.item}
                    props={{
                      isIAmHuman: state.isIAmHuman,
                      kudosContract,
                      kudo,
                      onClick: () => State.update({ selectedKudo: kudo }),
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </CenterSection>
    </Container>
  </div>
);
