/* Discovers all hackable servers and adds it to local storage under hackable_servers */
var list = [];

var programs = [
    'BruteSSH.exe',
    'FTPCrack.exe',
    'relaySMTP.exe',
    'HTTPWorm.exe',
    'SQLInject.exe'
]

export async function main(ns) {
    if(!globalThis.servers) globalThis.servers = {}
    list = [];
    recursiveScan(ns, 'home', 0);
    const programsOwned = programs.filter(p => ns.fileExists(p)).length
    list = list
        .map(server => ns.getServer(server))
        .filter(server => server.hostname !== 'home' && !server.purchasedByPlayer)
        .filter(server => server.requiredHackingSkill <= ns.getHackingLevel())
        .filter(server => ns.getServerNumPortsRequired(server.hostname) <= programsOwned)
        .sort((a, b) => b.moneyMax - a.moneyMax)
    
    list.forEach(s => globalThis.servers[s.hostname] = s)
    globalThis.hackable_servers = list;
}

function recursiveScan(ns, server, depth) {
    if (list.includes(server)) return;
    list.push(server);
    const servers = ns.scan(server);
    return servers.map(s => recursiveScan(ns, s, depth + 1));
}