import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import InputField from "@/components/UI/InputField";
import Typography from "@/components/UI/Typography";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { parseError } from "../util/errors";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { login, register, user } = useAuth();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      router.replace("/(tabs)/dashboard");
    }
  }, [user]);

  const handleRegister = async () => {
    try {
      setError("");
      setSuccess("");
      await register(email, password);
      setSuccess("Registration successful! Please log in.");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(parseError(err));
    }
  };

  const handleLogin = async () => {
    try {
      setError("");
      setSuccess("");
      await login(email, password);
      router.replace("/(tabs)/dashboard");
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
      {error ? <Typography> {error}</Typography> : null}
      {success ? <Typography>{success}</Typography> : null}
    </Container>
  );
}
