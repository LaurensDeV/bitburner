export async function main(ns) {
    const servers = globalThis.hackable_servers

    servers
        .filter(s => !ns.hasRootAccess(s.hostname))
        .map(s => hack(ns, s.hostname))
}

function hack(ns, host) {
    const ports = ns.getServerNumPortsRequired(host);
    var portsHacked = 0;
    if (ports > 0 && ns.fileExists('BruteSSH.exe')) ns.brutessh(host) && portsHacked++;
    if (ports > 1 && ns.fileExists('FTPCrack.exe')) ns.ftpcrack(host) && portsHacked++;
    if (ports > 2 && ns.fileExists('relaySMTP.exe')) ns.relaysmtp(host) && portsHacked++;
    if (ports > 3 && ns.fileExists('HTTPWorm.exe')) ns.httpworm(host) && portsHacked++;
    if (ports > 4 && ns.fileExists('SQLInject.exe')) ns.sqlinject(host) && portsHacked++;
    if (portsHacked >= ports) ns.nuke(host);
    if (ns.hasRootAccess(host)) {
        ns.tprint(`Successfully hacked ${host}`);
    }
}