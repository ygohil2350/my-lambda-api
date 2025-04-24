const pool = require('../shared/db');

exports.handler = async (event) => {
  try {
    const { name, email } = JSON.parse(event.body);
    const client = await pool.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100)
      );
    `);

    const result = await client.query(
      'INSERT INTO contacts (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    client.release();

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows[0])
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message })
    };
  }
};
