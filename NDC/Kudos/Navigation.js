const { selectedItem, handleSelect } = props;

const items = {
  Latest: {
    title: "Recent",
    src: "https://bafkreiew4nucfvlgjy3tz7fop66zd7qz6g57j4uf4ufjcxokwjxefwqyim.ipfs.nftstorage.link/",
    srcSelected:
      "https://bafkreif4clvv3j4dyyxuowyosyklnh5c62emnh23e55gip3clsgkto3qi4.ipfs.nftstorage.link/",
  },
  Trending: {
    title: "Trending",
    src: "https://bafkreidoyevrc2jtisbvh5ii4l4siiflwr7d42vgj52tknwcnpjcjt72sa.ipfs.nftstorage.link",
    srcSelected:
      "https://bafkreieeoqtjoyp64oxwvzu2qtjdxzapbpug5l6kgwfsnb7y43mpjhm52e.ipfs.nftstorage.link",
  },
  My: {
    title: "My",
    src: "https://bafkreihtxbozr3tpmzyijzvgmnzjhfnvfudu5twxi5e736omfor6rrbcde.ipfs.nftstorage.link",
    srcSelected:
      "https://bafkreibchxu3obfelbn3dhwpucfvc4yqopodp2khlcnzyw2mcr7zpg2mpi.ipfs.nftstorage.link",
  },
};

const Title = styled.h6`
  margin-bottom: 0;
`;

const ImgContainer = styled.div`
  margin-right: ${(props) => (props.mobile ? "8px" : "20px")};
`;

const DesktopNav = styled.div`
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  border: 1px solid;
  background: ${(props) =>
    props.selected
      ? "linear-gradient(90deg, #9333EA 0%, #4F46E5 100%)"
      : "#FFFFFF"};
  border-color: ${(props) => (props.selected ? "#4F46E5" : "#ffffff")};
  color: ${(props) => (props.selected ? "white" : "inherit")};

  &:hover {
    border: 1px solid #4f46e5;
    background: ${(props) =>
      props.selected
        ? "linear-gradient(90deg, #9333EA 0%, #4F46E5 100%)"
        : "linear-gradient(90deg, rgba(147, 51, 234, 0.08) 0%, rgba(79, 70, 229, 0.08) 100%)"};
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  }
`;

const MobileNav = styled.div`
  border-bottom: ${(props) =>
    props.selected ? "2px solid #4F46E5" : "2px solid rgb(248, 248, 249)"};
  color: ${(props) => (props.selected ? "#4F46E5" : "inherit")};
`;

const Desktop = styled.div`
  display: flex;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Mobile = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Nav = ({ itemType, mobile }) => (
  <div className="d-flex align-items-center">
    <ImgContainer mobile={mobile}>
      <Widget
        src="rubycoptest.testnet/widget/Image"
        props={{
          image: {
            url:
              selectedItem === itemType && !mobile
                ? items[itemType].srcSelected
                : items[itemType].src,
          },
          style: { height: "24px" },
          alt: items[itemType].title,
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
        }}
      />
    </ImgContainer>
    <Title>
      {items[itemType].title} {mobile ? "" : "Kudos"}
    </Title>
  </div>
);

const GroupItem = ({ itemType, mobile }) => (
  <>
    {mobile ? (
      <MobileNav
        role="button"
        className="d-flex w-100 p-3 align-items-center justify-content-center"
        onClick={() => handleSelect(itemType)}
        selected={selectedItem === itemType}
      >
        <Nav itemType={itemType} mobile={mobile} />
      </MobileNav>
    ) : (
      <DesktopNav
        role="button"
        className="d-flex w-100 p-3 px-4 align-items-center justify-content-between mb-2"
        onClick={() => handleSelect(itemType)}
        selected={selectedItem === itemType}
      >
        <Nav itemType={itemType} mobile={mobile} />
      </DesktopNav>
    )}
  </>
);

return (
  <>
    <Desktop className="flex-column gap-1 justify-content-between">
      <GroupItem itemType="Latest" />
      <GroupItem itemType="Trending" />
      <GroupItem itemType="My" />
    </Desktop>

    <Mobile className="flex-row justify-content-between">
      <GroupItem mobile itemType="Latest" />
      <GroupItem mobile itemType="Trending" />
      <GroupItem mobile itemType="My" />
    </Mobile>
  </>
);
