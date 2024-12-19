import React, { useState } from "react";
import { TextInput, View, Button, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";

interface FieldInput {
  placeholder: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
  enableToggleVisibility?: boolean;
}

interface AccountRegistrationProps {
  fullName?: FieldInput;
  email?: FieldInput;
  password?: FieldInput;
  username?: FieldInput;
  phoneNumber?: FieldInput;
  dateOfBirth?: FieldInput;
  address?: FieldInput;
  buttonTitle?: string;
  invalidBorderColor?: string;
  validBorderColor?: string;
  mandatoryBorderColor?: string;
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
  buttonTitle = "Sign Up!",
  invalidBorderColor = "red",
  validBorderColor = "green",
  mandatoryBorderColor = "orange",
  requiredFields = ["email", "password"],
}) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({
    fullName: "",
    email: "",
    password: "",
    username: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
  });
  const [formTouched, setFormTouched] = useState<Record<string, boolean>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInputChange = (fieldName: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
    setFormTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  const validateField = (fieldName: string, value: string): string | null => {
    if (requiredFields.includes(fieldName)) {
      if (!value) return "This field is required.";

      if (fieldName === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Invalid email format.";
      }

      if (fieldName === "password") {
        if (value.length < 6)
          return "Password must be at least 6 characters long.";
      }

      if (fieldName === "phoneNumber") {
        const phoneRegex = /^[0-9]+$/;
        if (!phoneRegex.test(value))
          return "Phone number must contain only digits.";
      }

      if (fieldName === "dateOfBirth") {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(value))
          return "Date of birth must be in YYYY-MM-DD format.";
        const [year, month, day] = value.split("-").map(Number);
        const isValidDate =
          year > 1900 &&
          year <= new Date().getFullYear() &&
          month >= 1 &&
          month <= 12 &&
          day >= 1 &&
          day <= new Date(year, month, 0).getDate();
        if (!isValidDate) return "Invalid date.";
      }
    }
    return null;
  };

  const signUp = () => {
    setFormSubmitted(true);

    const errors = requiredFields.map((field) =>
      validateField(field, formValues[field] || "")
    );

    if (errors.some((error) => error !== null)) {
      Alert.alert("Error", "Please correct the highlighted fields.");
      return;
    }

    Alert.alert("Success", `Account created for: ${formValues.fullName || "User"}!`);
  };

  const getBorderColor = (fieldName: string, value: string) => {
    const isTouched = formTouched[fieldName];
    const error = validateField(fieldName, value);

    if (!isTouched && requiredFields.includes(fieldName)) {
      return !value ? mandatoryBorderColor : "gray";
    }

    if (!value) {
      return requiredFields.includes(fieldName) ? mandatoryBorderColor : "gray";
    }

    if (error) {
      return invalidBorderColor;
    }

    return validBorderColor;
  };

  const renderField = (
    fieldName: string,
    fieldProps?: FieldInput,
    isPassword?: boolean
  ) => {
    if (!fieldProps) return null;

    const value = formValues[fieldName];

    return (
      <View key={fieldName} style={{ marginBottom: 15 }}>
        <TextInput
          placeholder={fieldProps.placeholder}
          value={value}
          onChangeText={(text) => handleInputChange(fieldName, text)}
          style={[
            styles.input,
            { borderColor: getBorderColor(fieldName, value) },
          ]}
          secureTextEntry={
            isPassword && fieldProps.secureTextEntry
              ? !isPasswordVisible
              : false
          }
        />
        {isPassword && fieldProps.enableToggleVisibility && fieldProps.secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>
              {isPasswordVisible ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        )}
        {formSubmitted &&
          requiredFields.includes(fieldName) &&
          validateField(fieldName, value) && (
            <Text style={styles.errorText}>{validateField(fieldName, value)}</Text>
          )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderField("fullName", fullName)}
      {renderField("email", email)}
      {renderField("password", password, true)}
      {renderField("username", username)}
      {renderField("phoneNumber", phoneNumber)}
      {renderField("dateOfBirth", dateOfBirth)}
      {renderField("address", address)}
      <Button title={buttonTitle} onPress={signUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  toggleButton: {
    position: "absolute",
    right: 15,
    top: 10,
  },
  toggleText: {
    color: "blue",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default AccountRegistration;
