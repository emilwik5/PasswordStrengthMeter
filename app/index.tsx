import React, { useState } from "react";
import { View, Alert } from "react-native";
import AccountRegistration from "./components/AccountRegistration/AccountRegistration";
import PasswordStrengthMeter from "./components/PasswordStrengthMeter/PasswordStrengthMeter";



export default function Index() {
  const handleRegister = (fullName: string, email: string, password: string) => {
    Alert.alert("Registration Success", `Welcome, ${fullName}!`);
  };

  const [password, setPassword] = useState("");
  const colors = ["white", "orange", "purple", "green", "yellow"];
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <AccountRegistration onRegister={handleRegister} />


      <PasswordStrengthMeter password={password} colors={["white"]} onPasswordChange={setPassword} />
    </View>
  );
}
