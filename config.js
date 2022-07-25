/**
 * Created by FoxyCodeX
 * WA: wa.me/6285158342254
 * IG: @foxycodex
 */

const fs = require('fs')
const chalk = require('chalk')

// Website Api
global.APIs = {
    zenz: 'https://zenzapis.xyz',
}

// Apikey Website Api
global.APIKeys = {
    'https://zenzapis.xyz': 'Your Key',
}

// Prefix
global.multi = true
global.nopref = false
global.prefa = '8!'

// Other
global.public = true
global.owner = ['6285158342254']
global.su = ['6285158342254', '628117221279', '6285838992711']
global.premium = ['6285158342254']
global.packname = 'X.8 BOT'
global.author = 'SMALAN'
global.footer = '© X.8 | SMALAN'
global.sessionName = 'xbot'
global.gid = '120363043774059784@g.us'
global.mess = {
    success: '*✅┃Success*',
    admin: '*⚠️┃Only for Admins*',
    botAdmin: '*⚠️┃BOT Must Be Admin*',
    owner: '*⚠️┃Only for Owner*',
    group: '*⚠️┃Only for Group Chats*',
    private: '*⚠️┃Only for Private Chats*',
    bot: '*⚠️┃Only for BOT Users*',
    wait: '*⏳┃Loading...*',
    endLimit: 'Limit Harian Anda Telah Habis, Limit Akan Direset Setiap Jam 12',
}

global.thumb = {
    thumb: "./media/thumb.jpg",
    menu: "./media/menu.jpg"
}

global.limitawal = {
    premium: "Infinity",
    free: 100
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})