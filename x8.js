/**
 * Created by FoxyCodeX
 * WA: wa.me/6285158342254
 * IG: @foxycodex
 */

require('./config')
const {
    BufferJSON,
    WA_DEFAULT_EPHEMERAL,
    generateWAMessageFromContent,
    proto,
    generateWAMessageContent,
    generateWAMessage,
    prepareWAMessageMedia,
    areJidsSameUser,
    getContentType
} = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const {
    exec,
    spawn,
    execSync
} = require("child_process")
const axios = require('axios')
const path = require('path')
const os = require('os')
const moment = require('moment-timezone')
const {
    JSDOM
} = require('jsdom')
const speed = require('performance-now')
const cron = require('node-cron')
const {
    performance
} = require('perf_hooks')
const FormData = require("form-data")
const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args))
const {
    Primbon
} = require('scrape-primbon')
const primbon = new Primbon()
const {
    smsg,
    formatp,
    tanggal,
    formatDate,
    getTime,
    isUrl,
    sleep,
    clockString,
    runtime,
    fetchJson,
    getBuffer,
    jsonformat,
    format,
    parseMention,
    getRandom,
    getGroupAdmins
} = require('./lib/myfunc')
const {
    addList,
    delList,
    isAlreadyList,
    isAlreadyListGroup,
    sendList,
    updateList,
    renameList,
    getDataList
} = require('./lib/list')

var pjson = require('./package.json')
var dbListGroup = db.data.list.group
var dbListPrivate = db.data.list.private

