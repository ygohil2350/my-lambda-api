const pool = require('../shared/db');

exports.handler = async (event) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM contacts ORDER BY id');
    client.release();

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message })
    };
  }
};
