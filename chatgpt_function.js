const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const apiKey = process.env.TOKEN_CHATGPT;
const endpoint = 'https://api.openai.com/v1/completions';



function chatgpt_textos_largos(descripcion){
    console.log(apiKey)
    const question = 'Corrige las faltas de ortografia en el siguiente texto Y limitalo a 500 carácteres: '+ descripcion ;

    fetch(endpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
        model: 'gpt-3.5-turbo-instruct', // Puedes cambiar el modelo según tus necesidades
        prompt: question,
        max_tokens: 500 // Número máximo de tokens para la respuesta
    })
    })
    .then(response => response.json())
    .then(data => {
    console.log(data.choices[0].text); // Imprime la respuesta
    })
    .catch(error => console.error('Error:', error));
}

function chatgpt_poblacionObjetivo(descripcion){
    console.log(apiKey)
    const question = 'Corrige las faltas de ortografia en el siguiente texto Y limitalo a 130 carácteres: '+ descripcion ;

    fetch(endpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
        model: 'gpt-3.5-turbo-instruct', // Puedes cambiar el modelo según tus necesidades
        prompt: question,
        max_tokens: 130 // Número máximo de tokens para la respuesta
    })
    })
    .then(response => response.json())
    .then(data => {
    console.log(data.choices[0].text); // Imprime la respuesta
    })
    .catch(error => console.error('Error:', error));
}

module.exports = { chatgpt_textos_largos, chatgpt_poblacionObjetivo}
