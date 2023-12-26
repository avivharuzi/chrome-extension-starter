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

const get = async (date: string) => {
    /**
     *  {
            "data": {
                "myAttendanceInformation": {
                    "averageWorkTimeHours": 0,
                    "userAttendanceInformation": [
                        {
                            "date": "2023-12-21",
                            "attendanceTime": [
                                {
                                    "begin": "2023-12-21T09:44:09.516302+09:00",
                                    "leaving": null,
                                    "__typename": "AttendanceTimeModel"
                                }
                            ],
                            "signTime": [
                                {
                                    "begin": "2023-12-21T12:33:48.281687+09:00",
                                    "leaving": "2023-12-21T13:29:43.0603+09:00",
                                    "signType": "rest",
                                    "__typename": "SignTimeModel"
                                }
                            ],
                            "retrospectiveComment": "",
                            "__typename": "UserDailyAttendanceInformationModel"
                        }
                    ],
                    "__typename": "UserWeeklyAttendanceInformationModel"
                }
            }
        }
     */

    const response = await chrome.runtime.sendMessage({ date: date });
    // do something with response here, not outside the function
    const attendanceTime = response.data.myAttendanceInformation.userAttendanceInformation.at(0).attendanceTime.at(0);
    console.log(attendanceTime.begin, attendanceTime.leaving); // { begin: '2023-12-26T09:49:46.017588+09:00', leaving: null, __typename: 'AttendanceTimeModel' }
    return { begin: attendanceTime.begin, leaving: attendanceTime.leaving };
}

window.addEventListener("load", () => {
    let oldUrl = window.location.href;

    // domの変更を検知する
    const observer = new MutationObserver(() => {
        if (window.location.href === oldUrl) return;
        oldUrl = window.location.href;
        console.log('changed', window.location.href.split('/').pop());
        addButton();
    });

    observer.observe(document.body, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true,
    });

    function addButton() {
        const interval = window.setInterval(() => {
            const target = document.querySelector('gxp-growthus-business-report');
            const hasLoadingText = target?.innerHTML.includes('読込中');
            console.log(hasLoadingText);
            if (!hasLoadingText) {
                window.clearInterval(interval);
                console.log('loaded', window.location.href.split('/').pop());
                const date = window.location.href.split('/').pop()!; // 20230101
                // convert 2023-01-01
                const date_converted = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;

                // const btn = document.createElement('button');
                // btn.innerText = 'BUTTON'
                // btn.onclick = () => { get(date_converted) };

                const table = document.querySelector('body > gxp-growthus-root > gxp-growthus-attendance-shell > div > span:nth-child(2) > gxp-growthus-business-report > table:nth-child(4)');


                const thead_tr = table?.querySelector('thead > tr');

                thead_tr?.appendChild(document.createElement('th'));
                thead_tr?.appendChild(document.createElement('th'));

                const tbody = table?.querySelector('tbody');
                console.log('tbody_tr', tbody)
                const button_td = document.createElement('td');

                button_td.innerHTML = '<button>Wagoraの出退勤時間を表示</button>';
                button_td.querySelector('button')!.onclick = () => {
                    get(date_converted).then((res) => {
                        const begin = new Date(res.begin);
                        const leaving = new Date(res.leaving);
                        // hh:mm
                        const begin_str = `${begin.getHours().toString().padStart(2, '0')}:${begin.getMinutes().toString().padStart(2, '0')}`;
                        const leaving_str = `${leaving.getHours().toString().padStart(2, '0')}:${leaving.getMinutes().toString().padStart(2, '0')}`;

                        // const begin_str = begin.toLocaleDateString("ja-JP", { hour: "2-digit", minute: "2-digit", });
                        // const leaving_str = leaving.toLocaleDateString("ja-JP", { hour: "2-digit", minute: "2-digit", });

                        document.querySelector('#time_td')!.innerHTML = `${begin_str}~${leaving_str}`;
                    })
                };;

                // button_td.appendChild(btn);
                tbody?.appendChild(button_td);

                const time_td = document.createElement('td');
                time_td.id = 'time_td';
                tbody?.appendChild(time_td);

                // document.body.appendChild(btn)
            }
        }, 100)
    }

    addButton();
});


