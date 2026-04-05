import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("workout.db");

export const initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
                password TEXT NOT NULL
            );
        `);

    tx.executeSql(`
            CREATE TABLE IF NOT EXISTS templates (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                name TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `);

    tx.executeSql(`
            CREATE TABLE IF NOT EXISTS workouts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                group TEXT NOT NULL
            );
        `);

    tx.executeSql(`
            CREATE TABLE IF NOT EXISTS template_workouts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                template_id INTEGER,
                workout_id INTEGER,
                sets INTEGER,
                reps INTEGER,
                FOREIGN KEY (template_id) REFERENCES templates(id),
                FOREIGN KEY (workout_id) REFERENCES workouts(id)
            )
        `);
  });
  tx.executeSql("PRAGMA foreign_keys = ON;");
};
