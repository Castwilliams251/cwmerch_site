export async function handler(event, context) {
    const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";
    const API_TOKEN = process.env.CWMerch_Token; // Use an environment variable instead of hardcoding

    try {
        if (!event.body) {
            throw new Error("No input received");
        }

        const requestBody = JSON.parse(event.body);
        const userMessage = requestBody.userInput || requestBody.input; // Ensure compatibility

        if (!userMessage) {
            throw new Error("Invalid input format");
        }

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

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: data[0]?.generated_text || "Sorry, I didn't understand that." }),
        };
    } catch (error) {
        console.error("Error in fetchResponse:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch response", details: error.message }),
        };
    }
}