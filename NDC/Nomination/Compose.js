const { handleClose, nomination_contract } = props;

let Socialcontract = "social.near";

let profileInfo = Social.getr(`${context.accountId}/profile`);

let imageIsNFT = profileInfo.image.nft ? true : false;
let imageIsIpfs_cid = profileInfo.image.ipfs_cid ? true : false;
let imageIsUrl = profileInfo.image.url ? true : false;
let RealProfileImageAsURL = "";

const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
  affiliations:
    "nomination.ndctools.near/widget/NDC.Nomination.Compose.Affiliations",
  platform: "nomination.ndctools.near/widget/NDC.Nomination.Compose.Platform",
  page: "nomination.ndctools.near/widget/NDC.Nomination.Page",
  tags: "nomination.ndctools.near/widget/NDC.Nomination.Compose.Tags",
};

if (imageIsNFT) {
  let nftData = profileInfo.image.nft;
  const getNftCid = Near.view(nftData.contractId, "nft_token", {
    token_id: nftData.tokenId,
  });

  RealProfileImageAsURL =
    "https://nativonft.mypinata.cloud/ipfs/" + getNftCid.metadata.media;
  console.log("was nft", RealProfileImageAsURL);
}

if (imageIsIpfs_cid) {
  RealProfileImageAsURL =
    "https://nativonft.mypinata.cloud/ipfs/" + profileInfo.image.ipfs_cid;
  console.log("was ipfs", RealProfileImageAsURL);
}

if (imageIsUrl) {
  RealProfileImageAsURL = profileInfo.image.url;
  console.log("was url", RealProfileImageAsURL);
}

State.init({
  theme,
  img: {
    uploading: "false",
    url: RealProfileImageAsURL,
    name: RealProfileImageAsURL ? "Uploaded from Social Profile" : "",
  },
  name: profileInfo.name ? profileInfo.name : "",
  profileAccount: context.accountId ? "@" + context.accountId : "",
  house_intended: 0,
  HAYInvolve: "",
  WIYStrategy: "",
  Key_Issue_1: "",
  Key_Issue_2: "",
  Key_Issue_3: "",
  addition_platform: "",
  afiliation: [
    {
      company_name: "",
      start_date: "",
      end_date: "",
      role: "",
    },
  ],
  agreement: "false",
  tags: "",
  error_msg: "",
  video: "",
});

const CardStyled = styled.div`
  width: 100%;
  height: 100%;
  background: #f8f8f9;
  gap: 10px;
  padding: 25px;
  margin: 0 auto;
  border-radius: 10px;
  overflow-y: scroll;
`;

const CardForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;

const H1 = styled.h1`
  margin-bottom: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
`;

const Submitcontainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  @media only screen and (max-width: 480px) {
    margin-top: 10px;
  }
`;

const HiddeableWidget = styled.div`
  display: none;
  @media (max-width: 480px) {
    display: block;
  }
`;

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
`;

const ComponentWrapper = styled.div`
  display: flex;
  width: 80%;
  height: 80%;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 10px;
  background: #fff;
  border: 1px solid transparent;
  margin: 140px auto auto auto;
  @media only screen and (max-width: 480px) {
    width: 90%;
  }
`;

const ErrorBlock = styled.div`
  color: #c23f38;
  font-size: 14px;
  margin: 10px 0;
`;

const Hr = styled.div`
  height: 1px;
  margin: 15px 0;
  width: 100%;
  background: rgba(208, 214, 217, 0.4);
`;

const Section = styled.div`
  margin: 12px 0;
`;

const validatedInputs = () => {
  const {
    img,
    name,
    profileAccount,
    house_intended,
    HAYInvolve,
    WIYStrategy,
    Key_Issue_1,
    Key_Issue_2,
    Key_Issue_3,
    afiliation,
    agreement,
    tags,
  } = state;

  const isEmpty = (str) => str.trim() === "";
  const isFalse = (check) => check === "false";
  let isValid = true;
  let error_msg;

  if (house_intended === 0) {
    State.update({ error_msg: "Select a house" });
    isValid = false;
  }

  if (img.cid === null) isValid = false;
  if (isEmpty(name)) isValid = false;
  if (isEmpty(profileAccount)) isValid = false;
  if (isEmpty(HAYInvolve)) isValid = false;
  if (isEmpty(WIYStrategy)) isValid = false;
  if (isEmpty(Key_Issue_1)) isValid = false;
  if (isEmpty(Key_Issue_2)) isValid = false;
  if (isEmpty(Key_Issue_3)) isValid = false;
  if (tags.split(",").length == 0) isValid = false;
  if (isFalse(agreement)) isValid = false;
  if (afiliation.length == 0) isValid = false;

  if (afiliation.length > 0) {
    afiliation.forEach((element) => {
      if (isEmpty(element.company_name)) isValid = false;
      if (isEmpty(element.start_date)) isValid = false;
      if (isEmpty(element.end_date)) isValid = false;
      if (isEmpty(element.role)) isValid = false;
    });
  } else {
    isValid = false;
  }

  State.update({
    error_msg: isValid
      ? null
      : error_msg || "* Please complete all required fields",
  });

  return isValid;
};

