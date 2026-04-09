import Button from "@/components/UI/Button";
import InputField from "@/components/UI/InputField";
import Typography from "@/components/UI/Typography";
import { useAuth } from "@/context/AuthContext";
import { registerUser } from "@/database/db";
import { showToastError } from "@/util/errors";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !email.includes("@")) {
      showToastError(new Error("Please enter a valid email address."));
      return false;
    }
    if (!password) {
      showToastError(new Error("Please enter your password."));
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    if (!validateInputs()) return;

    try {
      registerUser(email, password);
      login(email, password);
      router.replace("/(tabs)/dashboard");
    } catch (err) {
      showToastError(err);
    }
  };

  const handleLogin = () => {
    if (!validateInputs()) return;

    try {
      login(email, password);
      router.replace("/(tabs)/dashboard");
    } catch (err) {
      showToastError(err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Typography variant="h1" style={styles.title}>Workout Tracker</Typography>
            <Typography variant="body" style={styles.subtitle}>Sign in to continue</Typography>
          </View>

          <View style={styles.form}>
            <InputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />

            <View style={styles.buttonContainer}>
              <Button title="Login" onPress={handleLogin} />
              <View style={styles.spacer} />
              <Button title="Register" onPress={handleRegister} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
  },
  form: {
    width: "100%",
  },
  buttonContainer: {
    marginTop: 30,
  },
  spacer: {
    height: 15,
  }
});