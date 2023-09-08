const {
  data,
  registry_contract,
  nomination_contract,
  election_contract,
  api_key,
  dev,
} = props;

State.init({
  verified: false,
  start: true,
  voted: false,
  shareText: "Copy link to the clipboard",
});

const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
  candidatePage:
    "#/nomination.ndctools.near/widget/NDC.Nomination.Candidate.Page",
  addComment: "nomination.ndctools.near/widget/NDC.Nomination.AddComment",
};

const isHuman = Near.view(registry_contract, "is_human", {
  account: context.accountId,
});
State.update({ verified: isHuman[0][1].length > 0 });

const httpRequestOpt = {
  headers: { "x-api-key": api_key },
};

asyncFetch(
  `https://api.pikespeak.ai/nominations/is-upvoted-by?candidate=${data.indexerData.nominee}&upvoter=${context.accountId}&contract=${nomination_contract}`,
  httpRequestOpt
).then((res) => {
  State.update({ voted: res.body });
});

function handleUpVote() {
  Near.call(
    nomination_contract,
    state.voted ? "remove_upvote" : "upvote",
    {
      candidate: data.indexerData.nominee,
    },
    300000000000000,
    state.voted ? 0 : 1000000000000000000000
  );
}

function handleShare() {
  State.update({ shareText: "Copied" });
  clipboard.writeText(
    "https://near.org/#/nomination.ndctools.near/widget/NDC.Nomination.Candidate.Page?house=" +
      data.indexerData.house +
      "&candidate=" +
      data.indexerData.nominee
  );
}

function getComponentURL() {
  const url =
    "https%3A%2F%2Fnear.org%2F%23%2Fnomination.ndctools.near%2Fwidget%2FNDC.Nomination.Candidate.Page%3Fhouse%3D" +
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
  width: 56%;
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
const UserLink = styled.a`
  width: 100%;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
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

const Icon = styled.img`
  width: 17px;
  height: 17px;
`;
const CollapseCandidate = styled.div`
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
  font-size: 14px;
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
  height: 140px;
  width: 100%;
`;
const KeyIssueTitle = styled.p`
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 5px;
  white-space: pre-wrap;
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
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: none;
  left: 0;
  font-size: 12px;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 1;
  padding: 8px;
`;

const Element = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px;

  &:hover {
    border-radius: 6px;
    background: #f8f8f9;
  }
`;

const ShareLink = styled.a`
  color: black;
  margin-right: 8px 12px;
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
    margin-top: -165px;
  }
`;

const Separation = styled.div`
    position: absolute;
  }
`;

const Wrapper = styled.div`
    @media only screen and (max-width: 610px) {
      width: 100%;
    }
  }
`;

const canUpvote = () =>
  state.verified &&
  context.accountId &&
  context.accountId != data.indexerData?.nominee;

const trimText = (text, limit) => {
  if (!text) return "";

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
    title: "View and pledge on the issue of User Experience and Accessibility",
    desc: data.nominationData.Key_Issue_1,
  },
  {
    title: "View and pledge on the issue of Economic Growth and Innovation",
    desc: data.nominationData.Key_Issue_2,
  },
  {
    title: "View and pledge on the issue of Marketing and Outreach",
    desc: data.nominationData.Key_Issue_3,
  },
  {
    title: "Other Platform",
    desc: data.nominationData.addition_platform,
  },
];

