console.log('chrome-extension-starter - scripts-background');

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        console.log(request);
        fetch('https://g.gxwagora.jp/graphql', {
            method: 'POST',
            body: JSON.stringify({
                "query": "query getTeamByKey($teamKey: ID!) {\n  team(key: $teamKey) {\n    team {\n      id\n      key\n      name\n      iconUrl\n      teamGoal\n      __typename\n    }\n    role\n    __typename\n  }\n}\n",
                "operationName": "getTeamByKey",
                "variables": {
                    "teamKey": "newgrd2023"
                }
            }),
        }).then(res => {
            res.json().then((json => {
                console.log(json);
                sendResponse(json);
            }));
        });
        return true;
    }
);


// chrome.runtime.onInstalled.addListener(() => {
//     chrome.action.setBadgeText({
//         text: "OFF",
//     });
// });

// const extensions = 'https://developer.chrome.com/docs/extensions'
// const webstore = 'https://developer.chrome.com/docs/webstore'

// chrome.action.onClicked.addListener(async (tab) => {
//     if (tab.url?.startsWith(extensions) || tab.url?.startsWith(webstore)) {
//         // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
//         const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
//         // Next state will always be the opposite
//         const nextState = prevState === 'ON' ? 'OFF' : 'ON'

//         // Set the action badge to the next state
//         await chrome.action.setBadgeText({
//             tabId: tab.id,
//             text: nextState,
//         });

//         if (nextState === "ON") {
//             // Insert the CSS file when the user turns the extension on
//             await chrome.scripting.insertCSS({
//                 files: ["focus-mode.css"],
//                 target: { tabId: tab.id! },
//             });
//         } else if (nextState === "OFF") {
//             // Remove the CSS file when the user turns the extension off
//             await chrome.scripting.removeCSS({
//                 files: ["focus-mode.css"],
//                 target: { tabId: tab.id! },
//             });
//         }
//     }
// });