const uploadFileUpdateState = (body) => {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then(async (res) => {
    const _cid = res.body.cid;
    const _name = body.name;
    State.update({ img: { uploading: "true", cid: _cid, name: _name } });
  });
};

const filesOnChange = (files) => {
  if (files) {
    State.update({ error_msg: null });
    uploadFileUpdateState(files[0]);
  }
};

const handleName = (item) => State.update({ name: item, error_msg: null });

const handleProfile = (item) =>
  State.update({ profileAccount: item, error_msg: null });

const handleChangeHouse = (item) => {
  if (item === "HouseOfMerit") Storage.privateSet("Houseselected", 1);
  if (item === "CouncilOfAdvisors") Storage.privateSet("Houseselected", 2);
  if (item === "TransparencyCommission") Storage.privateSet("Houseselected", 3);

  State.update({ house_intended: item, error_msg: null });
};

const addFields = () => {
  var temp = state.afiliation;
  let object = {
    company_name: "",
    start_date: "",
    end_date: "",
    role: "",
  };

  if (temp.length === 6) return;

  temp.push(object);
  State.update({ afiliation: temp, error_msg: null });
};

const removeField = (index) => {
  State.update({
    afiliation: state.afiliation.splice(index, 1),
    error_msg: null,
  });
};

const validate = (key, item, limit) =>
  State.update({ [key]: item.substring(0, limit ?? 2000), error_msg: null });

const validateAffiliations = (params, key, limit) => {
  let data = state.afiliation;

  data[params.index][key] = params.event.target.value.substring(0, limit);
  State.update({ afiliation: data, error_msg: null });
};

const handleDeclaration = (agreement) => {
  State.update({ agreement: agreement.toString, error_msg: null });
};

const handleNominate = () => {
  if (!validatedInputs()) return;

  let newstate = Object.assign({}, state);
  newstate.afiliation = JSON.stringify(newstate.afiliation);
  const stateAsString = JSON.stringify(newstate);
  const data = ` {"data":{ "${context.accountId}": {"nominations":${stateAsString}} }}`;
  const SocialArgs = JSON.parse(data);

  let SelfNominate_Payload = {
    contractName: nomination_contract,
    methodName: "self_nominate",
    args: {
      house: state.house_intended,
      comment: context.accountId,
      link: "",
    },
    gas: 300000000000000,
    deposit: 100000000000000000000000,
  };

  let Social_Payload = {
    contractName: Socialcontract,
    methodName: "set",
    args: SocialArgs,
    gas: 300000000000000,
    deposit: 100000000000000000000000,
  };

  Near.call([Social_Payload, SelfNominate_Payload]).then(() => handleClose());
};

