import React, { Component } from "react";

import { camelize } from "./../../utility";

import OrderForm from "./OrderForm/OrderForm";

class Orders extends Component {
  render() {
    let orderSummary = this.props.ingredientsName.map(ingredient => {
      return (
        <p key={ingredient}>
          {camelize(ingredient)} : {this.props.ingredients[ingredient]}
        </p>
      );
    });

    return (
      <div>
        {orderSummary}
        <OrderForm
          placeOrder={this.props.placeOrder}
          order={this.props.ingredients}
        />
      </div>
    );
  }
}

export default Orders;
