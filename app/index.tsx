import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import InputField from "@/components/UI/InputField";
import Typography from "@/components/UI/Typography";
import { useAuth } from "@/context/AuthContext";
import { registerUser } from "@/database/db";
import { showToastError } from "@/util/errors";
import { router } from "expo-router";
import { useState } from "react";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    try {
      registerUser(email, password);
      login(email, password);
      router.replace("/dashboard");
    } catch (err) {
      showToastError(err);
    }
  };

  const handleLogin = () => {
    try {
      login(email, password);
      router.replace("/dashboard");
    } catch (err) {
      showToastError(err);
    }
  };

  return (
    <Container>
      <Typography variant="title">Login Screen</Typography>
      <Typography>Welcome to the Login Screen</Typography>
      <InputField
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <InputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={handleRegister} />
    </Container>
  );
}
