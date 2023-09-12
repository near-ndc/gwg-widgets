let { ids, dev } = props;
ids = props.ids ? ids : [1, 2, 3];

const electionContract = "elections-v1.gwg-testing.near";
const registryContract = dev
  ? "registry-v1.gwg-testing.near"
  : "registry.i-am-human.near";
const issuer = dev ? "fractal.i-am-human.near" : "community.i-am-human.near";
const nominationContract = dev
  ? "nominations-v1.gwg-testing.near"
  : "nominations.ndc-gwg.near";
const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

function handleSelfRevoke() {
  Near.call(nominationContract, "self_revoke");
}

const widgets = {
  header: "election.ndctools.near/widget/NDC.Elections.Header",
  card: "nomination.ndctools.near/widget/NDC.Nomination.Card",
  houses: "nomination.ndctools.near/widget/NDC.Nomination.Houses",
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
  loading: false,
});

const time = Near.view(nominationContract, "active_time", {});

const httpRequestOpt = {
  headers: { "x-api-key": apiKey },
};

const baseApi = "https://api.pikespeak.ai";

const endpoints = {
  candidateComments: `${baseApi}/nominations/candidates-comments-and-upvotes?candidate=${context.accountId}&contract=${nominationContract}`,
  houseNominations: (house) =>
    `${baseApi}/nominations/house-nominations?house=${house}&contract=${nominationContract}`,
};

const getVerifiedHuman = () => {
  const isHuman = Near.view(registryContract, "is_human", {
    account: context.accountId,
  });
  const ogTokens = Near.view(registryContract, "sbt_tokens", {
    issuer,
  });

  asyncFetch(endpoints.candidateComments, httpRequestOpt).then((res) => {
    if (res.body.length > 0) {
      State.update({ selfNomination: true, start: false });
    }
  });

  State.update({
    og: ogTokens.some((sbt) => sbt.owner === context.accountId),
    sbt: isHuman[0][1].length > 0,
    start: false,
  });
};

const getNominationInfo = (house) => {
  let nominationsArr = [];

  State.update({ loading: true, start: false });

  asyncFetch(endpoints.houseNominations(house), httpRequestOpt).then((res) => {
    if (res.body.length <= 0) {
      State.update({ nominations: [], loading: false, start: false });
      return;
    }

    for (const [i, data] of res.body.entries()) {
      let objCard = { indexerData: data };
      let nominee = data.nominee;

      asyncFetch(
        `${baseApi}/nominations/candidates-comments-and-upvotes?candidate=${data.nominee}&contract=${nominationContract}`,
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
        }, 2000);

        setTimeout(() => {
          if (data.is_revoked || !profileData || !nominationData) {
            State.update({ loading: false, start: false });
            return;
          }

          objCard = {
            profileData: profileData,
            nominationData: nominationData,
            upVoteData: upVoteInfo,
            ...objCard,
          };

          nominationsArr.push(objCard);
          nominationsArr = nominationsArr.sort(
            (a, b) =>
              new Date(b.indexerData.timestamp).getTime() -
              new Date(a.indexerData.timestamp).getTime()
          );

          State.update({
            nominations: nominationsArr,
            originNominations: nominationsArr,
            loading: false,
            start: false,
          });
        }, 2000);
      });
    }
  });
};

const handleSelect = (item) => {
  switch (item.id) {
    case 1:
      getNominationInfo("HouseOfMerit");
      break;
    case 2:
      getNominationInfo("CouncilOfAdvisors");
      break;
    case 3:
      getNominationInfo("TransparencyCommission");
      break;
  }
  State.update({ selectedHouse: item.id });
};

const handleFilter = (e) => {
  const text = e.target.value;

  State.update({ candidateId: text });

  if (text.length > 0) {
    let filtered = state.originNominations.filter((data) => {
      const affiliations = JSON.parse(data.nominationData.afiliation);
      const companyNames =
        affiliations?.length > 0 &&
        affiliations.map((af) => af.company_name.toLowerCase());

      return (
        data.profileData.name.toLowerCase().includes(text.toLowerCase()) ||
        (companyNames &&
          companyNames.some((c) => c.includes(text.toLowerCase())))
      );
    });

    if (filtered.length > 0) State.update({ nominations: filtered });
    else
      State.update({
        notFound: "There are no such candidates or affiliations",
        nominations: [],
      });
  } else {
    State.update({ nominations: state.originNominations });
  }
};

if (state.start) {
  getVerifiedHuman();
  getNominationInfo("HouseOfMerit");

  State.update({ start: false });
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

const H5 = styled.h5`
  margin-bottom: 20px;
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

const Loader = () => (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

return (
  <>
    <div>
      <Widget
        src={widgets.header}
        props={{
          startTime: time ? time[0] : 0,
          endTime: time ? time[1] : 0,
          type: "Nomination",
        }}
      />
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
        {state.og && (
          <Toolbar>
            <ButtonNominateContainer>
              {state.selfNomination ? (
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Button: {
                      className: "danger primary",
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
          </Toolbar>
        )}
      </Filter>
      <Container className="d-flex row justify-content-between w-100">
        <Left className="col-lg">
          <H5>Houses</H5>
          <Widget
            src={widgets.houses}
            props={{
              selectedHouse: state.selectedHouse,
              electionContract,
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
          {state.loading ? (
            <Loader />
          ) : state.nominations.length > 0 ? (
            state.nominations.map((data) => (
              <Widget
                src={widgets.card}
                props={{
                  data,
                  registry_contract: registryContract,
                  nomination_contract: nominationContract,
                  election_contract: electionContract,
                  api_key: apiKey,
                  dev,
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
