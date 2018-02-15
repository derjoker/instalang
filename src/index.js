console.log("Incremental Reading for Language Learning.");

// remove old clozes (used only in development)
document.querySelectorAll(".cloze").forEach(oldCloze => {
  oldCloze.parentNode.removeChild(oldCloze);
});

document.querySelectorAll("span.highlight").forEach(highlight => {
  console.log(highlight.getAttribute("data-api-id"));
  const id = highlight.getAttribute("data-api-id");
  highlight.insertAdjacentHTML(
    "beforebegin",
    `<input class="cloze" data-api-id="${id}" type="text" style="width: ${
      highlight.offsetWidth
    }px" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">`
  );
});

document.querySelectorAll(".cloze").forEach(cloze => {
  const id = cloze.getAttribute("data-api-id");
  const answer = document.querySelector(`span.highlight[data-api-id="${id}"]`);
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

document.body.addEventListener("click", event => {
  if (event.target.nodeName !== "BODY") return;

  // Instapaper: Remove Note
  if (document.querySelectorAll("div.highlight_popover.reveal").length > 0)
    return;

  document.querySelectorAll(".cloze").forEach(cloze => {
    cloze.classList.toggle("cloze-hide");
  });
});
