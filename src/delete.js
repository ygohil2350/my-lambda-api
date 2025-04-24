const pool = require('../shared/db');

exports.handler = async (event) => {
  try {
    const { id } = JSON.parse(event.body);
    const client = await pool.connect();

    const result = await client.query(
      'DELETE FROM contacts WHERE id = $1 RETURNING *',
      [id]
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
      body: JSON.stringify({ message: 'Contact deleted', contact: result.rows[0] })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message })
    };
  }
};
