import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import AccountRegistration from "./components/AccountRegistration/AccountRegistration";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Account Registration</Text>
      <AccountRegistration
        fullName={{
          placeholder: "Full Name",
          onChangeText: (value) => console.log("Full Name:", value),
        }}
        password={{
          placeholder: "Password",
          onChangeText: (value) => console.log("Password:", value),
          secureTextEntry: true,
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
        invalidBorderColor="orange"
        requiredFields={["fullName", "password"]}
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
