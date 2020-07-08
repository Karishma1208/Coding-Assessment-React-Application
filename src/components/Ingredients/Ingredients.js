import React, { Component } from "react";
import propTypes from "prop-types";

class Ingredients extends Component {
  render() {
    return (
      <div>
        <span>{this.props.name}</span>
        <button onClick={() => this.props.add(this.props.name)}>+</button>
        <button onClick={() => this.props.remove(this.props.name)}>-</button>
        <span>{this.props.value}</span>
      </div>
    );
  }
}

export default Ingredients;

Ingredients.propTypes = {
  name: propTypes.string,
  value: propTypes.number
};
