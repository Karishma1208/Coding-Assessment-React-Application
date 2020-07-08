import React, { Component } from "react";

import "./OrderForm.css";
import Axios from "axios";

class OrderForm extends Component {
  state = {
    formElements: {
      name: {
        type: "text",
        value: "",
        placeholder: "Enter your name here"
      },
      phone: {
        type: "number",
        value: "",
        placeholder: "Enter your number here"
      },
      address: {
        type: "textarea",
        value: "",
        placeholder: "Enter the delivery address here",
        style: { height: "100px" }
      }
    }
  };

  inputHandler = event => {
    let formElements = this.state.formElements;
    formElements[event.target.id].value = event.target.value;
    this.setState({
      formElements: formElements
    });
  };

  placeOrderHandler = () => {
    let order = {};
    Object.keys(this.state.formElements).map(element => {
      return (order[element] = this.state.formElements[element].value);
    });
    order["order"] = this.props.order;
    Axios.post("https://buildmyburger-f1671.firebaseio.com/orders.json", order)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    this.props.placeOrder(true);
  };

  render() {
    let formElements = Object.keys(this.state.formElements).map(element => {
      let inputElement = this.state.formElements[element];
      return (
        <input
          type={inputElement.type}
          value={inputElement.value}
          placeholder={inputElement.placeholder}
          key={element}
          style={inputElement.style}
          className="InputElement"
          id={element}
          onChange={this.inputHandler}
        />
      );
    });

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h3>Please add your delivery details here.</h3>
        {formElements}
        <button onClick={this.placeOrderHandler}>Place Order</button>
      </div>
    );
  }
}

export default OrderForm;