return (
  <Modal>
    <ComponentWrapper>
      <div
        style={{
          display: "flex",
          "justify-content": "center",
        }}
      >
        <HiddeableWidget>
          <Widget
            src={widgets.page}
            props={{
              nominationData: {
                img: {
                  cid: state.img.cid,
                  isCid: RealProfileImageCid.IS_CID,
                },
                profileAccount: state.profileAccount,
                afiliation: JSON.stringify(state.afiliation),
                HAYInvolve: state.HAYInvolve,
                WIYStrategy: state.WIYStrategy,
                Key_Issue_1: state.Key_Issue_1,
                Key_Issue_2: state.Key_Issue_2,
                Key_Issue_3: state.Key_Issue_3,
                addition_platform: state.addition_platform,
                tags: state.tags,
                video: state.video,
              },
              indexerData: {
                house: state.house_intended,
                timestamp: "",
                nominee: "",
              },
              profileData: {
                name: state.name,
              },
              upVoteData: {
                upvotes: "0",
                comments: [],
              },
              preview: true,
            }}
          />
        </HiddeableWidget>
      </div>
      <CardStyled name="compose">
        <div className="d-flex flex-column ">
          <H1>Self Nominate</H1>

          <CardForm name="cardform">
            <Widget
              src={widgets.styledComponents}
              props={{
                Dropdown: {
                  label: "House",
                  value: state.house_intended,
                  handleChange: (item) => handleChangeHouse(item),
                  options: [
                    { title: "Select house", value: 0, default: true },
                    { title: "House Of Merit", value: "HouseOfMerit" },
                    {
                      title: "Council Of Advisors",
                      value: "CouncilOfAdvisors",
                    },
                    {
                      title: "Transparency Commission",
                      value: "TransparencyCommission",
                    },
                  ],
                },
              }}
            />
            <Hr />
            <Widget
              src={widgets.platform}
              props={{
                inputs: [
                  {
                    label:
                      "How are you involved with the NEAR ecosystem? Why are you a qualified candidate? Why should people vote for you? *",
                    placeholder: "Elaborate",
                    value: state.HAYInvolve,
                    handleChange: (e) => validate("HAYInvolve", e.target.value),
                  },
                  {
                    label:
                      "What is your strategy to develop the NEAR ecosystem? *",
                    placeholder: "Elaborate on your strategy",
                    value: state.WIYStrategy,
                    handleChange: (e) =>
                      validate("WIYStrategy", e.target.value),
                  },
                  {
                    label:
                      "What’s your view and pledge on the issue of User Experience and Accessibility? This issue focuses on improving the user experience, developing the social layer, enhancing the developer experience, and making the Near platform accessible to all users, including those with little technical expertise. It also explores how Near can evoke positive emotions in its users. *",
                    placeholder: "Elaborate on your position and pledge",
                    value: state.Key_Issue_1,
                    handleChange: (e) =>
                      validate("Key_Issue_1", e.target.value),
                  },
                  {
                    label:
                      "What’s your view and pledge on the issue of Economic Growth and Innovation? This issue emphasizes the need for economic growth within the NDC, the development of DeFi capabilities, the establishment of fiat ramps, and the support for founders, developers, creators, and builders. It also stresses the importance of launching useful products on the Near mainnet. *",
                    placeholder: "Elaborate on your position and pledge",
                    value: state.Key_Issue_2,
                    handleChange: (e) =>
                      validate("Key_Issue_2", e.target.value),
                  },
                  {
                    label:
                      "What’s your view and pledge on the issue of Marketing and Outreach? This issue underscores the importance of marketing to make NEAR a household name, conducting research, participating in conferences and hackathons, integrating with Web 2.0 platforms, and promoting Near as a hub of innovation. *",
                    placeholder: "Elaborate on your position and pledge",
                    value: state.Key_Issue_3,
                    handleChange: (e) =>
                      validate("Key_Issue_3", e.target.value),
                  },
                  {
                    label: "Additional Platform",
                    placeholder:
                      "Elaborate on your position and your pledge on additional issues and topics *",
                    value: state.addition_platform,
                    handleChange: (e) =>
                      validate("addition_platform", e.target.value),
                  },
                ],
              }}
            />
            <Widget
              src={widgets.affiliations}
              props={{
                affiliations: state.afiliation,
                addFields,
                removeField,
                handleAFFCompanyName: (params) =>
                  validateAffiliations(params, "company_name", 500),
                handleAFFStartdate: (params) =>
                  validateAffiliations(params, "start_date"),
                handleAFFEnddate: (params) =>
                  validateAffiliations(params, "end_date"),
                handleAFFRole: (params) =>
                  validateAffiliations(params, "role", 500),
              }}
            />

            <Section>
              <Widget
                src={widgets.styledComponents}
                props={{
                  Input: {
                    label: "Video Link (optional)",
                    placeholder:
                      "Add a Youtube video link that describes your candidacy",
                    value: state.video,
                    handleChange: (e) =>
                      State.update({ video: e.target.value }),
                  },
                }}
              />
            </Section>

            <Widget
              src={widgets.tags}
              props={{
                agreement: state.agreement,
                tags: state.tags,
                handleTags: (e) => validate("tags", e.target.value, 500),
                handleDeclaration,
              }}
            />

            {state.error_msg && (
              <ErrorBlock>
                <label className="text-danger">{state.error_msg}</label>
              </ErrorBlock>
            )}

            <div className="col-sm-12 px-4 w-100">
              <Submitcontainer>
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Button: {
                      className: "secondary dark",
                      text: "Cancel",
                      onClick: handleClose,
                    },
                  }}
                />
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Button: {
                      text: "Submit",
                      onClick: () => handleNominate(),
                    },
                  }}
                />
              </Submitcontainer>
            </div>
          </CardForm>
        </div>
      </CardStyled>
    </ComponentWrapper>
  </Modal>
);
