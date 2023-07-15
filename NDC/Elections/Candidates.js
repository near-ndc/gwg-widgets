const {
  electionContract,
  ndcOrganization,
  myVotes,
  id,
  typ,
  ref_link,
  winnerIds,
  quorum,
  seats,
  voters_num,
  result,
  isIAmHuman,
  candidateId,
} = props;

const widgets = {
  voters: "rubycop.near/widget/NDC.Elections.Voters",
  button: "rubycop.near/widget/NDC.StyledComponents",
  verifyHuman: "rubycop.near/widget/NDC.VerifyHuman",
};

const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const currentUser = context.accountId;

const housesMapping = {
  CouncilOfAdvisors: "Council Of Advisors",
  HouseOfMerit: "House of Merit",
  TransparencyCommission: "Transparency Commission",
};
const myVotesForHouse = () => myVotes.filter((vote) => vote.house === typ);
let _bookmarked = Social.index(currentUser, `${ndcOrganization}/${typ}`);

State.init({
  loading: false,
  availableVotes: seats - myVotesForHouse().length,
  selected: null,
  bookmarked:
    _bookmarked && _bookmarked[_bookmarked.length - 1]
      ? _bookmarked[_bookmarked.length - 1].value
      : [],
  selectedCandidates: [],
  candidates: result,
  filter: {
    bookmark: false,
    candidate: false,
    votes: false,
    my_votes: false,
  },
  voters: [],
});

const filteredCandidates = result.filter(([candidate, _vote], _index) =>
  candidate.toLowerCase().includes(candidateId.toLowerCase())
);

State.update({ candidates: filteredCandidates });

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

const StyledLink = styled.a`
  color: inherit !important;
  width: 90px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  padding-top: 2px;
`;

const NominationLink = styled.a`
  font-size: 12px;
  line-height: 24px;
  background: ${(props) =>
    props.selected || props.winnerId ? "#fff" : "#4F46E5"};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border: 1px solid;
  border-color: ${(props) =>
    props.selected || props.winnerId ? "#fff" : "#4F46E5"};
  padding: 0 10px;
  border-radius: 5px;
`;

const CandidateItem = styled.div`
  padding: 0 20px;
  height: 48px;
  border-radius: 12px;
  margin-bottom: 8px;
  border: 1px solid;
  background: ${(props) =>
    props.winnerId
      ? "#239F28"
      : props.selected
      ? "linear-gradient(90deg, #9333EA 0%, #4F46E5 100%)"
      : "#F8F8F9"};
  border-color: ${(props) =>
    props.selected ? "#4F46E5" : props.winnerId ? "#239F28" : "#F8F8F9"};
  color: ${(props) => (props.selected || props.winnerId ? "white" : "inherit")};

  &:hover {
    cursor: pointer;
    background: ${(props) =>
      props.selected
        ? "linear-gradient(90deg, #9333EA 0%, #4F46E5 100%)"
        : props.winnerId
        ? "#239F28"
        : "linear-gradient(90deg, rgba(147, 51, 234, 0.08) 0%, rgba(79, 70, 229, 0.08) 100%)"};
  }
`;

const Bookmark = styled.div`
  width: 100px;

  #bookmark.bi-bookmark-fill {
    color: ${(props) =>
      props.selected || props.winnerId ? "#fff" : "#4F46E5"};
  }
`;

const Votes = styled.div`
  width: 90px;
  margin-left: 20px;
  text-align: center;
`;

const Action = styled.div`
  width: 90px;
  min-width: 20px;
  margin-left: 20px;
  text-align: center;
`;

const Nomination = styled.div`
  width: 102px;
`;

const FilterRow = styled.div`
  padding: 15px 20px;
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

const PrimaryLink = styled.a`
  padding: 8px 20px;
  background: #ffd50d;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const CastVotesSection = styled.div`
  background: #fdfeff;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;

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

const Winner = styled.i`
  margin-left: 10px;
  font-size: 14px;
`;

const UserLink = ({ title, src }) => (
  <>
    <StyledLink href={src}>{title}</StyledLink>
    <div>
      <Icon className="bi bi-arrow-up-right" />
    </div>
  </>
);

