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

// Word Counter logic
(function wordCounter() {
    const input = document.getElementById("wc-input");
    const wordsEl = document.getElementById("wc-words");
    const charsEl = document.getElementById("wc-chars");
    const sentencesEl = document.getElementById("wc-sentences");
    const paragraphsEl = document.getElementById("wc-paragraphs");
    const clearBtn = document.getElementById("wc-clear");
    const copyBtn = document.getElementById("wc-copy");

    function updateStats(text) {
        // Normalize spaces
        const trimmed = text.trim();

        // Words: split on whitespace, filter empties
        const words = trimmed.length ? trimmed.split(/\s+/).filter(Boolean) : [];
        // Characters: count all, including spaces
        const chars = text.length;
        // Sentences: rough split on punctuation
        const sentences = trimmed.length ? trimmed.split(/[.!?]+/).filter(s => s.trim().length) : [];
        // Paragraphs: split on blank lines
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
        } catch (err) {
            alert("Copy failed. You can select the numbers and copy manually.");
        }
    });

    // Initial render
    updateStats("");
})();
