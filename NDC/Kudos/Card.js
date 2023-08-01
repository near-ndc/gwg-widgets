const {
  kudo,
  isIAmHuman,
  kudosContract,
  hideMintBtn,
  latestDing,
  inverseColor,
} = props;

const MIN_UPVOTE = 3;

const widgets = {
  styledComponents: "kudos-v1.gwg.testnet/widget/NDC.StyledComponents",
  kudoPage: "#/kudos-v1.gwg.testnet/widget/NDC.Kudos.Kudo.Page",
  addComment: "kudos-v1.gwg.testnet/widget/NDC.Kudos.Kudo.AddComment",
  mintSbt: "kudos-v1.gwg.testnet/widget/NDC.Kudos.Kudo.MintSbt",
};

const Container = styled.div`
  border-radius: 10px;
  background: ${(props) => (props.inverseColor ? "#fff" : "#f8f8f9")};
  border: ${(props) =>
    props.canMint
      ? "2px solid #9333EA"
      : props.ding
      ? "2px solid #DD5E56"
      : ""};
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

const Ding = styled.div`
  padding: 10px 0;
  background: #c23f38;
  border-radius: 8px 8px 0 0;
  font-size: 14px;
  color: #fff;

  b {
    margin-left: 5px;
    font-size: 16px;
  }

  p {
    margin-bottom: 0;
  }
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

const ImageTag = styled.div`
  height: 250px;
  width: 100%;
  background: url(${(props) => props.src}) no-repeat center center;
  background-size: cover;
  overflow: hidden;
  margin: 0 0 12px 0;
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

const KudoLink = styled.a`
  color: black;

  &:hover {
    text-decoration: none !important;
  }

  span {
    color: inherit !important;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    margin-left: 5px;
  }
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

const getDateAgo = () => {
  const now = new Date().getTime();
  const current = new Date(parseInt(kudo.created_at)).getTime();

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

const canMint =
  isIAmHuman &&
  kudo.kind === "k" &&
  kudo.upvotes >= MIN_UPVOTE &&
  kudo.receiver_id === context.accountId &&
  !hideMintBtn;

const receivedDing =
  kudo.kind === "d" &&
  kudo.id === latestDing.id &&
  kudo.receiver_id === context.accountId;

const handleUpvote = (kudo) => {
  Near.call(
    kudosContract,
    "upvote_kudos",
    {
      receiver_id: kudo.receiver_id,
      kudos_id: kudo.id,
    },
    "300000000000000",
    4000000000000000000000
  );
};

const handleShare = (e) => {
  e.preventDefault();
};

State.init({
  addCommentIsOpen: false,
  mintKudoIsOpen: false,
  comment: "",
});

const kudoTags = kudo.tags ? JSON.parse(kudo.tags).filter((el) => el) : [];

return (
  <>
    <Container
      canMint={canMint}
      ding={receivedDing}
      inverseColor={inverseColor}
    >
      {canMint ? (
        <Mint id="mint" onClick={() => State.update({ mintKudoIsOpen: true })}>
          <p className="text-white text-center align-items-center">
            <span className="gift">🎁</span>
            <b>Congratulations!</b>{" "}
          </p>
          <p className="text-white text-center align-items-center">
            <i>Click on the gift box to mint your Proof of Kudos</i>
          </p>
        </Mint>
      ) : (
        receivedDing && (
          <Ding id="mint">
            <p className="text-white text-center align-items-center">
              <b>Attention!</b> <i>You have received a Ding</i>
            </p>
          </Ding>
        )
      )}
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex gap-2 align-items-center">
              <KudoLink
                href={`${widgets.kudoPage}?accountId=${kudo.receiver_id}&kudoId=${kudo.id}`}
              >
                <Widget
                  src="rubycoptest.testnet/widget/ProfileImage"
                  props={{
                    accountId: kudo.receiver_id,
                    imageClassName: "rounded-circle w-100 h-100",
                    style: { width: "32px", height: "32px", marginRight: 5 },
                  }}
                />
                <span>To {kudo.receiver_id}</span>
              </KudoLink>
            </div>
            <Widget
              src={widgets.styledComponents}
              props={{
                Button: {
                  disabled:
                    !isIAmHuman ||
                    kudo.receiver_id === context.accountId ||
                    kudo.sender_id === context.accountId,
                  text: kudo.upvotes,
                  className:
                    kudo.kind === "k" ? "secondary dark" : "secondary danger",
                  onClick: (e) => handleUpvote(kudo),
                  image: {
                    url:
                      kudo.kind === "k"
                        ? isIAmHuman &&
                          kudo.receiver_id !== context.accountId &&
                          kudo.sender_id !== context.accountId
                          ? "https://bafkreihtxbozr3tpmzyijzvgmnzjhfnvfudu5twxi5e736omfor6rrbcde.ipfs.nftstorage.link"
                          : "https://bafkreiew3fr6fxxw6p5zibr7my7ykdqyppblaldsudsnropawfkghjkhuu.ipfs.nftstorage.link"
                        : "https://bafkreia6ux4wzaktmwxxnkzd7tbhpuxhlp352twzsunc6vetza76u6clwy.ipfs.nftstorage.link/",
                  },
                },
              }}
            />
          </div>
        </div>
        <Description className="text-secondary">{kudo.message}</Description>
        {kudo.icon && <ImageTag src={`https://ipfs.io/ipfs/${kudo.icon}`} />}
        {kudoTags.length > 0 && (
          <Tags className="d-flex gap-2">
            {kudoTags.map((tag) => (
              <Widget
                src={widgets.styledComponents}
                props={{
                  Tag: { title: tag },
                }}
              />
            ))}
          </Tags>
        )}

        <div className="d-flex justify-content-between align-items-center">
          <CreatedAt className="gap-1">
            <i className="bi bi-clock" />
            {getDateAgo()}
            {kudo.sender_id && (
              <div>
                by <b>{kudo.sender_id}</b>
              </div>
            )}
          </CreatedAt>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <Widget
              src={widgets.styledComponents}
              props={{
                Button: {
                  text: "Reply",
                  disabled: !isIAmHuman,
                  size: "sm",
                  icon: <i className="bi bi-arrow-90deg-left" />,
                  onClick: () => State.update({ addCommentIsOpen: true }),
                },
              }}
            />
          </div>
        </div>
      </div>
    </Container>

    {state.addCommentIsOpen && (
      <Widget
        src={widgets.addComment}
        props={{
          kudo,
          comment: {
            id: null,
            owner_id: kudo.receiver_id,
            message: kudo.message,
            created_at: kudo.created_at,
          },
          onHide: () => State.update({ addCommentIsOpen: false }),
        }}
      />
    )}
    {state.mintKudoIsOpen && (
      <Widget
        src={widgets.mintSbt}
        props={{
          kudoId: kudo.id,
          onHide: () => State.update({ mintKudoIsOpen: false }),
        }}
      />
    )}
  </>
);
