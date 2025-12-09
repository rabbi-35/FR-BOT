module.exports = async(sock, msg, text, config) => {
    await sock.sendMessage(msg.key.remoteJid, { text: `Hello! I am ${config.ownerName}'s Bot 🤖\nOWNER: ${config.ownerName}\nNumber: ${config.ownerNumber}\nType .all, .kick, .song <name> or other commands.`})
}
