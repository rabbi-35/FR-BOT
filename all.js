module.exports = async(sock, msg, text, config) => {
    const sender = msg.key.participant || msg.key.remoteJid
    const isGroup = msg.key.remoteJid.endsWith('@g.us')
    if(!isGroup) return

    if(sender === config.ownerNumber) {
        const groupMetadata = await sock.groupMetadata(msg.key.remoteJid)
        const mentions = groupMetadata.participants.map(u => u.id)
        await sock.sendMessage(msg.key.remoteJid, { text: 'Mentioning all members!', mentions })
    } else {
        await sock.sendMessage(msg.key.remoteJid, { text: 'Only OWNER/Admin can use this command!' })
    }
}
