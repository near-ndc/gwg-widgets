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
  voters: "election.ndctools.near/widget/NDC.Elections.Voters",
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
  modal: "nomination.ndctools.near/widget/NDC.Modal",
  verifyHuman: "nomination.ndctools.near/widget/NDC.VerifyHuman",
};

const POLICY_HASH =
  "f1c09f8686fe7d0d798517111a66675da0012d8ad1693a47e0e2a7d3ae1c69d4";

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

  @media (max-width: 400px) {
    width: 60px;
  }
`;

const CandidateItem = styled.div`
  padding: 0 20px;
  height: 48px;
  border-radius: 12px;
  margin-bottom: 8px;
  border: 1px solid;
  background: ${(props) =>
    props.winnerId ? "#239F28" : props.selected ? "#4aa6ee" : "#F8F8F9"};
  border-color: ${(props) =>
    props.winnerId ? "#239F28" : props.selected ? "#4aa6ee" : "#F8F8F9"};
  color: ${(props) => (props.selected || props.winnerId ? "white" : "inherit")};

  &:hover {
    background: ${(props) =>
      props.winnerId ? "#239F28" : props.selected ? "#4aa6ee" : "#d4e4f461"};
  
  @media (max-width: 400px) {
    padding: 0 10px;
  }
`;

const Candidates = styled.div`
  cursor: pointer;
`;

const Bookmark = styled.div`
  width: 90px;
  cursor: pointer;

  #bookmark.bi-bookmark-fill {
    color: ${(props) =>
      props.winnerId || props.selected ? "#fff" : "#4F46E5"};
  }

  @media (max-width: 400px) {
    width: auto;
    margin-right: 15px;
  }
`;

const Expand = styled.div`
  width: 35px;
  cursor: pointer;

  @media (max-width: 400px) {
    width: 20px;
    margin-right: 10px;
  }
`;

const Votes = styled.div``;

const Action = styled.div``;

const Nomination = styled.div``;

const FilterRow = styled.div`
  padding: 15px 20px;
  font-size: 13px;
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

