import DOMPurify from "dompurify";

export function parseUserText(text) {
  if (!text) return "";

  // HTML Escape
  text = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks: ```js ... ```
  text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="bg-gray-100 p-2 rounded text-sm overflow-auto"><code>${code.trim()}</code></pre>`;
  });

  // Headings
  text = text
    .replace(/^###\s+(.*)$/gm, "<h3 class='text-lg font-bold'>$1</h3>")
    .replace(/^##\s+(.*)$/gm, "<h2 class='text-xl font-bold'>$1</h2>")
    .replace(/^#\s+(.*)$/gm, "<h1 class='text-2xl font-bold'>$1</h1>");

  // Bold: **text**
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Italic: *text*
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Colored Text: {color|text}
  text = text.replace(/\{(red|green|blue|gray)\|(.*?)\}/g, (match, color, word) => {
    const classMap = {
      red: "text-red-600",
      green: "text-green-600",
      blue: "text-blue-600",
      gray: "text-gray-500",
    };
    return `<span class="${classMap[color]}">${word}</span>`;
  });

  // Links: [text](url)
  text = text.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" class="text-blue-600 underline">$1</a>'
  );

  // Lists
  const lines = text.split("\n");
  let inOl = false, inUl = false;
  const parsed = [];

  for (const line of lines) {
    if (/^\d+\.\s+/.test(line)) {
      if (!inOl) {
        parsed.push("<ol class='list-decimal pl-6'>");
        inOl = true;
      }
      parsed.push(`<li>${line.replace(/^\d+\.\s+/, "")}</li>`);
    } else if (/^[-*]\s+/.test(line)) {
      if (!inUl) {
        parsed.push("<ul class='list-disc pl-6'>");
        inUl = true;
      }
      parsed.push(`<li>${line.replace(/^[-*]\s+/, "")}</li>`);
    } else {
      if (inOl) {
        parsed.push("</ol>");
        inOl = false;
      }
      if (inUl) {
        parsed.push("</ul>");
        inUl = false;
      }
      parsed.push(`<p>${line}</p>`);
    }
  }

  if (inOl) parsed.push("</ol>");
  if (inUl) parsed.push("</ul>");

  const finalHTML = parsed.join("\n");

  return DOMPurify.sanitize(finalHTML);
}
