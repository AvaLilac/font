(function () {
  if (window.__AVIA_CSS_HIGHLIGHT__) return;
  window.__AVIA_CSS_HIGHLIGHT__ = true;

  function highlightCSS(code) {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, m => `<span style="color:#6a9955;">${m}</span>`) // comments
      .replace(/([a-z-]+)(?=\s*:)/gi, m => `<span style="color:#9cdcfe;">${m}</span>`) // properties
      .replace(/:(.*?);/g, (m, val) =>
        `:<span style="color:#ce9178;">${val}</span>;`
      )
      .replace(/(\.[a-z0-9_-]+|\#[a-z0-9_-]+)/gi, m =>
        `<span style="color:#d7ba7d;">${m}</span>`
      )
      .replace(/(@[a-z-]+)/gi, m =>
        `<span style="color:#c586c0;">${m}</span>`
      );
  }

  function enhance(textarea) {
    if (textarea.dataset.enhanced) return;
    textarea.dataset.enhanced = "true";

    const wrapper = textarea.parentElement;
    wrapper.style.position = "relative";

    const overlay = document.createElement("pre");
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.margin = "0";
    overlay.style.pointerEvents = "none";
    overlay.style.whiteSpace = "pre-wrap";
    overlay.style.wordWrap = "break-word";
    overlay.style.overflow = "hidden";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.padding = getComputedStyle(textarea).padding;
    overlay.style.fontFamily = getComputedStyle(textarea).fontFamily;
    overlay.style.fontSize = getComputedStyle(textarea).fontSize;
    overlay.style.lineHeight = getComputedStyle(textarea).lineHeight;
    overlay.style.zIndex = "1";

    textarea.style.background = "transparent";
    textarea.style.position = "relative";
    textarea.style.zIndex = "2";
    textarea.style.color = "transparent";
    textarea.style.caretColor = "#ffffff";

    wrapper.appendChild(overlay);

    function sync() {
      overlay.innerHTML = highlightCSS(
        textarea.value.replace(/</g, "&lt;").replace(/>/g, "&gt;")
      );
      overlay.scrollTop = textarea.scrollTop;
      overlay.scrollLeft = textarea.scrollLeft;
    }

    textarea.addEventListener("input", sync);
    textarea.addEventListener("scroll", sync);

    sync();
  }

  function findTextarea() {
    document.querySelectorAll("textarea").forEach(t => {
      if (
        t.style.fontFamily === "monospace" &&
        t.style.background === "transparent"
      ) {
        enhance(t);
      }
    });
  }

  function init() {
    findTextarea();
    new MutationObserver(findTextarea).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  if (document.body) init();
  else requestAnimationFrame(init);
})();
