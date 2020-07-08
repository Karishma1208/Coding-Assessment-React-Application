import React, { Component } from "react";

import Backdrop from "./../Backdrop/Backdrop";

class Modal extends Component {
  render() {
    return (
      <div>
        <Backdrop />
        <div
          style={{
            height: "350px",
            textAlign: "center",
            position: "fixed",
            backgroundColor: "#fff",
            zIndex: 500,
            left: "15%",
            top: "10%",
            boxSizing: "border-box",
            width: "70%",
            overflowY: "scroll"
          }}
        >
          <h1>{this.props.title}</h1>
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default Modal;
