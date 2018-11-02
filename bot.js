//Inports
const Discord = require('discord.io');
const fs = require('fs')
const logger = require('winston');
const auth = require('./auth.json');
const read = require('remove-function');
const rp = require('request-promise');
const url = 'http://api.openweathermap.org/data/2.5/weather?q=Huntsville&APPID=f9ae5c14dafb2c66e822c24256252421';


//For Timer 
var hasPlayed = false;

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
                    message: "Commands: !babyshark, !ping, !push <push alert>, !add <taskDescription>, !tasks, !delete <keyNum>, " +
                    " !alert <message to alert>, !pushed <what branch you pushed in>, !sharkfact, !date, !rip, !weather, !oof"
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
                    }

                    for (var i = jsonData.tasks.length - 1; i >= 0; i--) {
                        jsonData.tasks[i].taskNum = i+1;
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
                    message: '@everyone ' + '@' + user + ' wanted to alert the channel: ' +  message.substring(7, message.length)
                });
            break;
            case 'pushed':
                bot.sendMessage({
                    to: channelID,
                    message: '@everyone ' + '@' + user + ' made a push in: ' +  message.substring(8, message.length)
                });
            break;
            case 'sharkfact':   
                var jsonData = '';
                fs.readFile('List.json', 'utf-8', function(err, data) {
                    if (err) throw err
                    jsonData = JSON.parse(data)
                    var random = Math.floor(Math.random() * jsonData.sharkfacts.length);               
                    bot.sendMessage({                      
                        to: channelID,
                        message: 'shark fact #' + jsonData.sharkfacts[random].fact + ': ' + jsonData.sharkfacts[random].text
                    });
                })                  
            break;
            case 'date':
                var date = new Date();
                var day = date.getDate();
                var month = date.getMonth() + 1;
                var year = date.getFullYear();
                bot.sendMessage({                      
                    to: channelID,
                    message: 'Today\'s date is: ' + month + '/' + day + '/' + year
                });              
            break;
            case 'rip':
                bot.sendMessage({                      
                    to: channelID,
                    message: 'puts a flower on ' + user + '\'s grave.:wilted_rose::skull_crossbones:'
                }); 
            break;
            case 'weather':

                //Declare Varibales
                var json;
                var temp = -999;
                var description = 'null';
                var windSpeed = -999;

                rp(url)
                  .then(function(html){
                    json = JSON.parse(html);
                    temp = json.main.temp;
                    temp = Math.floor((temp * 9/5) - 459.67);
                    description = json.weather[0].description;
                    windSpeed = json.wind.speed;

                    //console.log(json);
                        bot.sendMessage({                      
                            to: channelID,
                            message: 'weather report: ' + json.name + ',' + json.sys.country + '\rTempeture: ' + 
                            temp + '\rDescription: ' + description + '\rWind: ' + windSpeed
                        }); 
                  })
                  .catch(function(err){
                    //handle error
                    console.log('error report: ' + err);
                });            
            break;
            case 'oof':
                bot.sendMessage({                      
                    to: channelID,
                    message: 'Minecraft > Roblox.'
                }); 
            break;
            case 'Mike':
                var jsonData = '';
                fs.readFile('List.json', 'utf-8', function(err, data) {
                    if (err) throw err
                    jsonData = JSON.parse(data)
                    var random = Math.floor(Math.random() * jsonData.mike.length);               
                    bot.sendMessage({                      
                        to: channelID,
                        message: jsonData.mike[random].value
                    });
                })    
            break;
            case 'alarm':
                //alarm weather report
                function checkUpdate() {
                    //Declare Varibales
                    var json;
                    var temp = -999;
                    var temp_min = 999;
                    var temp_max = -999;
                    var description = 'null';
                    var windSpeed = -999;

                    rp(url)
                      .then(function(html){
                        json = JSON.parse(html); //parse API JSON
                        temp = Math.floor((json.main.temp * 9/5) - 459.67);
                        temp_min = Math.floor((json.main.temp_min * 9/5) - 459.67);
                        temp_max = Math.floor((json.main.temp_max * 9/5) - 459.67);
                        description = json.weather[0].description;
                        windSpeed = json.wind.speed;
                           
                        var date = new Date();   
                        console.log(date.getHours());
                        
                        if (date.getHours() == 12 && !hasPlayed) {
                            bot.sendMessage({                      
                                to: channelID,
                                message: 'Weather Report: ' + json.name + ',' + json.sys.country + '\rCurrent Tempeture: ' + 
                                temp + '°F\rMin/Max Temp for Today: ' + temp_min + '°F/' + temp_max + '°F\rDescription: ' + description + '\rWind: ' + windSpeed
                            }); 
                            hasPlayed = true;    
                            //Stop after it is played
                            clearInterval(alarm);                       
                        }                                 
                    })         
                    .catch(function(err){
                        console.log('error report: ' + err);
                    });      
                }    
                //Set on Repeat until it runs -> 900000 ~ 15 mins
                var alarm = setInterval(checkUpdate, 900000);
            break;
            case 'git':
                bot.sendMessage({                      
                    to: channelID,
                    message: "#/bin/C: \nGitGud.pl"
                });
            break;
        }
    }
});



