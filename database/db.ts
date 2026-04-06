import { AppError } from "@/util/errors";
import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("workout.db");

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS templates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS template_workouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      template_id INTEGER,
      workout_id INTEGER,
      sets INTEGER,
      reps INTEGER,
      FOREIGN KEY (template_id) REFERENCES templates(id),
      FOREIGN KEY (workout_id) REFERENCES workouts(id)
    );

    PRAGMA foreign_keys = ON;
  `);
};

export const registerUser = (
  emailInput: string,
  passwordInput: string,
): number => {
  const existing = findByEmail(emailInput);
  if (existing) throw new AppError("Email already registered", "USER_EXISTS");

  const result = db.runSync(
    `INSERT INTO users (email, password) VALUES (?, ?)`,
    [emailInput, passwordInput],
  );

  if (result.changes === 0)
    throw new AppError("Failed to register user", "DB_ERROR");

  return result.lastInsertRowId;
};

export const findByEmail = (emailInput: string) => {
  return db.getFirstSync(`SELECT * FROM users WHERE email = ?`, [emailInput]);
};

export const loginUser = (emailInput: string, passwordInput: string) => {
  const user = findByEmail(emailInput) as {
    id: number;
    email: string;
    password: string;
  } | null;
  if (!user) throw new AppError("User not found", "NOT_FOUND");
  if (user.password !== passwordInput)
    throw new AppError("Invalid password", "INVALID_PASSWORD");
  return user;
};
