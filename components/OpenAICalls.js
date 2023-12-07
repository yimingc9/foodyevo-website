const OpenAI = require('openai').default;
const fs = require('fs');
require('dotenv').config();

const openai = new OpenAI({apiKey: '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'});

async function apiCall(imageUrl, model = 'gpt-4-vision-preview') {
    const data = {
        model: model,
        messages: [
            { "role": "system", "content": "You are an expert at identifying food ingredients in salad images." },
            {
                "role": "user",
                "content": [
                    { "type": "text", "text": "Identify all food ingredients in this salad. Return only a JSON object with the keys being the food ingredient name, and the value being an integer calorie count of this ingredient." },
                    { "type": "image_url", "image_url": imageUrl }
                ]
            }
        ],
        max_tokens: 1024,
        temperature: 0
    };

    try {
        const response = await openai.chat.completions.create(data);
        return response.choices[0].message.content;
    } catch (error) {
        console.error(error);
    }
}

async function main() {
    const imageList = ['https://upload.wikimedia.org/wikipedia/commons/9/9b/Shrimp_salad_from_Turkey.jpg'];
    for (const imageUrl of imageList) {
        if (imageUrl) {
            const response = await apiCall(imageUrl);
            console.log(response);
        }
    }
}

main();
