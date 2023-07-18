// TODO: Should be grabbed from contract side
let {
  ids,
  election_contract,
  registry_contract,
  nomination_contract,
  api_key,
} = props;
ids = props.ids ? ids : [1, 2, 3]; // for testing purposes

const electionContract = election_contract ?? "elections-v1.gwg-testing.near";
const registryContract = registry_contract ?? "registry.i-am-human.near";
const nominationContract = nomination_contract ?? "nominations.ndc-gwg.near";
const apiKey = api_key ?? "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

function handleSelfRevoke() {
  Near.call(nominationContract, "self_revoke");
}

const houses = [
  Near.view(electionContract, "proposal", { prop_id: ids[0] }),
  Near.view(electionContract, "proposal", { prop_id: ids[1] }),
  Near.view(electionContract, "proposal", { prop_id: ids[2] }),
];

const widgets = {
  header: "election.ndctools.near/widget/NDC.Elections.Header",
  card: "nomination.ndctools.near/widget/NDC.Nomination.Card",
  houses: "election.ndctools.near/widget/NDC.Elections.Houses",
  filter: "election.ndctools.near/widget/NDC.Elections.Filter",
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
  verifyHuman: "nomination.ndctools.near/widget/NDC.VerifyHuman",
  compose: "nomination.ndctools.near/widget/NDC.Nomination.Compose",
  deleteNomination:
    "nomination.ndctools.near/widget/NDC.Nomination.DeleteNomination",
};

State.init({
  selectedHouse: ids[0],
  house: "HouseOfMerit",
  start: true,
  nominations: [],
  sbt: false,
  og: false,
  selfNomination: false,
  search: false,
  candidateId: "",
  originNominations: [],
  notFound: "There are no active nominations at the moment",
});

const httpRequestOpt = {
  headers: { "x-api-key": apiKey },
};

function getVerifiedHuman() {
  asyncFetch(
    `https://api.pikespeak.ai/sbt/sbt-by-owner?holder=${context.accountId}&class_id=1&issuer=fractal.i-am-human.near&with_expired=false&registry=${registryContract}`,
    httpRequestOpt
  ).then((res) => {
    if (res.body.length > 0) {
      State.update({ sbt: true });
    }
  });
  asyncFetch(
    `https://api.pikespeak.ai/sbt/sbt-by-owner?holder=${context.accountId}&class_id=1&issuer=community.i-am-human.near&with_expired=false&registry=${registryContract}`,
    httpRequestOpt
  ).then((res) => {
    if (res.body.length > 0) {
      State.update({ og: true });
    }
  });
  asyncFetch(
    `https://api.pikespeak.ai/nominations/candidates-comments-and-upvotes?candidate=${context.accountId}&contract=${nominationContract}`,
    httpRequestOpt
  ).then((res) => {
    if (res.body.length > 0) {
      State.update({ selfNomination: true });
    }
  });
}

function getNominationInfo() {
  let nominationsArr = [];
  asyncFetch(
    `https://api.pikespeak.ai/nominations/house-nominations?house=${state.house}&contract=${electionContract}`,
    httpRequestOpt
  ).then((res) => {
    console.log(res.body);

    if (res.body.length <= 0) {
      State.update({ nominations: [] });
      return;
    }

    for (const [i, data] of res.body.entries()) {
      let objCard = { indexerData: data };
      let nominee = data.nominee;

      asyncFetch(
        `https://api.pikespeak.ai/nominations/candidates-comments-and-upvotes?candidate=${data.nominee}`,
        httpRequestOpt
      ).then((info) => {
        let upVoteInfo = info.body[0];
        let profileData;
        let nominationData;
        Social.getr(`${nominee}/profile`);
        Social.getr(`${nominee}/nominations`);
        setTimeout(() => {
          profileData = Social.getr(`${nominee}/profile`);
          nominationData = Social.getr(`${nominee}/nominations`);
        }, 1000);

        setTimeout(() => {
          if (data.is_revoked || !profileData || !nominationData) return;

          objCard = {
            profileData: profileData,
            nominationData: nominationData,
            upVoteData: upVoteInfo,
            ...objCard,
          };

          nominationsArr.push(objCard);

          State.update({ nominations: nominationsArr });
        }, 1000);
      });
    }
  });
}

if (state.start) {
  getNominationInfo();
  getVerifiedHuman();
  State.update({
    start: false,
  });
}

const handleSelect = (item) => {
  switch (item.id) {
    case 2:
      State.update({ house: "CouncilOfAdvisors" });
      getNominationInfo();
      break;
    case 1:
      State.update({ house: "HouseOfMerit" });
      getNominationInfo();
      break;
    case 3:
      State.update({ house: "TransparencyCommission" });
      getNominationInfo();
      break;
  }
  State.update({ selectedHouse: item.id });
};

