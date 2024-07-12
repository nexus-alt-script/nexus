module.exports.config = {
  name: "key",
  hasPermssion: 0,
  credits: "Unix",
  usePrefix: true,
  commandCategory: "admin"
}
module.exports.run = function({api, event, args}) {
  const fs = require('fs')
  const Vdata = JSON.parse(fs.readFileSync(__dirname + "/data/verified.json"))
  const Bdata = JSON.parse(fs.readFileSync(__dirname + "/data/banned.json"))
  const menu = args[0]
  if (!menu) return api.sendMessage('Error Usage.', event.threadID, event.messageID)
  if (menu == 'approve') {
    const id = args[1]
    if (!id) return api.sendMessage('No ID provided.', event.threadID, event.messageID);
    Vdata.verified.push(id)
    fs.writeFileSync(__dirname + "/data/verified.json", JSON.stringify(Vdata, null, 2))
    api.sendMessage("Approved Successfully!", event.threadID, event.messageID)
  } else if (menu == 'ban') {
    const id = args[1]
    if (!id) return api.sendMessage('No ID provided.', event.threadID, event.messageID);
    Bdata.banned.push(id)
    fs.writeFileSync(__dirname + "/data/banned.json", JSON.stringify(Bdata, null, 2))
    api.sendMessage(id + "has been banned successfully!", event.messageID, event.threadID)
    api.setMessageReaction("✅", event.messageID, (err) => {}, true)
  } else if (menu == 'unban') {
    const id = args[1]
    if (!id) return api.sendMessage('No ID provided.', event.threadID, event.messageID);
    if (!id in Bdata.banned) return api.sendMessage('ID is not banned on the database.', event.messageID, event.threadID)
    Bdata.banned.splice(Bdata.banned.indexOf(id), 1)
    fs.writeFileSync(__dirname + "/data/banned.json", JSON.stringify(Bdata, null, 2))
    api.sendMessage(id + " has been successfully unbanned.", event.messageID, event.threadID)
  }
  
}
