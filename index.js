/**
 * Created by FoxyCodeX
 * WA: wa.me/6285158342254
 * IG: @foxycodex
 */

require('./config')
const {
    default: x8Connect,
    useSingleFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    makeInMemoryStore,
    jidDecode,
    proto
} = require("@adiwajshing/baileys")
const {
    state,
    saveState
} = useSingleFileAuthState(`./${sessionName}.json`)
const pino = require('pino')
const {
    Boom
} = require('@hapi/boom')
const fs = require('fs')
const yargs = require('yargs/yargs')
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const _ = require('lodash')
const axios = require('axios')
const PhoneNumber = require('awesome-phonenumber')
const cron = require('node-cron')
const {
    imageToWebp,
    videoToWebp,
    writeExifImg,
    writeExifVid
} = require('./lib/exif')
const {
    smsg,
    isUrl,
    generateMessageTag,
    getBuffer,
    getSizeMedia,
    fetchJson,
    await,
    sleep
} = require('./lib/myfunc')

var low
try {
    low = require('lowdb')
} catch (e) {
    low = require('./lib/lowdb')
}

const {
    Low,
    JSONFile
} = low
const mongoDB = require('./lib/mongoDB')

const gid = global.gid
const a = '\`\`\`'

const express = require('express')
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query,
    ...(apikeyqueryname ? {
        [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
    } : {})
})) : '')

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
    /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
    new mongoDB(opts['db']) :
    new JSONFile(`src/database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
    if (global.db.READ) return new Promise((resolve) => setInterval(function() {
        (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null)
    }, 1 * 1000))
    if (global.db.data !== null) return
    global.db.READ = true
    await global.db.read()
    global.db.READ = false
    global.db.data = {
        list: {
            private: [],
            group: []
        },
        users: {},
        sticker: {},
        database: {},
        settings: {},
        ...(global.db.data || {})
    }
    global.db.chain = _.chain(global.db.data)
}
loadDatabase()

// save database every 30seconds
if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
})

async function startX8() {
    const x8 = x8Connect({
        logger: pino({
            level: 'silent'
        }),
        printQRInTerminal: true,
        browser: ['X8 | SMALAN', 'Safari', '3.0.0'],
        auth: state
    })

    store.bind(x8.ev)

    x8.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
            mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            m = smsg(x8, mek, store)
            require("./x8")(x8, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })

    // Setting
    x8.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    x8.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = x8.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = {
                id,
                name: contact.notify
            }
        }
    })

    x8.getName = (jid, withoutContact = false) => {
        id = x8.decodeJid(jid)
        withoutContact = x8.withoutContact || withoutContact
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = x8.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
                id,
                name: 'WhatsApp'
            } : id === x8.decodeJid(x8.user.id) ?
            x8.user :
            (store.contacts[id] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }

    x8.sendContact = async (jid, kon, quoted = '', opts = {}) => {
        let list = []
        for (let i of kon) {
            list.push({
                displayName: await x8.getName(i + '@s.whatsapp.net'),
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await x8.getName(i + '@s.whatsapp.net')}\nFN:${await x8.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:okeae2410@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://instagram.com/cak_haho\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
            })
        }
        x8.sendMessage(jid, {
            contacts: {
                displayName: `${list.length} Kontak`,
                contacts: list
            },
            ...opts
        }, {
            quoted
        })
    }

    x8.setStatus = (status) => {
        x8.query({
            tag: 'iq',
            attrs: {
                to: '@s.whatsapp.net',
                type: 'set',
                xmlns: 'status',
            },
            content: [{
                tag: 'status',
                attrs: {},
                content: Buffer.from(status, 'utf-8')
            }]
        })
        return status
    }

    x8.serializeM = (m) => smsg(x8, m, store)

    x8.ev.on('connection.update', async (update) => {
        const {
            connection,
            lastDisconnect
        } = update
        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) {
                console.log(`Bad Session File, Please Delete Session and Scan Again`);
                x8.logout();
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log("Connection closed, reconnecting....");
                startX8();
            } else if (reason === DisconnectReason.connectionLost) {
                console.log("Connection Lost from Server, reconnecting...");
                startX8();
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
                x8.logout();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(`Device Logged Out, Please Scan Again And Run.`);
                x8.logout();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log("Restart Required, Restarting...");
                startX8();
            } else if (reason === DisconnectReason.timedOut) {
                console.log("Connection TimedOut, Reconnecting...");
                startX8();
            } else x8.end(`Unknown DisconnectReason: ${reason}|${connection}`)
        }
        console.log('Connected...', update)
    })

    x8.ev.on('creds.update', saveState)

    // Add Other


    //==================== MATA PELAJARAN ===================//
    
    // KEGIATAN & ISTIRAHAT
    const Upacara = new cron.schedule('00 07 * * 1', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}🧩┃KEGIATAN:${a} Upacara\n${a}🕒┃WAKTU   :${a} 07.00 - 08.00`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Doa = new cron.schedule('05 07 * * 2-4', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}🧩┃KEGIATAN:${a} Do'a dan Mengaji Bersama\n${a}🕒┃WAKTU   :${a} 07.05 - 07.15`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Aktivitas = new cron.schedule('05 07 * * 5', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}🧩┃KEGIATAN:${a} Aktivitas\n${a}🕒┃WAKTU   :${a} 07.05 - 08.30`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Istirahat1 = new cron.schedule('30 09 * * 1-4', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}🧩┃KEGIATAN:${a} Istirahat\n${a}🕒┃WAKTU   :${a} 09.30 - 09.45`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Istirahat2 = new cron.schedule('00 12 * * 1-4', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}🧩┃KEGIATAN:${a} Istirahat\n${a}🕒┃WAKTU   :${a} 12.00 - 12.30`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Istirahat3 = new cron.schedule('00 14 * * 1-4', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}🧩┃KEGIATAN:${a} Istirahat\n${a}🕒┃WAKTU   :${a} 14.00 - 14.15`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Istirahat4 = new cron.schedule('00 10 * * 5', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}🧩┃KEGIATAN:${a} Istirahat\n${a}🕒┃WAKTU   :${a} 10.00 - 10.15`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Istirahat5 = new cron.schedule('45 11 * * 5', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}🧩┃KEGIATAN:${a} Istirahat\n${a}🕒┃WAKTU   :${a} 11.45 - 13.15`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    //========== SENIN ==========//
    const Senin1 = new cron.schedule('00 08 * * 1', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Bhs. Indonesia\n${a}👤┃GURU :${a} Icke Monarikalistiani, S.Pd.\n${a}🕒┃WAKTU:${a} 08.00 - 09.30`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Senin2 = new cron.schedule('45 09 * * 1', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Ekonomi\n${a}👤┃GURU :${a} Renni Suryani, M.Pd.\n${a}🕒┃WAKTU:${a} 09.45 - 12.00`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Senin3 = new cron.schedule('30 12 * * 1', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Seni Budaya\n${a}👤┃GURU :${a} Pungki Wahana Putra, S.Pd.\n${a}🕒┃WAKTU:${a} 12.30 - 14.00`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Senin4 = new cron.schedule('15 14 * * 1', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Bhs. Inggris\n${a}👤┃GURU :${a} Drs. Agus Santoso\n${a}🕒┃WAKTU:${a} 14.15 - 15.15`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    //========== SELASA ==========//
    const Selasa1 = new cron.schedule('15 07 * * 2', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Penjasorkes\n${a}👤┃GURU :${a} Nazhief Muttaqien, S.Pd.\n${a}🕒┃WAKTU:${a} 07.15 - 09.30`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Selasa2 = new cron.schedule('45 09 * * 2', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Fisika\n${a}👤┃GURU :${a} Elfarida, M.M.\n${a}🕒┃WAKTU:${a} 09.45 - 12.00`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Selasa3 = new cron.schedule('30 12 * * 2', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} PAK\n${a}👤┃GURU :${a} Lemuel Kevin A.L., S.Pd.\n${a}🕒┃WAKTU:${a} 12.30 - 13.15`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Selasa4 = new cron.schedule('15 13 * * 2', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Informatika\n${a}👤┃GURU :${a} Dewi Heriliah, S.Kom.\n${a}🕒┃WAKTU:${a} 13.15 - 14.00`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Selasa5 = new cron.schedule('15 14 * * 2', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Informatika\n${a}👤┃GURU :${a} Dewi Heriliah, S.Kom.\n${a}🕒┃WAKTU:${a} 14.15 - 15.15`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    //========== RABU ==========//
    const Rabu1 = new cron.schedule('15 07 * * 3', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Sosiologi\n${a}👤┃GURU :${a} Rizki Aryuli, S.Sos.\n${a}🕒┃WAKTU:${a} 07.15 - 09.30`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Rabu2 = new cron.schedule('45 09 * * 3', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Sejarah Indo\n${a}👤┃GURU :${a} Dra. Risnawati\n${a}🕒┃WAKTU:${a} 09.45 - 11.15`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Rabu3 = new cron.schedule('15 11 * * 3', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Mulok\n${a}👤┃GURU :${a} Kristianto, S.Ag.\n${a}🕒┃WAKTU:${a} 11.15 - 12.00`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Rabu4 = new cron.schedule('30 12 * * 3', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Geografi\n${a}👤┃GURU :${a} Sunardi, M.Pd.\n${a}🕒┃WAKTU:${a} 12.30 - 14.00`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Rabu5 = new cron.schedule('15 14 * * 3', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Geografi\n${a}👤┃GURU :${a} Sunardi, M.Pd.\n${a}🕒┃WAKTU:${a} 14.15 - 14.45`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Rabu6 = new cron.schedule('45 14 * * 3', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} PAI\n${a}👤┃GURU :${a} Muhammad Syukri, S.PdI.\n${a}🕒┃WAKTU:${a} 14.45 - 15.15`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    //========== KAMIS =========//
    const Kamis1 = new cron.schedule('15 07 * * 4', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} MTK (Wajib)\n${a}👤┃GURU :${a} Yuliana, S.Pd.\n${a}🕒┃WAKTU:${a} 07.15 - 08.45`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Kamis2 = new cron.schedule('45 08 * * 4', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} PAI\n${a}👤┃GURU :${a} Muhammad Syukri, S.PdI.\n${a}🕒┃WAKTU:${a} 08.45 - 09.30`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Kamis3 = new cron.schedule('45 09 * * 4', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} PAI\n${a}👤┃GURU :${a} Muhammad Syukri, S.PdI.\n${a}🕒┃WAKTU:${a} 09.45 - 10.30`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Kamis4 = new cron.schedule('30 10 * * 4', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Kimia\n${a}👤┃GURU :${a} Dra. Eli Zarwati, M.M.\n${a}🕒┃WAKTU:${a} 10.30 - 12.00`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Kamis5 = new cron.schedule('30 12 * * 4', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Kimia\n${a}👤┃GURU :${a} Dra. Eli Zarwati, M.M.\n${a}🕒┃WAKTU:${a} 12.30 - 13.15`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Kamis6 = new cron.schedule('15 13 * * 4', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Biologi\n${a}👤┃GURU :${a} Raheni Purwanti, S.Sl.\n${a}🕒┃WAKTU:${a} 13.15 - 14.00`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Kamis7 = new cron.schedule('15 14 * * 4', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Biologi\n${a}👤┃GURU :${a} Raheni Purwanti, S.Sl.\n${a}🕒┃WAKTU:${a} 14.15 - 15.15`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    //========== JUM'AT ==========//
    const Jumat1 = new cron.schedule('30 08 * * 5', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} Bhs. Indonesia\n${a}👤┃GURU :${a} Icke Monarikalistiani, S.Pd.\n${a}🕒┃WAKTU:${a} 08.30 - 10.00`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Jumat2 = new cron.schedule('15 10 * * 5', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} MTK (Wajib)\n${a}👤┃GURU :${a} Yuliana, S.Pd.\n${a}🕒┃WAKTU:${a} 10.15 - 11.45`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const Jumat3 = new cron.schedule('15 13 * * 5', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}📖┃MAPEL:${a} PPKn\n${a}👤┃GURU :${a} Lemuel Kevin A.L., S.Pd.\n${a}🕒┃WAKTU:${a} 13.15 - 14.45`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    //========== THE END ==========//
    const End1 = new cron.schedule('15 15 * * 1-4', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}IT'S TIME TO GO HOME.\nSEE YOU TOMORROW GUYS 👋${a}`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })

    const End2 = new cron.schedule('45 14 * * 5', async () => {
        let metadata = await x8.groupMetadata(gid)
        let participants = await metadata.participants
        x8.sendMessage(gid, {
            text: `*━━━┃   📚   SCHEDULE   📚   ┃━━━*\n${a}IT'S TIME TO GO HOME.\nENJOY YOUR WEEKEND GUYS ✨${a}`,
            mentions: participants.map(a => a.id)
        }, {
            timezone: "Asia/Jakarta"
        })
    })
    
    /** Resize Image
     *
     * @param {Buffer} Buffer (Only Image)
     * @param {Numeric} Width
     * @param {Numeric} Height
     */
    x8.reSize = async (image, width, height) => {
        let jimp = require('jimp')
        var oyy = await jimp.read(image);
        var kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
        return kiyomasa
    }
    // Siapa yang cita-citanya pakai resize buat keliatan thumbnailnya

    /** Send Button 5 Location
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} location
     * @param [*] button
     * @param {*} options
     */
    x8.send5ButLoc = async (jid, text = '', footer = '', lok, but = [], options = {}) => {
        let resize = await x8.reSize(lok, 300, 150)
        var template = generateWAMessageFromContent(jid, {
            "templateMessage": {
                "hydratedTemplate": {
                    "locationMessage": {
                        "degreesLatitude": 0,
                        "degreesLongitude": 0,
                        "jpegThumbnail": resize
                    },
                    "hydratedContentText": text,
                    "hydratedFooterText": footer,
                    "hydratedButtons": but
                }
            }
        }, options)
        x8.relayMessage(jid, template.message, {
            messageId: template.key.id
        })
    }

    /**
     *
     * @param {*} jid
     * @param {*} url
     * @param {*} caption
     * @param {*} quoted
     * @param {*} options
     */
    x8.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
        let mime = '';
        let res = await axios.head(url)
        mime = res.headers['content-type']
        if (mime.split("/")[1] === "gif") {
            return x8.sendMessage(jid, {
                video: await getBuffer(url),
                caption: caption,
                gifPlayback: true,
                ...options
            }, {
                quoted: quoted,
                ...options
            })
        }
        let type = mime.split("/")[0] + "Message"
        if (mime === "application/pdf") {
            return x8.sendMessage(jid, {
                document: await getBuffer(url),
                mimetype: 'application/pdf',
                caption: caption,
                ...options
            }, {
                quoted: quoted,
                ...options
            })
        }
        if (mime.split("/")[0] === "image") {
            return x8.sendMessage(jid, {
                image: await getBuffer(url),
                caption: caption,
                ...options
            }, {
                quoted: quoted,
                ...options
            })
        }
        if (mime.split("/")[0] === "video") {
            return x8.sendMessage(jid, {
                video: await getBuffer(url),
                caption: caption,
                mimetype: 'video/mp4',
                ...options
            }, {
                quoted: quoted,
                ...options
            })
        }
        if (mime.split("/")[0] === "audio") {
            return x8.sendMessage(jid, {
                audio: await getBuffer(url),
                caption: caption,
                mimetype: 'audio/mpeg',
                ...options
            }, {
                quoted: quoted,
                ...options
            })
        }
    }

    /** Send List Messaage
     *
     *@param {*} jid
     *@param {*} text
     *@param {*} footer
     *@param {*} title
     *@param {*} butText
     *@param [*] sections
     *@param {*} quoted
     */
    x8.sendListMsg = (jid, text = '', footer = '', title = '', butText = '', sects = [], quoted) => {
        let sections = sects
        var listMes = {
            text: text,
            footer: footer,
            title: title,
            buttonText: butText,
            sections
        }
        x8.sendMessage(jid, listMes, {
            quoted: quoted
        })
    }

    /** Send Button 5 Message
     * 
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} button
     * @returns 
     */
    x8.send5ButMsg = (jid, text = '', footer = '', but = []) => {
        let templateButtons = but
        var templateMessage = {
            text: text,
            footer: footer,
            templateButtons: templateButtons
        }
        x8.sendMessage(jid, templateMessage)
    }

    /** Send Button 5 Image
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} image
     * @param [*] button
     * @param {*} options
     * @returns
     */
    x8.send5ButImg = async (jid, text = '', footer = '', img, but = [], buff, options = {}) => {
        let resize = await x8.reSize(buff, 300, 150)
        let message = await prepareWAMessageMedia({
            image: img,
            jpegThumbnail: resize
        }, {
            upload: x8.waUploadToServer
        })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
            templateMessage: {
                hydratedTemplate: {
                    imageMessage: message.imageMessage,
                    "hydratedContentText": text,
                    "hydratedFooterText": footer,
                    "hydratedButtons": but
                }
            }
        }), options)
        x8.relayMessage(jid, template.message, {
            messageId: template.key.id
        })
    }

    /** Send Button 5 Video
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} Video
     * @param [*] button
     * @param {*} options
     * @returns
     */
    x8.send5ButVid = async (jid, text = '', footer = '', vid, but = [], buff, options = {}) => {
        let resize = await x8.reSize(buff, 300, 150)
        let message = await prepareWAMessageMedia({
            video: vid,
            jpegThumbnail: resize
        }, {
            upload: x8.waUploadToServer
        })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
            templateMessage: {
                hydratedTemplate: {
                    videoMessage: message.videoMessage,
                    "hydratedContentText": text,
                    "hydratedFooterText": footer,
                    "hydratedButtons": but
                }
            }
        }), options)
        x8.relayMessage(jid, template.message, {
            messageId: template.key.id
        })
    }

    /** Send Button 5 Gif
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} Gif
     * @param [*] button
     * @param {*} options
     * @returns
     */
    x8.send5ButGif = async (jid, text = '', footer = '', gif, but = [], buff, options = {}) => {
        let resize = await x8.reSize(buff, 300, 150)
        let a = [1, 2]
        let b = a[Math.floor(Math.random() * a.length)]
        let message = await prepareWAMessageMedia({
            video: gif,
            gifPlayback: true,
            jpegThumbnail: resize,
            gifAttribution: b
        }, {
            upload: x8.waUploadToServer
        })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
            templateMessage: {
                hydratedTemplate: {
                    videoMessage: message.videoMessage,
                    "hydratedContentText": text,
                    "hydratedFooterText": footer,
                    "hydratedButtons": but
                }
            }
        }), options)
        x8.relayMessage(jid, template.message, {
            messageId: template.key.id
        })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} buttons 
     * @param {*} caption 
     * @param {*} footer 
     * @param {*} quoted 
     * @param {*} options 
     */
    x8.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
        let buttonMessage = {
            text,
            footer,
            buttons,
            headerType: 2,
            ...options
        }
        x8.sendMessage(jid, buttonMessage, {
            quoted,
            ...options
        })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    x8.sendText = (jid, text, quoted = '', options) => x8.sendMessage(jid, {
        text: text,
        ...options
    }, {
        quoted,
        ...options
    })

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    x8.sendImage = async (jid, path, caption = '', quoted = '', options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await x8.sendMessage(jid, {
            image: buffer,
            caption: caption,
            ...options
        }, {
            quoted
        })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    x8.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await x8.sendMessage(jid, {
            video: buffer,
            caption: caption,
            gifPlayback: gif,
            ...options
        }, {
            quoted
        })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} mime 
     * @param {*} options 
     * @returns 
     */
    x8.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await x8.sendMessage(jid, {
            audio: buffer,
            ptt: ptt,
            ...options
        }, {
            quoted
        })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    x8.sendTextWithMentions = async (jid, text, quoted, options = {}) => x8.sendMessage(jid, {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
        ...options
    }, {
        quoted
    })

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    x8.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await x8.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    x8.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await x8.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }

    /**
     * 
     * @param {*} message 
     * @param {*} filename 
     * @param {*} attachExtension 
     * @returns 
     */
    x8.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

    x8.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        return buffer
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} filename
     * @param {*} caption
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    x8.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
        let types = await x8.getFile(path, true)
        let {
            mime,
            ext,
            res,
            data,
            filename
        } = types
        if (res && res.status !== 200 || file.length <= 65536) {
            try {
                throw {
                    json: JSON.parse(file.toString())
                }
            } catch (e) {
                if (e.json) throw e.json
            }
        }
        let type = '',
            mimetype = mime,
            pathFile = filename
        if (options.asDocument) type = 'document'
        if (options.asSticker || /webp/.test(mime)) {
            let {
                writeExif
            } = require('./lib/exif')
            let media = {
                mimetype: mime,
                data
            }
            pathFile = await writeExif(media, {
                packname: options.packname ? options.packname : global.packname,
                author: options.author ? options.author : global.author,
                categories: options.categories ? options.categories : []
            })
            await fs.promises.unlink(filename)
            type = 'sticker'
            mimetype = 'image/webp'
        } else if (/image/.test(mime)) type = 'image'
        else if (/video/.test(mime)) type = 'video'
        else if (/audio/.test(mime)) type = 'audio'
        else type = 'document'
        await x8.sendMessage(jid, {
            [type]: {
                url: pathFile
            },
            caption,
            mimetype,
            fileName,
            ...options
        }, {
            quoted,
            ...options
        })
        return fs.promises.unlink(pathFile)
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} message 
     * @param {*} forceForward 
     * @param {*} options 
     * @returns 
     */
    x8.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
        if (options.readViewOnce) {
            message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
            vtype = Object.keys(message.message.viewOnceMessage.message)[0]
            delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
            delete message.message.viewOnceMessage.message[vtype].viewOnce
            message.message = {
                ...message.message.viewOnceMessage.message
            }
        }

        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
        let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await x8.relayMessage(jid, waMessage.message, {
            messageId: waMessage.key.id
        })
        return waMessage
    }

    x8.cMod = (jid, copy, text = '', sender = x8.user.id, options = {}) => {
        //let copy = message.toJSON()
        let mtype = Object.keys(copy.message)[0]
        let isEphemeral = mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
        let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
        else if (content.caption) content.caption = text || content.caption
        else if (content.text) content.text = text || content.text
        if (typeof content !== 'string') msg[mtype] = {
            ...content,
            ...options
        }
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
        else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
        copy.key.remoteJid = jid
        copy.key.fromMe = sender === x8.user.id

        return proto.WebMessageInfo.fromObject(copy)
    }


    /**
     * 
     * @param {*} path 
     * @returns 
     */
    x8.getFile = async (PATH, save) => {
        let res
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
        if (data && save) fs.promises.writeFile(filename, data)
        return {
            res,
            filename,
            size: await getSizeMedia(data),
            ...type,
            data
        }

    }

    return x8
}

startX8()


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})