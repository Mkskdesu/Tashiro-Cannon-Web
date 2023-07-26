let fireIntervalId;
let logs = [];
let fireing = false;
const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
    
    const url = (document.getElementById('url')?.value||"").trim();

    const num = document.getElementById('num')?.value || 10;

    if (fireing) newLog(`${new Date().toLocaleTimeString()} Already fireing. The target URL will be changed to ${url}`);
    if (!url) return newLog("Please Enter the target URL.")
    newLog(`${new Date().toLocaleTimeString()} Start fire to ${url}    interval:${num}ms`);
    fireing = true;
    fireIntervalId = setInterval(async () => {
        if(!fireing) return;
        fire(url);
    }, num);
})

async function fire(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        resolve();
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
    fireing = false;
});