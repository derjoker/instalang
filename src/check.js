function check(a, b, insensitive = true) {
  let x = a,
    y = b;
  if (insensitive) {
    x = a.toLowerCase();
    y = b.toLowerCase();
  }
  return x === y;
}
