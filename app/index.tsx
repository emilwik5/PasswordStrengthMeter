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


      <PasswordStrengthMeter minLength={3} password={password} texts={["hello", "its me", "imincala", "drimin", "who"]} colors={["white"]} onPasswordChange={setPassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
