import React, { useState } from "react";
import { Text, TextInput, View, Button, StyleSheet } from "react-native";

interface AccountRegistrationProps {
  onRegister: (fullName: string, email: string, password: string) => void;
}

const AccountRegistration = ({ onRegister }: AccountRegistrationProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (fullName && email && password) {
      onRegister(fullName, email, password);
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Account</Text>
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default AccountRegistration;
