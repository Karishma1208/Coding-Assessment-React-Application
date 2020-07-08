import React, { Component } from "react";
import "./Main.css";

import Axios from "axios";

import Ingredients from "./../../components/Ingredients/Ingredients";
import Modal from "./../../common/Modal/Modal";
import Orders from "./../../components/Orders/Orders";

import { camelize } from "./../../utility";

class Main extends Component {
  state = {
    ingredients: null,
    showOrder: false
  };

  componentDidMount() {
    Axios.get("https://buildmyburger-f1671.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  addHandler = ingredient => {
    let changedIngredient = ingredient.toLowerCase();
    let newIngredients = this.state.ingredients;
    newIngredients[changedIngredient] = newIngredients[changedIngredient] + 1;
    this.setState({
      ingredients: newIngredients
    });
  };

  removeHandler = ingredient => {
    let changedIngredient = ingredient.toLowerCase();
    let newIngredients = this.state.ingredients;
    if (this.state.ingredients[changedIngredient] !== 0) {
      newIngredients[changedIngredient] = newIngredients[changedIngredient] - 1;
      this.setState({
        ingredients: newIngredients
      });
    }
  };

  orderClickHandler = () => {
    this.setState({
      showOrder: true
    });
  };

  placeOrderHandler = () => {
    this.setState({
      showOrder: false
    });
    alert("Your order is successfully placed!");
  };

  render() {
    let orders = null;
    let ingredients = null;
    let burgerIngredients = null;

    if (this.state.ingredients !== null) {
      let ingredientsName = Object.keys(this.state.ingredients);
      ingredients = ingredientsName.map(ingredient => {
        return (
          <Ingredients
            name={camelize(ingredient)}
            add={this.addHandler}
            remove={this.removeHandler}
            key={ingredient}
            value={this.state.ingredients[ingredient]}
          />
        );
      });

      let order = (
        <Orders
          ingredients={this.state.ingredients}
          ingredientsName={ingredientsName}
          placeOrder={this.placeOrderHandler}
        />
      );

      burgerIngredients = ingredientsName.map(ingredient => {
        let a = [];
        if (this.state.ingredients[ingredient] > 0) {
          for (let i = 0; i < this.state.ingredients[ingredient]; i++) {
            a.push(<p key={"ingredient_" + i}>{ingredient}</p>);
          }
        }
        return a;
      });

      orders = <div>{order}</div>;
    }

    return (
      <div>
        <div className="NavHeader">Build My Burger</div>
        <div className="BurgerBody">
          <div className="BurgerIngredientsContainer">
            <p>Bread</p>
            {burgerIngredients}
            <p>Bread</p>
          </div>
        </div>
        <div className="IngredientsContainer">{ingredients}</div>
        <div className="Footer">
          <button onClick={this.orderClickHandler}>Order Now</button>
        </div>
        {this.state.showOrder ? (
          <Modal title="Your Order" content={orders} />
        ) : null}
      </div>
    );
  }
}

export default Main;
