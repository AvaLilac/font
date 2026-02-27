(function () {
  if (window.__AVIA_CSS_HIGHLIGHT__) return;
  window.__AVIA_CSS_HIGHLIGHT__ = true;

  function loadPrism(callback) {
    if (window.Prism) return callback();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/prismjs/themes/prism-tomorrow.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/prismjs/prism.js";
    script.onload = () => {
      const cssLang = document.createElement("script");
      cssLang.src =
        "https://cdn.jsdelivr.net/npm/prismjs/components/prism-css.min.js";
      cssLang.onload = callback;
      document.body.appendChild(cssLang);
    };
    document.body.appendChild(script);
  }

  function enhance(textarea) {
    if (textarea.dataset.cssEnhanced) return;
    textarea.dataset.cssEnhanced = "true";

    textarea.style.background = "transparent";
    textarea.style.position = "relative";
    textarea.style.zIndex = "2";

    const highlight = document.createElement("pre");
    highlight.style.position = "absolute";
    highlight.style.top = textarea.offsetTop + "px";
    highlight.style.left = textarea.offsetLeft + "px";
    highlight.style.width = textarea.offsetWidth + "px";
    highlight.style.height = textarea.offsetHeight + "px";
    highlight.style.margin = "0";
    highlight.style.pointerEvents = "none";
    highlight.style.overflow = "hidden";
    highlight.style.fontFamily = getComputedStyle(textarea).fontFamily;
    highlight.style.fontSize = getComputedStyle(textarea).fontSize;
    highlight.style.lineHeight = getComputedStyle(textarea).lineHeight;
    highlight.style.padding = getComputedStyle(textarea).padding;

    const code = document.createElement("code");
    code.className = "language-css";
    highlight.appendChild(code);

    textarea.parentElement.appendChild(highlight);

    function sync() {
      code.textContent = textarea.value;
      Prism.highlightElement(code);
      highlight.scrollTop = textarea.scrollTop;
      highlight.scrollLeft = textarea.scrollLeft;
    }

    textarea.addEventListener("input", sync);
    textarea.addEventListener("scroll", sync);
    window.addEventListener("resize", () => {
      highlight.style.width = textarea.offsetWidth + "px";
      highlight.style.height = textarea.offsetHeight + "px";
    });

    sync();
  }

  function find() {
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
    loadPrism(() => {
      find();
      new MutationObserver(find).observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }

  if (document.body) init();
  else requestAnimationFrame(init);
})();
