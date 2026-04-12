import { AppError } from "@/util/errors";
import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("workout.db");

export const initDB = () => {
  db.execSync(`
    PRAGMA foreign_keys = ON;

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

    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      "group" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS template_exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      template_id INTEGER,
      exercise_id INTEGER,
      sets INTEGER,
      reps INTEGER,
      FOREIGN KEY (template_id) REFERENCES templates(id),
      FOREIGN KEY (exercise_id) REFERENCES exercises(id)
    );
  `);
};

// USERS
export const findByEmail = (emailInput: string) => {
  return db.getFirstSync(
    `SELECT * FROM users WHERE email = ?`,
    [emailInput]
  );
};

export const registerUser = (
  emailInput: string,
  passwordInput: string
): number => {
  const existing = findByEmail(emailInput);
  if (existing) {
    throw new AppError("Email already registered", "USER_EXISTS");
  }

  const result = db.runSync(
    `INSERT INTO users (email, password) VALUES (?, ?)`,
    [emailInput, passwordInput]
  );

  if (result.changes === 0) {
    throw new AppError("Failed to register user", "DB_ERROR");
  }

  return result.lastInsertRowId;
};

// TEMPLATES
export const createTemplate = (
  name: string,
  user_id: number
): number => {
  const result = db.runSync(
    `INSERT INTO templates (name, user_id) VALUES (?, ?)`,
    [name, user_id]
  );

  if (result.changes === 0) {
    throw new AppError("Failed to create template", "DB_ERROR");
  }

  return result.lastInsertRowId;
};

export const getTemplatesByUser = (user_id: number) => {
  return db.getAllSync(
    `SELECT * FROM templates WHERE user_id = ?`,
    [user_id]
  );
};

// EXERCISES
export const createExercise = (
  name: string,
  group: string
): number => {
  const result = db.runSync(
    `INSERT INTO exercises (name, "group") VALUES (?, ?)`,
    [name, group]
  );

  if (result.changes === 0) {
    throw new AppError("Failed to create exercise", "DB_ERROR");
  }

  return result.lastInsertRowId;
};

export const getAllExercises = () => {
  return db.getAllSync(`SELECT * FROM exercises`);
};

export const getExercisesByGroup = (group: string) => {
  return db.getAllSync(
    `SELECT * FROM exercises WHERE "group" = ?`,
    [group]
  );
};

// TEMPLATE_EXERCISES
export const addExercisesToTemplate = (
  template_id: number,
  exercise_id: number,
  sets: number,
  reps: number
): number => {
  const result = db.runSync(
    `INSERT INTO template_exercises
     (template_id, exercise_id, sets, reps)
     VALUES (?, ?, ?, ?)`,
    [template_id, exercise_id, sets, reps]
  );

  if (result.changes === 0) {
    throw new AppError("Failed to add exercise to template", "DB_ERROR");
  }

  return result.lastInsertRowId;
};