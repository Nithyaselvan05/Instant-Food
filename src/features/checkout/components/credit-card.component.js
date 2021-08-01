import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import createStripe from "stripe-client";
import { cardTokenRequest } from "../../../services/checkout/checkout.service";
// const stripe = createStripe(
//   "pk_test_51JGxmjSIhBmxdGhjxlCmabNKegATxQF5skDNyrobVeGcETzd7hBO2XBAjQ6X2HBaFIkHUEdo53gqaHqcabEuc4CJ00xDizRYLg"
// );

export const CreditCardInput = ({ name ,onSuccess}) => {
  const onChange = async (formData) => {
    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes("incomplete");
    console.log(isIncomplete);
    const expiry = values.expiry.split("/");
    console.log(expiry);
    const card = {
      number: values.number,
      exp_month: expiry[0],
      exp_year: expiry[1],
      cvc: values.cvc,
      name: name,
    };
    if (!isIncomplete) {
      const info = await cardTokenRequest(card);
      onSuccess(info);
    }
  };
  return <LiteCreditCardInput onChange={onChange} />;
};