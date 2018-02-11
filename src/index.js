console.log("Incremental Reading for Language Learning.");

// remove old clozes (used only in development)
document.querySelectorAll(".cloze").forEach(oldCloze => {
  oldCloze.parentNode.removeChild(oldCloze);
});

document.querySelectorAll("span.highlight").forEach(highlight => {
  console.log(highlight.offsetWidth);
  highlight.insertAdjacentHTML(
    "beforebegin",
    `<input class="cloze" type="text" style="width: ${
      highlight.offsetWidth
    }px" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">`
  );
});

document.querySelectorAll(".cloze").forEach((cloze, index) => {
  cloze.addEventListener("keypress", event => {
    const answer = document.querySelectorAll("span.highlight")[index];
    answer.classList.remove("wrong");
    answer.classList.remove("correct");

    // Enter or Tab
    if (event.keyCode === 13 || event.keyCode === 9) {
      if (cloze.value !== answer.textContent) answer.classList.add("wrong");
      else answer.classList.add("correct");
    }
  });
});
