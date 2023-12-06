import React, { useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '', // defaults to process.env["OPENAI_API_KEY"]
});

const OpenAICalls = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [responses, setResponses] = useState([]);
  const [showTable, setShowTable] = useState(false);


  /**
   * Handles the image upload event: set an image URL 
   *
   * @param {Event} event - The image upload event.
   * @return {Promise<void>} - A promise that resolves when the image URLs are set.
   */
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setFile(event.target.files[0]);

    if (file) {
      const url = URL.createObjectURL(file);
      callAPI(url);
      setShowTable(true);

    }
  };

  const callAPI = async (image_url) => {
    const chatCompletion = await openai.chat.completions.create({
    messages: [
      { "role": "system", "content": "You are an expert at identifying food ingredients in salad images." },
      {
        "role": "user",
        "content": [
          { "type": "text", "text": "Identify all food ingredients in this salad. Return a JSON object with the keys being the food ingredient name, and the value being an integer calorie count of this ingredient." },
          {
            "type": "image_url",
            "image_url": {
              "url": image_url,
            },
          },
        ],
      }],
    model: 'gpt-4-vision-preview',
  });

  return chatCompletion;
  };

  const processImages = async () => {
    const apiResponses = [];
    for (const url of imageUrls) {
      const apiResponse = await callAPI(url);
      apiResponses.push(apiResponse);
    }
    setResponses(apiResponses);
    setShowTable(true);
  };

  return (
    <div>
      <h1>Image Processor</h1>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={processImages}>Process Image</button>
      <div>
        {responses.map((response, index) => (
          <div key={index}>
            <p>{JSON.stringify(response)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenAICalls;