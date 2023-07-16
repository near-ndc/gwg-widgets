const FormsectionAffiliation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  width: 100%;
  height: auto;
  flex: none;

  flex-grow: 0;
  @media only screen and (max-width: 480px) {
  }
`;
const AffiliationHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  width: 100%;
  height: 26px;
  flex: none;
  order: 0;
  flex-grow: 0;
  @media only screen and (max-width: 480px) {
  }
`;
const AffiliationTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 100%;
  height: 20px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-top: 16px;
  padding-right: 26px;
  @media only screen and (max-width: 480px) {
    padding-right: 0px;
  }
`;
const H2 = styled.h1`
  height: 14px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  display: flex;
  align-items: center;
  color: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-top: 25px;
`;
const AffiliationBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 100%;
  height: auto;
  flex: none;
  order: 1;

  margin-top: 16px;
  @media only screen and (max-width: 480px) {
  }
`;
const CompanyTitle = styled.div`
  width: 100%;
  height: 12px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  display: flex;
  align-items: center;
  color: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  @media only screen and (max-width: 480px) {
  }
`;

const CompanyInputName = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 9px 10px;
  gap: 10px;
  width: 100%;
  height: 40px;
  background: #ffffff;
  border: 1px solid #d0d6d9;
  border-radius: 8px;
  flex: none;
  order: 1;
  flex-grow: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  display: flex;
  align-items: center;
`;
const AFDates = styled.div`
  display: flex;
  width: 100%;
  gap: 0.25rem;
  flex-wrap: nowrap;
  @media only screen and (max-width: 480px) {
  }
`;
const DateContItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  width: 50%;
  height: 50px;
  flex: none;
  order: 0;
  flex-grow: 1;
  margin-bottom: 10px;

  @media only screen and (max-width: 480px) {
  }
`;
const CompanyInput = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 9px 10px;
  gap: 10px;
  width: 100%;
  height: 40px;
  background: #ffffff;
  border: 1px solid #d0d6d9;
  border-radius: 8px;
  flex: none;
  order: 1;
  flex-grow: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 480px) {
  }
`;
const FormsectionPlatformtextarea = styled.textarea`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 9px 10px;
  width: 100%;
  height: 100px;
  background: #ffffff;
  border: 1px solid #d0d6d9;
  border-radius: 8px;

  order: 1;

  font-size: 12px;
  @media only screen and (max-width: 480px) {
  }
`;
const Separator = styled.div`
  width: 100%;
  height: 2px;
  background-color: #d0d6d966;
  border: solid 0px transparent;
`;
const getCurrDate = () => {
  let year = new Date().getFullYear().toString();

  let month = new Date().getMonth();
  month = month < 10 ? "0" + (month + 1) : month + 1;

  let day = new Date().getDate();
  day = day < 10 ? "0" + day.toString() : day.toString();

  return year + "-" + month + "-" + day;
};

let currDate = getCurrDate();

const {
  affiliations,
  addFields,
  removeField,
  handleAFFCompanyName,
  handleAFFStartdate,
  handleAFFEnddate,
  handleAFFRole,
} = props;
// State

return (
  <FormsectionAffiliation>
    <AffiliationHead>
      <H2>{"Afiliations"}</H2>
      <Widget
        src={"rubycop.near/widget/NDC.StyledComponents"}
        props={{
          Button: {
            size: "sm",
            text: "Add More Affiliations",
            icon: <i class="bi bi-lg-plus" />,
            handleClick: addFields,
          },
        }}
      />
    </AffiliationHead>

    <AffiliationBody>
      {affiliations.map((form, index) => {
        return (
          <div
            class="bg-white rounded p-4"
            style={{ width: "100%", "margin-top": "20px" }}
          >
            <div class=" col-sm-12 gap-1">
              <Widget
                src={"rubycop.near/widget/NDC.StyledComponents"}
                props={{
                  Input: {
                    label: "Organization Name",
                    placeholder: "Company Name",
                    value: form.company_name,
                    handleChange: (event) =>
                      handleAFFCompanyName({ index, event }),
                  },
                }}
              />
              <div className="d-flex">
                <div className="w-100">
                  <Widget
                    src={"rubycop.near/widget/NDC.StyledComponents"}
                    props={{
                      Input: {
                        type: "date",
                        label: "Start date",
                        min: getCurrDate(),
                        value: form.start_date ?? getCurrDate(),
                        handleChange: (event) =>
                          handleAFFStartdate({ index, event }),
                      },
                    }}
                  />
                </div>
                <div className="px-2" />
                <div className="w-100">
                  <Widget
                    src={"rubycop.near/widget/NDC.StyledComponents"}
                    props={{
                      Input: {
                        type: "date",
                        label: "End date",
                        min: getCurrDate(),
                        value: form.end_date ?? getCurrDate(),
                        handleChange: (event) =>
                          handleAFFEnddate({ index, event }),
                      },
                    }}
                  />
                </div>
              </div>

              <div class=" py-2">
                <CompanyTitle>{"Role Description"}</CompanyTitle>

                <div>
                  <FormsectionPlatformtextarea
                    style={{
                      "font-style": "normal",
                      "font-weight": "400",
                      "font-size": "12px",
                      height: "72px",
                    }}
                    name="Description"
                    id="Description"
                    type="text"
                    placeholder="Please describe your role at the organization"
                    value={form.role}
                    onChange={(event) => {
                      let _param = { index, event };
                      handleAFFRole(_param);
                    }}
                  />
                  <div
                    style={{
                      "margin-top": "5px",

                      order: "3",
                      width: "100%",
                      display: "flex",
                      "justify-content": "end",
                    }}
                  >
                    <label
                      style={{
                        "font-size": "8px",
                        display: "flex",
                        "vertical-align": "top",
                        "text-align": "center",
                        color:
                          form.role.length < 500 ? "#00000075" : "#ff000075",
                      }}
                    >
                      {form.role.length} - 500
                    </label>
                  </div>
                </div>
              </div>

              <div class="flex justify-content-end my-2">
                <Widget
                  src={"rubycop.near/widget/NDC.StyledComponents"}
                  props={{
                    Button: {
                      size: "sm",
                      className: "danger",
                      text: "Delete Affiliation",
                      icon: <i class="bi bi-trash" />,
                      handleClick: () => removeField(index),
                    },
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </AffiliationBody>
  </FormsectionAffiliation>
);
