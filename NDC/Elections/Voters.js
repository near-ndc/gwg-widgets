const { candidateId } = props;
const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

State.init({
  voters: [],
});

asyncFetch(
  `https://api.pikespeak.ai/election/votes-by-candidate?candidate=${candidateId}`,
  {
    headers: {
      "x-api-key": apiKey,
    },
  }
).then((resp) => {
  State.update({ voters: resp.body });
});

const VotersContainer = styled.div`
  padding: 5px 0;
`;

const Bookmark = styled.div`
  width: 100px;

  #bookmark.bi-bookmark-fill {
    color: ${(props) => (props.selected ? "#fff" : "#4F46E5")};
  }
`;

const VoterItem = styled.div`
  font-size: 14px;
  padding: 0 20px;
  height: 48px;
  border-bottom: 1px solid #d0d6d9;

  &:last-child {
    border: 0;
  }
`;

const StyledLink = styled.a`
  color: inherit !important;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TxnLink = styled.a`
  color: inherit !important;
  width: 310px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserLink = ({ title, src }) => (
  <>
    <StyledLink href={src}>{title}</StyledLink>
    <span>
      <i class="bi bi-arrow-up-right" />
    </span>
  </>
);

return (
  <VotersContainer>
    {state.voters.map((voter) => (
      <VoterItem className="d-flex align-items-center justify-content-between">
        <div className="d-flex">
          <Bookmark />
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              accountId: voter.voter,
              imageClassName: "rounded-circle w-100 h-100",
              style: { width: "24px", height: "24px", marginRight: 4 },
            }}
          />
          <UserLink
            src={`https://wallet.near.org/profile/${voter.voter}`}
            title={voter.voter}
          />
        </div>
        <div className="d-flex align-items-center">
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
        </div>
      </VoterItem>
    ))}
  </VotersContainer>
);
