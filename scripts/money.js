export async function main(ns) {
    const host = ns.args[0];
    while (true) {
        const server = globalThis.servers[host];
        
        if(!server.moneyMax) return;

        if(server.hackDifficulty / server.minDifficulty > 1.1) {
            await ns.weaken(server.hostname)
        }		
        else if(server.moneyAvailable / server.moneyMax < 0.75) {
            await ns.grow(server.hostname)
        } else {
            await ns.hack(server.hostname)
        }
    }
}