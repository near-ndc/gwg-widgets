const {
  winnerIds,
  typ,
  result,
  seats,
  myVotes,
  blacklisted,
  selectedCandidates,
  handleCast,
  handleSelectCandidate,
  handleResetSelection,
  handleVote,
} = props;

const widgets = {
  voters: "election.ndctools.near/widget/NDC.Elections.Voters",
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
  modal: "nomination.ndctools.near/widget/NDC.Modal",
  verifyHuman: "nomination.ndctools.near/widget/NDC.VerifyHuman",
  budget: "election.ndctools.near/widget/NDC.Elections.BudgetPackage",
};

const housesMapping = {
  CouncilOfAdvisors: "Council Of Advisors",
  HouseOfMerit: "House of Merit",
  TransparencyCommission: "Transparency Commission",
  SetupPackage: "Budget Package",
};

const CastVotesSection = styled.div`
  background: #fdfeff;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;

  @media (max-width: 400px) {
    flex-direction: column;
  }

  .wrapper {
    @media (max-width: 400px) {
      width: 100%;
    }
  }

  button {
    @media (max-width: 400px) {
      width: 100%;
    }
  }

  h3,
  h4 {
    margin: 0 3px;
  }

  h3 {
    font-weight: 900;
  }

  .text-secondary {
    margin: 0 10px;
  }

  &.not-verified {
    h4 {
      font-size: 16px;
      margin: 0 0 5px 0;
      font-weight: 600;
    }

    h5 {
      margin: 0;
      font-size: 12px;
    }
  }
`;

const Info = styled.i`
  font-size: 12px;
  margin: 0 !important;
`;

const ActionSection = styled.div`
  @media (max-width: 400px) {
    width: 100%;
  }
`;

const H4 = styled.h4`
  margin-bottom: 0;
`;

const H3 = styled.h3`
  margin-bottom: 0;
`;

function alreadyVotedForHouse() {
  return myVotes.some((voter) => voter.house === typ);
}

const alreadyVoted = (candidateId) =>
  myVotes.some((voter) => voter.candidate === candidateId);

const myVotesForHouse = () => myVotes.filter((vote) => vote.house === typ);

const CastVotes = () => (
  <CastVotesSection className="d-flex align-items-center justify-content-between gap-3">
    <div className="wrapper">
      <div className="d-flex align-items-end">
        <H3>
          {alreadyVotedForHouse()
            ? 0
            : seats - myVotesForHouse().length - selectedCandidates.length}
        </H3>
        <span>/</span>
        <H4>{seats}</H4>
        <span className="text-secondary">votes left</span>
      </div>
      <Info className="text-secondary">
        <i class="bi bi-info-circle"></i>
        {alreadyVotedForHouse() ? (
          <span>You've already voted for {housesMapping[typ]}</span>
        ) : blacklisted ? (
          <span>Your account is blacklisted</span>
        ) : (
          <span>
            Make sure you selected {seats} candidates. You can only vote once
            per house
          </span>
        )}
      </Info>
    </div>
    <ActionSection className="d-flex gap-2">
      {selectedCandidates.length > 0 && (
        <Widget
          src={widgets.styledComponents}
          props={{
            Button: {
              className: "secondary dark justify-content-center text-nowrap",
              text: "Reset Selection",
              onClick: handleResetSelection,
            },
          }}
        />
      )}
      <Widget
        src={widgets.styledComponents}
        props={{
          Button: {
            className:
              "justify-content-center " +
              (myVotesForHouse().length + selectedCandidates.length < seats
                ? "bg-secondary text-white"
                : "primary"),
            disabled: selectedCandidates.length === 0 || blacklisted,
            text: `Cast ${
              alreadyVotedForHouse()
                ? 0
                : myVotesForHouse().length + selectedCandidates.length
            } / ${seats} Vote${selectedCandidates.length === 1 ? "" : "s"} `,
            onClick: handleCast,
          },
        }}
      />
    </ActionSection>
  </CastVotesSection>
);
const CastBudgetVote = () => (
  <CastVotesSection className="d-flex align-items-center justify-content-between gap-3">
    <div className="wrapper">
      <div className="d-flex align-items-end">
        <H3>{alreadyVotedForHouse() ? 0 : 1}</H3>
        <span>/</span>
        <H4>{seats}</H4>
        <span className="text-secondary">votes left</span>
      </div>
      <Info className="text-secondary">
        {alreadyVotedForHouse() && (
          <>
            <i class="bi bi-info-circle"></i>
            <span>You've already voted for budget package</span>
          </>
        )}
      </Info>
    </div>
    <ActionSection className="d-flex gap-2">
      <Widget
        src={widgets.styledComponents}
        props={{
          Button: {
            text:
              winnerIds.length > 0
                ? `Yes - ${result.find((item) => item[0] === "yes")[1]}`
                : "Yes",
            className: "primary success justify-content-center",
            icon: winnerIds.length === 0 && (
              <i className="bi bi-hand-thumbs-up" />
            ),
            disabled:
              blacklisted || (alreadyVotedForHouse() && !alreadyVoted("yes")),
            onClick: () => {
              if (winnerIds.length > 0 || alreadyVoted("yes")) return;

              const res = handleSelectCandidate("yes");
              if (res) handleVote();
            },
          },
        }}
      />
      <Widget
        src={widgets.styledComponents}
        props={{
          Button: {
            text:
              winnerIds.length > 0
                ? `No - ${result.find((item) => item[0] === "no")[1]}`
                : "No",
            className: "primary danger justify-content-center",
            icon: winnerIds.length === 0 && (
              <i className="bi bi-hand-thumbs-down" />
            ),
            disabled:
              blacklisted || (alreadyVotedForHouse() && !alreadyVoted("no")),
            onClick: () => {
              if (winnerIds.length > 0 || alreadyVoted("no")) return;

              const res = handleSelectCandidate("no");
              if (res) handleVote();
            },
          },
        }}
      />
      <Widget
        src={widgets.styledComponents}
        props={{
          Button: {
            text:
              winnerIds.length > 0
                ? `Abstain - ${result.find((item) => item[0] === "abstain")[1]}`
                : "Abstain",
            className: "primary justify-content-center text-nowrap",
            icon: winnerIds.length === 0 && <i className="bi bi-x-lg" />,
            disabled:
              blacklisted ||
              (alreadyVotedForHouse() && !alreadyVoted("abstain")),
            onClick: () => {
              if (winnerIds.length > 0 || alreadyVoted("abstain")) return;

              const res = handleSelectCandidate("abstain");
              if (res) handleVote();
            },
          },
        }}
      />
    </ActionSection>
  </CastVotesSection>
);

return <>{typ === "SetupPackage" ? <CastBudgetVote /> : <CastVotes />}</>;
