import React, { useEffect, useState } from "react";

export const ChatBotForm = () => {
  const [products, setProducts] = useState("");

  // fetches items from my same Menu Page Supabase table
  const getProductList = async () => {
    const base = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const url = base.endsWith("/") ? base + "menu_items?select=*" : base + "/menu_items?select=*";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`
        }
      });

      const data = await response.json();

      let prods = "";
      for (let i = 0; i < data.length; i++) {
        prods += `[${i + 1}) ${data[i].name} - $ ${data[i].price}]`;
      }
      setProducts(prods);
    } catch {
      setProducts("");
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  // messages array keeps chat history
  const [messages, setMessages] = useState([]);

  // onChange stores the current input in question variable
  let question = "";
  const onChangeQuestion = (event) => {
    question = event.target.value;
  };

  const [loading, setLoading] = useState(false);  // loading message

  // system prompt for my waiter personality
  const instructions = `
You are a friendly waiter in my Creole restaurant

The menu items are:

${products}

Only answer questions about the food and drinks on the menu.
If the user asks about anything else, politely say you can only answer menu questions.

Format Rule: Only respond in plain text. Don't use any format like HTML or Mark Down. Don't use Bold or Italic fonts.
Don't use emojis.
`;

  const onSubmitForm = async (event) => {
    event.preventDefault();

    const url = import.meta.env.VITE_GEMINI_URL;
    const token = import.meta.env.VITE_GEMINI_KEY;

    // concat() copies messages into a new array
    const history = messages.concat();

    // adds user's question to the history
    history.push({ role: "user", text: question });

    setMessages(history);

    setLoading(true);

    const apiHistory = history.map((item) => ({
      role: item.role,
      parts: [{ text: item.text }]
    }));

    // sends request to Gemini
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "x-goog-api-key": token
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: instructions }] },
        contents: apiHistory
      })
    });

    // parse response & extract answer
    const data = await result.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, no answer.";

    const response = { role: "model", text: answer };
    history.push(response);
    setMessages(history);

    setLoading(false);
  };

  // chat history, input & send button
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <label>Chat History</label>

        <div className="mt-3 mb-3 border rounded-3 chat-box">
          {messages.length === 0 ? (
            <p className="text-muted">No messages yet. Ask me about our Creole menu.</p>
          ) : (
            messages.map((item, i) => (
              <p key={i} className={item.role === "model" ? "chat-message-bot" : "chat-message-user"}>
                {item.text}
              </p>
            ))
          )}
        </div>

        {loading ? <p> Loading ... </p> : null}

        <div className="mb-3">
          <input type="text" className="form-control chat-input" onChange={onChangeQuestion} placeholder="Ask your menu question" />
        </div>

        <button className="btn btn-success chat-button">Send</button>
      </form>
    </>
  );
};
