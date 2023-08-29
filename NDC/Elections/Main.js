let { ids, org } = props;

ids = props.ids ? ids : [1, 2, 3, 4];
org = props.org ? org : "NDC";

const electionContract = "elections-v1.gwg-testing.near";
const registryContract = "registry-v1.gwg-testing.near";
const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

let houses = [
  Near.view(electionContract, "proposal", { prop_id: ids[0] }),
  Near.view(electionContract, "proposal", { prop_id: ids[1] }),
  Near.view(electionContract, "proposal", { prop_id: ids[2] }),
];

let budget = Near.view(electionContract, "proposal", { prop_id: ids[3] });

State.init({
  selectedHouse: ids[0],
  myVotes: [],
  winnerIds: [],
  isIAmHuman: false,
  blacklisted: false,
  greylisted: false,
  candidateId: "",
});

const isHuman = Near.view(registryContract, "is_human", {
  account: context.accountId,
});

const winnerIds = Near.view(electionContract, "winners_by_house", {
  prop_id: state.selectedHouse,
});

const flagged = Near.view(electionContract, "account_flagged", {
  account: context.accountId,
});

State.update({
  isIAmHuman: isHuman[0][1].length > 0,
  winnerIds,
  blacklisted: flagged === "Blacklisted",
  greylisted: flagged !== "Blacklisted" && flagged !== "Verified",
});

if (context.accountId)
  asyncFetch(
    `https://api.pikespeak.ai/election/votes-by-voter?voter=${context.accountId}&contract=${electionContract}`,
    { headers: { "x-api-key": apiKey } }
  ).then((resp) => {
    if (resp.body) State.update({ myVotes: resp.body });
  });

const widgets = {
  header: "election.ndctools.near/widget/NDC.Elections.Header",
  filter: "election.ndctools.near/widget/NDC.Elections.Filter",
  houses: "election.ndctools.near/widget/NDC.Elections.Houses",
  budget: "election.ndctools.near/widget/NDC.Elections.BudgetPackage",
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

const rand = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

return (
  <>
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
                isWhistleblower: true,
              }}
            />
          )}
        </>
      ))}
      {budget.id !== state.selectedHouse && (
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
      )}
      <Container className="d-flex row">
        <Left className="h-screen col-lg d-flex flex-column justify-content-between">
          <div>
            <H5>To Vote</H5>
            <Widget
              src={widgets.houses}
              props={{
                selectedHouse: state.selectedHouse,
                houses: [...houses, budget],
                handleSelect,
                votesLeft: (house) => votesLeft(house),
              }}
            />
          </div>
          <Widget
            src={widgets.progress}
            props={{
              houses: [...houses, budget],
              handleSelect,
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
                    winnerIds: state.winnerIds,
                    blacklisted: state.blacklisted,
                    greylisted: state.greylisted,
                    ...house,
                    result: rand(house.result),
                  }}
                />
              )}
            </>
          ))}
          {budget.id === state.selectedHouse && (
            <Widget
              src={widgets.budget}
              props={{
                electionContract,
                registryContract,
                myVotes: state.myVotes,
                isIAmHuman: state.isIAmHuman,
                ...budget,
              }}
            />
          )}
        </div>

        <div className="col-lg">
          <Right className="col">
            <H5>General</H5>
            <div className="d-flex justify-content-center">
              <Widget src={widgets.statistic} />
            </div>
          </Right>
          {state.myVotes.length > 0 && (
            <Right className="col">
              <H5>My voting activity</H5>
              <ActivityContainer className="d-flex justify-content-center">
                <Widget
                  src={widgets.activities}
                  props={{ myVotes: state.myVotes }}
                />
              </ActivityContainer>
            </Right>
          )}
        </div>
      </Container>
    </div>
  </>
);
