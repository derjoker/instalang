console.log('Incremental Reading for Language Learning.');

const highlight = {
  add() {
    document.querySelectorAll('span.highlight').forEach(highlight => {
      const id = highlight.getAttribute('data-api-id');
      highlight.insertAdjacentHTML(
        'beforebegin',
        `<input class="cloze" data-api-id="${id}" type="text" style="width: ${
          highlight.offsetWidth
        }px" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">`
      );
    });
  },
  toggle() {
    document.querySelectorAll('span.highlight').forEach(highlight => {
      highlight.classList.toggle('mask');
    });
  },
};

const cloze = {
  add() {
    document.querySelectorAll('.cloze').forEach(cloze => {
      const id = cloze.getAttribute('data-api-id');
      const answer = document.querySelector(
        `span.highlight[data-api-id="${id}"]`
      );
      cloze.addEventListener('keypress', event => {
        answer.classList.remove('wrong');
        answer.classList.remove('correct');

        // Enter or Tab
        if (event.keyCode === 13 || event.keyCode === 9) {
          if (cloze.value !== answer.textContent) answer.classList.add('wrong');
          else answer.classList.add('correct');
        }
      });
    });
  },
  clear() {
    document.querySelectorAll('.cloze').forEach(cloze => {
      cloze.parentNode.removeChild(cloze);
    });
  },
};

// remove old clozes (used only in development)
cloze.clear();

highlight.add();
highlight.toggle();
cloze.add();

let clozeMode = true;

document.body.addEventListener('click', event => {
  if (event.target.nodeName !== 'BODY') return;

  // Instapaper: Remove Note
  if (document.querySelectorAll('div.highlight_popover.reveal').length > 0)
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

const highlights = document.querySelectorAll('span.highlight');
let pointer;

function prev() {
  highlights.forEach(highlight => {
    highlight.classList.remove('answer');
  });

  pointer = (pointer - 1 + highlights.length) % highlights.length;

  console.log(pointer);

  const highlight = highlights[pointer];
  highlight.classList.add('answer');
  highlight.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  });
}

function next() {
  highlights.forEach(highlight => {
    highlight.classList.remove('answer');
  });

  pointer === undefined
    ? (pointer = 0)
    : (pointer = (pointer + 1) % highlights.length);

  console.log(pointer);

  const highlight = highlights[pointer];
  highlight.classList.add('answer');
  highlight.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  });
}

next();

// clear #instalang
document.querySelectorAll('#instalang').forEach(instalang => {
  instalang.parentNode.removeChild(instalang);
});

document
  .querySelector('.container')
  .insertAdjacentHTML(
    'afterend',
    '<div id="instalang"><input id="cloze" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" /></div>'
  );

function check() {
  const input = document.querySelector('#cloze');
  console.log(input.value);
  return input.value === highlights[pointer].textContent;
}

document.querySelector('#cloze').addEventListener('keypress', event => {
  if (event.key === 'Tab') {
    console.log('Tab');
    if (check()) {
      event.shiftKey ? prev() : next();
    }
    event.preventDefault();
  }
  if (event.key === 'Enter') {
    console.log('Enter');
    if (check()) {
      event.shiftKey ? prev() : next();
    }
  }
});
