import { connexion } from './rabbitConnexion'
import { assertQueue, sendTo } from './rabbitUtils'
const request = require('request')

const connexionEstablished = connexion()

assertQueue(connexionEstablished, ($message) => {
             
        var options = {
                method: 'GET',
                url: 'https://www.chucknorrisfacts.fr/api/get?data=tri:alea;type:"txt";nb:1'
            }
            
        request(options, function (error, response, body) {
                if (error) throw new Error(error);
                let jsonData = JSON.parse(body);                 
                let reponse = jsonData[0].fact
                console.log($message)
                
                const newMessage = Object.assign($message.message, { content: reponse }) 
                const newIntentMessage = Object.assign($message, { message: newMessage })
                sendTo(connexionEstablished, JSON.stringify(newIntentMessage))            
                        
        });
})


