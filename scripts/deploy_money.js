export async function main(ns) {
    const servers = globalThis.hackable_servers

    const filtered = servers
        .filter(s => ns.hasRootAccess(s.hostname))

    for(var i = 0; i < filtered.length; i++) {
        const host = filtered[i]
        const threadsMax = Math.floor((host.maxRam - host.ramUsed) / ns.getScriptRam('/scripts/money.js'))
        if(threadsMax > 0) {
            await ns.scp('/scripts/money.js', host.hostname)
            await ns.exec('/scripts/money.js', host.hostname, threadsMax, host.hostname);
        }
    }
}
