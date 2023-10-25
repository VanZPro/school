const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const mongoose = require('mongoose');

const config = require('../config/mainConfig.js');
const {
  imageUploader
} = require('../utils/functionsUtils.js');

const date = new Date();
const formattedDate = new Date(date.toLocaleString('en-US', { timeZone: config.date.time_zone }));
const currentDate = formattedDate;

async function mainFunction({
  client,
  messages,
  userSchema
}) {
  try {
    const message = messages.message;
    const messageType = messages.type;
    const messageMType = messages.mtype;
    const messageContent = JSON.stringify(message);
    const messageKey = messages.key;
    const messageChat = messages.chat;
    const messageSender = messages.sender;
    const messagePushName = messages.pushName;
    const messageReply = messages.reply;
    const body = messageMType === 'conversation' ? message.conversation : messageMType === 'extendedTextMessage' ? message.extendedTextMessage.text : messageMType === 'imageMessage' ? message.imageMessage.caption : messageMType === 'videoMessage' ? message.videoMessage.caption : '';
    const budy = typeof messages.text === 'string' ? messages.text : '';
    const command = body.startsWith(config.prefix) ? body.replace(config.prefix, '').trim().split(/ +/).shift().toLowerCase() : '';
    const cleanCommand = command.replace(config.prefix, '');
    const args = body.trim().split(/ +/).slice(1);
    const query = q = args.join(' ');
    const query1 = q1 = query.split('|')[0];
    const query2 = q2 = query.split('|')[1];
    const quoted = messages.quoted ? messages.quoted : messages;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);
    const isImage = (messageType == 'imageMessage');
    const isVideo = (messageType == 'videoMessage');
    const isAudio = (messageType == 'audioMessage');
    const isText = (messageType == 'textMessage');
    const isSticker = (messageType == 'stickerMessage');
    const isQuotedText = messageType === 'extendexTextMessage' && messageContent.includes('textMessage');
    const isQuotedImage = messageType === 'extendedTextMessage' && messageContent.includes('imageMessage');
    const isQuotedLocation = messageType === 'extendedTextMessage' && messageContent.includes('locationMessage');
    const isQuotedVideo = messageType === 'extendedTextMessage' && messageContent.includes('videoMessage');
    const isQuotedSticker = messageType === 'extendedTextMessage' && messageContent.includes('stickerMessage');
    const isQuotedAudio = messageType === 'extendedTextMessage' && messageContent.includes('audioMessage');
    const isQuotedContact = messageType === 'extendedTextMessage' && messageContent.includes('contactMessage');
    const isQuotedDocument = messageType === 'extendedTextMessage' && messageContent.includes('documentMessage');
    const jid = messageChat ? messageChat : messageKey.remoteJid;
    const senderNumber = messageSender.replace(/\D/g, '');
    const senderName = messagePushName || 'Undefined';
    const ownerNumbers = config.owner.number;
    const isOwner = ownerNumbers.includes(senderNumber);
    const profileStatus = config.bot.profile_status;
    const isPublicMode = config.public_mode;
    const isOfflineStatus = config.offline_status;
    const isAutoUpdateProfileStatus = config.auto_update_profile_status;
    const isMessage = message;
    const isAutoReadMessages = config.auto_read_messages;
    const isAutoTyping = config.auto_typing;
    const isAutoRecording = config.auto_recording;
    const isGroup = messages.isGroup;

    var reply = sendText = messageReply;
    const User = userSchema;

    if (!isPublicMode) {
      if (!messageKey.fromMe) {
        return;
      }
    };

    // Offline status
    if (isOfflineStatus) {
      client.sendPresenceUpdate('unavailable', jid)
    };

    // Auto update profile status
    if (isAutoUpdateProfileStatus) {
      client.updateProfileStatus(profileStatus)
    };

    if (isMessage) {
      if (body.startsWith(config.prefix)) {
        
        // Auto read messages
        if (isAutoReadMessages) {
          client.readMessages([messageKey]);
        };

        // Auto typing
        if (isAutoTyping) {
          client.sendPresenceUpdate('composing', jid)
        };

        // Auto recording
        if (isAutoRecording) {
          client.sendPresenceUpdate('recording', jid)
        };
        
      };

      console.log(
        chalk.bgMagenta(' [New Message] '),
        chalk.cyanBright('Time: ') + chalk.greenBright(currentDate) + '\n',
        chalk.cyanBright('Message: ') + chalk.greenBright(budy || messageMType) + '\n' +
        chalk.cyanBright('From:'), chalk.greenBright(senderName), chalk.yellow('- ' + senderNumber) + '\n' +
        chalk.cyanBright('Chat Type:'), chalk.greenBright(!isGroup ? 'Private Chat' : 'Group Chat - ' + chalk.yellow(messageChat))
      );
    };

    if (!body.startsWith(config.prefix) || body === config.prefix) {
      return;
    };

  } catch (error) {
    reply(`Error: ${error.message}`);
    console.error(error);
  };
};

module.exports = mainFunction;