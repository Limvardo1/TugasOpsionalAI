const db = require('./db');

async function testConnection() {
  try {
    const conn = await db.getConnection();
    console.log("MySQL connection successful");
    conn.release();
  } catch (error) {
    console.error("MySQL connection failed:", error);
  }
}

testConnection();
