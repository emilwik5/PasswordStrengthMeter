import React, { useState, useEffect } from "react";
import { TextInput, Text, View, StyleSheet, Button, Alert, Dimensions } from "react-native";

interface PasswordStrengthMeterProps {
  password: string;
  colors?: string[];
  texts?: string[];
  minLength?: number;
  checks?: ((password: string) => boolean)[];
  requiredChecks?: number;
  buttonTitle?: string;
  onPasswordChange: (password: string) => void;
}

const defaultColors = ["gray", "red", "orange", "yellow", "green"];
const defaultTexts = ["Too Short", "Weak", "Fair", "Good", "Strong"];

const PasswordStrengthMeter = ({
  password,
  colors = defaultColors,
  texts = defaultTexts,
  minLength = 8,
  checks = [
    (password) => password.length >= minLength,
    (password) => /[A-Za-z]/.test(password),
    (password) => /[0-9]/.test(password),
    (password) => /[!@#$%^&*]/.test(password),
  ],
  requiredChecks = 3,
  buttonTitle = "Send",
  onPasswordChange,
}: PasswordStrengthMeterProps) => {
  const [barColor, setBarColor] = useState<string>("gray");
  const [strengthText, setStrengthText] = useState<string>("Too Short");
  const [passedChecks, setPassedChecks] = useState<number>(0);

  useEffect(() => {
    const calculateStrength = () => {
      const passed = checks.reduce((count, check) => (check(password) ? count + 1 : count), 0); // Count passed checks
      setPassedChecks(passed);

      const strengthIndex = Math.min(passedChecks, colors.length - 1);
      setBarColor(colors[strengthIndex]);
      setStrengthText(texts[strengthIndex]);
    };

    calculateStrength();
  }, [password, checks, colors, texts]);

  const handleRegister = () => {
    if (passedChecks < requiredChecks) {
      Alert.alert(`Password must pass at least ${requiredChecks} checks`);
    } else {
      Alert.alert("Success!");
    }
  };

  const screenWidth = Dimensions.get("window").width;
  const barWidth = (passedChecks / checks.length) * screenWidth;

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.barBackground}>
        <View
          style={[
            styles.bar,
            { backgroundColor: barColor, width: barWidth },
          ]}
        />
      </View>
      <Text style={styles.strengthText}>
        Strength: {strengthText} ({passedChecks}/{checks.length} checks passed)
      </Text>
      <Button title={buttonTitle} onPress={handleRegister} />
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
  barBackground: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 5,
    width: "100%",
  },
  bar: {
    height: "100%",
    borderRadius: 5,
  },
  strengthText: {
    fontSize: 14,
    marginVertical: 5,
  },
});

export default PasswordStrengthMeter;
