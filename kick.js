module.exports = async(sock, msg, text, config) => {
    const sender = msg.key.participant || msg.key.remoteJid
    const isGroup = msg.key.remoteJid.endsWith('@g.us')
    if(!isGroup) return

    if(sender === config.ownerNumber) {
        const target = text.split(' ')[1]
        if(!target) return sock.sendMessage(msg.key.remoteJid, { text: 'Please provide number to kick' })
        await sock.groupParticipantsUpdate(msg.key.remoteJid, [target+'@s.whatsapp.net'], 'remove')
    } else {
        await sock.sendMessage(msg.key.remoteJid, { text: 'Only OWNER/Admin can kick members' })
    }
}
