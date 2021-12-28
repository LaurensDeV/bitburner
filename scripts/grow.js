// grow [name] [threads]

export async function main(ns) {
    const hostname = ns.args[0];
    const threads = ns.args[1];
    while (true) {
        await ns.grow(hostname, { threads })
    }
}