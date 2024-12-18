function board() {
  document.querySelectorAll(".board").forEach((element) => {
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      element.appendChild(cell);
    }
  });
}
board();
