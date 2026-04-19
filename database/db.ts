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
      "group" TEXT NOT NULL,
      api_id TEXT UNIQUE
    );

    CREATE TABLE IF NOT EXISTS template_exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      template_id INTEGER,
      exercise_id INTEGER,
      sets INTEGER,
      reps INTEGER,
      weight REAL,
      FOREIGN KEY (template_id) REFERENCES templates(id),
      FOREIGN KEY (exercise_id) REFERENCES exercises(id)
    );

    CREATE TABLE IF NOT EXISTS exercise_cache (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      body_part TEXT UNIQUE,
      data TEXT
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

export const createOrGetExercise = (
  name: string,
  group: string,
  api_id: string
): number => {
  const existing = db.getFirstSync(
    `SELECT id FROM exercises WHERE api_id = ?`,
    [api_id]
  ) as { id: number } | null;

  if (existing) return existing.id;

  const result = db.runSync(
    `INSERT INTO exercises (name, "group", api_id)
     VALUES (?, ?, ?)`,
    [name, group, api_id]
  );

  return result.lastInsertRowId;
};

// TEMPLATE_EXERCISES
export const addExercisesToTemplate = (
  template_id: number,
  exercise_id: number,
  sets: number,
  reps: number,
  weight?: number
): number => {
  const result = db.runSync(
    `INSERT INTO template_exercises (template_id, exercise_id, sets, reps, weight) VALUES (?, ?, ?, ?, ?)`,
    [template_id, exercise_id, sets, reps, weight || null]
  );

  if (result.changes === 0) {
    throw new AppError("Failed to add exercise to template", "DB_ERROR");
  }

  return result.lastInsertRowId;
};

export const updateTemplateExercise = (
  id: number,
  sets: number,
  reps: number,
  weight?: number
) => {
  const result = db.runSync(
    `UPDATE template_exercises
     SET sets = ?, reps = ?, weight = ?
     WHERE id = ?`,
    [sets, reps, weight || null, id]
  );

  if (result.changes === 0) {
    throw new AppError("Failed to update template exercise", "DB_ERROR");
  }
};

// GET EXERCISES FOR TEMPLATE (JOIN)
export const getExercisesForTemplate = (template_id: number) => {
  return db.getAllSync(
    `SELECT
        te.id as template_exercise_id,
        te.template_id,
        te.exercise_id,
        te.sets,
        te.weight,
        te.reps,
        e.name
     FROM template_exercises te
     JOIN exercises e ON e.id = te.exercise_id
     WHERE te.template_id = ?`,
    [template_id]
  );
};

export const deleteTemplateExercise = (id: number) => {
  const result = db.runSync(
    `DELETE FROM template_exercises WHERE id = ?`,
    [id]
  );

  if (result.changes === 0) {
    throw new AppError("Failed to delete template exercise", "DB_ERROR");
  }
};

//cache functions
export const saveExerciseCache = (bodyPart: string, data: any[]) => {
  db.runSync(
    `INSERT OR REPLACE INTO exercise_cache (body_part, data)
     VALUES (?, ?)`,
    [bodyPart, JSON.stringify(data)]
  );
};

export const getExerciseCache = (bodyPart: string) => {
  const result = db.getFirstSync(
    `SELECT data FROM exercise_cache WHERE body_part = ?`,
    [bodyPart]
  ) as { data: string } | null;

  if (!result) return null;

  return JSON.parse(result.data);
};