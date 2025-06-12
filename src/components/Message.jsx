import { useEffect, useRef, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import socket from "../utility/socket";

export default function ChatWidget({ messages, setMessages }) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    socket.emit("message", input);
    setInput("");
    setIsTyping(true);
  };

  useEffect(() => {
    socket.on("reply", (data) => {
      const assistantMessage = { role: "assistant", content: data };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    });
  }, [setMessages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);


  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    alert("কপি করা সম্ভব হয়নি: " + err.message);
  }
};


const renderMessageContent = (msg) => {
  if (msg.role === "assistant" && msg.content.includes("```fbpost")) {
    const parts = [];
    let remaining = msg.content;

    while (remaining.includes("```fbpost")) {
      const start = remaining.indexOf("```fbpost");
      const end = remaining.indexOf("```", start + 9);

      // আগের সাধারণ লেখা
      const before = remaining.slice(0, start);
      if (before.trim()) {
        parts.push(<p key={parts.length}>{before}</p>);
      }

      // ফেসবুক পোস্ট অংশ
      const postText = remaining.slice(start + 9, end).trim();
      parts.push(
        <div
          key={parts.length}
          className="relative bg-gray-100 border border-gray-300 rounded-lg p-4 my-2"
        >
          <button
            onClick={() => copyToClipboard(postText)}
            className="absolute top-2 right-2 text-sm bg-gray-300/60 p-1 rounded-md font-bold z-10"
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">
            {postText}
          </pre>
        </div>
      );

      // পরের লেখা থেকে আবার লুপ শুরু
      remaining = remaining.slice(end + 3);
    }

    // যদি ব্লকের পরেও লেখা থাকে
    if (remaining.trim()) {
      parts.push(<p key={parts.length}>{remaining}</p>);
    }

    return <>{parts}</>;
  }

  return <>{msg.content}</>;
};


  return (
    <>
      {/* Chat Box */}
      <div
        className={`fixed bottom-0 right-0 md:bottom-4 md:right-4 w-full h-full md:w-[360px] md:h-[500px] max-w-[100vw] bg-white border border-gray-200 rounded-none md:rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-50 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="relative bg-[#389DF8] text-white px-4 py-3 flex justify-center items-center">
          <h3 className="font-semibold text-lg">🤖Smart Chat</h3>
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 text-xl font-bold hover:text-gray-200 transition"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 overflow-x-hidden">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm whitespace-pre-line shadow-sm ${
                msg.role === "user"
                  ? "ml-auto bg-[#389DF8] text-white"
                  : "mr-auto bg-white border border-gray-200 text-gray-800"
              }`}
            >
              {renderMessageContent(msg)}
            </div>
          ))}
          {isTyping && (
            <div className="mr-auto bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-2xl w-fit flex items-center gap-1 animate-pulse">
              <span className="typing-dot animate-bounce delay-0">•</span>
              <span className="typing-dot animate-bounce delay-100">•</span>
              <span className="typing-dot animate-bounce delay-200">•</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center gap-2 p-3 border-t bg-white"
        >
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#389DF8] outline-none"
            placeholder="আপনার বার্তা লিখুন..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#389DF8] hover:bg-blue-700 text-white px-4 py-2 rounded-full transition"
          >
            <LuSendHorizontal />
          </button>
        </form>
      </div>

      {/* Chat Open Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 bg-gradient-to-r from-[#389DF8] to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-3 rounded-full shadow-lg text-lg transition-all z-40"
        >
          💬
        </button>
      )}
    </>
  );
}
