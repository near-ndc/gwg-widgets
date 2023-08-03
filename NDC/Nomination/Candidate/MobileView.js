const { nomination_contract, registry_contract, api_key, data, accountId } =
  props;

State.init({
  verified: false,
  start: true,
  voted: false,
  showDeclaration: false,
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
const DetailContent = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;
const DetailCard = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  gap: 16px;
  border-radius: 10px;
  background: #f8f8f9;
`;
const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const HeaderDetailContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
  overflow: hidden;
`;
const TagContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
`;
const HouseTagDiv = styled.div`
  width: 100%;
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
  font-size: 8px;
  font-weight: 500;
  line-height: 120%;
  margin: 0px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const TagDiv = styled.div`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
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
  margin: 5px 0;
`;

const UserLink = styled.a`
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
`;
const NominationTitle = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px;
  color: #000;
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
`;
const NominationUser = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #828688;
  margin: 0px;
  font-size: 12px;
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
    radial-gradient(circle at top left, #9333ea 0%, #4f46e5 100%);
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
const UpvoteIcon = styled.img`
  width: 14px;
  height: 14px;
`;
const PlatformCard = styled.div`
  display: flex;
  padding: 8px 12px;
  align-items: flex-start;
  gap: 12px;
  border-radius: 6px;
  background: #fff;
`;
const PlatformContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;
const PlatformHeaderDiv = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;
const PlatformHeaderText = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 0px;
`;
const PlatformInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;
const PlatformInfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  width: 100%;
`;
const PlatInforHeadText = styled.p`
  font-size: 12px;
  line-height: 120%;
  margin: 0px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
`;
const HR = styled.div`
  height: 1px;
  width: 100%;
  margin: 8px 0 0 0;
  background: rgba(208, 214, 217, 1);
`;
const KeyIssuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;
const KeyIssueTitle = styled.h5`
  font-size: 13px;
  line-height: 16px;
  margin: 7px 0 3px 0;
`;
const KeyIssueDescription = styled.p`
  color: #828688;
  font-size: 12px;
  line-height: 18px;
  margin: 0px;
  text-align: justify;
`;
const CandidateCard = styled.div`
  display: flex;
  padding: 16px 12px;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 6px;
  background: #fff;
`;
const CandidateContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
`;
const CandidateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;
const CandidateHeaderText = styled.p`
  color: #000;
  font-size: 12px;
  font-weight: 800;
  line-height: 120%;
  margin: 0px;
`;
const CandidateInfoDiv = styled.div`
  display: flex;
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
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
  border-radius: 20px;
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
const CandidateTime = styled.p`
  margin: 0px;
  color: var(--primary-828688, #828688);
  font-size: 10px;
  font-weight: 500;
  line-height: 120%;
`;
const CandidateTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;
const CandidateTitle = styled.p`
  color: var(--000000, #000);
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
  margin: 0px;
`;
const CandidateDescription = styled.p`
  color: var(--primary-828688, #828688);
  font-size: 12px;
  line-height: 130%;
  margin: 0px;
  text-align: justify;
`;
const DeclarationCard = styled.div`
  display: flex;
  padding: 16px 12px;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 6px;
  background: #fff;
`;
const DeclarationContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
`;
const DeclarationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;
const DeclarationHeaderText = styled.p`
  color: #000;
  font-size: 12px;
  font-weight: 800;
  line-height: 120%;
  margin-bottom: 0;
`;
const DeclarationInfo = styled.div`
  display: flex;
  padding: 8px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-radius: 8px;
  background: #fff;
`;
const DeclarationDescription = styled.p`
  color: var(--primary-828688, #828688);
  font-size: 12px;
  line-height: 130%;
  text-align: justify;
`;
const DeclarationImage = styled.img`
  height: 234px;
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
const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;
const CommentHeaderText = styled.p`
  color: var(--000000, #000);
  font-size: 16px;
  font-weight: 500;
  line-height: 120%;
  margin: 0px;
`;
const SortButtonDiv = styled.button`
  display: flex;
  width: 20px;
  height: 20px;
  padding: 2px 12px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  border-radius: 4px;
  background: var(
    --buttons-gradient-default,
    linear-gradient(90deg, #9333ea 0%, #4f46e5 100%)
  );
`;
const SortIcon = styled.img`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
`;

const CommentButtonDisabled = styled.div`
  cursor: pointer;
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  align-self: stretch;
  border-radius: 4px;
  background: var(--buttons-disable, #c3cace);
  cursor: default !important;
`;

const CommentButton = styled.div`
  cursor: pointer;
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  align-self: stretch;
  border-radius: 4px;
  background: var(--buttons-yellow-default, #ffd50d);
`;

const CommentText = styled.p`
  color: var(--primary-black, #000);
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  margin: 0px;
`;
let profileInfo = Social.getr(`${context.accountId}/profile`);
let imageIsNFT = profileInfo.image.nft ? true : false;
let nftData = profileInfo.image.nft;
const getNftCid = Near.view(nftData.contractId, "nft_token", {
  token_id: nftData.tokenId,
});
const CandidateProps = props.data.nominations;
const comments = props.data.comments[0].comments;
let isNFTURL = CandidateProps.img.url;

const afilations = JSON.parse(CandidateProps.afiliation);

const afiilationsSort = afilations
  .sort((a, b) => new Date(a.end_date) - new Date(b.end_date))
  .reverse();

const issues = [
  {
    description: CandidateProps.HAYInvolve,
    title:
      "How are you involved with the NEAR ecosystem? Why are you a qualified candidate? Why should people vote for you?",
  },
  {
    description: CandidateProps.WIYStrategy,
    title: "What is your strategy to develop the NEAR ecosystem?",
  },
  {
    description: CandidateProps.Key_Issue_1,
    title:
      "What’s your view and pledge on the issue of User Experience and Accessibility? This issue focuses on improving the user experience, developing the social layer, enhancing the developer experience, and making the Near platform accessible to all users, including those with little technical expertise. It also explores how Near can evoke positive emotions in its users.",
  },
  {
    description: CandidateProps.Key_Issue_2,
    title:
      "What’s your view and pledge on the issue of Economic Growth and Innovation? This issue emphasizes the need for economic growth within the NDC, the development of DeFi capabilities, the establishment of fiat ramps, and the support for founders, developers, creators, and builders. It also stresses the importance of launching useful products on the Near mainnet.",
  },
  {
    description: CandidateProps.Key_Issue_3,
    title:
      "What’s your view and pledge on the issue of Marketing and Outreach? This issue underscores the importance of marketing to make NEAR a household name, conducting research, participating in conferences and hackathons, integrating with Web 2.0 platforms, and promoting Near as a hub of innovation.",
  },
  { description: CandidateProps.addition_platform, title: "Other Platform" },
];

return (
  <DetailContent>
    <DetailCard className="justify-content-center">
      <DetailHeader>
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            accountId,
            imageClassName: "rounded-circle w-100 h-100",
            style: { width: "70px", height: "70px" },
          }}
        />
        <HeaderDetailContent>
          <TagContainer>
            <HouseTagDiv>
              <HouseTagText style={{ "font-size": "10px" }}>
                {props.house == "HouseOfMerit"
                  ? "House of Merit"
                  : props.house == "CouncilOfAdvisors"
                  ? "Council of Advisors"
                  : "Transparency Commission"}
              </HouseTagText>
            </HouseTagDiv>
          </TagContainer>
          <NominationTitleContainer>
            <UserLink
              href={`https://www.near.org/near/widget/ProfilePage?accountId=${accountId}`}
            >
              <NominationTitle>{CandidateProps.name}</NominationTitle>
              <NominationUser>{accountId}</NominationUser>
            </UserLink>
          </NominationTitleContainer>
          <TagContainer>
            {CandidateProps.tags
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
        </HeaderDetailContent>
        {data.nominations.video.length > 0 && (
          <Widget
            src={widgets.styledComponents}
            props={{
              Link: {
                text: `Watch Video`,
                className: "primary dark",
                icon: <i class="bi bi-play-circle ml-2"></i>,
                href: props.data.nominations.video,
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
                context.accountId === candidate,
              className: `${
                context.accountId && state.voted ? "primary" : "secondary"
              } dark`,
              onClick: handleUpVote,
              icon: <i className="bi bi-hand-thumbs-up"></i>,
            },
          }}
        />
      </DetailHeader>
      <PlatformCard>
        <PlatformContent>
          <PlatformHeaderDiv>
            <PlatformHeaderText>Platform</PlatformHeaderText>
          </PlatformHeaderDiv>
          <PlatformInfoDiv>
            <PlatformInfoHeader>
              <KeyIssueTitle>Key Issues and Candidate's Position</KeyIssueTitle>
              <HR></HR>
            </PlatformInfoHeader>
            {issues.map((issue, i) => (
              <KeyIssuesContainer>
                <KeyIssueTitle>{issue.title}</KeyIssueTitle>
                <KeyIssueDescription>
                  <Widget
                    src="mob.near/widget/SocialMarkdown"
                    props={{
                      text: issue.description,
                    }}
                  />
                </KeyIssueDescription>
              </KeyIssuesContainer>
            ))}
          </PlatformInfoDiv>
        </PlatformContent>
      </PlatformCard>
      <CandidateCard>
        <CandidateContent>
          <CandidateHeader>
            <PlatformHeaderText>Candidate Affiliations</PlatformHeaderText>
          </CandidateHeader>
          {afilations.map((affiliation) => {
            return (
              <CandidateInfoDiv>
                <CandidateInfoHeader>
                  <CandidateImage
                    src={
                      "https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmZBPPMKLdZG2zVpYaf9rcbtNfAp7c3BtsvzxzBb9pNihm?_gl=1*6avmrp*rs_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*rs_ga_5RMPXG14TE*MTY4NjkzMzM2NC4zLjEuMTY4NjkzMzM4Ni4zOC4wLjA."
                    }
                    alt="pic"
                  ></CandidateImage>
                  <CandidateInfoData>
                    <Widget
                      src={widgets.styledComponents}
                      props={{
                        Tag: { title: affiliation.company_name },
                      }}
                    />
                    <CandidateTime>
                      {affiliation.start_date} - {affiliation.end_date}
                    </CandidateTime>
                  </CandidateInfoData>
                </CandidateInfoHeader>
                <KeyIssuesContainer>
                  <KeyIssueTitle>Role Description</KeyIssueTitle>
                  <KeyIssueDescription>
                    <Widget
                      src="mob.near/widget/SocialMarkdown"
                      props={{
                        text: affiliation.role,
                      }}
                    />
                  </KeyIssueDescription>
                </KeyIssuesContainer>
              </CandidateInfoDiv>
            );
          })}
        </CandidateContent>
      </CandidateCard>
      <DeclarationCard>
        <DeclarationContent>
          <DeclarationHeader className="d-flex justify-content-between">
            <DeclarationHeaderText>
              Declaration of Transparency and Accountability
            </DeclarationHeaderText>
            <Widget
              src={widgets.styledComponents}
              props={{
                Button: {
                  text: "View",
                  size: "sm",
                  disabled: !state.verified,
                  className: "secondary dark justify-content-center",
                  onClick: () =>
                    State.update({ showDeclaration: !state.showDeclaration }),
                  icon: <i className="bi bi-eye"></i>,
                },
              }}
            />
          </DeclarationHeader>
          {state.showDeclaration && (
            <DeclarationInfo>
              <DeclarationDescription>
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
              </DeclarationDescription>
            </DeclarationInfo>
          )}
        </DeclarationContent>
      </DeclarationCard>
    </DetailCard>
    <CommentSection className="w-100">
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
      <CommentHeader className="w-100">
        <CommentHeaderText>Comments</CommentHeaderText>
        <Widget
          src={widgets.styledComponents}
          props={{
            Button: {
              text: "Add a Comment",
              size: "sm",
              disabled:
                !context.accountId ||
                !state.verified ||
                context.accountId === candidate,
              className: "primary justify-content-center",
              onClick: () => State.update({ showModal: true }),
              icon: <i className="bi bi-plus-lg"></i>,
            },
          }}
        />
      </CommentHeader>
      {comments
        .map((data) => {
          return (
            <Widget
              props={{ data, nomination_contract }}
              src={widgets.comment}
            />
          );
        })
        .reverse()}
    </CommentSection>
  </DetailContent>
);
