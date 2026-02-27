(function () {
  if (window.__AVIA_QUICKCSS_HIGHLIGHT__) return;
  window.__AVIA_QUICKCSS_HIGHLIGHT__ = true;

  function highlightCSS(code) {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, m => `<span style="color:#6a9955;">${m}</span>`)
      .replace(/(@[a-z-]+)/gi, m => `<span style="color:#c586c0;">${m}</span>`)
      .replace(/(\.[a-z0-9_-]+|\#[a-z0-9_-]+)/gi, m => `<span style="color:#d7ba7d;">${m}</span>`)
      .replace(/([a-z-]+)(?=\s*:)/gi, m => `<span style="color:#9cdcfe;">${m}</span>`)
      .replace(/:(.*?);/g, (m, val) =>
        `:<span style="color:#ce9178;">${val}</span>;`
      );
  }

  function enhance(textarea) {
    if (textarea.dataset.highlightReady) return;
    textarea.dataset.highlightReady = "true";

    const container = textarea.parentElement;
    container.style.position = "relative";

    const overlay = document.createElement("pre");
    overlay.style.position = "absolute";
    overlay.style.margin = "0";
    overlay.style.pointerEvents = "none";
    overlay.style.whiteSpace = "pre-wrap";
    overlay.style.wordWrap = "break-word";
    overlay.style.overflow = "hidden";
    overlay.style.zIndex = "1";

    const computed = getComputedStyle(textarea);

    Object.assign(overlay.style, {
      top: textarea.offsetTop + "px",
      left: textarea.offsetLeft + "px",
      width: textarea.offsetWidth + "px",
      height: textarea.offsetHeight + "px",
      padding: computed.padding,
      fontFamily: computed.fontFamily,
      fontSize: computed.fontSize,
      lineHeight: computed.lineHeight
    });

    textarea.style.background = "transparent";
    textarea.style.color = "transparent";
    textarea.style.caretColor = computed.color;
    textarea.style.position = "relative";
    textarea.style.zIndex = "2";

    container.appendChild(overlay);

    function sync() {
      overlay.innerHTML = highlightCSS(
        textarea.value.replace(/</g, "&lt;").replace(/>/g, "&gt;")
      );
      overlay.scrollTop = textarea.scrollTop;
      overlay.scrollLeft = textarea.scrollLeft;
    }

    textarea.addEventListener("input", sync);
    textarea.addEventListener("scroll", sync);

    new ResizeObserver(() => {
      overlay.style.width = textarea.offsetWidth + "px";
      overlay.style.height = textarea.offsetHeight + "px";
      overlay.style.top = textarea.offsetTop + "px";
      overlay.style.left = textarea.offsetLeft + "px";
    }).observe(textarea);

    sync();
  }

  function init() {
    const panel = document.getElementById("avia-quickcss-panel");
    if (!panel) return;

    const textarea = panel.querySelector("textarea");
    if (textarea) enhance(textarea);
  }

  const observer = new MutationObserver(init);
  observer.observe(document.body, { childList: true, subtree: true });

  init();
})();
