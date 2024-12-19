import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import AccountRegistration from "./components/AccountRegistration/AccountRegistration";
import PasswordStrengthMeter from "./components/PasswordStrengthMeter/PasswordStrengthMeter";

export default function App() {
  const [password, setPassword] = useState("");
  const colors = ["white", "orange", "purple", "green", "yellow"];

  return (
    <SafeAreaView style={styles.container}>
      <Text>Account Registration</Text>
      <AccountRegistration
        fullName={{
          placeholder: "Full Name",
          onChangeText: (value) => console.log("Full Name:", value),
        }}
        email={{
          placeholder: "Email",
          onChangeText: (value) => console.log("Email:", value),
        }}
        password={{
          placeholder: "Password",
          onChangeText: (value) => console.log("Password:", value),
          secureTextEntry: true,
          enableToggleVisibility: false,
        }}
        dateOfBirth={{
          placeholder: "Date of Birth (YYYY-MM-DD)",
          onChangeText: (value) => console.log("Date of Birth:", value),
        }}
        username={{
          placeholder: "Username",
          onChangeText: (value) => console.log("Username:", value),
        }}
        phoneNumber={{
          placeholder: "Phone Number",
          onChangeText: (value) => console.log("Phone Number:", value),
        }}
        requiredFields={["email", "password"]}
        invalidBorderColor="red"
        validBorderColor="green"
        mandatoryBorderColor="orange"
        buttonTitle="Register"
      />
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
        buttonTitle="Sign up!"

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
