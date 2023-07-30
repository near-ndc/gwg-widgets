const { kudo, comment, isIAmHuman, kudosContract } = props;

const widgets = {
  styledComponents: "kudos-v1.gwg.testnet/widget/NDC.StyledComponents",
  addComment: "kudos-v1.gwg.testnet/widget/NDC.Kudos.Kudo.AddComment",
};

const Container = styled.div`
  border-radius: 10px;
  background: #f8f8f9;

  @media (max-width: 768px) {
    background: #fff;
  }
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

const CreatedAt = styled.div`
  font-size: 12px;
  font-style: italic;
  font-weight: 300;

  b {
    font-weight: 500;
  }
`;

const StyledLink = styled.a`
  color: inherit !important;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  margin-left: 5px;
`;

const UserLink = ({ title, src }) => (
  <StyledLink href={src}>{title}</StyledLink>
);

const getDateAgo = () => {
  const now = new Date().getTime();
  const current = new Date(parseInt(comment.created_at)).getTime();

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

const handleLeaveComment = (kudo, comment) => {
  Near.call(
    kudosContract,
    "leave_comment",
    {
      receiver_id: kudo.receiver_id,
      kudos_id: kudo.id,
      text: comment.slice(0, 1000),
    },
    "300000000000000"
  );
};

const handleShare = (e) => {
  e.preventDefault();
};

State.init({
  isOpen: false,
  comment: "",
});

return (
  <>
    <Container>
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex gap-2 align-items-center">
              <Widget
                src="rubycoptest.testnet/widget/ProfileImage"
                props={{
                  accountId: comment.owner_id,
                  imageClassName: "rounded-circle w-100 h-100",
                  style: { width: "32px", height: "32px", marginRight: 5 },
                }}
              />
              <UserLink
                src={`https://www.near.org/near/widget/ProfilePage?accountId=${comment.owner_id}`}
                title={`${comment.owner_id}`}
              />
            </div>
          </div>
        </div>
        <Description className="text-secondary">{comment.message}</Description>
        <div className="d-flex justify-content-between align-items-center">
          <CreatedAt className="gap-1">
            <i className="bi bi-clock" />
            {getDateAgo()}
          </CreatedAt>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <Widget
              src={widgets.styledComponents}
              props={{
                Button: {
                  size: "sm",
                  className: "secondary dark",
                  icon: <i className="bi bi-share fs-6"></i>,
                },
              }}
            />
            <Widget
              src={widgets.styledComponents}
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
      <Widget
        src={widgets.addComment}
        props={{
          kudo,
          comment: {
            owner_id: comment.owner_id,
            message: comment.message,
            created_at: comment.created_at,
          },
          onHide: () => State.update({ isOpen: false }),
        }}
      />
    )}
  </>
);
