const pool = require('../shared/db');

exports.handler = async (event) => {
  try {
    const { id, name, email } = JSON.parse(event.body);
    const client = await pool.connect();

    const result = await client.query(
      'UPDATE contacts SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );

    client.release();

    if (result.rowCount === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Contact not found' })
      };
    }

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
