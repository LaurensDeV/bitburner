/** @param {NS} ns **/
let secondsElapsed = 0;

export async function main(ns) {
    while (true) {
        await ns.sleep(1000);
        if (secondsElapsed % 10 === 0) { // discover & hack every 10 seconds
            await ns.run('/scripts/discover.js')
            await ns.sleep(1000)
            await ns.run('/scripts/hack.js')
            await ns.sleep(1000)
            await ns.run('/scripts/deploy_money.js')
        }
        secondsElapsed++;
    }
}