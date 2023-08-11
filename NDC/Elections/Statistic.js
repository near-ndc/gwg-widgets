const { voted, total } = props;

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

const percent = (voted / total) * 100;

return (
  <div>
    <Chart voted={percent}>
      <span>{percent.toFixed(1)}%</span>
    </Chart>
    <H5>
      <b>{voted}</b>/<small>{total} Humans Voted</small>
    </H5>
  </div>
);
