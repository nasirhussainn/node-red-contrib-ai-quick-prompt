const axios = require("axios");

module.exports = function (RED) {
    function AIPromptNode(config) {
        RED.nodes.createNode(this, config);

        const node = this;

        node.on("input", async (msg, send, done) => {
            try {
                // Extract prompt and provider
                const prompt = config.prompt || msg.payload.prompt || "Hello, AI!";
                const provider = config.provider || "openai";
                const apiKey = config.apiKey || msg.payload.apiKey;

                if (!apiKey) {
                    throw new Error("API key is required.");
                }

                let response;

                // Route to the appropriate provider
                if (provider === "openai") {
                    response = await callOpenAI(apiKey, prompt);
                } else if (provider === "huggingface") {
                    response = await callHuggingFace(apiKey, prompt);
                } else {
                    throw new Error(`Unknown provider: ${provider}`);
                }

                // Set response
                msg.payload = { prompt, provider, response };
                send(msg);
                done();
            } catch (err) {
                node.error(err.message, msg);
                done(err);
            }
        });

        // Function to call OpenAI API
        async function callOpenAI(apiKey, prompt) {
            const url = "https://api.openai.com/v1/completions";
            const data = {
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 100,
                temperature: 0.7,
            };

            const headers = {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            };

            const response = await axios.post(url, data, { headers });
            return response.data.choices[0].text.trim();
        }

        // Function to call Hugging Face API
        async function callHuggingFace(apiKey, prompt) {
            const url = "https://api-inference.huggingface.co/models/gpt2";
            const data = { inputs: prompt };

            const headers = {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            };

            const response = await axios.post(url, data, { headers });
            return response.data[0]?.generated_text || "No response received.";
        }
    }

    RED.nodes.registerType("ai-quick-prompt", AIPromptNode);
};
