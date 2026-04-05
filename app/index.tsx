import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import InputField from "@/components/UI/InputField";
import Typography from "@/components/UI/Typography";
import { router } from "expo-router";
import { useState } from "react";
import { findByEmail } from "@/database/database";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
      try {
          setError("");
          await registerUser(email, password);
          router.replace("/dashboard");
          } catch (err) {
            setError(err.message);
          }
      }

  const handleLogin = async () => {
      try {
          setError("");
          const user = await findByEmail(email);

          if (!user) {
              throw new Error("User not found");
              }
          if (user.password !== password) {
              throw new Error("Incorrect password");
              }

          router.replace("/dashboard")
          } catch (err) {
                setError(err.message);
          }
      };

  return (
    <Container>
      <Typography variant="title">Login Screen</Typography>
      <Typography>Welcome to the Login Screen</Typography>
      {error ? <Typography>{error}</Typography> : null}
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
      <Button title="Login" type="submit" onPress={handleLogin} />
    </Container>
  );
}
