const {
  data,
  house,
  accountId,
  nomination_contract,
  registry_contract,
  api_key,
} = props;

State.init({
  tabSelected: "comments",
  verified: false,
  start: true,
  voted: false,
});

const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
  comment: "nomination.ndctools.near/widget/NDC.Nomination.Candidate.Comment",
  addComment: "nomination.ndctools.near/widget/NDC.Nomination.AddComment",
};

function getVerifiedHuman() {
  asyncFetch(
    `https://api.pikespeak.ai/sbt/has-sbt?holder=${context.accountId}&class_id=1&issuer=fractal.i-am-human.near&with_expired=false&registry=${registry_contract}`,
    {
      headers: {
        "x-api-key": api_key,
      },
    }
  ).then((res) => {
    State.update({ verified: res.body });
  });
  asyncFetch(
    `https://api.pikespeak.ai/nominations/is-upvoted-by?candidate=${accountId}&upvoter=${context.accountId}&contract=${nomination_contract}`,
    {
      headers: {
        "x-api-key": api_key,
      },
    }
  ).then((res) => {
    State.update({ voted: res.body });
  });
}

if (state.start) {
  getVerifiedHuman();
  State.update({
    start: false,
  });
}

function handleUpVote() {
  Near.call(
    nomination_contract,
    state.voted ? "remove_upvote" : "upvote",
    {
      candidate: accountId,
    },
    300000000000000,
    state.voted ? 0 : 1000000000000000000000
  );
}

const tabs = [
  { id: "declaration", title: "Declaration", icon: "bi bi-trophy-fill" },
  { id: "comments", title: "Comments", icon: "bi bi-chat-square-dots-fill" },
];

const DetailContent = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const DetailCard = styled.div`
  display: flex;
  width: 358px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-radius: 10px;
  background: #f8f8f9;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
`;

const HouseTagDiv = styled.div`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  background: var(
    --gradient-purple-gradient,
    linear-gradient(90deg, #9333ea 0%, #4f46e5 100%)
  );
`;

const HouseTagText = styled.p`
  color: #fff;
  font-size: 7px;
  font-weight: 500;
  line-height: 120%;
  margin: 0px;
`;

const TagDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px 8px;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  border: solid 1px transparent;
  border-radius: 80px;
  background-image: linear-gradient(#eae5f7, #eae5f7),
    radial-gradient(circle at top left, #9333ea 0%, #4f46e5 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
`;

const TagDivText = styled.p`
  font-size: 8px;
  margin: 0px;
  font-weight: 500;
  line-height: 120%;
  background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const NominationTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NominationTitle = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 7px 0 0 0;
  color: #000;
  font-size: 18px;
  font-weight: 500;
  line-height: 120%;
`;
const UserLink = styled.a`
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
`;
const NominationUser = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #828688;
  margin: 0 0 7px 0;
  font-size: 14px;
  line-height: 120%;
`;

const UpvoteButtonDisabled = styled.button`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  border: solid 1px transparent;
  background: var(--buttons-disable, #c3cace);
  cursor: default !important;
`;

const UpvoteButton = styled.button`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  border: solid 1px transparent;
  background-image: linear-gradient(#f8f8f9, #f8f8f9),
    radial-gradient(
      circle at left top,
      rgb(147, 51, 234) 0%,
      rgb(79, 70, 229) 100%
    );
  background-origin: border-box;
  background-clip: padding-box, border-box;
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

const PlatformCard = styled.div`
  display: flex;
  border-radius: 6px;
  background: background: "rgb(255 255 255 / 0%);
`;

const PlatformContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
`;

const PlatformInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const PlatformInfoHeader = styled.div`
  display: flex;
  width: 302px;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const PlatInforHeadText = styled.p`
  margin: 0px;
  color: var(--000000, #000);
  font-size: 10px;
  font-weight: 500;
  line-height: 120%;
`;

const PlatInfoHeadSeparator = styled.hr`
  width: 302px;
  height: 0px;
  margin: 8px 0 0 0;

  border: 1px solid rgba(208, 214, 217, 1);
`;

const KeyIssuesContainer = styled.div`
  display: flex;
  width: 302px;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const KeyIssueTitle = styled.p`
  font-size: 12px;
  line-height: 120%;
  margin: 0px;
  font-weight: 500;
  line-height: 18px;
  text-align: left;
  padding: 10px;
`;

const KeyIssueDescription = styled.p`
  color: #212427;
  font-size: 12px;
  line-height: 130%;
  margin: 0px;
  padding: 10px;
  line-height: 18px;
  text-align: justify;
`;

const CandidateCard = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  align-self: stretch;
  border-radius: 6px;
  background: #fff;
`;

const CandidateContent = styled.div`
  display: flex;
  width: 302px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;

const ContentHeaderText = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 0px;
`;

const CandidateInfoDiv = styled.div`
  width: 100%;
  padding: 16px;
  background: white;
  gap: 16px;
  border-radius: 8px;
`;

const CandidateInfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

const CandidateImage = styled.img`
  width: 32px;
  height: 32px;
`;

const CandidateInfoData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
`;

const CandidateTagDiv = styled.div`
  display: flex;
  height: 20px;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  border: 1px solid var(--secondary-warning, #f19d38);
  background: #f0e1ce;
`;

const CandidateTagText = styled.p`
  color: var(--secondary-warning, #f19d38);
  font-size: 10px;
  font-weight: 500;
  line-height: 120%;
  margin: 0px;
`;

const CandidateTime = styled.h6`
  margin: 3px 0 0 0;
  font-size: 10px;
  font-weight: 500;
  line-height: 120%;
  color: #828688;
`;

const CandidateTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;

const SectionTitle = styled.h5`
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
  margin: 16px 0 0 0;
`;

const SectionDescription = styled.p`
  font-size: 12px;
  line-height: 18px;
  margin: 0px;
  text-align: justify;
  color: #828688;
`;

const DeclarationCard = styled.div`
  padding: 0px;
`;

const CommentSection = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 10px;
  background: #f8f8f9;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const H6 = styled.h6`
  font-size: 14px;
  margin-bottom: 0;
`;

const Tab = styled.div`
  font-weight: ${(props) => (props.active ? "600" : "500")};
  border-bottom: 2px solid;
  border-color: ${(props) => (props.active ? "#4BA6EE" : "#dee2e6")};
  color: ${(props) => (props.active ? "#4BA6EE" : "#ababab")};
  cursor: pointer;
  padding-bottom: 8px;
  font-size: 14px;

  i {
    &::before {
      color: ${(props) => (props.active ? "#4BA6EE" : "#ababab")};
    }
    margin-right: 5px;
  }
`;

const TH = styled.th`
  border: 1px solid rgba(208, 214, 217, 0.4) !important;
  width: ${(props) => props.width} !important;
  text-align: left !important;
  padding: 15px 20px !important;
`;

if (!data) return <Loader />;

const candidateProps = data.nominations;
if (!candidateProps) return <Loader />;

const comments = data.comments[0] ? data.comments[0].comments : [];
const afilations = JSON.parse(candidateProps.afiliation);
if (!afilations) return <Loader />;

const afilationsSort = afilations.sort(
  (a, b) => parseInt(b.end_date) - parseInt(a.end_date)
);

const issues = [
  candidateProps.HAYInvolve,
  candidateProps.WIYStrategy,
  candidateProps.Key_Issue_1,
  candidateProps.Key_Issue_2,
  candidateProps.Key_Issue_3,
  candidateProps.addition_platform,
];

const titles = [
  "How are you involved with the NEAR ecosystem? Why are you a qualified candidate? Why should people vote for you?",
  "What is your strategy to develop the NEAR ecosystem?",
  "What’s your view and pledge on the issue of User Experience and Accessibility? This issue focuses on improving the user experience, developing the social layer, enhancing the developer experience, and making the Near platform accessible to all users, including those with little technical expertise. It also explores how Near can evoke positive emotions in its users.",
  "What’s your view and pledge on the issue of Economic Growth and Innovation? This issue emphasizes the need for economic growth within the NDC, the development of DeFi capabilities, the establishment of fiat ramps, and the support for founders, developers, creators, and builders. It also stresses the importance of launching useful products on the Near mainnet.",
  "What’s your view and pledge on the issue of Marketing and Outreach? This issue underscores the importance of marketing to make NEAR a household name, conducting research, participating in conferences and hackathons, integrating with Web 2.0 platforms, and promoting Near as a hub of innovation.",
  "Other Platform",
];

return (
  <Container class="row">
    <div class="col-9" style={{ "margin-right": "5px", width: "950px" }}>
      <div class="row" style={{ "margin-inline": "5px" }}>
        <div
          class="col-12 p-0 w-100"
          style={{
            background: "#F8F8F9",
            "border-radius": "8px",
          }}
        >
          <div className="w-100 p-3 d-flex justify-content-between align-items-start">
            <div className="d-flex">
              <Widget
                src="mob.near/widget/ProfileImage"
                props={{
                  accountId,
                  imageClassName: "rounded-circle w-100 h-100",
                  style: {
                    width: "100px",
                    height: "100px",
                    marginRight: "15px",
                  },
                }}
              />
              <div className="d-flex flex-column">
                <TagContainer>
                  <Widget
                    src={widgets.styledComponents}
                    props={{
                      Tag: {
                        title:
                          house == "HouseOfMerit"
                            ? "House of Merit"
                            : house == "CouncilOfAdvisors"
                            ? "Council of Advisors"
                            : "Transparency Commission",
                        className: "dark",
                      },
                    }}
                  />
                </TagContainer>
                <NominationTitleContainer>
                  <UserLink
                    href={`https://near.org/near/widget/ProfilePage?accountId=${accountId}`}
                  >
                    <NominationTitle>{candidateProps.name}</NominationTitle>
                    <NominationUser>{accountId}</NominationUser>
                  </UserLink>
                  <TagContainer>
                    {candidateProps.tags
                      .trim()
                      .split(",")
                      .map((tag) => {
                        return tag && tag != "" ? (
                          <Widget
                            src={widgets.styledComponents}
                            props={{
                              Tag: { title: tag },
                            }}
                          />
                        ) : null;
                      })}
                  </TagContainer>
                </NominationTitleContainer>
              </div>
            </div>
            <div className="d-flex gap-3">
              {candidateProps.video.length > 0 && (
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Link: {
                      text: `Watch Video`,
                      className: "primary dark",
                      icon: <i class="bi bi-play-circle ml-2"></i>,
                      href: candidateProps.video,
                    },
                  }}
                />
              )}
              <Widget
                src={widgets.styledComponents}
                props={{
                  Button: {
                    text: `+${data.comments[0].upvotes ?? 0}`,
                    disabled:
                      !context.accountId ||
                      !state.verified ||
                      context.accountId === accountId,
                    className: `${
                      context.accountId && state.voted ? "primary" : "secondary"
                    } dark`,
                    onClick: handleUpVote,
                    icon: <i className="bi bi-hand-thumbs-up"></i>,
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div
          class="col-5"
          style={{
            "margin-top": "10px",
            "padding-left": "0",
            "padding-right": "0",
            width: "330px",
          }}
        >
          <div>
            <CandidateCard
              style={{
                "border-radius": "8px",
                background: "#F8F8F9",
              }}
            >
              <CandidateContent>
                <ContentHeader>
                  <ContentHeaderText>Candidate Affiliations</ContentHeaderText>
                </ContentHeader>
                {afilations.map((data) => (
                  <CandidateInfoDiv>
                    <CandidateInfoHeader className="d-flex align-items-center">
                      <CandidateImage
                        src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmZBPPMKLdZG2zVpYaf9rcbtNfAp7c3BtsvzxzBb9pNihm?_gl=1*6avmrp*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzMzM2NC4zLjEuMTY4NjkzMzM4Ni4zOC4wLjA."
                        alt="pic"
                      ></CandidateImage>
                      <CandidateInfoData>
                        <Widget
                          src={widgets.styledComponents}
                          props={{
                            Tag: { title: data.company_name },
                          }}
                        />
                        <CandidateTime>
                          {data.start_date} - {data.end_date}
                        </CandidateTime>
                      </CandidateInfoData>
                    </CandidateInfoHeader>
                    <CandidateTextInfo>
                      <SectionTitle>Role Description</SectionTitle>
                      <SectionDescription>
                        <Widget
                          src="mob.near/widget/SocialMarkdown"
                          props={{
                            text: data.role,
                          }}
                        />
                      </SectionDescription>
                    </CandidateTextInfo>
                  </CandidateInfoDiv>
                ))}
              </CandidateContent>
            </CandidateCard>
          </div>
        </div>
        <div
          class="col-7"
          style={{
            "border-radius": "8px",
            margin: "10px 0 0 10px",
            width: "600px",
            background: "#F8F8F9",
            padding: "20px",
          }}
        >
          <PlatformCard>
            <PlatformContent>
              <ContentHeader>
                <ContentHeaderText>Platform</ContentHeaderText>
              </ContentHeader>

              <table
                className="table table-sm"
                style={{
                  background: "white",
                  "border-collapse": "collapse",
                  "border-radius": "8px",
                  "border-style": "hidden",
                  overflow: "hidden",
                  "box-shadow": "0px 0px 2px #bfbfbfb3",
                }}
              >
                <thead>
                  <tr class="p-3 mb-2 rounded-5 text-center">
                    <TH width="35%">
                      <H6>Key Issues</H6>
                    </TH>
                    <TH width="65%">
                      <H6>Candidate's Positions</H6>
                    </TH>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((data, key) => {
                    return (
                      <>
                        <tr
                          class="text-center"
                          style={{
                            height: "80px",
                            "vertical-align": "middle",
                          }}
                        >
                          <td
                            style={{
                              border: "1px solid rgba(208, 214, 217, 0.40)",
                              verticalAlign: "text-top",
                            }}
                          >
                            <KeyIssueTitle>{titles[key]}</KeyIssueTitle>
                          </td>
                          <td
                            style={{
                              background: "#F8F8F9",
                              verticalAlign: "text-top",
                              color: "#212427",
                            }}
                          >
                            <KeyIssueDescription className="text-seconodary">
                              <Widget
                                src="mob.near/widget/SocialMarkdown"
                                props={{ text: data }}
                              />
                            </KeyIssueDescription>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </PlatformContent>
          </PlatformCard>
        </div>
      </div>
    </div>
    <div
      class="col-3"
      style={{
        width: "350px",
        background: "#F8F8F9",
        "border-radius": "8px",
        padding: "20px",
      }}
    >
      <>
        <ul className="nav nav-pills nav-fill">
          {tabs.map(({ id, title, icon }, i) => (
            <li className="nav-item" role="presentation" key={i}>
              <Tab
                active={state.tabSelected === id}
                onClick={() => State.update({ tabSelected: id })}
              >
                <i
                  class={`${icon} ${
                    state.tabSelected == "declaration" ? "text-secondary" : ""
                  }`}
                />
                {title}
              </Tab>
            </li>
          ))}
        </ul>
        <div>
          {state.tabSelected == "declaration" ? (
            <DeclarationCard>
              <SectionTitle className="mt-4 mb-3">
                Declaration of Transparency and Accountability
              </SectionTitle>

              <SectionDescription>
                I hereby declare my unwavering commitment to transparency,
                accountability, and the resolution of critical ecosystem
                challenges as a candidate seeking election to the NEAR Digital
                Collective. It is my utmost goal to instill faith and prosperity
                in our ecosystem. In the event of my election, I pledge to
                support and promote the operation and development of the NEAR
                Digital Collective.
                <br />
                <br />
                Transparency stands as the cornerstone of a thriving governance
                framework and as a candidate, I strongly believe in leading by
                example. I vow to disclose comprehensive information about my
                previous affiliations, partnerships, and associations that may
                influence my decision-making or impact the public interest. This
                includes openly sharing any conflicts of interest, financial
                relationships, or external influences that could compromise my
                ability to serve with impartiality and integrity.
                <br />
                <br />
                Moreover, I fully recognize the numerous challenges that our
                NEAR ecosystem currently faces, demanding immediate attention
                and effective solutions. As a responsible candidate, I am deeply
                committed to identifying, addressing, and resolving these issues
                to the best of my abilities. I acknowledge the gravity of these
                problems and understand that superficial fixes and empty
                promises are insufficient. Therefore, I pledge to conduct
                thorough research, seek input from experts, and engage with
                stakeholders to devise sustainable, equitable strategies. In the
                event of my election, my top priorities will be focused on
                addressing critical ecosystem challenges.
                <br />
                <br />
                I recognize that vote buying is considered a harmful practice
                because it undermines the fundamental principles of democracy
                and fair elections. Vote buying manipulates and influences
                voters by offering financial incentives or other material
                benefits in exchange for their votes. This undermines the free
                will and independent decision-making of individuals, as their
                choices become influenced solely by personal gain rather than
                informed judgment or shared values. Vote buying distorts the
                true preferences and opinions of the electorate, and reinforces
                inequality. Finally vote buying erodes trust and confidence. By
                engaging in vote buying, candidates and political actors are
                more likely to prioritize the interests of those who provided
                financial support over the interests of the wider public. This
                diminishes accountability and weakens the democratic principle
                of serving the common good. I promise that I will not engage in
                this and other nefarious acts during the election process.
                <br />
                <br />I recognize that this declaration is not merely a symbolic
                gesture, but a solemn commitment to the NEAR ecosystem. I
                understand the weight of the expectations. I pledge to honor the
                trust placed in me with unwavering dedication, determination,
                and integrity. Through this declaration, I affirm my commitment
                to transparency, accountability, and the resolve to actualize my
                pledges to the best of my abilities if elected. Together, let us
                embark on a journey towards a brighter future of the NEAR
                ecosystem.
              </SectionDescription>
            </DeclarationCard>
          ) : (
            <CommentSection style={{ padding: "0px" }}>
              {state.showModal && (
                <Widget
                  src={widgets.addComment}
                  props={{
                    candidateOrReplay: true,
                    username: accountId,
                    onClickConfirm: () => State.update({ showModal: false }),
                    onClickCancel: () => State.update({ showModal: false }),
                    nomination_contract,
                  }}
                />
              )}
              <Widget
                src={widgets.styledComponents}
                props={{
                  Button: {
                    text: "Add a Comment",
                    disabled:
                      !context.accountId ||
                      !state.verified ||
                      context.accountId === accountId,
                    className: "primary w-100 mt-4 mb-2 justify-content-center",
                    onClick: () => State.update({ showModal: true }),
                    icon: <i className="bi bi-plus-lg"></i>,
                  },
                }}
              />
              {comments.map((data) => (
                <Widget
                  props={{ data, nomination_contract }}
                  src={widgets.comment}
                />
              ))}
            </CommentSection>
          )}
        </div>
      </>
    </div>
  </Container>
);
