const data = props;

State.init({
  verified: false,
  start: true,
  voted: false,
  shareText: "Copy link to the clipboard",
});

const nominationContract = "nominations-v1.gwg-testing.near";
const registryContract = "registry-v1.gwg-testing.near";
const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const widgets = {
  styledComponents: "rubycop.near/widget/NDC.StyledComponents",
};

const isHuman = Near.view(registryContract, "is_human", {
  account: context.accountId,
});

State.update({ verified: isHuman[0][1].length > 0 });

const httpRequestOpt = {
  headers: { "x-api-key": apiKey },
};

function getVerifiedHuman() {
  asyncFetch(
    `https://api.pikespeak.ai/nominations/is-upvoted-by?candidate=${data.indexerData.nominee}&upvoter=${context.accountId}`,
    httpRequestOpt
  ).then((res) => {
    State.update({ voted: res.body });
  });
}

if (state.start) {
  getVerifiedHuman();
  State.update({ start: false });
}

function handleUpVote() {
  Near.call(
    nominationContract,
    state.voted ? "remove_upvote" : "upvote",
    {
      candidate: data.indexerData.nominee,
    },
    300000000000000,
    state.voted ? 0 : 1000000000000000000000
  );
}

function handleShare() {
  console.log(copied);
  State.update({ shareText: "Copied" });
  clipboard.writeText(
    "https://near.org/#/yairnava.near/widget/NDC.Nomination.Candidate.Container?house=" +
      data.indexerData.house +
      "&candidate=" +
      data.indexerData.nominee
  );
}

