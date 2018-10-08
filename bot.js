var Discord = require('discord.io');
var fs = require('fs')
var logger = require('winston');
var auth = require('./auth.json');
var read = require('remove-function');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function(evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function(user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: "Commands: !babyshark, !ping, !push <push alert>, !add <taskDescription>, !tasks, !delete <keyNum>, !alert <message to alert>, !pushed <what branch you pushed in>"
                });
            break
            //baby shark meme 
            case 'baby':
                bot.sendMessage({
                    to: channelID,
                    message: "https://youtu.be/XqZsoesa55w?t=22"
                });
                break;
            case 'babyshark':
                bot.sendMessage({
                    to: channelID,
                    message: "https://youtu.be/XqZsoesa55w?t=22"
                });
                break;
                //ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
                //Push Alert
            case 'pull':
                bot.sendMessage({
                    to: channelID,
                    message: 'A new Update has been pushed!, make sure to grab the latest version'
                });
                break;
                //Add to a task list
            case 'add':
                fs.readFile('List.json', 'utf-8', function(err, data) {
                    if (err) throw err

                    var jsonData = JSON.parse(data)

                    var tasknum = jsonData.tasks.length + 1;
                    var taskdescription = message.substring(4, message.length);

                    jsonData.tasks.push({
                        taskNum: tasknum,
                        taskDescription: taskdescription
                    })

                    fs.writeFile('List.json', JSON.stringify(jsonData), 'utf-8', function(err) {
                        if (err) throw err
                    })
                })

                bot.sendMessage({
                    to: channelID,
                    message: 'new code tracking added!: ' + message.substring(4, message.length)
                });
                break;
                //Retreive Task List
            case 'tasks':
                var jsonData = '';
                fs.readFile('List.json', 'utf-8', function(err, data) {
                        if (err) throw err
                        jsonData = JSON.parse(data)
                        var output = [''];
                        for (var i = 0; i < jsonData.tasks.length; i++) {
                            output.push("Task #" + jsonData.tasks[i].taskNum + ": " +
                                jsonData.tasks[i].taskDescription + ",\r\r");
                        }

                        bot.sendMessage({
                            to: channelID,
                            message: 'The Current Tracking List: ' + "\r\r" + output.join('')
                        });
                    })
                break;
                    //Delete Task from list
            case 'delete':
                fs.readFile('List.json', 'utf-8', function(err, data) {
                    if (err) throw err

                    var jsonData = JSON.parse(data)

                    var tasknum = jsonData.tasks.length + 1;
                    var taskdescription = message.substring(4, message.length);
                        
                    for (var i = 0; i < jsonData.tasks.length; i++) {     
                        if (jsonData.tasks[i].taskNum == message.substring(8, message.length)) {
                            jsonData.tasks.splice(i,1);
                            i++;                            
                        }   

                        if (i < jsonData.tasks.length && i > 0) {      
                            while (
                                jsonData.tasks[i-1].taskNum != jsonData.tasks[i].taskNum - 1) {
                                jsonData.tasks[i].taskNum--;
                                //jsonData.tasks.splice(i+1,1);
                            }      
                        }       
                    }

                    console.log(jsonData);

                    fs.writeFile('List.json', JSON.stringify(jsonData), 'utf-8', function(err) {
                        if (err) throw err
                    })
                })

                bot.sendMessage({
                    to: channelID,
                    message: '@' + user + ' removed Task: ' +
                        message.substring(8, message.length) + ' from the task list.'
                });
                break;
			case 'alert':
				bot.sendMessage({
                    to: channelID,
                    message: '@everyone ' + '@' + user + ' wanted to alert the channel: ' +  message.substring(4, message.length)
                });
			break;
			case 'pushed':
								bot.sendMessage({
                    to: channelID,
                    message: '@everyone ' + '@' + user + ' made a push in: ' +  message.substring(4, message.length)
                });
			break;
			case 'sharkfact':	

			             var jsonData = '';
				fs.readFile('List.json', 'utf-8', function(err, data) {
                    if (err) throw err
                    jsonData = JSON.parse(data)
					var random = Math.floor(Math.random(0, jsonData.sharkfacts.length-1));

                    bot.sendMessage({
                        to: channelID,
                        message: 'shark fact #' + json.sharkfacts[random].fact + ': ' + json.sharkfacts[i].text
                    });
                })					
			break;
        }
    }
});
