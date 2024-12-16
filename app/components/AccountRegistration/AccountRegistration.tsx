import React from "react";
import { TextInput, View, Button, StyleSheet } from "react-native";

interface AccountRegistrationProps {
  fullName?: {
    placeholder: string;
    value: string;
    onChangeText: (value: string) => void;
  };
  email?: {
    placeholder: string;
    value: string;
    onChangeText: (value: string) => void;
  };
  password?: {
    placeholder: string;
    value: string;
    onChangeText: (value: string) => void;
    secureTextEntry?: boolean;
  };
  onRegister: () => void;
  buttonTitle?: string;
}

const AccountRegistration: React.FC<AccountRegistrationProps> = ({
  fullName,
  email,
  password,
  onRegister,
  buttonTitle = "Register",
}) => {
  return (
    <View style={styles.container}>
      {fullName && (
        <TextInput
          placeholder={fullName.placeholder}
          value={fullName.value}
          onChangeText={fullName.onChangeText}
          style={styles.input}
        />
      )}
      {email && (
        <TextInput
          placeholder={email.placeholder}
          value={email.value}
          onChangeText={email.onChangeText}
          style={styles.input}
          keyboardType="email-address"
        />
      )}
      {password && (
        <TextInput
          placeholder={password.placeholder}
          value={password.value}
          onChangeText={password.onChangeText}
          style={styles.input}
          secureTextEntry={password.secureTextEntry}
        />
      )}
      <Button title={buttonTitle} onPress={onRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
