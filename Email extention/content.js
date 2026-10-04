console.log("Email Writer extension running!!!");

function getEmailContent() {

    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]'
    ];

    for (const selector of selectors) {
        const content = document.querySelector(selector);

        if (content) {
            return content.innerText.trim();
        }
    }

    return '';
}



function findComposeToolBar() {

    const selectors = [

        '.btC',
        'aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ];

    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
        return null;
    }

}

function createAiButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply',
        button.setAttribute('role', 'button'),
        button.setAttribute('data-tooltip', 'Generated Ai Reply');
    return button;
}



function injectButton() {

    const existingButton = document.querySelector('ai-reply-button');
    if (existingButton) {
        existingButton.remove();
    }
    const toolbar = findComposeToolBar();

    if (!toolbar) {
        console.log("toolbar not found !!");
        return;
    }

    console.log("toolbar found");
    const button = createAiButton();
    button.classList.add('ai-reply-button');

    button.addEventListener('click', async () => {

        try {
            button.innerHTML = 'Generating.....';
            button.disabled = true;
            const content = getEmailContent();
            const response = await fetch('http://localhost:8080/api/email', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mailContent: content,
                    tone: 'professional'
                })
            });

            if (!response.ok) {
                return new Error("API failed !!!" + response.status);
            }
            const generatedReply = await response.text();
            const composeBox = document.querySelector(
                '[contenteditable="true"][role="textbox"]'
            );
            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.error('compose box was not found!!!');
            }
        } catch (error) {
            console.error(error);
            alert('failed to generate the reply !!!');
        }
        finally {
            button.innerHTML = "AI Reply",
                button.disabled = false;
        }

    });

    toolbar.insertBefore(button, toolbar.firstChild);

}

// Observe changes in the Gmail DOM
const observer = new MutationObserver((mutations) => {

    mutations.forEach((mutation) => {

        // Get newly added elements
        const addedNodes = Array.from(mutation.addedNodes);

        const hasComposeElements = addedNodes.some((node) => {

            // Ignore text nodes
            if (node.nodeType !== Node.ELEMENT_NODE) {
                return false;
            }

            return (
                node.matches(".aDh, .btC, [role='dialog']") ||
                node.querySelector(".aDh, .btC, [role='dialog']")
            );
        });

        if (hasComposeElements) {
            console.log("Compose element detected");

            setTimeout(() => {
                injectButton();
            }, 500);
        }
    });
});

// Start observing Gmail
if (document.body) {
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log("MutationObserver started");
}