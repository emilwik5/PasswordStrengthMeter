import React, { useState } from "react";
import { View, Alert, SafeAreaView, StyleSheet, Text } from "react-native";
import AccountRegistration from "./components/AccountRegistration/AccountRegistration";
import PasswordStrengthMeter from "./components/PasswordStrengthMeter/PasswordStrengthMeter";

export default function App() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!fullName || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    Alert.alert("Success", `Welcome, ${fullName}!`);
  };

  const colors = ["white", "orange", "purple", "green", "yellow"];
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <AccountRegistration onRegister={handleRegister} />


      <PasswordStrengthMeter
        password={password}
        onPasswordChange={setPassword}
        checks={[
          (password) => password.length >= 8,
          (password) => /[A-Z]/.test(password),
          (password) => /[0-9]/.test(password),
          (password) => /[@$!%*?&#]/.test(password),
          (password) => /[3]/.test(password),
          (password) => password.length >= 16,
        ]}
        requiredChecks={3}
        colors={["gray", "red", "orange", "yellow", "green", "blue", "pink"]}
        texts={["Too Short", "Weak", "Fair", "Good", "Strong", "Very Strong"]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
