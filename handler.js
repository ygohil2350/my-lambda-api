const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

exports.handler = async (event) => {
  try {
    const client = await pool.connect();

    // Example query - replace this with your actual logic
    const res = await client.query("SELECT NOW()");

    client.release();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Connected to DB successfully!",
        time: res.rows[0],
      }),
    };
  } catch (error) {
    console.error("Error connecting to database", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to connect to database",
        error: error.message,
      }),
    };
  }
};
