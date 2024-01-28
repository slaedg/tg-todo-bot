const TelegramApi = require('node-telegram-bot-api')

const token = '6655723597:AAFemzF-COKxr-LLr_f2WnovFRfWiDB4C3U'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Играть еще раз', callback_data: '/again'}]
        ]
    })
}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}]
        ]
    })
}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать')
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber;
            await bot.sendMessage(chatId, 'Отгадай', gameOptions)
}


const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о себе'},
        {command: '/game', description: 'Сыграть в игру'}
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const name = msg.chat.first_name;
        
        if (text === "/start") {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/c40/35b/c4035b51-5e76-4189-a05f-f6e1afebd576/1.webp')
            return bot.sendMessage(chatId, `Добро пожаловать в свой же ToDo лист, ${name}`)
        }
    
        if (text === "/info") {
            return bot.sendMessage(chatId, `Тебя зовут ${name}`)
        }
        if (text === '/game') {
            return startGame(chatId)
        }

        return bot.sendMessage(chatId, 'Я тебя не понимаю')
    })

    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        console.log(data, chats[chatId])

        if(data === '/again') {
            return startGame(chatId)
        }

        if (data == chats[chatId]) {
            return await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions)
        }
        else {
            return await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions)
        }
    })
}

start ();
//bot.sendMessage(chatId, `Ты написал мне ${text}`)