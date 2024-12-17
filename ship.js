function Ship() {
  let lenght = 0;
  let hits = 0;

  const setLenght = (value) => (lenght = value);
  const getLenght = () => lenght;
  const hit = () => (hits += 1);
  const isSunk = () => {
    if (hits >= lenght) {
      return true;
    }
    return false;
  };
  return { setLenght, getLenght, hit, isSunk };
}

export { Ship };
