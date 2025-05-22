import axios from "axios";

const OPENAI_API_KEY = "use-your-key";

export const SummarizeTodos = async (tasks) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes to-do lists.",
          },
          {
            role: "user",
            content: `Summarize the following to-dos:\n${tasks.join("\n")}`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error("Error fetching summary:", err);
    return "Failed to summarize your tasks.";
  }
};
