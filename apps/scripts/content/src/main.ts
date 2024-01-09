const get = async (date: string) => {
    const response = await chrome.runtime.sendMessage({ date: date });
    const attendanceTime = response.data.myAttendanceInformation.userAttendanceInformation.at(0).attendanceTime.at(0);
    console.log(attendanceTime.begin, attendanceTime.leaving);
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
            if (!hasLoadingText) {
                window.clearInterval(interval);
                const date = window.location.href.split('/').pop()!;
                const date_converted = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;

                const table = document.querySelector('body > gxp-growthus-root > gxp-growthus-attendance-shell > div > span:nth-child(2) > gxp-growthus-business-report > table:nth-child(4)');

                const thead_tr = table?.querySelector('thead > tr');

                thead_tr?.appendChild(document.createElement('th'));
                thead_tr?.appendChild(document.createElement('th'));

                const tbody = table?.querySelector('tbody');
                const button_td = document.createElement('td');

                button_td.innerHTML = '<button id="workTimeFromWagora">Wagoraの出退勤時間を表示</button>';
                button_td.querySelector('button')!.onclick = () => {
                    get(date_converted).then((res) => {
                        const begin = new Date(res.begin);
                        const leaving = new Date(res.leaving);
                        
                        const begin_str = `${begin.getHours().toString().padStart(2, '0')}:${begin.getMinutes().toString().padStart(2, '0')}`;
                        const leaving_str = `${leaving.getHours().toString().padStart(2, '0')}:${leaving.getMinutes().toString().padStart(2, '0')}`;

                        document.querySelector('#time_td')!.innerHTML = `${begin_str}~${leaving_str}`;
                    })
                };;

                tbody?.appendChild(button_td);

                const time_td = document.createElement('td');
                time_td.id = 'time_td';
                tbody?.appendChild(time_td);
            }
        }, 100)
    }

    addButton();
});


