const db = {
  users: [
    {
      id: 1,
      email: "juanchaher99@gmail.com",
      phone: "5491157504166",
    },
  ],
  bites: [],
  bots: [
    {
      id: 1,
      user_id: 1,
      language: "italian",
      level: 1,
      focus_topic: null,
    },
  ],
};

export function getDB() {
  return db;
}

export function setDB(newDB) {
  Object.assign(db, newDB);
}

export default db;
