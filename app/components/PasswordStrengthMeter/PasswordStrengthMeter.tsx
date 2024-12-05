import React from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

interface PasswordStrengthMeterProps {
  password: string;
  onPasswordChange: (password: string) => void;
}

const PasswordStrengthMeter = ({
  password,
  onPasswordChange,
}: PasswordStrengthMeterProps) => {
  const calculateStrength = () => {
    if (password.length < 6) return "Weak";
    if (password.match(/[A-Za-z]/) && password.match(/[0-9]/)) return "Medium";
    if (password.length >= 8 && password.match(/[@#$%^&*]/)) return "Strong";
    return "Weak";
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry
        style={styles.input}
      />
      <Text style={styles.strengthText}>Strength: {calculateStrength()}</Text>
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
  strengthText: {
    fontSize: 14,
    color: "gray",
  },
});

export default PasswordStrengthMeter;
