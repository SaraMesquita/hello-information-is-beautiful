"use strict";

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
