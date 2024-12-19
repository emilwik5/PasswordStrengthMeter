import React, { useState, useEffect } from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

interface PasswordStrengthMeterProps {
  password: string;
  colors?: string[];
  texts?: string[];
  minLength?: number;
  onPasswordChange: (password: string) => void;
}

let defaultColors = ["gray", "red", "orange", "yellow", "green"];
let defaultTexts = ["Too Short", "Strong", "Good", "Fair", "Weak"];

const PasswordStrengthMeter = ({
  password,
  colors = ["gray", "red", "orange", "yellow", "green"],
  texts = ["Too Short", "Strong", "Good", "Fair", "Weak"],
  minLength = 8,
  onPasswordChange,
}: PasswordStrengthMeterProps) => {
  const [barColor, setBarColor] = useState<string>("gray");
  const [strengthText, setStrengthText] = useState<string>("Too Short");

  useEffect(() => {
    const calculateStrength = () => {
      let num = 0;

      if (password.length < minLength) num = 0;
      else if (
        password.length > 12 &&
        password.match(/[A-Za-z]/) &&
        password.match(/![@#$%^&*]/) &&
        password.match(/[0-9]/)
      )
        num = 1;
      else if (
        password.match(/[A-Za-z]/) &&
        password.match(/![@#$%^&*]/) &&
        password.match(/[0-9]/)
      )
        num = 2;
      else if (password.match(/[A-Za-z]/) && password.match(/[0-9]/))
        num = 3;
      else num = 4;

      setBarColor(colors[num] || defaultColors[num]);
      setStrengthText(texts[num] || defaultTexts[num]);
    };

    calculateStrength();
  }, [password, colors]); // Ska kunna välja krav + välja hur många krav + välja vad som står

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry
        style={styles.input}
      />
      <Text
        style={[
          {
            fontSize: 14,
            backgroundColor: barColor,
          },
        ]}
      >
        Strength: {strengthText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default PasswordStrengthMeter;
