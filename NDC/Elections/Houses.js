let { houses, ids, electionContract, selectedHouse, votesLeft, urlProps } =
  props;
ids = ids ?? [1, 2, 3, 4];

State.init({ houses: houses ?? [] });

// for nominations (only 3 houses to display)
if (!houses && electionContract) {
  const contractHouses = [
    Near.view(electionContract, "proposal", { prop_id: ids[0] }),
    Near.view(electionContract, "proposal", { prop_id: ids[1] }),
    Near.view(electionContract, "proposal", { prop_id: ids[2] }),
  ];

  State.update({ houses: contractHouses });
}

const housesMapping = {
  CouncilOfAdvisors: {
    title: "Council Of Advisors",
    src: "https://bafkreidejnek5zzwlhd3lxnr7s3tvtrgul6jobfpikbs7zjkpuovxdz7je.ipfs.nftstorage.link",
  },
  HouseOfMerit: {
    title: "House of Merit",
    src: "https://bafkreihoomeeaeyqerqftn3n7yb2jrnmqtpwgpsl3xpelek6qmly3qzob4.ipfs.nftstorage.link",
  },
  TransparencyCommission: {
    title: "Transparency Commission",
    src: "https://bafkreihcog3rs2gj4wgwfixk6yqir7k3csyaqiqwcvm2gedlh6dlvr7ik4.ipfs.nftstorage.link",
  },
  SetupPackage: {
    title: "Budget Package",
    src: "https://ipfs.near.social/ipfs/bafkreicljooupjpwmdlja2ocjg3sljvknlq5iriahqbqiwob635l2vszqa",
  },
};

const Loader = () => (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

const Small = styled.small`
  margin-top: 10px;
  font-weight: 400;
`;

const H6 = styled.h6`
  margin-top: 5px;
  margin-bottom: 0;
`;

const ImgContainer = styled.div`
  margin-right: 20px;

  img {
    border-radius: 50%;
    height: 40px;
    max-height: "40px";
  }
`;

const CompletedIcon = styled.i`
  border-radius: 50%;
  padding-bottom: 0;
  color: #239f28;
  background: #cee9cf;

  &:before {
    vertical-align: -0.2rem;
  }
`;

const ItemContainer = styled.a`
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background: ${(props) => (props.selected ? "#4BA6EE" : "#fff")};
  color: ${(props) => (props.selected ? "white" : "inherit")};
  text-decoration: none;

  &:hover {
    text-decoration: none;
    color: ${(props) => (props.selected ? "#fff" : "#000")};
    background: ${(props) => (props.selected ? "#4BA6EE" : "#fff")};
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  }
`;

const buildURL = (houseId) => {
  const arr = [];
  if (!urlProps) return "";

  if (urlProps.ids) arr.push(`ids=${urlProps.ids}`);
  if (urlProps.election_contract)
    arr.push(`election_contract=${urlProps.election_contract}`);
  if (urlProps.registry_contract)
    arr.push(`registry_contract=${urlProps.registry_contract}`);
  arr.push(`house=${houseId}`);

  return "?" + arr.join("&");
};

const HouseItem = ({ house }) => (
  <ItemContainer
    className="d-flex p-3 px-4 align-items-center mb-3 justify-content-between"
    href={buildURL(house.id)}
    selected={selectedHouse === house.id}
  >
    <div className="d-flex align-items-center">
      <ImgContainer>
        <img
          src={housesMapping[house.typ].src}
          alt={housesMapping[house.typ].title}
        />
      </ImgContainer>
      <div>
        <H6>{housesMapping[house.typ].title}</H6>
        {votesLeft && (
          <Small>
            {votesLeft(house)} / {house.seats} votes left
          </Small>
        )}
      </div>
    </div>
    {votesLeft && (
      <div>
        {votesLeft(house) < house.seats && (
          <CompletedIcon
            className="bi bi-check-circle fs-5"
            selected={selectedHouse === house.id}
          />
        )}
      </div>
    )}
  </ItemContainer>
);

return (
  <div>
    {state.houses.map((house) => (
      <HouseItem house={house} />
    ))}
  </div>
);
