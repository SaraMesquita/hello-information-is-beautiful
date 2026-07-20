"use strict";

/* =========================================================
   Unconventional CV
========================================================= */

const cvTabs = document.querySelectorAll("[data-cv-panel]");
const cvPanels = document.querySelectorAll("[data-cv-content]");

cvTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedPanel = tab.dataset.cvPanel;

    cvTabs.forEach((currentTab) => {
      const isSelected =
        currentTab.dataset.cvPanel === selectedPanel;

      currentTab.classList.toggle("is-active", isSelected);
      currentTab.setAttribute(
        "aria-selected",
        String(isSelected)
      );
    });

    cvPanels.forEach((panel) => {
      const isSelected =
        panel.dataset.cvContent === selectedPanel;

      panel.classList.toggle("is-active", isSelected);
      panel.hidden = !isSelected;
    });
  });
});


/* =========================================================
   Hero title animation
========================================================= */

const animatedTitle = document.querySelector(".title-colour");

if (animatedTitle) {

  function replayTitleAnimation() {

    animatedTitle.style.animation = "none";

    // Force browser reflow
    void animatedTitle.offsetWidth;

    animatedTitle.style.animation = `
      colour-pass
      3.2s
      cubic-bezier(0.65, 0, 0.35, 1)
      forwards
    `;

    const nextDelay =
      12000 + Math.random() * 10000;

    setTimeout(
      replayTitleAnimation,
      nextDelay
    );
  }

  setTimeout(
    replayTitleAnimation,
    15000
  );
}