const Loader = () => (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

const handleSelectCandidate = (candidateId) => {
  const selectedItems = state.selectedCandidates.includes(candidateId)
    ? state.selectedCandidates.filter((el) => el !== candidateId)
    : [...state.selectedCandidates, candidateId];

  const currentVotes = seats - myVotesForHouse().length - selectedItems.length;
  if (currentVotes < 0) return;

  State.update({
    selectedCandidates: selectedItems,
    availableVotes: currentVotes,
  });
};

const selectedBookmarks = (candidateId) => {
  let selectedItems = state.bookmarked.includes(candidateId)
    ? state.bookmarked.filter((el) => el !== candidateId)
    : [...state.bookmarked, candidateId];

  return [...new Set(selectedItems)];
};

const handleBookmarkCandidate = (candidateId) => {
  let selectedItems = selectedBookmarks(candidateId);
  State.update({ loading: candidateId });

  Social.set(
    {
      index: {
        [currentUser]: JSON.stringify({
          key: `${ndcOrganization}/${typ}`,
          value: selectedBookmarks(candidateId),
        }),
      },
    },
    {
      force: true,
      onCommit: () => {
        if (selectedItems.length === 0)
          State.update({ selectedCandidates: result });
        State.update({ bookmarked: selectedItems, loading: false });
      },
      onCancel: () => State.update({ loading: false }),
    }
  );
};

const handleVote = () => {
  Near.call(
    electionContract,
    "vote",
    { prop_id: id, vote: state.selectedCandidates },
    "70000000000000",
    2000000000000000000000
  );
};

const alreadyVoted = (candidateId) =>
  myVotes.some((voter) => voter.candidate === candidateId);

const filterBy = (option) => {
  if (option.bookmark)
    if (!state.filter.bookmark)
      State.update({
        candidates: state.candidates.filter(([candidateId, _votes], _index) =>
          state.bookmarked.includes(candidateId)
        ),
        filter: { bookmark: true },
      });
    else
      State.update({
        candidates: result,
        filter: { bookmark: false },
      });
  else if (option.votes)
    State.update({
      candidates: state.candidates.sort((a, b) =>
        state.filter.votes ? a[1] - b[1] : b[1] - a[1]
      ),
      filter: { votes: !state.filter.votes },
    });
  else if (option.my_votes)
    if (!state.filter.my_votes)
      State.update({
        candidates: state.candidates.filter(([candidateId, _votes], _index) =>
          alreadyVoted(candidateId)
        ),
        filter: { my_votes: true },
      });
    else
      State.update({
        candidates: result,
        filter: { my_votes: false },
      });
  else
    State.update({
      candidates: result,
      filter: { bookmark: false, my_votes: false },
    });
};

const CandidateList = ({ candidateId, votes }) => (
  <div>
    <CandidateItem
      className="d-flex align-items-center justify-content-between"
      onClick={(e) => {
        if (
          !["input", "bookmark", "link"].includes(e.target.id) &&
          !e.target.href
        )
          State.update({
            selected: state.selected === candidateId ? null : candidateId,
          });
      }}
      selected={state.selected === candidateId}
      winnerId={winnerIds.includes(candidateId)}
    >
      <div className="d-flex">
        {isIAmHuman && (
          <Bookmark
            selected={state.selected === candidateId}
            winnerId={winnerIds.includes(candidateId)}
          >
            {state.loading === candidateId ? (
              <Loader />
            ) : (
              <i
                id="bookmark"
                onClick={() => handleBookmarkCandidate(candidateId)}
                className={`bi ${
                  state.bookmarked.includes(candidateId)
                    ? "bi-bookmark-fill"
                    : "bi-bookmark"
                }`}
              />
            )}
          </Bookmark>
        )}
        <div className="d-flex">
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              accountId: candidateId,
              imageClassName: "rounded-circle w-100 h-100",
              style: { width: "24px", height: "24px", marginRight: 4 },
            }}
          />
          <UserLink
            src={`https://wallet.near.org/profile/${candidateId}`}
            title={candidateId}
          />
          {winnerIds.includes(candidateId) && (
            <Winner className="bi bi-trophy p-1" />
          )}
        </div>
      </div>
      <div className="d-flex">
        <NominationLink
          className="d-flex"
          href={ref_link}
          target="_blank"
          selected={state.selected === candidateId}
          winnerId={winnerIds.includes(candidateId)}
        >
          <span id="link" className="d-none d-md-block">
            Nomination
          </span>

          <i id="link" className="bi bi-arrow-up-right" />
        </NominationLink>
        <Votes>{votes}</Votes>
        {isIAmHuman && (
          <Votes>
            <input
              id="input"
              disabled={alreadyVoted(candidateId)}
              onClick={() => handleSelectCandidate(candidateId)}
              className="form-check-input"
              type="checkbox"
              checked={
                state.selectedCandidates.includes(candidateId) ||
                alreadyVoted(candidateId)
              }
            />
          </Votes>
        )}
      </div>
    </CandidateItem>
    {state.selected === candidateId && (
      <Widget src={widgets.voters} props={{ candidateId }} />
    )}
  </div>
);

