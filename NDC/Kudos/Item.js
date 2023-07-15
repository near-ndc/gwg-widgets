const { kudo, isIAmHuman, kudosContract, onClick } = props;

const widget = {
  button: "rubycoptest.testnet/widget/NDC.StyledComponents",
};

const Container = styled.div`
  border-radius: 10px;
  background: #f8f8f9;
  border: ${(props) => (props.canMint ? "2px solid #9333EA" : "")};

  @media (max-width: 768px) {
    background: #fff;
  }
`;

const InputField = styled.div`
  margin: 20px 0;
`;

const Mint = styled.div`
  padding: 10px 0;
  background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);
  border-radius: 8px 8px 0 0;
  font-size: 14px;

  span.gift {
    font-size: 20px;
  }
  b {
    margin-left: 5px;
    font-size: 16px;
  }

  p {
    margin-bottom: 0;
  }
`;

const UpvoteButton = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: ${(props) => (props.disabled ? "#C3CACE" : "#9333EA")};
  border: 1px solid #9333ea;
  border-color: ${(props) => (props.disabled ? "#C3CACE" : "")};
`;

const ViewButton = styled.button`
  padding: 2px 12px;
  border-radius: 8px;
  background: #fff;
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  color: #9333ea;
  border: 1px solid #9333ea;
`;

const Description = styled.div`
  max-height: 100px;
  white-space: pre-line;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 14px;
  margin: 12px 0;
`;

const Tags = styled.div`
  font-size: 12px;
  margin-bottom: 12px;
`;

const CreatedAt = styled.div`
  font-size: 12px;
  font-style: italic;
  font-weight: 300;

  b {
    font-weight: 500;
  }
`;

const Tag = styled.div`
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 100px;
  color: #9333ea;
  border: 1px solid #9333ea;
  background: linear-gradient(
    90deg,
    rgba(147, 51, 234, 0.1) 0%,
    rgba(79, 70, 229, 0.1) 100%
  );
`;

const StyledLink = styled.a`
  color: inherit !important;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  margin-left: 5px;
`;

const Modal = styled.div`
  position: fixed;
  z-index: 101;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(128, 128, 128, 0.65);
`;

const ComponentWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalContent = styled.div`
  background: #f8f8f9;
  margin: 20% auto;
  padding: 20px;
  border-radius: 10px;
  width: 50%;

  @media (max-width: 768px) {
    width: 90%;
  }

  .content {
    margin: 18px 0;

    h6 {
      margin-bottom: -10px;
    }
  }
`;

const UserLink = ({ title, src }) => (
  <>
    <StyledLink href={src}>{title}</StyledLink>
  </>
);

const getDateAgo = () => {
  const now = new Date().getTime();
  const current = new Date(parseInt(kudo.createdAt)).getTime();

  const diff = now - current;
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days > 0) return `${days} days ago`;
  if (hours > 0) return `${hours} hours ago`;
  if (minutes > 0) return `${minutes} minutes ago`;
  if (seconds > 0) return `${seconds} seconds ago`;

  return "";
};

const canMint = kudo.upvotes >= 1;

const handleMintSBT = (kudo) => {
  Near.call(
    kudosContract,
    "exchange_kudos_for_sbt",
    {
      kudos_id: kudo.id,
    },
    "300000000000000"
  );
};

const handleLeaveComment = (kudo, comment) => {
  Near.call(
    kudosContract,
    "leave_comment",
    {
      receiver_id: kudo.accountId,
      kudos_id: kudo.id,
      text: comment.slice(0, 1000),
    },
    "300000000000000"
  );
};

const handleUpvote = (kudo) => {
  Near.call(
    kudosContract,
    "upvote_kudos",
    {
      receiver_id: kudo.accountId,
      kudos_id: kudo.id,
    },
    "300000000000000",
    10000000000000000000000
  );
};

const handleShare = (e) => {
  e.preventDefault();
};

State.init({
  isOpen: false,
  comment: "",
});

const Content = () => (
  <ModalContent>
    <h4>Comment to Reply</h4>
    <div className="content">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Widget
            src="rubycoptest.testnet/widget/ProfileImage"
            props={{
              accountId: kudo.accountId,
              imageClassName: "rounded-circle w-100 h-100",
              style: { width: "32px", height: "32px", marginRight: 5 },
            }}
          />
          <UserLink
            src={`https://wallet.near.org/profile/${kudo.accountId}`}
            title={kudo.accountId}
          />
        </div>
        <CreatedAt>
          <i className="bi bi-clock" />
          {getDateAgo()}
        </CreatedAt>
      </div>
      <Description className="text-secondary">{kudo.description}</Description>
      <hr className="text-secondary" />
      <h6>Reply</h6>
      <InputField>
        <textarea
          className="form-control w-100"
          rows="5"
          value={state.comment}
          onChange={(e) => {
            const text = e.target.value;
            if (text.length > 1000) return;

            State.update({ comment: text });
          }}
        />
      </InputField>
      <small>{1000 - state.comment.length} characters left</small>
    </div>
    <div className="d-grid gap-3 d-flex align-items-center justify-content-end">
      <Widget
        src={widget.button}
        props={{
          Button: {
            text: "Cancel",
            className: "secondary",
            onClick: () => State.update({ isOpen: false }),
          },
        }}
      />
      <Widget
        src={widget.button}
        props={{
          Button: {
            text: "Submit",
            onClick: () => {
              State.update({ isOpen: false });
              handleLeaveComment(kudo, state.comment);
            },
          },
        }}
      />
    </div>
  </ModalContent>
);

