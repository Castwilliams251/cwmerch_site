export async function handler(event, context) {
    const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";
    const API_TOKEN = "CWMerch_Token"; // Your token is directly included here

    try {
        const requestBody = JSON.parse(event.body);
        const userMessage = requestBody.input;

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: userMessage,
                parameters: { max_new_tokens: 50 }
            })
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: data[0]?.generated_text || "Sorry, I didn't understand that." }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch response", details: error.message }),
        };
    }
}
