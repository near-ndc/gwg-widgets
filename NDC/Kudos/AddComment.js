const { onHide, kudo, comment, edit } = props;

const kudosContract = "kudos.ndctools.near";
const socialContract = "social.near";
const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
};

State.init({
  message: edit ? comment.message : "",
});

const Modal = styled.div`
  position: fixed;
  display: flex;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
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

const InputField = styled.div`
  margin: 20px 0;
`;

const Section = styled.div`
  margin: 12px 0;
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

const CreatedAt = styled.div`
  font-size: 12px;
  font-style: italic;
  font-weight: 300;

  b {
    font-weight: 500;
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
`;

const encryptComment = () => {
  let data = {
    m: state.message.slice(0, 1000),
    s: comment.owner_id.toString(),
    t: comment.created_at.toString(),
    p: comment.id.toString(),
  };

  let buff = new Buffer(JSON.stringify(data));

  console.log(buff.toString("base64"));
  return buff.toString("base64");
};

const handleAddComment = () => {
  const message = state.message.slice(0, 1000);
  const mentions = message.match(/@[\w][^\s]*/g);
  const mentionData =
    mentions.length > 0
      ? mentions.map((user) => {
          return {
            key: user.slice(1),
            value: { type: "mention" },
          };
        })
      : {};

  let data = [
    {
      contractName: kudosContract,
      methodName: "leave_comment",
      args: {
        parent_comment_id: comment.id,
        receiver_id: kudo.receiver_id,
        kudos_id: kudo.id,
        message,
      },
      gas: "250000000000000",
      deposit: 17000000000000000000000,
    },
  ];

  // if (mentionData.length > 0)
  //   data.push({
  //     contractName: socialContract,
  //     methodName: "set",
  //     args: {
  //       data: {
  //         index: {
  //           notify: JSON.stringify(mentionData),
  //         },
  //       },
  //     },
  //     gas: "30000000000000",
  //     deposit: 1000000000000000000000,
  //   });

  Near.call(data).then((data) => {
    onHide();
  });
};

const handleEditComment = () => {
  const targetComment = encryptComment();
  const comments = {
    ...kudo.comments,
    ...{ [comment.id.toString]: targetComment },
  };

  Social.set(
    {
      [kudosContract]: {
        kudos: {
          [kudo.receiver_id]: {
            [kudo.id]: {
              created_at: kudo.created_at,
              sender_id: kudo.sender_id,
              kind: kudo.kind,
              message: kudo.message,
              icon: kudo.icon,
              upvotes: kudo.upvotes,
              comments: comments,
              tags: JSON.stringify(kudo.tags),
            },
          },
        },
      },
    },
    {
      force: true,
      onCommit: onHide,
      onCancel: onHide,
    }
  ).then((_data) => onHide());
};

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

return (
  <Modal>
    <ComponentWrapper>
      <ModalContent>
        <h4>{edit ? "Edit message" : "Comment to Reply"}</h4>
        <div className="content">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Widget
                src="mob.near/widget/ProfileImage"
                props={{
                  accountId: comment.owner_id,
                  imageClassName: "rounded-circle w-100 h-100",
                  style: { width: "32px", height: "32px", marginRight: 5 },
                }}
              />
              <UserLink
                src={`https://near.org/near/widget/ProfilePage?accountId=${comment.owner_id}`}
                title={comment.owner_id}
              />
            </div>
            <CreatedAt>
              <i className="bi bi-clock" />
              {getDateAgo()}
            </CreatedAt>
          </div>
          <Description className="text-secondary">
            {comment.message}
          </Description>
          <hr className="text-secondary" />
          <Widget
            src={"rubycop.near/widget/Common.Compose"}
            props={{
              placeholder: "Left a comment",
              handleChange: (text) => {
                if (text.length > 1000) return;
                State.update({ message: text });
              },
            }}
          />
        </div>
        <div className="d-grid gap-3 d-flex align-items-center justify-content-end">
          <Widget
            src={widgets.styledComponents}
            props={{
              Button: {
                text: "Cancel",
                className: "secondary dark",
                onClick: onHide,
              },
            }}
          />
          <Widget
            src={widgets.styledComponents}
            props={{
              Button: {
                text: "Submit",
                onClick: () => handleAddComment(),
              },
            }}
          />
        </div>
      </ModalContent>
    </ComponentWrapper>
  </Modal>
);