return (
  <>
    <Container canMint={canMint}>
      {canMint && (
        <Mint id="mint" onClick={() => handleMintSBT(kudo)}>
          <p className="text-white text-center align-items-center">
            <span className="gift">🎁</span>
            <b>Congratulations!</b>{" "}
            <i>Click on the gift box to mint your Proof of Kudos</i>
          </p>
        </Mint>
      )}
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center">
            <Widget
              src="rubycoptest.testnet/widget/ProfileImage"
              props={{
                accountId: kudo.accountId,
                imageClassName: "rounded-circle w-100 h-100",
                style: { width: "32px", height: "32px", marginRight: 5 },
              }}
            />
            <UserLink
              src={`https://wallet.near.org/profile/${kudo.accountId}`}
              title={kudo.accountId}
            />
          </div>
          {kudo.upvotes !== undefined && (
            <div className="d-flex justify-content-between align-items-center gap-2">
              <UpvoteButton
                value="action"
                onClick={(e) => {
                  handleUpvote(kudo);
                }}
                disabled={!isIAmHuman}
              >
                {kudo.upvotes}
                <Widget
                  src="rubycoptest.testnet/widget/Image"
                  props={{
                    image: {
                      url: isIAmHuman
                        ? "https://bafkreihtxbozr3tpmzyijzvgmnzjhfnvfudu5twxi5e736omfor6rrbcde.ipfs.nftstorage.link"
                        : "https://bafkreiew3fr6fxxw6p5zibr7my7ykdqyppblaldsudsnropawfkghjkhuu.ipfs.nftstorage.link",
                    },
                    style: {
                      height: "15px",
                      marginBottom: "3px",
                    },
                    alt: "kudos",
                    fallbackUrl:
                      "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
                  }}
                />
              </UpvoteButton>
            </div>
          )}
        </div>
        <Description className="text-secondary">{kudo.description}</Description>
        <Tags className="d-flex gap-2">
          {kudo.tags && kudo.tags.map((tag) => <Tag>#{tag}</Tag>)}
        </Tags>
        <div className="d-flex justify-content-between align-items-center">
          <CreatedAt>
            <i className="bi bi-clock" />
            {getDateAgo()}
            {kudo.requesterId && (
              <>
                by <b>{kudo.requesterId}</b>
              </>
            )}
          </CreatedAt>
          <div className="d-flex justify-content-between align-items-center gap-2">
            {onClick && <ViewButton onClick={onClick}>View</ViewButton>}
            <Widget
              src="rubycoptest.testnet/widget/NDC.StyledComponents"
              props={{
                Button: {
                  text: "Reply",
                  disabled: !isIAmHuman,
                  size: "sm",
                  icon: <i className="bi bi-arrow-90deg-left" />,
                  onClick: () => State.update({ isOpen: true }),
                },
              }}
            />
          </div>
        </div>
      </div>
    </Container>

    {state.isOpen && (
      <Modal isOpen={state.isOpen}>
        <ComponentWrapper>
          <Content />
        </ComponentWrapper>
      </Modal>
    )}
  </>
);
