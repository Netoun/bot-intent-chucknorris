import request from 'request'
import fetch from 'node-fetch'
import he from 'he'
//const utf8 = require('utf8')

export const logic = ($message) => {
    return new Promise((resolve, reject) => {
        fetch('https://www.chucknorrisfacts.fr/api/get?data=tri:alea;type:"txt";nb:1', {})
            .then(res => res.json())
            .then((jsonData) => {
                const reponse = he.decode(jsonData[0].fact)
                const newMessage = Object.assign($message.message, { content: reponse })
                const newIntentMessage = Object.assign($message, { message: newMessage })
                resolve(newIntentMessage)
            })
    })

}