module.exports = x8 = async (x8, m, chatUpdate, store) => {

    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        if (global.multi) {
            var prefix = /^[°•π÷×¶∆£¢€¥®™✓=|!?#%^&.,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓=|!?#%^&.,\/\\©^]/gi) : '#'
        } else {
            if (global.nopref) {
                prefix = ''
            } else {
                prefix = global.prefa
            }
        }
        const from = m.chat
        const isCmd = body.startsWith(prefix)
        const command = body.toLowerCase().split(' ')[0] || ''
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "Unknown"
        const sender = m.sender
        const botNumber = await x8.decodeJid(x8.user.id)
        const ownerNumber = '6285158342254@s.whatsapp.net'
        const isOwner = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(sender)
        const isSU = [botNumber, ...global.su].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(sender)
        const itsMe = sender == botNumber ? true : false
        const text = q = body.slice(command.length + 1, body.length)
        const fatkuns = (m.quoted || m)
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        const isMedia = /image|video|sticker|audio/.test(mime)
        const isGroup = m.isGroup

        // Media
        const isImage = /image/.test(mime)
        const isVideo = /video/.test(mime)
        const isSticker = /sticker/.test(mime)
        const isAudio = /audio/.test(mime)

        // Group
        const groupMetadata = isGroup ? await x8.groupMetadata(from).catch(e => {}) : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const participants = isGroup ? await groupMetadata.participants : ''
        const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
        const isAdmins = isGroup ? groupAdmins.includes(sender) : false
        const isPremium = isOwner || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(sender) || false

        // Function
        const reply = (teks) => {
            x8.sendMessage(from, {
                text: teks
            }, {
                quoted: m
            })
        }

        // Others
        const a = '\`\`\`'
        const readmore = '͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏'
        const footer = global.footer
        const gid = global.gid
        const version = pjson.version
        const _time = moment().tz('Asia/Jakarta').locale('id').format('a')
        if (_time == 'pagi') {
            var salam = 'Morning'
            var emojiSalam = '🌇'
        } else if (_time == 'siang') {
            var salam = 'Afternoon'
            var emojiSalam = '🏙️'
        } else if (_time == 'sore') {
            var salam = 'Evening'
            var emojiSalam = '🌆'
        } else if (_time == 'malam') {
            var salam = 'Night'
            var emojiSalam = '🌃'
        }

        // Thumbnail
        const thumb = global.thumb.thumb
        const fsthumb = fs.readFileSync(thumb)
        const menuThumb = global.thumb.menu
        const fsMenuThumb = fs.readFileSync(menuThumb)

        try {
            let isNumber = x => typeof x === 'number' && !isNaN(x)
            let setting = db.data.settings[botNumber]
            if (typeof setting !== 'object') db.data.settings[botNumber] = {}
            if (setting) {
                if (!('anticall' in setting)) setting.anticall = true
                if (!isNumber(setting.status)) setting.status = 0
                if (!('autobio' in setting)) setting.autobio = false
                if (!('templateImage' in setting)) setting.templateImage = true
                if (!('templateVideo' in setting)) setting.templateVideo = false
                if (!('templateGif' in setting)) setting.templateGif = false
                if (!('templateMsg' in setting)) setting.templateMsg = false
                if (!('templateLocation' in setting)) setting.templateLocation = false
            } else global.db.data.settings[botNumber] = {
                anticall: true,
                status: 0,
                autobio: false,
                templateImage: true,
                templateVideo: false,
                templateGif: false,
                templateMsg: false,
                templateLocation: false,
            }

        } catch (err) {
            console.error(err)
        }

        // Public & Self
        if (!global.public) {
            if (!isOwner && !m.key.fromMe) return
        }

        // List
        if (!isCmd && isGroup && isAlreadyList(from, body, dbListGroup)) {
            var get_data_respon = getDataList(from, body, dbListGroup)
            if (get_data_respon.isImage === false) {
                x8.sendMessage(from, {
                    text: sendList(from, body, dbListGroup)
                }, {
                    quoted: m
                })
            } else {
                x8.sendMessage(from, {
                    image: await getBuffer(get_data_respon.image_url),
                    caption: get_data_respon.response
                }, {
                    quoted: m
                })
            }
        } else if (!isCmd && !isGroup && isAlreadyList(from, body, dbListPrivate)) {
            var get_data_respon = getDataList(from, body, dbListPrivate)
            if (get_data_respon.isImage === false) {
                x8.sendMessage(from, {
                    text: sendList(from, body, dbListPrivate)
                }, {
                    quoted: m
                })
            } else {
                x8.sendMessage(from, {
                    image: await getBuffer(get_data_respon.image_url),
                    caption: get_data_respon.response
                }, {
                    quoted: m
                })
            }
        }

        // Push Message To Console && Auto Read
        if (m.message) {
            x8.readMessages([m.key])
            console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(isGroup ? pushname : 'Private Chat', from))
        }

        // auto set bio
        if (db.data.settings[botNumber].autobio) {
            let setting = global.db.data.settings[botNumber]
            if (new Date() * 1 - setting.status > 1000) {
                let uptime = await runtime(process.uptime())
                await x8.setStatus(`${x8.user.name} | Runtime : ${runtime(uptime)}`)
                setting.status = new Date() * 1
            }
        }

        // Respon Cmd with media
        if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.data.sticker)) {
            let hash = global.db.data.sticker[m.msg.fileSha256.toString('base64')]
            let {
                text,
                mentionedJid
            } = hash
            let messages = await generateWAMessage(from, {
                text: text,
                mentions: mentionedJid
            }, {
                userJid: x8.user.id,
                quoted: m.quoted && m.quoted.fakeObj
            })
            messages.key.fromMe = areJidsSameUser(sender, x8.user.id)
            messages.key.id = m.key.id
            messages.pushName = m.pushName
            if (isGroup) messages.participant = sender
            let msg = {
                ...chatUpdate,
                messages: [proto.WebMessageInfo.fromObject(messages)],
                type: 'append'
            }
            x8.ev.emit('messages.upsert', msg)
        }

        switch (command) {
            case prefix + 'menu': {
                let teks = `*👋┃Hi @${sender.split('@')[0]}*
*${emojiSalam}┃Good ${salam}*

*⩽⩾ 𝙽𝚊𝚖𝚎:* @${botNumber.split('@')[0]}
*⩽⩾ 𝚅𝚎𝚛𝚜𝚒𝚘𝚗:* ${version}
*⩽⩾ 𝙻𝚒𝚋𝚛𝚊𝚛𝚢:* Baileys-MD
*⩽⩾ 𝙾𝚠𝚗𝚎𝚛:* @${ownerNumber.split('@')[0]}

${readmore}
${a}『   📃   MAIN MENU   📃   』${a}

*•* ${prefix}menu
*•* ${prefix}owner


${a}『   👥   GROUP MENU   👥   』${a}

*•* ${prefix}list
*•* ${prefix}addlist
*•* ${prefix}dellist
*•* ${prefix}renamelist
*•* ${prefix}updatelist
*•* ${prefix}hidetag


${a}『   👑   OWNER MENU   👑   』${a}

*•* $
*•* >
*•* =>
*•* ${prefix}gid
*•* ${prefix}broadcast`
                x8.sendMessage(from, {
                    image: fsMenuThumb,
                    caption: teks,
                    footer: footer,
                    buttons: [{
                        buttonId: `${prefix}owner`,
                        buttonText: {
                            displayText: `👑 OWNER 👑`
                        }
                    }],
                    mentions: [sender, botNumber, ownerNumber]
                })
            }
            break
            case prefix + 'owner': {
                var vcard = 'BEGIN:VCARD\n' +
                    'VERSION:3.0\n' +
                    'FN:FoxyCodeX\n' +
                    'ORG:Owner of X.8\'s BOT;\n' +
                    'TEL;type=CELL;type=VOICE;waid=6285158342254:+62 851-5834-2254\n' +
                    'END:VCARD'
                x8.sendMessage(from, {
                    contacts: {
                        displayName: 'FoxyCodeX',
                        contacts: [{
                            vcard
                        }]
                    }
                }).then(res => {
                    x8.sendMessage(from, {
                        text: `*👋┃Hi @${sender.split('@')[0]}*\n${a}THAT'S MY OWNER. IF YOU FIND BUG, PLEASE REPORT TO HIM 🤗${a}`,
                        footer: footer,
                        buttons: [{
                            buttonId: `${prefix}menu`,
                            buttonText: {
                                displayText: `📃 MENU 📃`
                            }
                        }],
                        mentions: [sender]
                    })
                })
            }
            break
            case prefix + 'bc': {
                let _metadata = await x8.groupMetadata(gid)
                let _participants = await _metadata.participants
                if (isImage) {
                    let media = await x8.downloadAndSaveMediaMessage(quoted, `./cache/${sender}`)
                    const fd = new FormData();
                    fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                    fetch('https://telegra.ph/upload', {
                            method: 'POST',
                            body: fd
                        }).then(res => res.json())
                        .then((json) => {
                            x8.sendMessage(gid, {
                                image: {
                                    url: `https://telegra.ph${json[0].src}`
                                },
                                caption: q ? q : '',
                                mentions: _participants.map(a => a.id)
                            })
                        })
                } else {
                    x8.sendMessage(gid, {
                        text: q ? q : '*@everyone*',
                        mentions: _participants.map(a => a.id)
                    })
                }
            }
            break
            case prefix + 'gid': {
                if (!isOwner) return reply(mess.owner)
                reply(from)
            }
            break
            case prefix + 'list': {
                if (isGroup) {
                    if (dbListGroup.length === 0) return reply(`*❌┃There is no list in this group*`)
                    if (!isAlreadyListGroup(from, dbListGroup)) return reply(`*❌┃There is no list in this group*`)
                    var arr_rows = [];
                    for (let x of dbListGroup) {
                        if (x.id === from) {
                            arr_rows.push({
                                title: x.key,
                                rowId: x.key
                            })
                        }
                    }
                    var listMsg = {
                        text: `*👋┃Hi @${sender.split('@')[0]}*\n${a}CHOOSE THE LIST BELOW:${a}`,
                        buttonText: 'Click Here!',
                        footer: footer,
                        sections: [{
                            title: groupName,
                            rows: arr_rows
                        }],
                        mentions: [sender]
                    }
                    x8.sendMessage(from, listMsg)
                } else {
                    if (dbListPrivate.length === 0) return reply(`*❌┃You don't have a list*`)
                    if (!isAlreadyListGroup(from, dbListPrivate)) return reply(`*❌┃You don't have a list*`)
                    var arr_rows = [];
                    for (let x of dbListPrivate) {
                        if (x.id === from) {
                            arr_rows.push({
                                title: x.key,
                                rowId: x.key
                            })
                        }
                    }
                    var listMsg = {
                        text: `*👋┃Hi @${sender.split('@')[0]}*\n${a}CHOOSE YOUR LIST BELOW:${a}`,
                        buttonText: 'Click Here!',
                        footer: footer,
                        sections: [{
                            title: `${pushname}'s List`,
                            rows: arr_rows
                        }],
                        mentions: [sender]
                    }
                    x8.sendMessage(sender, listMsg)
                }
            }
            break
            case prefix + 'addlist': {
                if (isGroup) {
                    if (!isSU && !isOwner) return reply(mess.admin)
                    var args1 = q.split("@")[0]
                    var args2 = q.split("@")[1]
                    if (!q.includes("@")) return reply(`*📛┃Usage:*\n${command} key@response\n\n*✅┃Example:*\n${command} Test@This is a Test`)
                    if (isAlreadyList(from, args1, dbListGroup)) return reply(`*❌┃That list is already registered*`)
                    if (isImage) {
                        let media = await x8.downloadAndSaveMediaMessage(quoted, `./cache/${sender}`)
                        const fd = new FormData();
                        fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                        fetch('https://telegra.ph/upload', {
                                method: 'POST',
                                body: fd
                            }).then(res => res.json())
                            .then((json) => {
                                addList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, dbListGroup)
                                reply(`*✅┃Successfully added new list*`)
                                if (fs.existsSync(media)) fs.unlinkSync(media)
                            })
                    } else {
                        addList(from, args1, args2, false, '-', dbListGroup)
                        reply(`*✅┃Successfully added new list*`)
                    }
                } else {
                    var args1 = q.split("@")[0]
                    var args2 = q.split("@")[1]
                    if (!q.includes("@")) return reply(`*📛┃Usage:*\n${command} key@response\n\n*✅┃Example:*\n${command} Test@This is a Test`)
                    if (isAlreadyList(sender, args1, dbListPrivate)) return reply(`*❌┃That list is already registered*`)
                    if (isImage) {
                        let media = await x8.downloadAndSaveMediaMessage(quoted, `./cache/${sender}`)
                        const fd = new FormData();
                        fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                        fetch('https://telegra.ph/upload', {
                                method: 'POST',
                                body: fd
                            }).then(res => res.json())
                            .then((json) => {
                                addList(sender, args1, args2, true, `https://telegra.ph${json[0].src}`, dbListPrivate)
                                reply(`*✅┃Successfully added new list*`)
                                if (fs.existsSync(media)) fs.unlinkSync(media)
                            })
                    } else {
                        addList(sender, args1, args2, false, '-', dbListPrivate)
                        reply(`*✅┃Successfully added new list*`)
                    }
                }
            }
            break
            case prefix + 'deletelist':
            case prefix + 'dellist': {
                if (isGroup) {
                    if (!isSU && !isOwner) return reply(mess.admin)
                    if (dbListGroup.length === 0) return reply(`*❌┃There is no list in this group*`)
                    if (!isAlreadyListGroup(from, dbListGroup)) return reply(`*❌┃There is no list in this group*`)
                    if (!q) return reply(`*📛┃Usage:*\n${command} key\n\n*✅┃Example:*\n${command} Test`)
                    if (!isAlreadyList(from, q, dbListGroup)) return reply(`*❌┃That list was not found*`)
                    delList(from, q, dbListGroup)
                    reply(`*✅┃Successfully deleted list*`)
                } else {
                    if (dbListPrivate.length === 0) return reply(`*❌┃You don't have a list*`)
                    if (!isAlreadyListGroup(sender, dbListPrivate)) return reply(`*❌┃You don't have a list*`)
                    if (!q) return reply(`*📛┃Usage:*\n${command} key\n\n*✅┃Example:*\n${command} Test`)
                    if (!isAlreadyList(sender, q, dbListPrivate)) return reply(`*❌┃That list was not found*`)
                    delList(sender, q, dbListPrivate)
                    reply(`*✅┃Successfully deleted list*`)
                }
            }
            break
            case prefix + 'update':
            case prefix + 'updatelist': {
                if (isGroup) {
                    if (!isSU && !isOwner) return reply(mess.admin)
                    var args1 = q.split("@")[0]
                    var args2 = q.split("@")[1]
                    if (!q.includes("@")) return reply(`*📛┃Usage:*\n${command} key@newResponse\n\n*✅┃Example:*\n${command} Test@This is a Test`)
                    if (!isAlreadyList(from, args1, dbListGroup)) return reply(`*❌┃That list was not found*`)
                    if (isImage) {
                        let media = await x8.downloadAndSaveMediaMessage(quoted, `./cache/${sender}`)
                        const fd = new FormData();
                        fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                        fetch('https://telegra.ph/upload', {
                                method: 'POST',
                                body: fd
                            }).then(res => res.json())
                            .then((json) => {
                                updateList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, dbListGroup)
                                reply(`*✅┃Successfully updated list*`)
                                if (fs.existsSync(media)) fs.unlinkSync(media)
                            })
                    } else {
                        updateList(from, args1, args2, false, '-', dbListGroup)
                        reply(`*✅┃Successfully updated list*`)
                    }
                } else {
                    var args1 = q.split("@")[0]
                    var args2 = q.split("@")[1]
                    if (!q.includes("@")) return reply(`*📛┃Usage:*\n${command} key@newResponse\n\n*✅┃Example:*\n${command} Test@This is a new Test`)
                    if (!isAlreadyList(sender, args1, dbListPrivate)) return reply(`*❌┃That list was not found*`)
                    if (isImage) {
                        let media = await x8.downloadAndSaveMediaMessage(quoted, `./cache/${sender}`)
                        const fd = new FormData();
                        fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                        fetch('https://telegra.ph/upload', {
                                method: 'POST',
                                body: fd
                            }).then(res => res.json())
                            .then((json) => {
                                updateList(sender, args1, args2, true, `https://telegra.ph${json[0].src}`, dbListPrivate)
                                reply(`*✅┃Successfully updated list*`)
                                if (fs.existsSync(media)) fs.unlinkSync(media)
                            })
                    } else {
                        updateList(sender, args1, args2, false, '-', dbListPrivate)
                        reply(`*✅┃Successfully updated list*`)
                    }
                }
            }
            break
            case prefix + 'rename':
            case prefix + 'renamelist': {
                if (isGroup) {
                    if (!isSU && !isOwner) return reply(mess.admin)
                    var args1 = q.split("@")[0]
                    var args2 = q.split("@")[1]
                    if (!q.includes("@")) return reply(`*📛┃Usage:*\n${command} key@newKey\n\n*✅┃Example:*\n${command} Test@New Test`)
                    if (!isAlreadyList(from, args1, dbListGroup)) return reply(`*❌┃That list was not found*`)
                    renameList(from, args1, args2, dbListGroup)
                    reply(`*✅┃Successfully renamed list*`)
                    if (fs.existsSync(media)) fs.unlinkSync(media)
                } else {
                    var args1 = q.split("@")[0]
                    var args2 = q.split("@")[1]
                    if (!q.includes("@")) return reply(`*📛┃Usage:*\n${command} key@newKey\n\n*✅┃Example:*\n${command} Test@New Test`)
                    if (!isAlreadyList(from, args1, dbListPrivate)) return reply(`*❌┃That list was not found*`)
                    renameList(from, args1, args2, dbListPrivate)
                    reply(`*✅┃Successfully renamed list*`)
                    if (fs.existsSync(media)) fs.unlinkSync(media)
                }
            }
            break
            case prefix + 'hidetag': {
                if (!isGroup) return reply(mess.group)
                if (!isBotAdmins) return reply(mess.botAdmin)
                if (!isSU && !isOwner) return reply(mess.admin)
                if (isImage) {
                    let media = await x8.downloadAndSaveMediaMessage(quoted, `./cache/${sender}`)
                    const fd = new FormData();
                    fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                    fetch('https://telegra.ph/upload', {
                            method: 'POST',
                            body: fd
                        }).then(res => res.json())
                        .then((json) => {
                            x8.sendMessage(from, {
                                image: {
                                    url: `https://telegra.ph${json[0].src}`
                                },
                                caption: q ? q : '',
                                mentions: participants.map(a => a.id)
                            })
                        })
                } else {
                    x8.sendMessage(from, {
                        text: q ? q : '*@everyone*',
                        mentions: participants.map(a => a.id)
                    })
                }
            }
            break
            default:
                if (budy.startsWith('=>')) {
                    if (!isOwner) return m.reply(mess.owner)

                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                        if (sat == undefined) {
                            bang = util.format(sul)
                        }
                        return m.reply(bang)
                    }
                    try {
                        m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                    } catch (e) {
                        m.reply(String(e))
                    }
                }

                if (budy.startsWith('>')) {
                    if (!isOwner) return m.reply(mess.owner)
                    try {
                        let evaled = await eval(budy.slice(2))
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await m.reply(evaled)
                    } catch (err) {
                        await m.reply(String(err))
                    }
                }

                if (budy.startsWith('$')) {
                    if (!isOwner) return m.reply(mess.owner)
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return m.reply(`${err}`)
                        if (stdout) return m.reply(stdout)
                    })
                }

                if (isCmd && budy.toLowerCase() != undefined) {
                    if (from.endsWith('broadcast')) return
                    if (m.isBaileys) return
                    let msgs = global.db.data.database
                    if (!(budy.toLowerCase() in msgs)) return
                    x8.copyNForward(from, msgs[budy.toLowerCase()], true)
                }
        }


    } catch (err) {
        console.log(err)
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})