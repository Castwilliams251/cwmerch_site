export async function handler(event, context) {
    console.log("Function started");
    console.log("Environment Token:", process.env.CWMerch_Token ? "Loaded" : "Missing");

    const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";
    const API_TOKEN = process.env.CWMerch_Token;

    if (!API_TOKEN) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "API Token missing" }),
        };
    }

    try {
        const requestBody = JSON.parse(event.body);
        console.log("User Input:", requestBody.input);

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: requestBody.input,
                parameters: { max_new_tokens: 50 }
            })
        });

        if (!response.ok) {
            console.log("API Error:", response.status);
            throw new Error(`Hugging Face API Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

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