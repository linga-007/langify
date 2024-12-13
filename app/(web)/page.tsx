"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("English");
  const [data, setData] = useState({ detected_language: "", translated_content: "" });
  const [loading, setLoading] = useState(false);

  const handleInput = async () => {
    try {
      setLoading(true); 
      const response = await fetch("http://localhost:3000/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input, language: language }),
      });
 
      const data = await response.json();
      setData({
        detected_language: data.message.detected_language,
        translated_content: data.message.translated_content,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[500px] px-4 flex-wrap">
      <main className="flex flex-col lg:flex-row gap-8 w-full max-w-[1200px]">
       
        <div className="w-full flex flex-col">
          <textarea
            className="rounded-lg p-3 w-full h-[200px] sm:h-[300px] resize-none bg-white text-black text-lg focus:outline-none focus:ring-0"
            placeholder="Enter your text..."
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <div className="flex flex-col sm:flex-row justify-between sm:justify-end gap-4 mt-4">
            <select
              className="text-black p-2 rounded-sm bg-gray-100 focus:outline-none w-full sm:w-auto"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English</option>
              <option>Tamil</option>
              <option>Hindi</option>
              <option>Malayalam</option>
              <option>Telugu</option>
              <option>Kannada</option>
              <option>German</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
            <button
              className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full sm:w-auto"
              onClick={handleInput}
            >
              Translate
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="w-full">
  <div className="rounded-lg p-3 w-full h-[200px] sm:h-[300px] resize-none bg-white text-black text-lg">
    {loading ? (
      <div className="flex items-center justify-center h-full">
        <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
        <span className="ml-2">Loading...</span>
      </div>
    ) : (
      <div className="flex flex-col items-start justify-start">
        <p><strong>Language:</strong> {data.detected_language}</p>
        <p><strong>Translated Content:</strong> {data.translated_content}</p>
      </div>
    )}
  </div>
</div>

      </main>
    </div>
  );
}
