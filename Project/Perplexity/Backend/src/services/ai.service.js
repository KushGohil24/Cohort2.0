import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

let model;

export const getAiModel = () => {
    if (!model) {
        model = new ChatGoogleGenerativeAI({
          model: "gemini-2.5-flash-lite",
          apiKey: process.env.GEMINI_API_KEY
        });
    }
    return model;
}

export async function testAi(){
    const aiModel = getAiModel();
    aiModel.invoke("What is the capital of India?").then((response)=>{
        console.log(response.text);
    })
}