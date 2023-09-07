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
  width: 100%;
`;

const ImgContainer = styled.div`
  img {
    border-radius: 50%;
    height: 32px;
    max-height: "32px";
  }
`;

const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
};

const housesMapping = {
  CouncilOfAdvisors:
    "https://bafkreidejnek5zzwlhd3lxnr7s3tvtrgul6jobfpikbs7zjkpuovxdz7je.ipfs.nftstorage.link",
  HouseOfMerit:
    "https://bafkreihoomeeaeyqerqftn3n7yb2jrnmqtpwgpsl3xpelek6qmly3qzob4.ipfs.nftstorage.link",
  TransparencyCommission:
    "https://bafkreihcog3rs2gj4wgwfixk6yqir7k3csyaqiqwcvm2gedlh6dlvr7ik4.ipfs.nftstorage.link",
  SetupPackage:
    "https://bafkreidsg3gntb4grebr6rpvffhzkwdt2siel7ucl3hpsj5i7qqu426dgq.ipfs.nftstorage.link",
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
          <div className="d-flex align-items-center">
            <div>
              {vote.house !== "SetupPackage" ? (
                <Widget
                  src="mob.near/widget/ProfileImage"
                  props={{
                    accountId: vote.candidate,
                    imageClassName: "rounded-circle w-100 h-100",
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
          <ImgContainer>
            <img src={housesMapping[vote.house]} />
          </ImgContainer>
        </VoteRow>
      ))}
  </List>
);
