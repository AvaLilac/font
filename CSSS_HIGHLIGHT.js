(function () {
  if (window.__AVIA_WHITE_SIDEBAR__) return;
  window.__AVIA_WHITE_SIDEBAR__ = true;

  const style = document.createElement("style");
  style.id = "avia-white-sidebar";

  style.textContent = `
    /* Main channel sidebar */
    [class*="w_var(--layout-width-channel-sidebar)"] {
      background: #ffffff !important;
      background-color: #ffffff !important;
    }

    /* Fix text color so it stays readable */
    [class*="w_var(--layout-width-channel-sidebar)"] * {
      color: #000000 !important;
      fill: #000000 !important;
    }
  `;

  document.head.appendChild(style);
})();
