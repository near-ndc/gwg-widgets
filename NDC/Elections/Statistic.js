const { electionContract, quorum } = props;

const BLACKLISTED_COUNT = 911;

const Chart = styled.div`
  width: 150px;
  aspect-ratio: 1;
  position: relative;
  display: inline-grid;
  place-content: center;
  margin: 5px;
  font-size: 25px;
  font-weight: bold;

  &:before {
    content: "";
    position: absolute;
    border-radius: 50%;
    inset: 0;
    background: ${(props) =>
      `conic-gradient(#4ba6ee, calc(${props.voted}*1%), #d4e5f4 0)`};
    -webkit-mask: radial-gradient(
      farthest-side,
      #0000 calc(99% - 15px),
      #000 calc(100% - 15px)
    );
    mask: radial-gradient(
      farthest-side,
      #0000 calc(99% - 15px),
      #000 calc(100% - 15px)
    );
  }

  span {
    font-weight: 800;
    font-size: 32px;
    line-height: 120%;
    color: #4ba6ee;
  }
`;

const H5 = styled.h5`
  margin-top: 10px;
  b {
    font-weight: 800;
  }
  small {
    font-weight: 400;
    font-size: 14px;
  }
`;

const registryContract = "registry.i-am-human.near";
const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

State.init({
  total: 0,
  voted: 0,
});

asyncFetch(`https://api.pikespeak.ai/election/iah-by-flag`, {
  headers: { "x-api-key": apiKey },
}).then((resp) => {
  if (resp.body)
    State.update({
      total: parseInt(resp.body.total_iah) - parseInt(resp.body.black_list),
    });
});

asyncFetch(
  `https://api.pikespeak.ai/election/total-voters?contract=${electionContract}`,
  { headers: { "x-api-key": apiKey } }
).then((resp) => {
  if (resp.body) State.update({ voted: resp.body });
});

const percent = state.total > 0 ? (state.voted / state.total) * 100 : 0;

return (
  <div>
    <Chart voted={percent}>
      <span>{percent.toFixed(1)}%</span>
    </Chart>
    <div className="text-center">
      <H5>
        <b>{state.voted}</b>/<small>{state.total} Humans Voted</small>
      </H5>
      <H5>
        <small>Quorum: {quorum}</small>
      </H5>
    </div>
  </div>
);
