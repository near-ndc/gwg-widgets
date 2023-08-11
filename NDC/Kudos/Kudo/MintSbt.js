const { onHide, kudoId } = props;

const kudosContract = "kudos.ndctools.near";
const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
};

const Modal = styled.div`
  position: fixed;
  display: flex;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
`;

const ComponentWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalContent = styled.div`
  background: #f8f8f9;
  margin: 100px auto;
  padding: 20px;
  border-radius: 10px;
  width: 30%;

  @media (max-width: 1200px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }

  h3 {
    margin-bottom: 20px;
    font-weight: 700;
  }

  h6 {
    font-weight: 400;
  }
`;

const Gift = styled.div`
  font-size: 150px;
`;

const handleMintSBT = () => {
  Near.call(
    kudosContract,
    "exchange_kudos_for_sbt",
    {
      kudos_id: kudoId,
    },
    "300000000000000",
    8000000000000000000000
  ).then((_data) => onHide());
};

return (
  <Modal>
    <ComponentWrapper>
      <ModalContent>
        <div className="w-100 d-flex justify-content-end">
          <div className="pb-3" onClick={onHide}>
            <i class="bi bi-x-lg"></i>
          </div>
        </div>
        <h3 className="text-center">
          You can now mint a “Proof of Kudos” Soul Bound Token
        </h3>
        <h6 className="text-secondary text-center px-2">
          Congratulations, you have received enough social proof to mint a
          “Proof of Kudos” Soul Bond Token. Don't wait!
        </h6>
        <Gift className="text-center">🎁</Gift>
        <div className="d-flex justify-content-center w-100">
          <Widget
            src={widgets.styledComponents}
            props={{
              Button: {
                text: "Mint your Proof of Kudos SBT!",
                onClick: handleMintSBT,
              },
            }}
          />
        </div>
      </ModalContent>
    </ComponentWrapper>
  </Modal>
);
