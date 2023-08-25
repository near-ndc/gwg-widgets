const {
  id,
  typ,
  seats,
  electionContract,
  registryContract,
  isIAmHuman,
  myVotes,
} = props;

const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
  verifyHuman: "nomination.ndctools.near/widget/NDC.VerifyHuman",
};

const H4 = styled.h4`
  margin-bottom: 0;
`;

const H3 = styled.h3`
  margin-bottom: 0;
`;

const Container = styled.div`
  position: relative:
  font-family: Avenir;
  font-size: 16px;
`;

const Info = styled.i`
  font-size: 12px;
  margin: 0 !important;
`;

const CandidatesContainer = styled.div`
  overflow-y: scroll;
  max-height: 490px;
  width: 100%;
`;

const StickyContainer = styled.div`
  position: "fixed",
  left: 0;
  bottom: 0;
  height: 60px;
  width: 100%;
`;

const Icon = styled.i`
  font-size: 14px;
`;

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

const Section = styled.div`
  gap: 8px;
  margin-bottom: 10px;
`;

const ActionSection = styled.div`
  @media (max-width: 400px) {
    width: 100%;
  }
`;

const currentUser = context.accountId;
const alreadyVotedForHouse = () => myVotes.some((voter) => voter.house === typ);
const myVotesForHouse = () => myVotes.filter((vote) => vote.house === typ);

const handleVote = (value) =>
  Near.call(
    electionContract,
    "vote",
    { prop_id: id },
    "70000000000000",
    2000000000000000000000
  );

State.init({
  availableVotes: seats - myVotesForHouse().length,
});

const CastVotes = () => (
  <CastVotesSection className="d-flex align-items-center justify-content-between gap-3">
    <div className="wrapper">
      <div className="d-flex align-items-end">
        <H3>{alreadyVotedForHouse() ? 0 : state.availableVotes}</H3>
        <span>/</span>
        <H4>{seats}</H4>
        <span className="text-secondary">votes left</span>
      </div>
      <Info className="text-secondary">
        <i class="bi bi-info-circle"></i>
        {alreadyVotedForHouse() && (
          <span>You're already accepted budget package</span>
        )}
      </Info>
    </div>
    <ActionSection className="d-flex gap-2">
      <Widget
        src={widgets.styledComponents}
        props={{
          Button: {
            text: "Yes",
            className: "primary success justify-content-center",
            icon: <i className="bi bi-hand-thumbs-up" />,
            onClick: () => handleVote(0),
          },
        }}
      />
      <Widget
        src={widgets.styledComponents}
        props={{
          Button: {
            text: "No",
            className: "primary danger justify-content-center",
            icon: <i className="bi bi-hand-thumbs-down" />,
            onClick: () => handleVote(1),
          },
        }}
      />
      <Widget
        src={widgets.styledComponents}
        props={{
          Button: {
            text: "Abstain",
            className: "justify-content-center",
            icon: <i className="bi bi-x-lg" />,
            onClick: () => handleVote(2),
          },
        }}
      />
    </ActionSection>
  </CastVotesSection>
);

const Content = () => <p>Budget package ...</p>;

return (
  <Container>
    <h1>Budget Package</h1>
    <CandidatesContainer>
      <Content />
      <a href="https://bafkreidwdxocdkfsv6srynw7ipnogfuw76fzncmxd5jv7furbsn5cp4bz4.ipfs.nftstorage.link/">
        View Budget Package
        <i className="ml-2 bi bi-box-arrow-up-right" />
      </a>
    </CandidatesContainer>

    <div>
      {isIAmHuman ? (
        <CastVotes />
      ) : (
        <Widget
          src={widgets.verifyHuman}
          props={{
            title: "Want to vote?",
            description: "Click on Verify as a Human to proceed.",
          }}
        />
      )}
    </div>
  </Container>
);
