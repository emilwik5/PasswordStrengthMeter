import React, { useState } from "react";
import { View, Alert } from "react-native";
import AccountRegistration from "./components/AccountRegistration/AccountRegistration";
import PasswordStrengthMeter from "./components/PasswordStrengthMeter/PasswordStrengthMeter";

const handleRegister = (fullName: string, email: string, password: string) => {
  Alert.alert("Registration Success", `Welcome, ${fullName}!`);
};
export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <AccountRegistration onRegister={handleRegister} />
    </View>
  );
}
