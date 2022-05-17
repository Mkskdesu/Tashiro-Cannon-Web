let fireIntervalId;
let logs = [];
const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
    // @ts-ignore
    const url = document.getElementById('url').value;
    // @ts-ignore
    const num = document.getElementById('num').value;
    newLog(`${new Date().toLocaleTimeString()} Start fire to ${url}    interval:${num}ms`);
    fireIntervalId = setInterval(async () => {
        fire(url);
    }, num);
})

async function fire(url) {
    console.log(url);
    return new Promise((resolve, reject) => {
        resolve();
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onerror = () => {
        newLog(`${new Date().toLocaleTimeString()} Error from ${url}`);
        }
    })
}


function newLog(data) {
    const log = document.createElement('p');
    log.innerText = data;
    document.getElementById('logs').appendChild(log);
}

document.getElementById("stop").addEventListener("click", () => {
    clearInterval(fireIntervalId);
    newLog(`${new Date().toLocaleTimeString()} Stopped fireing.`);
});