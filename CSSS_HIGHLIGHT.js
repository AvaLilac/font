(function () {
  if (window.__AVIA_WHITE_HOME__) return;
  window.__AVIA_WHITE_HOME__ = true;

  function makeWhite() {
    const buttons = document.querySelectorAll("div.cursor_pointer");

    buttons.forEach(btn => {
      if (btn.textContent.trim() === "Home") {
        btn.style.background = "#ffffff";
        btn.style.color = "#000000";
        btn.style.setProperty("--color", "#000000");
      }
    });
  }

  const observer = new MutationObserver(makeWhite);
  observer.observe(document.body, { childList: true, subtree: true });

  makeWhite();
})();
