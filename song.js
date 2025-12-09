module.exports = async(sock, msg, text) => {
    const songName = text.replace('.song ','')
    await sock.sendMessage(msg.key.remoteJid, { text: `🎵 Playing song: ${songName} (Demo)` })
}
