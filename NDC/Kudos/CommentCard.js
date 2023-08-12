const { kudo, comment, isIAmHuman, kudosContract } = props;

const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
  addComment: "kudos.ndctools.near/widget/NDC.Kudos.AddComment",
};

const Container = styled.div`
  border-radius: 10px;
  background: #fff;

  @media (max-width: 768px) {
    background: #fff;
  }
`;

const Description = styled.div`
  width: 100%
  font-weight: 400;
  font-size: ${(props) => (props.secondary ? "12px" : "14px")};
  margin: ${(props) => (props.secondary ? "5px 0 0 0" : "12px 0")};
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
  color: ${(props) =>
    props.secondary ? "grey !important" : "black !important"};
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${(props) => (props.secondary ? "14px" : "16px")};
`;

const ReplyTo = styled.div`
  margin-bottom: 20px;
  background: #f8f8f9;
  padding: 10px;
  border-radius: 6px;
`;

const Hr = styled.div`
  background: #d0d6d9;
  border-radius: 3px;
  width: 2px;
  height: 40px;
  margin-right: 10px;
`;

const UserProfileDiv = styled.div`
  .userImg {
    width: ${(props) => (!props.secondary ? "32px" : "24px")};
    height: ${(props) => (!props.secondary ? "32px" : "24px")};
  }
`;

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

const handleShare = (e) => e.preventDefault();

State.init({
  isOpen: false,
  isEdit: false,
});

const UserProfile = ({ secondary, ownerId }) => (
  <UserProfileDiv
    secondary={secondary}
    className="d-flex justify-content-between align-items-center"
  >
    <div className="d-flex justify-content-between align-items-center w-100">
      <div className="d-flex gap-2 align-items-center">
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            accountId: ownerId,
            imageClassName: "userImg rounded-circle",
            style: {
              width: secondary ? "24px" : "32px",
              height: secondary ? "24px" : "32px",
            },
          }}
        />
        <StyledLink
          secondary={secondary}
          href={`https://near.org/near/widget/ProfilePage?accountId=${ownerId}`}
        >
          {ownerId}
        </StyledLink>
      </div>
    </div>
  </UserProfileDiv>
);

const trimMessage = (message) => {
  const postfix = message.length > 20 ? "..." : "";
  return `${message.slice(0, 20)}${postfix}`;
};

const base64decode = (encodedValue) => {
  let buff = Buffer.from(encodedValue, "base64");
  return JSON.parse(buff.toString("utf-8"));
};

return (
  <>
    <Container>
      <div className="p-3">
        {comment.parent_comment && (
          <ReplyTo className="d-flex align-items-center">
            <Hr />
            <div>
              <UserProfile
                secondary
                ownerId={base64decode(comment.parent_comment).s}
              />
              <Description secondary className="text-secondary">
                {trimMessage(base64decode(comment.parent_comment).m)}
              </Description>
            </div>
          </ReplyTo>
        )}
        <UserProfile ownerId={comment.owner_id} />
        <Description className="text-secondary">
          <Widget
            src="mob.near/widget/SocialMarkdown"
            props={{ text: comment.message }}
          />
        </Description>
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
            {/* {context.accountId === comment.owner_id && (
              <Widget
                src={widgets.styledComponents}
                props={{
                  Button: {
                    size: "sm",
                    text: "Edit",
                    className: "primary dark",
                    icon: <i className="bi bi-pencil"></i>,
                    onClick: () => State.update({ isOpen: true, isEdit: true }),
                  },
                }}
              />
            )} */}
            <Widget
              src={widgets.styledComponents}
              props={{
                Button: {
                  text: "Reply",
                  disabled: !isIAmHuman,
                  size: "sm",
                  icon: <i className="bi bi-arrow-90deg-left" />,
                  onClick: () => State.update({ isOpen: true, isEdit: false }),
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
          edit: false, //state.isEdit,
          comment: {
            id: comment.id,
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
