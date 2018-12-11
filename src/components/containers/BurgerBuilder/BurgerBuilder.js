import React, { Component } from 'react';
import Auxx from '../../../hoc/Auxx';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls.js'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    meat: 2,
    bacon: 1.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 3
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const updatedPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;

        this.setState({ingredients: updatedIngredients,totalPrice: updatedPrice}); 
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
            if (oldCount <= 0) {
              return;
            }
            const updatedCount = oldCount - 1;
            const updatedIngredients = {...this.state.ingredients}
            updatedIngredients[type] = updatedCount;
            const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Auxx>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}/>
            </Auxx>
        );
    }
}

export default BurgerBuilder;