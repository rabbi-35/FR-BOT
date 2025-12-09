const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require("@adiwajshing/baileys")
const qrcode = require('qrcode-terminal')
const { ownerName, ownerNumber } = require('./config')
const { state, saveState } = useSingleFileAuthState('./auth_info.json')
const fs = require('fs')
const path = require('path')

// Load command modules
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'))
let commands = {}
for (const file of commandFiles) {
    commands[file.replace('.js','')] = require(`./commands/${file}`)
}

// Create socket
const sock = makeWASocket({ auth: state })

// Connection events
sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if(connection === 'close') {
        const reason = (lastDisconnect.error)?.output?.statusCode
        console.log('Connection closed, reason:', reason)
        sock.connect()
    } else if(connection === 'open') {
        console.log('Bot is online!')
    }
})

// Messages
sock.ev.on('messages.upsert', async (m) => {
    const msg = m.messages[0]
    if(!msg.message || msg.key.fromMe) return
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text
    const sender = msg.key.participant || msg.key.remoteJid
    const isGroup = msg.key.remoteJid.endsWith('@g.us')

    if(!text) return

    // Run commands
    const commandName = text.split(' ')[0].replace('.','')
    if(commands[commandName]) {
        commands[commandName](sock, msg, text, { ownerName, ownerNumber })
    }
})