function getComponentURL() {
  const url =
    "https%3A%2F%2Fnear.org%2F%23%2Fyairnava.near%2Fwidget%2FNDC.Nomination.Candidate.Container%3Fhouse%3D" +
    data.indexerData.house +
    "%26candidate%3D" +
    data.indexerData.nominee;
  return url;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;
  background: #f8f8f9;
  border-radius: 10px;
`;
const HeaderCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 12px;
  width: 100%;
`;
const ProfilePicture = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;
const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 70%;
`;
const HeaderTag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  height: 18px;
  background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);
  border-radius: 100px;
`;
const HeaderTagP = styled.p`
  height: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  display: flex;
  align-items: center;
  color: white;
  margin: 0;
`;
const HeaderContentText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
`;
const NominationName = styled.p`
  font-weight: 500;
  font-size: 14px;
  margin: 0;
  align-items: center;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const NominationUser = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  margin: 0px;
  line-height: 120%;
  display: flex;
  align-items: center;
  color: #828688;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const UpvoteButtonDisabled = styled.button`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  background: var(--buttons-disable, #c3cace);
  cursor: default !important;
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

const UpvoteCount = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  margin: 0px;
  background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
const Icon = styled.img`
  width: 17px;
  height: 17px;
`;
const CollapseCandidate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background: #ffffff;
  border-radius: 6px;
`;
const CollapseCandidateContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;
`;
const CollapseCandidateText = styled.p`
  width: 274px;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 120%;
  margin: 0px;
  margin-bottom: 3px;
  color: #000000;
`;
const DownArrow = styled.img`
  width: 16px;
  height: 16px;
`;
const CandidateTagContainer = styled.div`
  gap: 4px;
`;

const KeyIssues = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px;
  gap: 12px;
  background: #ffffff;
  border-radius: 6px;
  width: 100%;
`;
const KeyIssuesContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
  width: 100%;
`;
const KeyIssuesHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
`;
const KeyIssuesTitle = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 120%;
  margin-bottom: 0;
`;
const KeyIssuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  overflow-y: scroll;
  height: 250px;
  width: 100%;
`;
const KeyIssueTitle = styled.p`
  font-weight: 500;
  font-size: 11px;
  margin-bottom: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const KeyIssueDescription = styled.p`
  font-weight: 400;
  font-size: 11px;
  margin-bottom: 0;
`;
const KeyIssueSeparator = styled.div`
  height: 1px;
  margin: 7px 0 2px 0;
  background: rgba(208, 214, 217, 0.4);
`;
const LowerSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;
const LowerSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;
const ButtonsLowerSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 28px;
`;
const TextLowerSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
  width: 239px;
  height: 24px;

  flex-grow: 1;
`;
const ClockIcon = styled.img`
  width: 12px;
  height: 12px;
`;
const TimestampText = styled.div`
  font-style: italic;
  font-weight: 300;
  font-size: 11px;
  line-height: 14px;
  margin: 0px;
  gap: 2px;
  color: #000000;

  b {
    font-weight: 600;
  }
`;
const CommentsCounter = styled.p`
  width: 96px;
  height: 24px;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  margin: 0px;
  text-align: right;
  background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
  width: 87px;
  height: 28px;
`;
const TagSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  flex-wrap: wrap;
  overflow: hidden;
`;

const CommentButtonDisabled = styled.button`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  b
  background: var(--buttons-disable, #c3cace);
  cursor: default !important;
`;
const CommentButtonDiv = styled.button`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  b
  border-radius: 80px;
  background-image: linear-gradient(#f8f8f9, #f8f8f9),
    radial-gradient(circle at top left, #9333ea 0%, #4f46e5 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 4px;
`;
const CommentButtonCounter = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  margin: 0px;
  background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
const CommentButtonIcon = styled.img`
  width: 14px;
  height: 14px;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Dropbtn = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
`;

const DropdownContent = styled.div`
  display: none;
  font-size: 13px;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  border-radius: 8px;
  background: #ffffff;
  width: 200px;
  gap: 9px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 1;
  padding: 8px;
`;

const Element = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  width: 100%;
  &:hover {
    border-radius: 6px;
    background: #f8f8f9;
  }
`;

const ShareLink = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: start;
`;

const ShareIcon = styled.img`
  width: 20px;
`;

const DropdownContainerHover = styled.div`
  width: fit-content;
  float: right;
  &:hover ${DropdownContent} {
    display: flex;
  }
`;

const Separation = styled.div`
    margin-top: -196px;
    width: 200px;
    position: absolute;
  }
`;

const canUpvote =
  state.verified && context.accountId != data.indexerData.nominee;

const getShortUserName = (userId) => {
  if (userId.length === 64) return `${userId.slice(0, 4)}..${userId.slice(-4)}`;
  const name = userId.slice(0, -5); // truncate .near

  return name.length > 20 ? `${name.slice(0, 20)}...` : name;
};

const trimText = (text, limit) => {
  const _limit = limit ?? 200;
  const ending = text.length > _limit ? "..." : "";
  const trimmed = text.slice(0, limit ?? 200);

  return `${trimmed}${ending}`;
};

const keyIssues = [
  {
    title:
      "Involvement in the NEAR ecosystem, qualifications to be a candidate and reasons for being voted",
    desc: data.nominationData.HAYInvolve,
  },
  {
    title: "Strategy to develop the NEAR ecosystem",
    desc: data.nominationData.WIYStrategy,
  },
  {
    title: "Key Issue 1",
    desc: data.nominationData.Key_Issue_1,
  },
  {
    title: "Key Issue 2",
    desc: data.nominationData.Key_Issue_2,
  },
  {
    title: "Key Issue 3",
    desc: data.nominationData.Key_Issue_3,
  },
  {
    title: "Other Platform",
    desc: data.nominationData.addition_platform,
  },
];

return (
  <div className="p-2 col-lg-4 col-md-6 col-sm-12">
    <Card>
      {state.showModal && (
        <Widget
          src={`dokxo.near/widget/CommentCard`}
          props={{
            candidateOrReplay: true,
            username: data.indexerData.nominee,
            onClickConfirm: () => State.update({ showModal: false }),
            onClickCancel: () => State.update({ showModal: false }),
          }}
        />
      )}
      <HeaderCard className="d-flex justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <ProfilePicture
            src={
              data.imgURL
                ? data.imgURL
                : "https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmZBPPMKLdZG2zVpYaf9rcbtNfAp7c3BtsvzxzBb9pNihm?_gl=1*6avmrp*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzMzM2NC4zLjEuMTY4NjkzMzM4Ni4zOC4wLjA."
            }
            alt="pic"
          ></ProfilePicture>
          <HeaderContent>
            <Widget
              src={widgets.styledComponents}
              props={{
                Tag: {
                  title:
                    data.indexerData.house == "HouseOfMerit"
                      ? "House of Merit"
                      : data.indexerData.house == "CouncilOfAdvisors"
                      ? "Council of Advisors"
                      : "Transparency Commission",
                  className: "dark",
                },
              }}
            />
            <HeaderContentText>
              <NominationName>{data.profileData.name}</NominationName>
              <NominationUser>
                {getShortUserName(data.nominationData.profileAccount)}
              </NominationUser>
            </HeaderContentText>
          </HeaderContent>
        </div>
        {canUpvote && (
          <Widget
            src={widgets.styledComponents}
            props={{
              Button: {
                text: `+${data.upVoteData.upvotes ?? 0}`,
                className: "secondary dark",
                size: "sm",
                onClick: handleUpVote,
                icon: <i className="bi bi-hand-thumbs-up"></i>,
              },
            }}
          />
        )}
      </HeaderCard>
      <CollapseCandidate className="w-100">
        <CollapseCandidateContent>
          <CollapseCandidateText>Candidate Affiliations</CollapseCandidateText>
          <CandidateTagContainer className="w-100 d-flex flex-wrap">
            {JSON.parse(data.nominationData.afiliation).map((data) => (
              <Widget
                src={widgets.styledComponents}
                props={{
                  Tag: { title: data.company_name },
                }}
              />
            ))}
          </CandidateTagContainer>
        </CollapseCandidateContent>
      </CollapseCandidate>
      <KeyIssues>
        <KeyIssuesContent>
          <KeyIssuesHeader>
            <KeyIssuesTitle>Key issues</KeyIssuesTitle>
          </KeyIssuesHeader>
          <KeyIssuesContainer>
            {keyIssues.map((issue, i) => (
              <div key={i}>
                <KeyIssueTitle>{issue.title}</KeyIssueTitle>
                <KeyIssueDescription className="text-secondary">
                  {trimText(issue.desc)}
                </KeyIssueDescription>
                <KeyIssueSeparator />
              </div>
            ))}
          </KeyIssuesContainer>
        </KeyIssuesContent>
      </KeyIssues>
      <LowerSection>
        <LowerSectionContainer>
          <ButtonsLowerSection>
            <TextLowerSectionContainer className="align-items-center">
              <i className="bi bi-clock"></i>
              {data.indexerData.timestamp && (
                <TimestampText>
                  <div>
                    {new Date(data.indexerData.timestamp).toDateString()}
                  </div>
                  <span>by</span>
                  <b>{data.indexerData.nominee}</b>
                </TimestampText>
              )}
            </TextLowerSectionContainer>
            <Widget
              src={widgets.styledComponents}
              props={{
                Button: {
                  text: `+${data.upVoteData.comments.length ?? 0}`,
                  disabled: !state.verified,
                  size: "sm",
                  className: "secondary dark",
                  onClick: () => {
                    !data.preview ? State.update({ showModal: true }) : "";
                  },
                  icon: <i className="bi bi-chat-square-text-fill"></i>,
                },
              }}
            />
          </ButtonsLowerSection>
          <div className="d-flex w-100 justify-content-between align-items-center">
            <TagSection>
              {data.nominationData.tags
                .trim()
                .split(",")
                .map((data) => (
                  <Widget
                    src={widgets.styledComponents}
                    props={{
                      Tag: { title: data },
                    }}
                  />
                ))}
            </TagSection>

            {!data.preview && (
              <div className="d-flex gap-2">
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Link: {
                      text: "View",
                      size: "sm",
                      className: "secondary dark",
                      href: `#/yairnava.near/widget/NDC.Nomination.Candidate.Container?house=${data.indexerData.house}&candidate=${data.indexerData.nominee}`,
                    },
                  }}
                />
                <DropdownContainerHover>
                  <Widget
                    src={widgets.styledComponents}
                    props={{
                      Button: {
                        text: "Share",
                        size: "sm",
                        onClick: handleShare,
                        icon: <i className="bi bi-share-fill"></i>,
                      },
                    }}
                  />
                  <Separation>
                    <DropdownContent>
                      <Element onClick={handleShare}>
                        <OverlayTrigger
                          placement={top}
                          overlay={<Tooltip>{state.shareText}</Tooltip>}
                        >
                          <ShareLink
                            style={{
                              width: "132px",
                              "text-decoration": "none",
                              color: "black",
                            }}
                          >
                            Share as a Link
                          </ShareLink>
                        </OverlayTrigger>
                        <ShareIcon src="https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmV7qjDVv5dhsMJF1hRqCzeVNEHervtSURQmyBqWLdvtq3" />
                      </Element>
                      <Element>
                        <ShareLink
                          target="_blank"
                          href={
                            "https://twitter.com/intent/tweet?text=Please%20checkout%20this%20NDC%20Candidate%20and%20Support%20the%20NDC%20Election!%20&url=" +
                            getComponentURL()
                          }
                          style={{
                            width: "132px",
                            "text-decoration": "none",
                            color: "black",
                          }}
                        >
                          Share on Twitter
                        </ShareLink>
                        <ShareIcon src="https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmTXndeq7DWFW8gwsmhLBXTd4KzCeKr2Q6GgMwUA8fmfoJ" />
                      </Element>
                      <Element>
                        <ShareLink
                          href={
                            "mailto:?subject=Please%20checkout%20this%20NDC%20Candidate%20and%20Support%20the%20NDC%20Election&body=Support%20the%20NDC%20Election!%20" +
                            getComponentURL()
                          }
                          style={{
                            width: "132px",
                            "text-decoration": "none",
                            color: "black",
                          }}
                        >
                          Share by Email
                        </ShareLink>
                        <ShareIcon src="https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmdDa1om9dWr49n7ozBsGhQfNrkQ3FxYWCtKRtNwHkuz3Q" />
                      </Element>
                    </DropdownContent>
                  </Separation>
                </DropdownContainerHover>
              </div>
            )}
          </div>
        </LowerSectionContainer>
      </LowerSection>
    </Card>
  </div>
);
