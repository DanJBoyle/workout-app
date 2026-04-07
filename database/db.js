import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("workout.db");

export const initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE,
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
            CREATE TABLE IF NOT EXISTS exercises (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                group TEXT NOT NULL
            );
        `);

    tx.executeSql(`
            CREATE TABLE IF NOT EXISTS template_exercises (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                template_id INTEGER,
                exercise_id INTEGER,
                sets INTEGER,
                reps INTEGER,
                FOREIGN KEY (template_id) REFERENCES templates(id),
                FOREIGN KEY (exercise_id) REFERENCES exercises(id)
            )
        `);

    tx.executeSql("PRAGMA foreign_keys = ON;");
  });
};

//insert into users
export const registerUser = async (emailInput, passwordInput) => {
    try  {
        const existingUser = await findByEmail(emailInput);
        if (existingUser) {
            throw new Error("Email already exists");
        }

    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
            `INSERT INTO users (email, password) VALUES (?, ?)`,
            [emailInput, passwordInput],
            (_, result) => {
                if (result.rowsAffected > 0) {
                    resolve(result.insertId);
                } else {
                    reject(new Error("Failed to register user"));
                }
            },
                (_, error) => {
                    reject(error);
                }
            );
        });
    })
    } catch (error) {
        throw error;
    }
};

//get one user
export const findByEmail = (emailInput) => {
return new Promise((resolve, reject) => {
    db.transaction((tx) =>{
        tx.executeSql(
        `SELECT * FROM users WHERE email = ?`,
        [emailInput],
        (_, result) => {
            const rows = result.rows._array;
            if (rows.length > 0)  {
                resolve(rows[0]);
            } else {
                resolve(null);
            }
        },
            (_, error) => {
                reject(error);
            }
        );
    });
})};

//insert into templates
export const createTemplate = (name, user_id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
            `INSERT INTO templates (name, user_id) VALUES (?, ?)`,
            [name, user_id],
            (_, result) => {
                if (result.rowsAffected > 0) {
                    resolve(result.insertId);
                } else {
                    reject(new Error("Failed to create new template"));
                }
            },
                (_, error) => {
                    reject(error);
                }
            );
        });
    })
};

//insert into exercises
export const createExercise = (name, group) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO exercises (name, group) VALUES (?, ?)`,
        [name, group],
        (_, result) => {
          if (result.rowsAffected > 0) {
            resolve(result.insertId);
          } else {
            reject(new Error("Failed to create exercise"));
          }
        },
        (_, error) => reject(error)
      );
    });
  });
};

//get all exercises
export const getAllExercises = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM exercises`,
        [],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, error) => reject(error)
      );
    });
  });
};

//get exercises from one group
export const getExercisesByGroup = (group) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM exercises WHERE group = ?`,
        [group],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

//insert into template_exercises
export const addExercisesToTemplate = (
  template_id,
  exercise_id,
  sets,
  reps
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO template_workouts
         (template_id, exercise_id, sets, reps)
         VALUES (?, ?, ?, ?)`,
        [template_id, exercise_id, sets, reps],
        (_, result) => {
          if (result.rowsAffected > 0) {
            resolve(result.insertId);
          } else {
            reject(new Error("Failed to add exercise to template"));
          }
        },
        (_, error) => reject(error)
      );
    });
  });
};