const Filters = () => {
  return (
    <FilterRow className="d-flex align-items-center justify-content-between">
      <div className="d-flex">
        {isIAmHuman && (
          <Bookmark
            role="button"
            className="text-secondary"
            onClick={() => filterBy({ bookmark: true })}
          >
            <small>Bookmark</small>
            <i className="bi bi-funnel" />
          </Bookmark>
        )}
        <div className="text-secondary">
          <small>Candidate</small>
        </div>
      </div>
      <div className="d-flex">
        <Nomination className="text-secondary text-end text-md-start">
          <small>Nomination</small>
        </Nomination>
        <Votes
          role="button"
          className="text-secondary"
          onClick={() => filterBy({ votes: true })}
        >
          <small>Total votes</small>
          <i
            className={`bi ${
              state.filter.votes ? "bi-arrow-down" : "bi-arrow-up"
            }`}
          />
        </Votes>
        {isIAmHuman && (
          <Action
            role="button"
            className="text-secondary"
            onClick={() => filterBy({ my_votes: true })}
          >
            <small>My votes</small>
            <i className="bi bi-funnel" />
          </Action>
        )}
      </div>
    </FilterRow>
  );
};

const CastVotes = () => (
  <CastVotesSection className="d-flex align-items-center justify-content-between">
    <div>
      <div className="d-flex align-items-end">
        <H3>
          {seats - myVotesForHouse().length - state.selectedCandidates.length}
        </H3>
        <span>/</span>
        <H4>{seats}</H4>
        <span className="text-secondary">votes left</span>
        {state.selectedCandidates.length > 0 && (
          <Widget
            src={widgets.button}
            props={{
              Button: {
                size: "sm",
                className: "secondary",
                text: "Reset Selection",
                onClick: () =>
                  State.update({
                    selectedCandidates: [],
                    availableVotes: seats - myVotesForHouse().length,
                  }),
              },
            }}
          />
        )}
      </div>
      <Info className="text-secondary">
        <i class="bi bi-info-circle"></i>
        Make sure you selected all {seats} candidates
      </Info>
    </div>
    <Widget
      src={widgets.button}
      props={{
        Button: {
          disabled: state.selectedCandidates.length < seats,
          text: `Cast ${state.selectedCandidates.length || ""} Votes`,
          onClick: handleVote,
        },
      }}
    />
  </CastVotesSection>
);

return (
  <Container>
    <h1>{housesMapping[typ]}</h1>
    {state.candidates.length > 0 ? (
      <>
        <Filters />
        <CandidatesContainer>
          {state.candidates.map(([candidateId, votes], index) => (
            <CandidateList
              candidateId={candidateId}
              votes={votes}
              key={index}
            />
          ))}
        </CandidatesContainer>
      </>
    ) : (
      <div className="d-flex p-5 justify-content-center">
        There are no candidates found
      </div>
    )}
    <div>
      {isIAmHuman ? (
        <CastVotes />
      ) : (
        <Widget src={widgets.verifyHuman} props={{ title: "Want to vote?" }} />
      )}
    </div>
  </Container>
);