function handleFilter(e) {
  const text = e.target.value;

  State.update({ candidateId: text });

  if (!state.search) {
    State.update({ originNominations: state.nominations, search: true });
  }
  if (text.length > 0) {
    if (state.nominations.length) {
      State.update({
        notFound: "There are no such nominations",
      });
    }
    let filtered = state.nominations.filter((data) =>
      data.profileData.name.toLowerCase().includes(text.toLowerCase())
    );
    State.update({ nominations: filtered });
  } else {
    State.update({ notFound: "There are no active nominations at the moment" });
    State.update({
      nominations: state.originNominations,
      originNominations: [],
      search: false,
    });
  }
}

const Container = styled.div`
  padding: 30px 0;
  margin: 0;
`;

const ActivityContainer = styled.div`
  overflow-y: scroll;
`;

const Left = styled.div`
  padding: 20px;
  background: #f8f8f9;
  border-radius: 8px;
`;

const Center = styled.div``;

const Right = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  background: #f8f8f9;
  border-radius: 8px;
`;

const H5 = styled.h5`
  margin-bottom: 20px;
`;

const VerifiedDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 8px;
  background: var(--ffffff, #fff);
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
`;

const VerifiedHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const VerifiedHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
`;

const VerfiedTitle = styled.p`
  display: flex;
  width: 176px;
  flex-direction: column;
  justify-content: center;
  color: var(--000000, #000);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  margin: 0px;
`;

const VerifedDesc = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  color: var(--primary-gray-dark, #828688);
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  margin: 0px;
`;

const VerifyButton = styled.a`
  display: flex;
  padding: 8px 20px;
  justify-content: center;
  width: 100%;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px;
  background: var(--ffd-50-d, #ffd50d);
  border: 0px;
  text-decoration: none;
`;

const VerifyButtonText = styled.p`
  color: var(--primary-black, #000);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  margin: 0px;
`;

const SortButton = styled.button`
  display: flex;
  width: 38px;
  height: 38px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 6px;
  background: var(
    --buttons-gradient-default,
    linear-gradient(90deg, #9333ea 0%, #4f46e5 100%)
  );
  border: 0px;
`;

const ButtonNominateContainer = styled.div`
  padding: 16px;
  border-radius: 8px;
  background: #f8f8f9;
`;

const Filter = styled.div`
  margin-top: 32px;

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
  <>
    <div>
      {houses.map((group) => (
        <>
          {group.id === state.selectedHouse && (
            <Widget
              key={i}
              src={widgets.header}
              props={{
                startTime: group.start,
                endTime: group.end,
                type: "Nomination",
              }}
            />
          )}
        </>
      ))}
      <Filter className="d-flex">
        <div className="w-100">
          <Widget
            src={widgets.filter}
            props={{
              handleFilter,
              candidateId: state.candidateId,
              placeholder: "Search by candidate name and affiliation",
            }}
          />
        </div>
        <Toolbar>
          {state.og && (
            <ButtonNominateContainer>
              {state.selfNomination ? (
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Button: {
                      className: "danger",
                      text: "Delete Self Nomination",
                      onClick: () => State.update({ showModalDelete: true }),
                      icon: <i class="bi bi-trash"></i>,
                    },
                  }}
                />
              ) : (
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Button: {
                      text: "Self Nominate",
                      onClick: () => State.update({ showModal: true }),
                      icon: <i class="bi bi-plus-lg"></i>,
                    },
                  }}
                />
              )}
            </ButtonNominateContainer>
          )}
        </Toolbar>
      </Filter>
      <Container className="d-flex row justify-content-between w-100">
        <Left className="col-lg">
          <H5>Houses</H5>
          <Widget
            src={widgets.houses}
            props={{
              selectedHouse: state.selectedHouse,
              houses: houses,
              handleSelect: (item) => handleSelect(item),
            }}
          />
          <div>
            {!state.sbt && (
              <div className="mt-5">
                <Widget
                  src={widgets.verifyHuman}
                  props={{
                    title: "To Comment or to Upvote",
                    description: "Verify as a Human to comment or to Upvote",
                    small: true,
                  }}
                />
              </div>
            )}
          </div>
        </Left>
        <Center className="col-lg-9 px-2 px-md-3 d-flex flex-row flex-wrap">
          {state.nominations.length > 0 ? (
            state.nominations.map((data) => (
              <Widget
                src={widgets.card}
                props={{
                  data,
                  registry_contract: registryContract,
                  nomination_contract: nominationContract,
                  election_contract: electionContract,
                  api_key: apiKey,
                }}
              />
            ))
          ) : (
            <div className="flex mt-10 container-fluid align-self-center">
              <H5 className="text-center">{state.notFound}</H5>
            </div>
          )}
        </Center>
      </Container>
    </div>

    <>
      {state.showModal && (
        <Widget
          src={widgets.compose}
          props={{
            handleClose: () => State.update({ showModal: false }),
            nomination_contract: nominationContract,
          }}
        />
      )}
      {state.showModalDelete && (
        <Widget
          src={widgets.deleteNomination}
          props={{
            house: state.house,
            handleClose: () => State.update({ showModalDelete: false }),
            nomination_contract: nominationContract,
          }}
        />
      )}
    </>
  </>
);
