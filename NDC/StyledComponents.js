const { Button, Dropdown, TextArea, Input, Link, Tag, _contract } = props;

const contract = _contract ?? "nomination.ndctools.near";

State.init({ textArea: "", input: "" });

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

    &.primary {
      background: #ffd50d;

      &:hover {
        background: #e7c211;
      }

      &.dark {
        color: #fff;
        background: #4ba6ee;

        &:hover {
          background: #3b86cb;
        }
      }

      &.danger {
        background: #dd5e56;
        color: #fff;

        &:hover {
          background: #c23f38;
        }
      }

      &.success {
        background: #5bc65f;
        color: #fff;

        &:hover {
          background: #239f28;
        }
      }

      &:disabled {
        cursor: not-allowed;
        background: #c3cace;
        color: #828688;
        border: 0;

        &:hover {
          background: #c3cace;
          color: #828688;
        }
      }
    }

    &.secondary {
      background: transparent;
      border: 1px solid;
      border-color: ${(props) => (Button.inverse ? "#fff" : "#ffd50d")};
      color: ${(props) => (Button.inverse ? "#fff" : "#ffd50d")};

      &:hover {
        border-color: ${(props) => (Button.inverse ? "#fff" : "#e7c211")};
        color: ${(props) => (Button.inverse ? "#fff" : "#e7c211")};
      }

      &.dark {
        border-color: ${(props) => (Button.inverse ? "#fff" : "#4BA6EE")};
        color: ${(props) => (Button.inverse ? "#fff" : "#4BA6EE")};

        &:hover {
          border-color: ${(props) => (Button.inverse ? "#fff" : "#3B86CB")};
          color: ${(props) => (Button.inverse ? "#fff" : "#3B86CB")};
        }
      }

      &.danger {
        border: 1px solid #dd5e56;
        color: #dd5e56;

        &:hover {
          border-color: #c23f38;
          color: #c23f38;
        }
      }

      &:disabled {
        border-color: #c3cace;
        color: #828688;
        cursor: not-allowed;

        &:hover {
          border-color: #c3cace;
          color: #828688;
        }
      }
    }

    i {
      margin: 0;
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

    &.primary {
      background: #ffd50d;

      &:hover {
        background: #e7c211;
      }

      &.dark {
        color: #fff;
        background: #4ba6ee;

        &:hover {
          background: #3b86cb;
        }
      }

      &.danger {
        background: #dd5e56;
        color: #fff;

        &:hover {
          background: #c23f38;
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
      border-color: ${(props) => (Link.inverse ? "#fff" : "#ffd50d")};
      color: ${(props) => (Link.inverse ? "#fff" : "#ffd50d")};

      &:hover {
        border-color: ${(props) => (Link.inverse ? "#fff" : "#e7c211")};
        color: ${(props) => (Link.inverse ? "#fff" : "#e7c211")};
      }

      &.dark {
        border-color: ${(props) => (Link.inverse ? "#fff" : "#4BA6EE")};
        color: ${(props) => (Link.inverse ? "#fff" : "#4BA6EE")};

        &:hover {
          border-color: ${(props) => (Link.inverse ? "#fff" : "#3B86CB")};
          color: ${(props) => (Link.inverse ? "#fff" : "#3B86CB")};
        }
      }

      &.danger {
        border: 1px solid #dd5e56;
        color: #dd5e56;

        &:hover {
          border-color: #c23f38;
          color: #c23f38;
        }
      }

      &.success {
        border: 1px solid rgb(35, 159, 40);
        color: rgb(35, 159, 40);
      }

      &:disabled {
        border-color: #c3cace;
        color: #828688;
      }
    }

    i {
      margin: 0;
      margin-left: ${(props) => (Link.text ? "5px" : "0")};
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
    border: 1px solid #4ba6ee;
    color: #4ba6ee;
    border-radius: 100px;

    &.dark {
      color: #fff;
      background: #4ba6ee;
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
      className={`align-items-center d-flex ${
        Link.className ?? "primary"
      } gap-1`}
      href={Link.href}
      target={Link.doNotOpenNew ? "" : "_blank"}
      disabled={Link.disabled}
      inverse={Link.inverse}
    >
      {Link.text && <div>{Link.text}</div>}
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
      className={`align-items-center d-flex ${
        Button.className ?? "primary"
      } gap-1`}
      onClick={Button.onClick}
      disabled={Button.disabled}
      text={Button.text}
      inverse={Button.inverse}
    >
      {Button.text && <div>{Button.text}</div>}
      {Button.icon && (
        <div className={`${Button.size === "sm" ? "fs-7" : "fs-6"}`}>
          {Button.icon}
        </div>
      )}
      {Button.image && (
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: { url: Button.image.url },
            alt: Button.image.alt ?? "",
            style: {
              height: "20px",
              objectFit: "cover",
              margin: "0 0 3px 3px",
            },
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          }}
        />
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
      <Styled.Select
        value={Dropdown.value}
        onChange={(e) => Dropdown.handleChange(e.target.value)}
      >
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
      {TextArea.label && <Label>{TextArea.label}</Label>}
      <Styled.TextArea
        placeholder={TextArea.placeholder}
        onChange={(e) => {
          State.update({ textArea: e.target.value });
          TextArea.handleChange(e);
        }}
        rows={5}
      />
      {TextArea.maxLength && (
        <div className="d-flex justify-content-end">
          <small style={{ fontSize: 12 }} className="text-secondary">
            {state.textArea.length ?? 0} / {parseInt(TextArea.maxLength)}
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
        value={state.value}
        type={Input.type ?? "text"}
        placeholder={Input.placeholder}
        onChange={(e) => {
          State.update({ input: e.target.value });
          Input.handleChange(e);
        }}
        maxLength={Input.maxLength}
        min={Input.min}
        max={Input.max}
      />

      {Input.maxLength && (
        <div className="d-flex justify-content-end">
          <small style={{ fontSize: 12 }} className="text-secondary">
            {parseInt(Input.maxLength) - Input.value.length ?? 0} left
          </small>
        </div>
      )}
    </div>
  );