const Winner = styled.i`
  margin-left: 10px;
  font-size: 14px;
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
const housesMapping = {
  CouncilOfAdvisors: "Council Of Advisors",
  HouseOfMerit: "House of Merit",
  TransparencyCommission: "Transparency Commission",
};

const alreadyVoted = (candidateId) =>
  myVotes.some((voter) => voter.candidate === candidateId);

const alreadyVotedForHouse = () => myVotes.some((voter) => voter.house === typ);

const filteredCandidates = () => {
  let candidates = result;

  if (state.filterOption === "bookmark")
    candidates = state.filter.bookmark
      ? state.candidates.filter(([candidateId, _votes], _index) =>
          state.bookmarked.includes(candidateId)
        )
      : result;
  if (state.filterOption === "candidates")
    candidates = candidates.sort((a, b) =>
      state.filter.candidates
        ? a[0].localeCompare(b[0])
        : b[0].localeCompare(a[0])
    );
  if (state.filterOption === "votes")
    candidates = candidates.sort((a, b) =>
      state.filter.votes ? a[1] - b[1] : b[1] - a[1]
    );
  if (state.filterOption === "my_votes")
    candidates = state.filter.my_votes
      ? state.candidates.filter(([candidateId, _votes], _index) =>
          alreadyVoted(candidateId)
        )
      : result;
  if (candidateId)
    candidates = result.filter(([candidate, _vote], _index) =>
      candidate.toLowerCase().includes(candidateId.toLowerCase())
    );

  return candidates;
};

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

const handleVote = () =>
  Near.call(
    electionContract,
    "vote",
    { prop_id: id, vote: state.selectedCandidates },
    "70000000000000",
    2000000000000000000000
  ).then((data) => State.update({ bountyProgramModal: false }));

const handleAcceptToS = () => {
  State.update({ loading: true });

  Near.call(
    electionContract,
    "accept_fair_voting_policy",
    { policy: POLICY_HASH },
    "70000000000000",
    1000000000000000000000
  ).then((data) =>
    State.update({
      showToSModal: false,
      tosAgreement: true,
      bountyProgramModal: true,
      loading: false,
    })
  );
};

const filterBy = (option) => {
  let filterOption = "";
  let filter = {};

  if (option.bookmark) {
    filterOption = "bookmark";
    filter = { bookmark: !state.filter.bookmark };
  }
  if (option.candidates) {
    filterOption = "candidates";
    filter = { candidates: !state.filter.candidates };
  }
  if (option.votes) {
    filterOption = "votes";
    filter = { votes: !state.filter.votes };
  }
  if (option.my_votes) {
    filterOption = "my_votes";
    filter = { my_votes: !state.filter.my_votes };
  }

  State.update({ filterOption, filter });
};

const loadInitData = () => {
  const policy = Near.view(electionContract, "accepted_policy", {
    user: context.accountId,
  });

  State.update({
    candidates: filteredCandidates(),
    tosAgreement: !!policy,
    bountyProgramModal: !!policy,
  });
};

const loadSocialDBData = () => {
  let _bookmarked = Social.index(currentUser, `${ndcOrganization}/${typ}`);

  State.update({
    bookmarked:
      _bookmarked && _bookmarked[_bookmarked.length - 1]
        ? _bookmarked[_bookmarked.length - 1].value
        : [],
  });
};

const myVotesForHouse = () => myVotes.filter((vote) => vote.house === typ);
const isVisible = () => myVotesForHouse().length > 0 || winnerIds.length > 0;

State.init({
  start: true,
  loading: false,
  availableVotes: seats - myVotesForHouse().length,
  selected: null,
  bookmarked: [],
  tosAgreementInput: false,
  tosAgreement: false,
  selectedCandidates: [],
  voters: [],
  candidates: result,
  filter: {
    bookmark: false,
    candidates: false,
    votes: false,
    my_votes: false,
  },
  filterOption: "",
  showToSModal: false,
  bountyProgramModal: false,
});

loadInitData();
loadSocialDBData();

const UserLink = ({ title, src }) => (
  <div className="d-flex mr-3">
    <StyledLink href={src} target="_blank">
      {title}
    </StyledLink>
    <div>
      <Icon className="bi bi-arrow-up-right" />
    </div>
  </div>
);

const Loader = () => (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

const CandidateList = ({ candidateId, votes }) => (
  <div>
    <CandidateItem
      className="d-flex align-items-center justify-content-between"
      selected={state.selected === candidateId}
      winnerId={winnerIds.includes(candidateId)}
    >
      <div className="d-flex w-100 align-items-center">
        {isVisible() && (
          <Expand>
            <i
              className={`${
                state.selected === candidateId
                  ? "bi bi-chevron-down"
                  : "bi bi-chevron-right"
              }`}
              onClick={(e) =>
                State.update({
                  selected: state.selected === candidateId ? null : candidateId,
                })
              }
            />
          </Expand>
        )}

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
        <div className="d-flex align-items-center">
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              accountId: candidateId,
              imageClassName: "rounded-circle w-100 h-100",
              style: { width: "24px", height: "24px", marginRight: 5 },
            }}
          />
          <UserLink
            src={`https://near.org/near/widget/ProfilePage?accountId=${candidateId}`}
            title={candidateId}
          />
          {winnerIds.includes(candidateId) && (
            <Winner className="bi bi-trophy p-1" />
          )}
        </div>
      </div>
      <div className="d-flex w-100 align-items-center justify-content-between">
        <Widget
          src={widgets.styledComponents}
          props={{
            Link: {
              size: "sm",
              className: "secondary dark",
              text: "Nomination",
              icon: <i className="bi bi-box-arrow-up-right" />,
              href: ref_link,
              inverse:
                state.selected === candidateId ||
                winnerIds.includes(candidateId),
            },
          }}
        />
        {isVisible() && <Votes>{votes}</Votes>}
        {isIAmHuman && (
          <Votes>
            <input
              id="input"
              disabled={alreadyVotedForHouse()}
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
    {state.selected === candidateId && isVisible() && (
      <Widget src={widgets.voters} props={{ candidateId, isIAmHuman }} />
    )}
  </div>
);

const Filters = () => (
  <FilterRow className="d-flex align-items-center justify-content-between">
    <div className="d-flex align-items-center w-100">
      {isVisible() && <Expand />}
      {isIAmHuman && (
        <Bookmark
          role="button"
          className="text-secondary"
          onClick={() => filterBy({ bookmark: true })}
        >
          <small>Bookmark</small>
          <i
            className={`bi ${
              state.filter.bookmark ? "bi-funnel-fill" : "bi-funnel"
            }`}
          />
        </Bookmark>
      )}
      <Candidates
        className="text-secondary"
        onClick={() => filterBy({ candidates: true })}
      >
        <small>Candidate</small>
        <i
          className={`bi ${
            state.filter.candidates ? "bi-arrow-down" : "bi-arrow-up"
          }`}
        />
      </Candidates>
    </div>
    <div className="d-flex w-100 align-items-center justify-content-between">
      <Nomination className="text-secondary text-end text-md-start">
        <small>Nomination</small>
      </Nomination>
      {isVisible() && (
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
      )}
      {isIAmHuman && (
        <Action
          role="button"
          className="text-secondary"
          onClick={() => filterBy({ my_votes: true })}
        >
          <small>My votes</small>
          <i
            className={`bi ${
              state.filter.my_votes ? "bi-funnel-fill" : "bi-funnel"
            }`}
          />
        </Action>
      )}
    </div>
  </FilterRow>
);

const CastVotes = () => (
  <CastVotesSection className="d-flex align-items-center justify-content-between gap-3">
    <div className="wrapper">
      <div className="d-flex align-items-end">
        <H3>
          {alreadyVotedForHouse()
            ? 0
            : seats -
              myVotesForHouse().length -
              state.selectedCandidates.length}
        </H3>
        <span>/</span>
        <H4>{seats}</H4>
        <span className="text-secondary">votes left</span>
      </div>
      <Info className="text-secondary">
        <i class="bi bi-info-circle"></i>
        {alreadyVotedForHouse() ? (
          <span>You're already voted for {housesMapping[typ]}</span>
        ) : (
          <span>Make sure you selected {seats} candidates</span>
        )}
      </Info>
    </div>
    <ActionSection className="d-flex gap-2">
      {state.selectedCandidates.length > 0 && (
        <Widget
          src={widgets.styledComponents}
          props={{
            Button: {
              className: "secondary dark justify-content-center text-nowrap",
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
      <Widget
        src={widgets.styledComponents}
        props={{
          Button: {
            className: "primary justify-content-center",
            disabled: state.selectedCandidates.length === 0,
            text: `Cast ${state.selectedCandidates.length || ""} Votes`,
            onClick: () =>
              state.tosAgreement
                ? State.update({ bountyProgramModal: true })
                : State.update({ showToSModal: true }),
          },
        }}
      />
    </ActionSection>
  </CastVotesSection>
);

const ALink = ({ title, href }) => (
  <a href={href} target={"_blank"} rel={"noopener"}>
    {title}
  </a>
);

return (
  <>
    {state.showToSModal && (
      <Widget
        src={widgets.modal}
        props={{
          title: (
            <div>
              <img src="https://bafkreidmuyeawyqduaotd27jozw5czdrm7t7w5hlcx5nfjzjjxxzvyhkyi.ipfs.nftstorage.link/" />
              <div className="mt-4">
                Before you vote, please review the Fair Voting Policy.
              </div>
            </div>
          ),
          description: (
            <>
              Please make sure to read and understand the{" "}
              <ALink
                title="Fair Voting Policy."
                href="https://bafkreieiqabf6k675f3doqdztej53qmiybmhiaqgjaqmj673wbxxq5muke.ipfs.nftstorage.link/"
              />
              which outlines the responsibilities of each voter.
            </>
          ),
          content: (
            <Section className="d-flex justify-content-center w-100 my-4">
              <input
                type="checkbox"
                className="form-check-input"
                checked={state.tosAgreementInput}
                onClick={() =>
                  State.update({ tosAgreementInput: !state.tosAgreementInput })
                }
              />
              I agree with{" "}
              <ALink
                title="Fair Voting Policy."
                href="https://bafkreieiqabf6k675f3doqdztej53qmiybmhiaqgjaqmj673wbxxq5muke.ipfs.nftstorage.link/"
              />
            </Section>
          ),
          Button: {
            title: state.loading ? (
              <Loader />
            ) : (
              <>Agree to Fair Voting Policy</>
            ),
            disabled: !state.tosAgreementInput,
            onCancel: () => State.update({ showToSModal: false }),
            onSubmit: handleAcceptToS,
          },
        }}
      />
    )}
    {state.bountyProgramModal && (
      <Widget
        src={widgets.modal}
        props={{
          title: (
            <div>
              <img src="https://bafkreidmuyeawyqduaotd27jozw5czdrm7t7w5hlcx5nfjzjjxxzvyhkyi.ipfs.nftstorage.link/" />
              <div className="mt-4">You are about to cast your votes.</div>
            </div>
          ),
          description: (
            <>
              <p>
                Do you know about the{" "}
                <ALink
                  title="Whistleblower Bounty Program"
                  href="https://medium.com/@neardigitalcollective/introducing-ndc-whistleblower-bounty-program-d4fe1b9fc5a0"
                />
                ? The Whistleblower Bounty Program offers up to 2,000 NEAR for
                whistleblowers who come forward to share instances of vote
                buying, account buying, election fraud, and other violations of
                the{" "}
                <ALink
                  title="Fair Voting Policy"
                  href="https://bafkreieiqabf6k675f3doqdztej53qmiybmhiaqgjaqmj673wbxxq5muke.ipfs.nftstorage.link/"
                />
                .
              </p>
              <p>
                You will be bonding xN during the election period. This bond
                will be returned to you after the election results are reviewed
                and validated.
              </p>
              <p>
                Make sure you vote for all the seats in this house. You can only
                vote once and past votes cannot be changed.
              </p>
            </>
          ),
          content: (
            <Section className="d-flex d-flex justify-content-center w-100 my-4">
              I understand the{" "}
              <ALink
                title="Whistleblower Bounty Program"
                href="https://medium.com/@neardigitalcollective/introducing-ndc-whistleblower-bounty-program-d4fe1b9fc5a0"
              />
              .
            </Section>
          ),
          Button: {
            title: "Cast Votes",
            disabled:
              state.selectedCandidates.length === 0 || alreadyVotedForHouse(),
            onCancel: () => State.update({ bountyProgramModal: false }),
            onSubmit: handleVote,
          },
        }}
      />
    )}

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
  </>
);
