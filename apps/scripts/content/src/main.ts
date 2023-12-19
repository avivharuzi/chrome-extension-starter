console.log('webpg');

// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         console.log(sender.tab ?
//             "from a content script:" + sender.tab.url :
//             "from the extension");
//         if (request.greeting === "hello")
//             sendResponse({ farewell: "goodbye" });
//     }
// );

window.addEventListener("load", () => {
    const btn = document.createElement('button');
    btn.innerText = 'BUTTON'
    btn.onclick = () => {
        (async () => {
            const response = await chrome.runtime.sendMessage({ greeting: "hello" });
            // do something with response here, not outside the function
            console.log(response);
        })();
    }
    document.body.appendChild(btn)

});