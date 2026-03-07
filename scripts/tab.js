const tabList = document.querySelector('[role="tablist"]');
const tabs = document.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown", changeTabFocus);
tabs.forEach((tab) => {
    tab.addEventListener("click", changeTabPanel);
});

let tabFocusIndex = 0;

function changeTabFocus(e) {
    const keydownLeftCode = 37;
    const keydownRightCode = 39;
    
    if (e.keyCode === keydownLeftCode || e.keyCode === keydownRightCode) {
        tabs[tabFocusIndex].setAttribute("tabindex", -1);

        if (e.keyCode === keydownLeftCode) {
            tabFocusIndex--;
            if (tabFocusIndex < 0) tabFocusIndex =  tabs.length -1;
        } else if (e.keyCode === keydownRightCode) {
            tabFocusIndex++;
            if (tabFocusIndex >= tabs.length) tabFocusIndex = 0;
        }

        tabs[tabFocusIndex].setAttribute("tabindex", 0);
        tabs[tabFocusIndex].focus();
    }
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");

    const tablistContainer = targetTab.parentNode;
    const mainContainer = tablistContainer.parentNode;

    tablistContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);

    targetTab.setAttribute("aria-selected", true);
    
    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`]);

    hideContent(mainContainer, 'picture');
    showContent(mainContainer, [`#${targetImage}`]);
}

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => {
            item.setAttribute("hidden", true);
        });
}

function showContent(parent, content) {
    parent
        .querySelector(content)
        .removeAttribute("hidden");
}