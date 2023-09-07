const { candidateId, iahToken, electionContract, ids } = props;
const apiKey = api_key ?? "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

State.init({
  voters: [],
});

asyncFetch(
  `https://api.pikespeak.ai/election/votes-by-candidate?contract=${electionContract}&candidate=${candidateId}`,
  { headers: { "x-api-key": apiKey } }
).then((resp) => {
  const voters = resp.body.filter((vote) =>
    ids.includes(parseInt(vote.proposal_id))
  );

  State.update({ voters, reload: false });
});

const VotersContainer = styled.div`
  padding: 5px 0;
`;

const Bookmark = styled.div`
  width: 90px;

  @media (max-width: 400px) {
    width: auto;
    margin-right: 15px;
  }
`;

const Expand = styled.div`
  width: 35px;

  @media (max-width: 400px) {
    width: 20px;
    margin-right: 10px;
  }
`;

const VoterItem = styled.div`
  font-size: 14px;
  padding: 0 20px;
  height: 44px;
  border-bottom: 1px solid #d0d6d9;

  &:last-child {
    border: 0;
  }
`;

const StyledLink = styled.a`
  color: inherit !important;
  width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  padding-top: 2px;

  @media (max-width: 400px) {
    width: 60px;
  }
`;

const TxnSection = styled.div`
  white-space: nowrap;
  overflow: hidden;
`;

const TxnLink = styled.a`
  color: inherit !important;
  width: 235px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserLink = ({ title, src }) => (
  <div className="d-flex mr-3">
    <StyledLink href={src}>{title}</StyledLink>
    <span>
      <i class="bi bi-arrow-up-right" />
    </span>
  </div>
);

return (
  <VotersContainer>
    {state.voters.map((voter) => (
      <VoterItem className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center w-100">
          <Expand />
          {iahToken && <Bookmark />}
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              accountId: voter.voter,
              imageClassName: "rounded-circle w-100 h-100",
              style: { width: "24px", height: "24px", marginRight: 5 },
            }}
          />
          <UserLink
            src={`https://near.org/near/widget/ProfilePage?accountId=${voter.voter}`}
            title={voter.voter}
          />
        </div>
        <TxnSection className="d-flex justify-content-end align-items-center w-100">
          <TxnLink
            role="button"
            target="_blank"
            href={`https://explorer.mainnet.near.org/transactions/${voter.transaction_id}`}
          >
            {voter.transaction_id}
          </TxnLink>
          <span>
            <i class="bi bi-arrow-up-right" />
          </span>
        </TxnSection>
      </VoterItem>
    ))}
  </VotersContainer>
);
