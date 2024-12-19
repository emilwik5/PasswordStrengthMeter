import React, { useState } from "react";
import { TextInput, View, Button, StyleSheet, Alert } from "react-native";

interface AccountRegistrationProps {
  fullName?: {
    placeholder: string;
    onChangeText: (value: string) => void;
  };
  email?: {
    placeholder: string;
    onChangeText: (value: string) => void;
  };
  password?: {
    placeholder: string;
    onChangeText: (value: string) => void;
    secureTextEntry?: boolean;
  };
  username?: {
    placeholder: string;
    onChangeText: (value: string) => void;
  };
  phoneNumber?: {
    placeholder: string;
    onChangeText: (value: string) => void;
  };
  dateOfBirth?: {
    placeholder: string;
    onChangeText: (value: string) => void;
  };
  address?: {
    placeholder: string;
    onChangeText: (value: string) => void;
  };
  buttonTitle?: string;
  invalidBorderColor?: string;
  requiredFields?: string[];
}

const AccountRegistration: React.FC<AccountRegistrationProps> = ({
  fullName,
  email,
  password,
  username,
  phoneNumber,
  dateOfBirth,
  address,
  buttonTitle = "Register",
  invalidBorderColor = "red",
  requiredFields = [], 
}) => {
  const [fullNameValue, setFullNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [dateOfBirthValue, setDateOfBirthValue] = useState("");
  const [addressValue, setAddressValue] = useState("");

  const [isFullNameInvalid, setIsFullNameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isDateOfBirthInvalid, setIsDateOfBirthInvalid] = useState(false);

  const validateDate = (date: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) return false;
    const [year, month, day] = date.split("-").map(Number);
    const dateObject = new Date(year, month - 1, day);
    return (
      dateObject.getFullYear() === year &&
      dateObject.getMonth() === month - 1 &&
      dateObject.getDate() === day
    );
  };

  const handleRegister = () => {
    let hasErrors = false;

    if (requiredFields.includes("fullName") && !fullNameValue) {
      setIsFullNameInvalid(true);
      hasErrors = true;
    } else {
      setIsFullNameInvalid(false);
    }

    if (
      requiredFields.includes("email") &&
      (!emailValue || !emailValue.includes("@"))
    ) {
      setIsEmailInvalid(true);
      hasErrors = true;
    } else {
      setIsEmailInvalid(false);
    }

    if (requiredFields.includes("password") && passwordValue.length < 6) {
      setIsPasswordInvalid(true);
      hasErrors = true;
    } else {
      setIsPasswordInvalid(false);
    }

    if (
      requiredFields.includes("dateOfBirth") &&
      !validateDate(dateOfBirthValue)
    ) {
      setIsDateOfBirthInvalid(true);
      hasErrors = true;
    } else {
      setIsDateOfBirthInvalid(false);
    }

    if (hasErrors) {
      Alert.alert("Error", "Please correct the highlighted fields.");
      return;
    }

    Alert.alert("Success", `Account created for: ${fullNameValue || "User"}!`);

    fullName?.onChangeText(fullNameValue);
    email?.onChangeText(emailValue);
    password?.onChangeText(passwordValue);
    username?.onChangeText(usernameValue);
    phoneNumber?.onChangeText(phoneNumberValue);
    dateOfBirth?.onChangeText(dateOfBirthValue);
    address?.onChangeText(addressValue);
  };

  return (
    <View style={styles.container}>
      {fullName && (
        <TextInput
          placeholder={fullName.placeholder}
          value={fullNameValue}
          onChangeText={(text) => setFullNameValue(text)}
          style={[
            styles.input,
            isFullNameInvalid && { borderColor: invalidBorderColor },
          ]}
        />
      )}
      {email && (
        <TextInput
          placeholder={email.placeholder}
          value={emailValue}
          onChangeText={(text) => setEmailValue(text)}
          style={[
            styles.input,
            isEmailInvalid && { borderColor: invalidBorderColor },
          ]}
          keyboardType="email-address"
        />
      )}
      {password && (
        <TextInput
          placeholder={password.placeholder}
          value={passwordValue}
          onChangeText={(text) => setPasswordValue(text)}
          style={[
            styles.input,
            isPasswordInvalid && { borderColor: invalidBorderColor },
          ]}
          secureTextEntry={password.secureTextEntry}
        />
      )}
      {username && (
        <TextInput
          placeholder={username.placeholder}
          value={usernameValue}
          onChangeText={(text) => setUsernameValue(text)}
          style={styles.input}
        />
      )}
      {phoneNumber && (
        <TextInput
          placeholder={phoneNumber.placeholder}
          value={phoneNumberValue}
          onChangeText={(text) => setPhoneNumberValue(text)}
          style={styles.input}
          keyboardType="phone-pad"
        />
      )}
      {dateOfBirth && (
        <TextInput
          placeholder={dateOfBirth.placeholder}
          value={dateOfBirthValue}
          onChangeText={(text) => setDateOfBirthValue(text)}
          style={[
            styles.input,
            isDateOfBirthInvalid && { borderColor: invalidBorderColor },
          ]}
        />
      )}
      {address && (
        <TextInput
          placeholder={address.placeholder}
          value={addressValue}
          onChangeText={(text) => setAddressValue(text)}
          style={styles.input}
        />
      )}
      <Button title={buttonTitle} onPress={handleRegister} />
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
