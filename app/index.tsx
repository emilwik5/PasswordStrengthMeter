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

  return (
    <SafeAreaView style={styles.container}>
      <Text>Account Registration</Text>
      <AccountRegistration
        fullName={{
          placeholder: "Full Name",
          value: fullName,
          onChangeText: setFullName,
        }}
        email={{
          placeholder: "Email",
          value: email,
          onChangeText: setEmail,
        }}
        onRegister={handleRegister}
        buttonTitle="Sign Up"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
