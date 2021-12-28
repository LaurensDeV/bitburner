const baseUrl = 'https://raw.githubusercontent.com/LaurensDeV/bitburner/main/scripts/'

const filesToDownload = [
    'deploy.js',
    'discover.js',
    'grow.js',
    'hack.js',
    'monitor.js',
    'money.js',
    'deploy_money.js'
]

export async function main(ns) {
    const hostName = ns.getHostname()
    for (let i = 0; i < filesToDownload.length; i++) {
        const filename = filesToDownload[i]
        const path = baseUrl + filename
        await ns.scriptKill(`/scripts/${filename}`, 'home')
        await ns.rm(`/scripts/${filename}`)
        await ns.sleep(200)
        ns.tprint(`Downloading ${path}`)
        await ns.wget(path + '?ts=' + new Date().getTime(), `/scripts/${filename}`)
    }
    await ns.exec('/scripts/monitor.js', hostName, undefined, hostName)
}
