const { isIAmHuman } = props;

const widget = {
  styledComponents: "kudos-v1.gwg.testnet/widget/NDC.StyledComponents",
};

const Header = styled.div`
  background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);
`;

return (
  <Header className="d-flex p-3 px-4 align-items-center rounded justify-content-between">
    <Widget
      src="rubycoptest.testnet/widget/Image"
      props={{
        image: {
          url: "https://bafkreicrlj3lgygabo37j6gelyamwvm5qj4vtd3sid62dlbr7s6wi3qjhm.ipfs.nftstorage.link/",
        },
        alt: "kudos",
        style: {
          height: "30px",
          objectFit: "cover",
        },
        fallbackUrl:
          "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
      }}
    />
    {!isIAmHuman && (
      <Widget
        src={widget.styledComponents}
        props={{
          Link: {
            text: "Verify as Human",
            href: "https://i-am-human.app/",
          },
        }}
      />
    )}
  </Header>
);
