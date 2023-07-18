let { ids, org, election_contract, registry_contract } = props;

ids = props.ids ? ids : [1, 2, 3]; // for testing purposes
org = props.org ? org : "test"; // for testing purposes

const electionContract = election_contract ?? "elections-v1.gwg-testing.near";
const registryContract = registry_contract ?? "registry.i-am-human.near";
const apiKey = api_key ?? "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

let houses = [
  Near.view(electionContract, "proposal", { prop_id: ids[0] }),
  Near.view(electionContract, "proposal", { prop_id: ids[1] }),
  Near.view(electionContract, "proposal", { prop_id: ids[2] }),
];

State.init({
  selectedHouse: ids[0],
  humanVoted: 0,
  myVotes: [],
  isIAmHuman: false,
  candidateId: "",
});

const isHuman = Near.view(registryContract, "is_human", {
  account: context.accountId,
});

const getWinner = () => {
  const house = houses.find((h) => h.id === state.selectedHouse);
  const now = new Date().getTime();
  const end = new Date(parseInt(house.end)).getTime();

  if (now < end) return [];

  const res = house.result.sort((a, b) => b[1] - a[1]);
  const winners = house.result.filter((item) => item[1] === res[0][1]);

  return winners.slice(0, house.quorum);
};

State.update({ isIAmHuman: isHuman[0][1].length > 0 });

const totalHumal = 3000;

asyncFetch(
  `https://api.pikespeak.ai/election/total-voters?contract=${electionContract}&registry=${registryContract}`,
  {
    headers: {
      "x-api-key": apiKey,
    },
  }
).then((resp) => {
  if (resp.body) State.update({ humanVoted: resp.body });
});

asyncFetch(
  `https://api.pikespeak.ai/election/votes-by-voter?voter=${context.accountId}&contract=${electionContract}&registry=${registryContract}`,
  {
    headers: {
      "x-api-key": apiKey,
    },
  }
).then((resp) => {
  if (resp.body) State.update({ myVotes: resp.body });
});

const widgets = {
  header: "election.ndctools.near/widget/NDC.Elections.Header",
  filter: "election.ndctools.near/widget/NDC.Elections.Filter",
  houses: "election.ndctools.near/widget/NDC.Elections.Houses",
  progress: "election.ndctools.near/widget/NDC.Elections.Progress",
  candidates: "election.ndctools.near/widget/NDC.Elections.Candidates",
  statistic: "election.ndctools.near/widget/NDC.Elections.Statistic",
  activities: "election.ndctools.near/widget/NDC.Elections.Activities",
};

const handleSelect = (item) => {
  State.update({ selectedHouse: item.id });
};

const handleFilter = (e) => State.update({ candidateId: e.target.value });

const votesLeft = (house) =>
  house.seats - state.myVotes.filter((vote) => vote.house === house.typ).length;

const Container = styled.div`
  padding: 20px 0;
`;

const ActivityContainer = styled.div`
  overflow-y: scroll;
`;

const Left = styled.div`
  padding: 20px;
  background: #f8f8f9;
  border-radius: 8px;
`;

const Filter = styled.div`
  margin-top: 32px;
`;

const Right = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  background: #f8f8f9;
  border-radius: 8px;
`;

const H5 = styled.h5`
  margin-bottom: 20px;
`;

return (
  <div>
    {houses.map((house) => (
      <>
        {house.id === state.selectedHouse && (
          <Widget
            key={i}
            src={widgets.header}
            props={{
              startTime: house.start,
              endTime: house.end,
              type: "Election",
            }}
          />
        )}
      </>
    ))}
    <Filter>
      <Widget
        src={widgets.filter}
        props={{
          handleFilter,
          candidateId: state.candidateId,
          placeholder: "Search by candidate name",
        }}
      />
    </Filter>
    <Container className="d-flex row">
      <Left className="h-screen col-lg d-flex flex-column justify-content-between">
        <div>
          <H5>To Vote</H5>
          <Widget
            src={widgets.houses}
            props={{
              selectedHouse: state.selectedHouse,
              houses,
              handleSelect,
              votesLeft: (house) => votesLeft(house),
            }}
          />
        </div>
        <Widget
          src={widgets.progress}
          props={{
            houses,
            votesLeft: (house) => votesLeft(house),
          }}
        />
      </Left>
      <div className="col-lg-6 p-2 p-md-3">
        {houses.map((house) => (
          <>
            {house.id === state.selectedHouse && (
              <Widget
                key={i}
                src={widgets.candidates}
                props={{
                  electionContract,
                  registryContract,
                  ndcOrganization: org,
                  isIAmHuman: state.isIAmHuman,
                  myVotes: state.myVotes,
                  candidateId: state.candidateId,
                  winnerIds: getWinner(),
                  ...house,
                }}
              />
            )}
          </>
        ))}
      </div>

      <div className="col-lg">
        <Right className="col">
          <H5>General</H5>
          <div className="d-flex justify-content-center">
            <Widget
              src={widgets.statistic}
              props={{
                voted: state.humanVoted,
                total: totalHumal,
              }}
            />
          </div>
        </Right>
        <Right className="col">
          <H5>My voting activity</H5>
          <ActivityContainer className="d-flex justify-content-center">
            <Widget
              src={widgets.activities}
              props={{ myVotes: state.myVotes }}
            />
          </ActivityContainer>
        </Right>
      </div>
    </Container>
  </div>
);
