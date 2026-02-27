(function () {
  function removeDiscover() {
    const links = document.querySelectorAll("a.pos_relative.cursor_pointer");
    links.forEach(link => {
      if (link.textContent?.includes("Discover Stoat")) {
        link.remove();
      }
    });
  }

  removeDiscover();

  const observer = new MutationObserver(removeDiscover);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
