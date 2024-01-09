console.log('chrome-extension-starter - scripts-background');

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        fetch('https://g.gxwagora.jp/graphql', {
            method: 'POST',
            body: JSON.stringify({
                "query": "query getMyAttendanceInformation($from: Date!, $to: Date!) {\n  myAttendanceInformation(from: $from, to: $to) {\n    averageWorkTimeHours\n    userAttendanceInformation {\n      date\n      attendanceTime {\n        begin\n        leaving\n        __typename\n      }\n      signTime {\n        begin\n        leaving\n        signType\n        __typename\n      }\n      retrospectiveComment\n      __typename\n    }\n    __typename\n  }\n}\n",
                // "operationName": "getTeamByKey",
                "variables": {
                    from: request.date,
                    to: request.date
                }
            }),
        }).then(res => {
            res.json().then((json => {
                sendResponse(json);
            }));
        }).catch(err => { console.log(err); });
        return true;
    }
);