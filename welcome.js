module.exports = async(sock, msg) => {
    const sender = msg.key.participant
    await sock.sendMessage(msg.key.remoteJid, { text: `Welcome @${sender.split('@')[0]} to the group!`, mentions: [sender] })
}
