const axios = require('axios');

const queryIA = async (prompt, model) => {
  try {
    const response = await axios.post(process.env.IA_API_URL, {
      prompt,
      model,
    });
    return response.data;
  } catch (error) {
    console.error('Error al consultar la IA:', error);
    throw new Error('Error en el servicio de IA');
  }
};

module.exports = { queryIA };
