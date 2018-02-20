console.log("Incremental Reading for Language Learning.");

const highlight = {
  add() {
    document.querySelectorAll("span.highlight").forEach(highlight => {
      const id = highlight.getAttribute("data-api-id");
      highlight.insertAdjacentHTML(
        "beforebegin",
        `<input class="cloze" data-api-id="${id}" type="text" style="width: ${
          highlight.offsetWidth
        }px" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">`
      );
    });
  },
  toggle() {
    document.querySelectorAll("span.highlight").forEach(highlight => {
      highlight.classList.toggle("mask");
    });
  }
};

const cloze = {
  add() {
    document.querySelectorAll(".cloze").forEach(cloze => {
      const id = cloze.getAttribute("data-api-id");
      const answer = document.querySelector(
        `span.highlight[data-api-id="${id}"]`
      );
      cloze.addEventListener("keypress", event => {
        answer.classList.remove("wrong");
        answer.classList.remove("correct");

        // Enter or Tab
        if (event.keyCode === 13 || event.keyCode === 9) {
          if (cloze.value !== answer.textContent) answer.classList.add("wrong");
          else answer.classList.add("correct");
        }
      });
    });
  },
  clear() {
    document.querySelectorAll(".cloze").forEach(cloze => {
      cloze.parentNode.removeChild(cloze);
    });
  }
};

// remove old clozes (used only in development)
cloze.clear();

highlight.add();
highlight.toggle();
cloze.add();

let clozeMode = true;

document.body.addEventListener("click", event => {
  if (event.target.nodeName !== "BODY") return;

  // Instapaper: Remove Note
  if (document.querySelectorAll("div.highlight_popover.reveal").length > 0)
    return;

  if (clozeMode) {
    cloze.clear();
  } else {
    highlight.add();
    cloze.add();
  }

  highlight.toggle();

  clozeMode = !clozeMode;
});
