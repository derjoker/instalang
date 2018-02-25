console.log('Incremental Reading for Language Learning.');

function toggleMasks() {
  document.querySelectorAll('span.highlight').forEach(highlight => {
    highlight.classList.toggle('mask');
  });
}

toggleMasks();

document.body.addEventListener('click', event => {
  if (event.target.nodeName !== 'BODY') return;

  // Instapaper: Remove Note
  if (document.querySelectorAll('div.highlight_popover.reveal').length > 0)
    return;

  toggleMasks();
  if (highlights && pointer >= 0)
    highlights[pointer].classList.toggle('answer');
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
    '<div id="instalang"><input id="cloze" type="text" autofocus autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" /></div>'
  );

function check() {
  const input = document.querySelector('#cloze');
  console.log(input.value);
  const highlight = highlights[pointer];

  if (input.value === highlight.textContent) return true;

  highlight.classList.remove('mask');
  highlight.classList.remove('answer');

  setTimeout(() => {
    highlight.classList.add('mask');
    highlight.classList.add('answer');
  }, 2000);
  return false;
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
