import React from "react";
import { TouchableOpacity, View, TextInput, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { FormStyles } from "./styles/form";

export default function Form({ children, ...restProps }) {
  return (
    <View style={FormStyles.formContainer} {...restProps}>
      {children}
    </View>
  );
}

Form.Title = function FormTitle({ children, ...restProps }) {
  return (
    <Text style={FormStyles.title} {...restProps}>
      {children}
    </Text>
  );
};

Form.PrimaryButton = function FormButton({ children, ...restProps }) {
  return (
    <TouchableOpacity style={FormStyles.primaryButtonContainer} {...restProps}>
      <Text style={FormStyles.primaryButtonText}>{children}</Text>
    </TouchableOpacity>
  );
};

Form.SecondaryButton = function FormButton({ children, ...restProps }) {
  return (
    <TouchableOpacity
      style={FormStyles.secondaryButtonContainer}
      {...restProps}
    >
      <Text style={FormStyles.secondaryButtonText}>{children}</Text>
    </TouchableOpacity>
  );
};

Form.RoundButton = function FormRoundButton({
  children,
  buttonStyles,
  textStyles,
  ...restProps
}) {
  return (
    <TouchableOpacity
      style={[FormStyles.roundButton, buttonStyles]}
      {...restProps}
    >
      <Text style={[FormStyles.roundButtonText, textStyles]}>{children}</Text>
    </TouchableOpacity>
  );
};

Form.Input = function FormInput({ children, ...restProps }) {
  return <TextInput style={FormStyles.input} {...restProps} />;
};

Form.Text = function FormText({ children, ...restProps }) {
  return (
    <Text style={FormStyles.text} {...restProps}>
      {children}
    </Text>
  );
};

Form.GameInput = function FormGameInput({
  inputLabel,
  inputValue,
  lowerLimit,
  upperLimit,
  changeAmount,
  changeFunction,
}) {
  // add logic on input to keep track of value and limits
  return (
    <View style={FormStyles.gameInputContainer}>
      <Text style={FormStyles.gameInputLabel}>{inputLabel}</Text>
      {inputValue > lowerLimit && (
        <TouchableOpacity
          style={FormStyles.gameInputIcon}
          onPress={() => changeFunction(inputValue - changeAmount)}
        >
          <FontAwesome name="minus" size={24} color="#16697a" />
        </TouchableOpacity>
      )}
      <Text style={FormStyles.gameInputValue}>{inputValue}</Text>
      {inputValue < upperLimit && (
        <TouchableOpacity
          style={FormStyles.gameInputIcon}
          onPress={() => changeFunction(inputValue + changeAmount)}
        >
          <FontAwesome name="plus" size={24} color="#16697a" />
        </TouchableOpacity>
      )}
    </View>
  );
};

Form.PaddingDivider = function FormPaddingDivider({ children, ...restProps }) {
  return (
    <View style={FormStyles.paddingDivider} {...restProps}>
      {children}
    </View>
  );
};
