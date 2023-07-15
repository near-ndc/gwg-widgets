const { handleFilter, candidateId, placeholder } = props;

const Container = styled.div`
  padding: 16px;
  border-radius: 8px;
  background: #f8f8f9;

  i {
    position: absolute;
    top: 8px;
    left: 16px;
    font-size: 14px;
  }

  input {
    padding: 8px;
    padding-left: 40px;
    font-size: 14px;
  }
`;

return (
  <Container>
    <div className="position-relative">
      <i className="bi bi-search text-secondary"></i>
      <input
        placeholder={placeholder}
        className="form-control w-100"
        value={candicateId}
        onChange={handleFilter}
      />
    </div>
  </Container>
);
