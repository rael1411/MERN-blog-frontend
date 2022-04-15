import React from "react";

export default function SureCheck(props) {
  return <div className="sureCheck">
      Are you sure you want to delete this?
      <button className="sureButton" onClick={props.handleDelete}>Yes</button>
      <button className="sureButton" onClick={props.handleToggle}>No</button>
  </div>;
}
