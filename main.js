// main.js (type="module")
const contentEl = document.getElementById("content");

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

import { marked } from "https://testingcf.jsdelivr.net/npm/marked/+esm";

/* --- 关键补丁：让 marked 不处理 $$ ... $$ --- */

const mathBlock = {
  name: "mathBlock",
  level: "block",
  start(src) {
    return src.indexOf("$$");
  },
  tokenizer(src) {
    const match = /^\$\$([\s\S]*?)\$\$/.exec(src);
    if (match) {
      return {
        type: "mathBlock",
        raw: match[0],
        text: match[1]
      };
    }
  },
  renderer(token) {
    return `$$${escapeHtml(token.text)}$$`;
  }
};

const mathInline = {
  name: "mathInline",
  level: "inline",
  start(src) {
    return src.indexOf("$");
  },
  tokenizer(src) {
    const match = /^\$([^\$]+)\$/.exec(src);
    if (match) {
      return {
        type: "mathInline",
        raw: match[0],
        text: match[1]
      };
    }
  },
  renderer(token) {
    return `$${escapeHtml(token.text)}$`;
  }
};

marked.use({ extensions: [mathBlock, mathInline] });

marked.setOptions({
  gfm: true,
  breaks: true,
  smartLists: true,
  smartypants: false,
});

/* ---------- 主逻辑 ---------- */

async function loadAndRender() {
  let slug = new URLSearchParams(location.search).get("slug") || "readme";

  try {
    const res = await fetch(`posts/${slug}.md`);

    if (!res.ok) {
      contentEl.textContent = res.status;
      return;
    }

    const md = await res.text();
    contentEl.innerHTML = marked.parse(md);

  } catch (e) {
    contentEl.textContent = "404";
  }

  hljs.highlightAll();

  if (window.renderMathInElement) {
    renderMathInElement(contentEl, {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "\\[", right: "\\]", display: true},
        {left: "$", right: "$", display: false},
        {left: "\\(", right: "\\)", display: false}
      ],
      throwOnError: false,
      ignoredTags: ["script","noscript","style","textarea","pre","code"]
    });
  }
}

loadAndRender();