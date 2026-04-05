import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import InputField from "@/components/UI/InputField";
import Typography from "@/components/UI/Typography";
import { findByEmail, registerUser } from "@/database/db";
import { router } from "expo-router";
import { useState } from "react";
import { AppError, parseError } from "./util/errors";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    try {
      setError("");
      registerUser(email, password);
      router.replace("/dashboard");
    } catch (err) {
      setError(parseError(err));
    }
  };

  const handleLogin = () => {
    try {
      setError("");
      const user = findByEmail(email) as { email: string; password: string };

      if (!user) throw new AppError("User not found", "NOT_FOUND");
      if (user.password !== password)
        throw new AppError("Incorrect password", "WRONG_PASSWORD");

      router.replace("/dashboard");
    } catch (err) {
      setError(parseError(err));
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
