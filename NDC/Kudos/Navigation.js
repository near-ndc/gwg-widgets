const { selectedItem, handleSelect } = props;

const items = {
  Latest: {
    title: "Recent",
    src: "https://bafkreibyoqwxexke7agytjxvztsiezcfpkxkagbatqmp3tt6u4mv3ub7bi.ipfs.nftstorage.link/",
    srcSelected:
      "https://bafkreif4clvv3j4dyyxuowyosyklnh5c62emnh23e55gip3clsgkto3qi4.ipfs.nftstorage.link/",
  },
  Trending: {
    title: "Trending",
    src: "https://bafkreiekyoaz3zz6i6ietcudab47u5a7btdhco6srdg6sgbmtgjhaexr2q.ipfs.nftstorage.link",
    srcSelected:
      "https://bafkreieeoqtjoyp64oxwvzu2qtjdxzapbpug5l6kgwfsnb7y43mpjhm52e.ipfs.nftstorage.link",
  },
  My: {
    title: "My",
    src: "https://bafkreicdwy5kpbid7qn2q4yt4lx6oo24kosa7t2ravqg54pmpb62mp64eq.ipfs.nftstorage.link",
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
  background: ${(props) => (props.selected ? "#4ba6ee" : "#FFFFFF")};
  color: ${(props) => (props.selected ? "white" : "inherit")};
`;

const MobileNav = styled.div`
  border-bottom: ${(props) =>
    props.selected ? "2px solid #4ba6ee" : "2px solid rgb(248, 248, 249)"};
  color: ${(props) => (props.selected ? "#4ba6ee" : "inherit")};
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
        src="mob.near/widget/Image"
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
