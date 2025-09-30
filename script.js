"use strict";

// Security hygiene for links created later
(function enforceRelNoopener() {
    document.addEventListener("click", function (e) {
        const a = e.target.closest("a[target='_blank']");
        if (a && !a.rel.includes("noopener")) {
            a.rel = (a.rel ? a.rel + " " : "") + "noopener";
        }
    });
})();

// Footer year
document.getElementById("year").textContent = new Date().getFullYear().toString();

/* =========================
   Tool #1: Word Counter
========================= */
(function wordCounter() {
    const input = document.getElementById("wc-input");
    if (!input) return;

    const wordsEl = document.getElementById("wc-words");
    const charsEl = document.getElementById("wc-chars");
    const sentencesEl = document.getElementById("wc-sentences");
    const paragraphsEl = document.getElementById("wc-paragraphs");
    const clearBtn = document.getElementById("wc-clear");
    const copyBtn = document.getElementById("wc-copy");

    function updateStats(text) {
        const trimmed = text.trim();
        const words = trimmed.length ? trimmed.split(/\s+/).filter(Boolean) : [];
        const chars = text.length;
        const sentences = trimmed.length ? trimmed.split(/[.!?]+/).filter(s => s.trim().length) : [];
        const paragraphs = trimmed.length ? trimmed.split(/\n\s*\n/).filter(p => p.trim().length) : [];

        wordsEl.textContent = String(words.length);
        charsEl.textContent = String(chars);
        sentencesEl.textContent = String(sentences.length);
        paragraphsEl.textContent = String(paragraphs.length);
    }

    input.addEventListener("input", () => updateStats(input.value));
    clearBtn.addEventListener("click", () => {
        input.value = "";
        updateStats("");
        input.focus();
    });

    copyBtn.addEventListener("click", async () => {
        const summary = `Words: ${wordsEl.textContent}
Characters: ${charsEl.textContent}
Sentences: ${sentencesEl.textContent}
Paragraphs: ${paragraphsEl.textContent}`;
        try {
            await navigator.clipboard.writeText(summary);
            copyBtn.textContent = "Copied!";
            setTimeout(() => (copyBtn.textContent = "Copy Stats"), 1200);
        } catch {
            alert("Copy failed. You can select the numbers and copy manually.");
        }
    });

    updateStats("");
})();

/* =========================
   Tool #2: Case Converter
========================= */
(function caseConverter() {
    const input = document.getElementById("cc-input");
    if (!input) return;

    const upperBtn = document.getElementById("cc-upper");
    const lowerBtn = document.getElementById("cc-lower");
    const titleBtn = document.getElementById("cc-title");
    const sentenceBtn = document.getElementById("cc-sentence");
    const copyBtn = document.getElementById("cc-copy");
    const clearBtn = document.getElementById("cc-clear");

    function toTitleCase(str) {
        return str
            .toLowerCase()
            .split(/(\s+)/)
            .map(token => {
                if (token.trim().length === 0) return token;
                return token.charAt(0).toUpperCase() + token.slice(1);
            })
            .join("");
    }

    function toSentenceCase(str) {
        // Split on sentence enders while keeping delimiters
        const parts = str
            .split(/([.!?]\s+)/)
            .map(s => s.toLowerCase());
        for (let i = 0; i < parts.length; i += 2) {
            const sentence = parts[i].trimStart();
            if (sentence.length) {
                parts[i] = sentence.charAt(0).toUpperCase() + sentence.slice(1);
            }
        }
        return parts.join("");
    }

    upperBtn.addEventListener("click", () => (input.value = input.value.toUpperCase()));
    lowerBtn.addEventListener("click", () => (input.value = input.value.toLowerCase()));
    titleBtn.addEventListener("click", () => (input.value = toTitleCase(input.value)));
    sentenceBtn.addEventListener("click", () => (input.value = toSentenceCase(input.value)));
    clearBtn.addEventListener("click", () => (input.value = ""));

    copyBtn.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(input.value);
            copyBtn.textContent = "Copied!";
            setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
        } catch {
            alert("Copy failed. You can select and copy manually.");
        }
    });
})();

/* ==============================
   Tool #3: URL Encoder/Decoder
============================== */
(function urlCoder() {
    const input = document.getElementById("url-input");
    if (!input) return;

    const encBtn = document.getElementById("url-encode");
    const decBtn = document.getElementById("url-decode");
    const copyBtn = document.getElementById("url-copy");
    const clearBtn = document.getElementById("url-clear");

    encBtn.addEventListener("click", () => {
        try {
            input.value = encodeURIComponent(input.value);
        } catch {
            alert("Encoding failed. Check your input.");
        }
    });

    decBtn.addEventListener("click", () => {
        try {
            input.value = decodeURIComponent(input.value);
        } catch {
            alert("Decoding failed. Check your input.");
        }
    });

    copyBtn.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(input.value);
            copyBtn.textContent = "Copied!";
            setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
        } catch {
            alert("Copy failed. You can select and copy manually.");
        }
    });

    clearBtn.addEventListener("click", () => (input.value = ""));
})();