return (
  <Wrapper className="p-2 col-lg-4 col-md-6 col-sm-12">
    <Card>
      {state.showModal && (
        <Widget
          src={widgets.addComment}
          props={{
            candidateOrReplay: true,
            username: data.indexerData.nominee,
            onClickConfirm: () => State.update({ showModal: false }),
            onClickCancel: () => State.update({ showModal: false }),
            nomination_contract,
          }}
        />
      )}
      <HeaderCard className="d-flex justify-content-between w-100">
        <div className="d-flex align-items-center gap-2 w-100 justify-content-between">
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              accountId: data.nominationData?.profileAccount.substring(1),
              imageClassName: "rounded-circle w-100 h-100",
              style: { minWidth: "45px", height: "45px" },
            }}
          />
          <HeaderContent>
            <div className="mw-100">
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
            </div>
            <UserLink
              href={`${widgets.candidatePage}?house=${
                data.indexerData.house
              }&accountId=${data.indexerData.nominee}${dev ? "&dev=true" : ""}`}
            >
              <NominationName>{data.profileData?.name}</NominationName>
              <NominationUser>{data.indexerData.nominee}</NominationUser>
            </UserLink>
          </HeaderContent>

          <Widget
            src={widgets.styledComponents}
            props={{
              Link: {
                disabled: !canUpvote(),
                text: "Vote",
                className: `${
                  context.accountId && state.voted ? "primary" : "secondary"
                } dark`,
                size: "sm",
                href: "#/election.ndctools.near/widget/NDC.Elections.Main",
                icon: <i className="bi bi-hand-thumbs-up"></i>,
              },
            }}
          />
        </div>
      </HeaderCard>
      <CollapseCandidate className="w-100">
        <CollapseCandidateContent>
          <CollapseCandidateText>Candidate Affiliations</CollapseCandidateText>
          <CandidateTagContainer className="w-100 d-flex flex-wrap">
            {JSON.parse(data.nominationData?.afiliation).map((data) => (
              <>
                {data.company_name && (
                  <Widget
                    src={widgets.styledComponents}
                    props={{
                      Tag: { title: data.company_name },
                    }}
                  />
                )}
              </>
            ))}
          </CandidateTagContainer>
        </CollapseCandidateContent>
      </CollapseCandidate>
      <KeyIssues>
        <KeyIssuesContent>
          <KeyIssuesHeader>
            <KeyIssuesTitle>Platform</KeyIssuesTitle>
          </KeyIssuesHeader>
          <KeyIssuesContainer>
            {keyIssues.map((issue, i) => (
              <div className="w-100" key={i}>
                <KeyIssueTitle>{issue.title}</KeyIssueTitle>
                <KeyIssueDescription className="text-secondary">
                  <Widget
                    src="mob.near/widget/SocialMarkdown"
                    props={{ text: trimText(issue.desc) }}
                  />
                </KeyIssueDescription>
                <KeyIssueSeparator />
              </div>
            ))}
          </KeyIssuesContainer>
        </KeyIssuesContent>
      </KeyIssues>
      <LowerSection>
        <LowerSectionContainer>
          {data.nominationData.tags.length > 0 && (
            <KeyIssues>
              <KeyIssuesContent>
                <KeyIssuesHeader>
                  <KeyIssuesTitle>Tags</KeyIssuesTitle>
                </KeyIssuesHeader>
                <div className="d-flex w-100">
                  <TagSection>
                    {data.nominationData.tags
                      .trim()
                      .split(",")
                      .map((data) => (
                        <>
                          {data && (
                            <Widget
                              src={widgets.styledComponents}
                              props={{
                                Tag: { title: data },
                              }}
                            />
                          )}
                        </>
                      ))}
                  </TagSection>
                </div>
              </KeyIssuesContent>
            </KeyIssues>
          )}
          <ButtonsLowerSection>
            <TextLowerSectionContainer className="align-items-center">
              <i className="bi bi-clock"></i>
              {data.indexerData.timestamp && (
                <TimestampText>
                  <span>
                    {new Date(data.indexerData.timestamp).toDateString()}
                  </span>
                  <span>by</span>
                  <b>{data.indexerData.nominee}</b>
                </TimestampText>
              )}
            </TextLowerSectionContainer>
          </ButtonsLowerSection>
          <div className="d-flex w-100 align-items-center">
            {!data.preview && (
              <div className="d-flex w-100 gap-2 justify-content-between">
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Button: {
                      text: `+${data.upVoteData.comments.length ?? 0} Comments`,
                      disabled: !state.verified,
                      size: "sm",
                      className:
                        "secondary dark w-100 justify-content-center text-nowrap",
                      onClick: () => {
                        !data.preview ? State.update({ showModal: true }) : "";
                      },
                      icon: <i className="bi bi-chat-square-text-fill"></i>,
                    },
                  }}
                />
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Link: {
                      text: "View",
                      size: "sm",
                      className: "primary w-100 justify-content-center",
                      href: `${widgets.candidatePage}?house=${
                        data.indexerData.house
                      }&accountId=${data.indexerData.nominee}${
                        dev ? "&dev=true" : ""
                      }`,
                      icon: <i className="bi bi-eye fs-6"></i>,
                    },
                  }}
                />
              </div>
            )}
          </div>
        </LowerSectionContainer>
      </LowerSection>
    </Card>
  </Wrapper>
);
