const { myVotes } = props;

const VoteRow = styled.a`
  text-decoration: none !important;
  padding: 10px 0;
  small {
    font-weight: 400;
    font-size: 12px;
  }
`;

const StyledLink = styled.a`
  color: black;
  text-decoration: none !important;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const List = styled.div`
  overflow-y: scroll;
  height: 300px;
  width: 100%;
`;

const BPImg = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 8px;
`;

const Tag = styled.div`
  margin-left: 10px;
`;

const AccountBlock = styled.div`
  width: 84px;
`;

const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
};

const housesMapping = {
  CouncilOfAdvisors: "Council Of Advisors",
  HouseOfMerit: "House of Merit",
  TransparencyCommission: "Transparency Commission",
  SetupPackage: "Budget Package",
};

return (
  <List>
    {myVotes
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .map((vote) => (
        <VoteRow
          href={`https://explorer.mainnet.near.org/transactions/${vote.transaction_id}`}
          className="d-flex justify-content-between align-items-center"
        >
          <div className="d-flex align-items-center w-50">
            <div>
              {vote.house !== "SetupPackage" ? (
                <Widget
                  src="mob.near/widget/ProfileImage"
                  props={{
                    accountId: vote.candidate,
                    imageClassName: "rounded-circle w-100 mh-100",
                    style: { width: "32px", height: "32px", marginRight: 8 },
                  }}
                />
              ) : (
                <BPImg
                  className="rounded-circle"
                  src="https://bafkreidsg3gntb4grebr6rpvffhzkwdt2siel7ucl3hpsj5i7qqu426dgq.ipfs.nftstorage.link"
                />
              )}
            </div>
            <AccountBlock className="d-flex flex-column">
              <StyledLink
                href={`https://near.org/near/widget/ProfilePage?accountId=${vote.candidate}`}
              >
                {vote.candidate}
              </StyledLink>

              <small className="text-secondary">
                {new Date(vote.timestamp).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                })}
                &middot;
                {new Date(vote.timestamp).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                })}
              </small>
            </AccountBlock>
          </div>
          <Tag className="w-50">
            <Widget
              src={widgets.styledComponents}
              props={{
                Tag: {
                  title: housesMapping[vote.house],
                  className: "dark",
                },
              }}
            />
          </Tag>
        </VoteRow>
      ))}
  </List>
);
