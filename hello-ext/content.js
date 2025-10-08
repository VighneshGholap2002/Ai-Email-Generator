console.log("Content script loaded");

function findComposeToolabar() {
  const selectors = [
    ".btC",
    ".aDh",
    '[role="toolbar"]', // General dialog role
    ".gU.Up", // Another possible toolbar class
  ];
  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) {
      return toolbar;
    }
    return null;
  }
}
function createButton() {
  const button = document.createElement("div");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3";
  button.style.marginRight = "8px";
  button.innerHTML = "AI Response";
  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Generate AI Response");
  return button;
}

function getEmailContent() {
  const selectors = [
    ".h7",
    ".a3s.aiL",
    ".gmail_quote",
    '[role="presentation"]',
  ];

  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      return content.innerText.trim();
    }
    return "";
  }
}

function injectButton(composeWindow) {
  const existingButton = document.querySelector(".ai-response-button");
  if (existingButton) {
    existingButton.remove();
  }

  const toolbar = findComposeToolabar();
  if (!toolbar) {
    console.log("Toolbar not found");
    return;
  }
  console.log("Toolbar found:");
  const button = createButton();
  button.classList.add("ai-response-button");
  button.addEventListener("click", async () => {
    try {
      button.innerText = "Generating...";
      button.disabled = true;
      const emailContent = getEmailContent();
      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: "professional",
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }
      const generatedData = await response.text();
      console.log("Generated Data:", generatedData);
      const composeBox = document.querySelector(
        '[role="textbox"][g_editable="true"]'
      );
      if (composeBox) {
        composeBox.focus();
        document.execCommand("insertText", false, generatedData);
      }
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      button.innerHTML = "AI Response";
      button.disabled = false;
    }
  });

  toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposenode = addedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches('.aDh,.btC,[role="dialog"]') ||
          node.querySelector('.aDh,.btc,[role="dialog"]'))
    );

    if (hasComposenode) {
      console.log("Compose window detected.");
      setTimeout(injectButton, 500);
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
