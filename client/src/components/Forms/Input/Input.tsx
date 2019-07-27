import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const capitalizeFirstLetter = word =>
  word.charAt(0).toUpperCase() + word.slice(1);

const Input = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, status }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  icons: { left, right },
  ...props
}) => (
  // <div>
  //     <input type="text" {...field} {...props} />
  //     {touched[field.name] &&
  //         errors[field.name] && <div className="error">{errors[field.name]}</div>}
  // </div>
  <div>
    <div className="field">
      <label className="label">{capitalizeFirstLetter(field.name)}</label>
      <div className="control has-icons-left has-icons-right">
        <input
          className={
            touched[field.name] && errors[field.name]
              ? "input is-danger"
              : touched[field.name] && !errors[field.name]
              ? "input is-success"
              : "input"
          }
          {...field}
          {...props}
        />
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={left} />
        </span>
        <span className="icon is-small is-right">
          <FontAwesomeIcon icon={right} />
        </span>
      </div>
    </div>
    {touched[field.name] && errors[field.name] && (
      <article className="message is-danger is-small">
        <div className="message-body">{errors[field.name]}</div>
      </article>
    )}
  </div>
);

export default Input;
