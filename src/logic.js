import request from 'request'
import utf8 from 'utf8'

export const logic = ($message) => {
    return new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            url: 'https://www.chucknorrisfacts.fr/api/get?data=tri:alea;type:"txt";nb:1'
        }

        request(options, function (error, response, body) {
            if (error) throw new Error(error)
            let jsonData = JSON.parse(body)
            let reponse = jsonData[0].fact
            let reponseUtf8 = utf8.encode(reponse)
            const newMessage = Object.assign($message.message, { content: reponseUtf8 })
            const newIntentMessage = Object.assign($message, { message: newMessage })
            resolve(newIntentMessage)

        })
    })

}