import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const [data, setData] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [debouncedPrompt, setDebouncedPrompt] = useState<string>("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedPrompt(prompt);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [prompt]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_COMPLETION_API!,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: debouncedPrompt }),
        }
      );

      if (response.status === 429) {
        window.alert("Too many requests. Please try again later.");
        return;
      }

      if (response.status === 500) {
        window.alert("Internal server error. Please try again later.");
        return;
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder("utf-8");

      reader.read().then(function processText({ done, value }): Promise<void> {
        if (done) {
          console.log("Stream complete");
          return Promise.resolve();
        }

        const chunk = decoder.decode(value);
        setData(prevData => prevData + chunk);
        return reader.read().then(processText);
      });
    };

    if (debouncedPrompt) {
      fetchData();
    }
  }, [debouncedPrompt]);

  return (
    <div>
      <h1>API Data:</h1>
      <input
        type="text"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <p>{data}</p>
    </div>
  );
};

export default App;