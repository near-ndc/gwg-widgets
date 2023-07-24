let { ids, dev, house, accountId } = props;
ids = ids ? ids : [1, 2, 3]; // for testing purposes

const registryContract = dev
  ? "registry-v1.gwg-testing.near"
  : "registry.i-am-human.near";
const nominationContract = dev
  ? "nominations-v1.gwg-testing.near"
  : "nominations.ndc-gwg.near";
const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const widgets = {
  header: "election.ndctools.near/widget/NDC.Elections.Header",
  mobile: "nomination.ndctools.near/widget/NDC.Nomination.Candidate.MobileView",
  desktop:
    "nomination.ndctools.near/widget/NDC.Nomination.Candidate.DesktopView",
  back: `#/nomination.ndctools.near/widget/NDC.Nomination.Page${
    dev ? "?dev=true" : ""
  }`,
};

const time = Near.view(nominationContract, "active_time", {});

State.init({
  selectedHouse: ids[0],
  comments: [],
  profile: {},
  nominations: {},
});

const BackLink = styled.a`
  color: black;

  &:hover {
    text-decoration: none;
    color: black;
  }
`;

asyncFetch(
  `https://api.pikespeak.ai/nominations/candidates-comments-and-upvotes?candidate=${accountId}&contract=${nominationContract}`,
  { headers: { "x-api-key": apiKey } }
).then((res) => {
  State.update({ comments: res.body });
});

let profile = Social.getr(`${accountId}/profile`);
let nominations = Social.getr(`${accountId}/nominations`);
State.update({ profile: profile });
State.update({ nominations: nominations });

const Mobile = styled.div`
  @media only screen and (min-width: 601px) {
    display: none !important;
  }
`;

const Desktop = styled.div`
  @media only screen and (max-width: 600px) {
    display: none !important;
  }
`;

return (
  <div>
    <Mobile className="d-flex justify-content-center">
      <Mobile>
        <Widget
          src={widgets.header}
          props={{
            startTime: time[0],
            endTime: time[1],
            type: "Nomination",
          }}
        />
      </Mobile>
    </Mobile>
    <Mobile class="row">
      <div className="my-3">
        <BackLink href={widgets.back}>
          <i className="bi bi-chevron-left mr-2"></i>
          Back
        </BackLink>
      </div>
    </Mobile>
    <Mobile>
      <Widget
        props={{
          data: state,
          house: props.house,
          accountId,
          nomination_contract: nominationContract,
          registry_contract: registryContract,
          api_key: apiKey,
        }}
        src={widgets.mobile}
      />
    </Mobile>
    <Desktop className="w-100">
      <Widget
        src={widgets.header}
        props={{
          startTime: time[0],
          endTime: time[1],
          type: "Nomination",
        }}
      />
    </Desktop>
    <Desktop class="row">
      <div className="my-3">
        <BackLink href={widgets.back}>
          <i className="bi bi-chevron-left mr-2"></i>
          Back
        </BackLink>
      </div>
    </Desktop>
    <Desktop class="row">
      <Widget
        props={{
          data: state,
          house: props.house,
          accountId,
          nomination_contract: nominationContract,
          registry_contract: registryContract,
          api_key: apiKey,
        }}
        src={widgets.desktop}
      />
    </Desktop>
  </div>
);
