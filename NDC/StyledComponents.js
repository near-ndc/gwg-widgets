const { Button, Dropdown, TextArea, Input, Link, Tag } = props;

const Styled = {
  Button: styled.button`
    width: max-content;
    padding: ${(props) => (Button.size === "sm" ? "4px 12px" : "8px 20px")};
    height: ${(props) => (Button.size === "sm" ? "28px" : "")};
    font-size: ${(props) => (Button.size === "sm" ? "12px" : "14px")};
    border-radius: ${(props) => (Button.size === "sm" ? "6px" : "10px")};
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    border: 0;

    &.danger {
      border: 1px solid #c23f38;
      background: #f1d6d5;
      color: #c23f38;
    }

    &.primary {
      background: #ffd50d;

      &:hover {
        background: #e7c211;
      }

      &.dark {
        color: #fff;
        background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);

        &:hover {
          background: linear-gradient(90deg, #792ac0 0%, #423abd 100%);
        }
      }

      &:disabled {
        background: #c3cace;
        color: #828688;
        border: 0;
      }
    }

    &.secondary {
      background: transparent;
      border: 1px solid;
      border-color: #ffd50d;
      color: #ffd50d;

      &:hover {
        border-color: #e7c211;
        color: #e7c211;
      }

      &.dark {
        color: #4f46e5;
        border-color: #4f46e5;

        &:hover {
          border-color: #2f2a87;
          color: #2f2a87;
        }
      }

      &:disabled {
        border-color: #c3cace;
        color: #828688;
      }
    }

    i {
      margin: 0 0 0 5px;
    }
  `,

  Link: styled.a`
    width: max-content;
    padding: ${(props) => (Link.size === "sm" ? "4px 12px" : "8px 20px")};
    height: ${(props) => (Link.size === "sm" ? "28px" : "")};
    font-size: ${(props) => (Link.size === "sm" ? "12px" : "14px")};
    border-radius: ${(props) => (Link.size === "sm" ? "6px" : "10px")};
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    border: 0;
    color: black;

    &:hover {
      text-decoration: none;
      color: black;
    }

    &.danger {
      border: 1px solid #c23f38;
      background: #f1d6d5;
      color: #c23f38;
    }

    &.primary {
      background: #ffd50d;

      &:hover {
        background: #e7c211;
      }

      &.dark {
        color: #fff;
        background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);

        &:hover {
          background: linear-gradient(90deg, #792ac0 0%, #423abd 100%);
        }
      }

      &:disabled {
        background: #c3cace;
        color: #828688;
        border: 0;
      }
    }

    &.secondary {
      background: transparent;
      border: 1px solid;
      border-color: #ffd50d;
      color: #ffd50d;

      &:hover {
        border-color: #e7c211;
        color: #e7c211;
      }

      &.dark {
        color: #4f46e5;
        border-color: #4f46e5;

        &:hover {
          border-color: #2f2a87;
          color: #2f2a87;
        }
      }

      &:disabled {
        border-color: #c3cace;
        color: #828688;
      }
    }

    i {
      margin: 0 0 0 5px;
    }
  `,

  Select: styled.select`
    padding: 8px 10px;
    width: 100%;
    height: 40px;
    background: #ffffff;
    border: 1px solid #d0d6d9;
    border-radius: 8px;
    font-size: 14px;
    color: #828688;
  `,
  TextArea: styled.textarea`
    padding: 8px 10px;
    width: 100%;
    background: #ffffff;
    border: 1px solid #d0d6d9;
    border-radius: 8px;
    font-size: 14px;
    color: #828688;
  `,
  Input: styled.input`
    padding: 8px 10px;
    width: 100%;
    background: #ffffff;
    border: 1px solid #d0d6d9;
    border-radius: 8px;
    font-size: 14px;
    color: #828688;
  `,
  Tag: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
    border: 1px solid #9333ea;
    color: #9333ea;
    background: linear-gradient(
      90deg,
      rgba(147, 51, 234, 0.1) 0%,
      rgba(79, 70, 229, 0.1) 100%
    );
    border-radius: 100px;

    &.dark {
      color: #fff;
      background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 150px;
      font-style: normal;
      font-weight: 500;
      font-size: 11px;
      line-height: 120%;
      margin-bottom: 0;
    }
  `,
};

const Container = styled.div`
  h4 {
    margin: 10px 0;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 5px;
`;

if (Link)
  return (
    <Styled.Link
      size={Link.size}
      className={`align-items-center d-flex ${Link.className ?? "primary"}`}
      href={Link.href}
      disabled={Link.disabled}
    >
      <div>{Link.text}</div>
      {Link.icon && (
        <div className={`${Link.size === "sm" ? "fs-7" : "fs-6"}`}>
          {Link.icon}
        </div>
      )}
    </Styled.Link>
  );

if (Button)
  return (
    <Styled.Button
      size={Button.size}
      className={`align-items-center d-flex ${Button.className ?? "primary"}`}
      onClick={Button.onClick}
      disabled={Button.disabled}
    >
      <div>{Button.text}</div>
      {Button.icon && (
        <div className={`${Button.size === "sm" ? "fs-7" : "fs-6"}`}>
          {Button.icon}
        </div>
      )}
    </Styled.Button>
  );

if (Tag)
  return (
    <Styled.Tag className={Tag.className}>
      <p title={Tag.title}>{Tag.title}</p>
    </Styled.Tag>
  );

if (Dropdown)
  return (
    <div>
      <Label>{Dropdown.label}</Label>
      <Styled.Select onChange={(e) => Dropdown.handleChange(e.target.value)}>
        {Dropdown.options.map((opt) => (
          <>
            {opt.default ? (
              <option default value={opt.value}>
                {opt.title}
              </option>
            ) : (
              <option value={opt.value}>{opt.title}</option>
            )}
          </>
        ))}
      </Styled.Select>
    </div>
  );

if (TextArea)
  return (
    <div>
      <Label>{TextArea.label}</Label>
      <Styled.TextArea
        value={TextArea.value}
        placeholder={TextArea.placeholder}
        onChange={TextArea.handleChange}
        rows={5}
        maxLength={TextArea.maxLength}
      />

      {TextArea.maxLength && (
        <div className="d-flex justify-content-end">
          <small style={{ fontSize: 12 }} className="text-secondary">
            {TextArea.maxLength - TextArea.value.length} left
          </small>
        </div>
      )}
    </div>
  );

if (Input)
  return (
    <div>
      <Label>{Input.label}</Label>
      <Styled.Input
        value={Input.value}
        type={Input.type ?? "text"}
        placeholder={Input.placeholder}
        onChange={Input.handleChange}
        maxLength={Input.maxLength}
        min={Input.min}
        max={Input.max}
      />

      {Input.maxLength && (
        <div className="d-flex justify-content-end">
          <small style={{ fontSize: 12 }} className="text-secondary">
            {Input.maxLength - Input.value.length} left
          </small>
        </div>
      )}
    </div>
  );

const WidgetButton = ({ type, size, className, disabled, text, icon }) => (
  <Widget
    src={"rubycop.near/widget/NDC.StyledComponents"}
    props={{
      [type ?? "Button"]: {
        size,
        className,
        disabled,
        text,
        icon,
      },
    }}
  />
);

const WidgetSelect = () => (
  <Widget
    src={"rubycop.near/widget/NDC.StyledComponents"}
    props={{
      Dropdown: {
        label: "Select label",
        options: [
          { title: "Select value", default: true, value: 0 },
          { title: "value 1", value: 1 },
          { title: "value 2", value: 2 },
        ],
      },
    }}
  />
);

const WidgetInput = ({ type }) => {
  State.init({ [type]: "" });

  return (
    <Widget
      src={"rubycop.near/widget/NDC.StyledComponents"}
      props={{
        [type]: {
          label: "Select label",
          placeholder: "Placeholder text here...",
          maxLength: 20,
          min: new Date(),
          value: state[type],
          handleChange: (e) => State.update({ [type]: e.target.value }),
        },
      }}
    />
  );
};

return (
  <Container>
    <h4>Button</h4>
    <div className="d-flex align-items-end flex-wrap gap-2">
      <WidgetButton text="Primary" />
      <WidgetButton text="Primary" icon={<i class="bi bi-check-lg"></i>} />
      <WidgetButton
        text="Secondary"
        className="secondary"
        icon={<i class="bi bi-check-lg"></i>}
      />
      <WidgetButton disabled text="Primary" />
      <WidgetButton disabled className="secondary" text="Secondary" />
      <WidgetButton size="sm" text="Primary" />
      <WidgetButton size="sm" className="secondary" text="Secondary" />
    </div>

    <div className="d-flex align-items-end flex-wrap gap-2">
      <WidgetButton text="Primary Dark" className="primary dark" />
      <WidgetButton
        text="Primary Dark"
        className="primary dark"
        icon={<i class="bi bi-check-lg"></i>}
      />
      <WidgetButton
        text="Secondary Dark"
        className="secondary dark"
        icon={<i class="bi bi-check-lg"></i>}
      />
      <WidgetButton disabled className="primary dark" text="Primary dark" />
      <WidgetButton disabled className="secondary dark" text="Secondary dark" />
      <WidgetButton size="sm" className="primary dark" text="Primary dark" />
      <WidgetButton
        size="sm"
        className="secondary dark"
        text="Secondary dark"
      />
    </div>

    <div className="d-flex align-items-end flex-wrap gap-2">
      <WidgetButton
        text="Danger"
        className="danger"
        icon={<i class="bi bi-trash" />}
      />
    </div>

    <h4>Link Button</h4>
    <div className="d-flex align-items-end flex-wrap gap-2">
      <WidgetButton type="Link" text="Primary" className="primary dark" />
      <WidgetButton type="Link" text="Secondary" className="secondary dark" />
    </div>

    <h4>Tag</h4>
    <div className="d-flex align-items-end flex-wrap gap-2">
      <Widget
        src={"rubycop.near/widget/NDC.StyledComponents"}
        props={{ Tag: { title: "Lorem ipsum", className: "dark" } }}
      />
      <Widget
        src={"rubycop.near/widget/NDC.StyledComponents"}
        props={{ Tag: { title: "Lorem ipsum" } }}
      />
      <Widget
        src={"rubycop.near/widget/NDC.StyledComponents"}
        props={{
          Tag: {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          },
        }}
      />
    </div>

    <h4>Select</h4>
    <WidgetSelect />

    <h4>Input</h4>
    <WidgetInput type="Input" />
    <WidgetInput type="TextArea" />
  </Container>
);
