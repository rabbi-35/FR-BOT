module.exports = async(sock, msg) => {
    const sender = msg.key.participant
    await sock.sendMessage(msg.key.remoteJid, { text: `বাই! @${sender.split('@')[0]} গ্রুপ থেকে চলে গেলো।`, mentions: [sender] })
}
