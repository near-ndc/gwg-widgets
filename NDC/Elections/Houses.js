const { houses, selectedHouse, handleSelect, votesLeft } = props;

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
};

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

const ItemContainer = styled.div`
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background: ${(props) => (props.selected ? "#4BA6EE" : "#fff")};
  color: ${(props) => (props.selected ? "white" : "inherit")};

  &:hover {
    background: ${(props) => (props.selected ? "#4BA6EE" : "#fff")};
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  }
`;

const HouseItem = ({ house }) => (
  <ItemContainer
    role="button"
    className="d-flex p-3 px-4 align-items-center mb-3 justify-content-between"
    onClick={() => handleSelect(house)}
    selected={selectedHouse === house.id}
  >
    <div className="d-flex align-items-center">
      <ImgContainer>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: { url: housesMapping[house.typ].src },
            alt: housesMapping[house.typ].title,
            style: {
              height: "40px",
              objectFit: "cover",
              maxHeight: "40px",
              borderRadius: "50%",
            },
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          }}
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
    {houses.map((house) => (
      <HouseItem house={house} />
    ))}
  </div>
);
