//Inports
const Discord = require('discord.io');
const fs = require('fs')
const logger = require('winston');
const auth = require('./auth.json');
const read = require('remove-function');
const rp = require('request-promise');

//Dank Memes Webscraper ----------------------------------------
var request = require('request');                                 
//Webscrape Framework
var cheerio = require('cheerio');
//URL
const DankMemesURL = 'https://www.reddit.com/r/dankmemes/';
const ReditURL = 'https://www.reddit.com/r/';
//--------------------------------------------------------------

//Weather URL
const fronturl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const backUrl = '&APPID=' + auth.APPID;

//For Timer 
var hasPlayed = false;

//Smart Mode
var smartMode = false;

//Meme Folder
var memeDirectory = './Memes/'

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

    if (user == bot.username)
        return;

    //Smart Mode Enabled
    if (smartMode)
    {
        //Create a new message with all lowercase so we can compare accuratly
        var newMessage = message.toLowerCase();

        //Test
        if(newMessage.includes('test')) {
            bot.sendMessage({
                to: channelID,
                message: bot.username 
            });
        }     

        //If the message includes the bot's local username
        if(newMessage.includes('@SandShark')) {
            bot.sendMessage({
                to: channelID,
                message: '@' + user + ' I\'m always listening:spy:'
            });
        }
        //If the message includes meme
        if(newMessage.includes('meme')) {
            bot.sendMessage({
                to: channelID,
                message: 'I love me some DANK MEMES:100:'
            });
        }
        //If the message includes what
        if(newMessage.includes('what')) {
            bot.sendMessage({
                to: channelID,
                message: 'Jeeze learn to read ya scrub:ear:'
            });
        }
        //If the message includes lol
        if(newMessage.includes('lol')) {
            bot.sendMessage({
                to: channelID,
                message: '@' + user + ':joy:'
            });
        }
        //If there is a 'bad' word in chat
        if(newMessage.includes('fuck') || newMessage.includes('shit') || newMessage.includes('bitch') || newMessage.includes('heck') || newMessage.includes('poop') ||
        newMessage.includes('damn') || newMessage.includes('nibba') || newMessage.includes('frick')) {
            bot.sendMessage({
                to: channelID,
                message: '@' + user + ' WaTcH yO PrOfAnItY!'
            });
        }
        //If the message contains 'mood'
        if(newMessage.includes('mood')) {
            bot.sendMessage({
                to: channelID,
                message: ':slight_smile::upside_down::slight_smile::upside_down::slight_smile::upside_down:'
            });
        }      
        //If someone says 'ranner'
        if(newMessage.includes('ranner')) {
            bot.sendMessage({
                to: channelID,
                message: 'Thats my father @Ranner#0198 ^'
            });
        }      
        //If someone mentions the FBI B)
        if(newMessage.includes('fbi')) {
            bot.sendMessage({
                to: channelID,
                message: 'We send all chat logs to the FBI....'
            });
        }   
        //Woofer time!
        if(newMessage.includes('dog')) {
            bot.sendMessage({
                to: channelID,
                message: 'Did somebody say Dog? <3'
            });
        }   
        //If someone mentions the great and mighty UAH CHARGERS
        if(newMessage.includes('uah')) {
            bot.sendMessage({
                to: channelID,
                message: 'Chargers. Chargers. CHARRRRRRGERRRRSS!'
            });
        }  
        //Ranner bot is highkey not smart
        if(newMessage.includes('smart')) {
            bot.sendMessage({
                to: channelID,
                message: 'I\'m Smart! :nerd:'
            });
        }     
        //Best Game Team NA
        if(newMessage.includes('sands')) {
            bot.sendMessage({
                to: channelID,
                message: 'Thats the best team TBH they have a Computer Engineer & Jess is like president of the Game Design Club.'
            });
        }   
        //Bongo cat time!
        if(newMessage.includes('bongo')) {
            bot.sendMessage({
                to: channelID,
                message: 'BONGO CAT!!!'
            });
        }   
        //RTR
        if(newMessage.includes('alabama')) {
            bot.sendMessage({
                to: channelID,
                message: 'Roll Tide Roll!'
            });
        }   
        //Time for a marg
        if(newMessage.includes('drink')) {
            bot.sendMessage({
                to: channelID,
                message: 'Marg Time!'
            });
        }   
        //School is lame.....
        if(newMessage.includes('school')) {
            bot.sendMessage({
                to: channelID,
                message: 'Isn\'t @Ranner#0198 like a 5th year or something?'
            });
        }
        //Javascript >>>
        if(newMessage.includes('syntax')) {
            bot.sendMessage({
                to: channelID,
                message: 'Imagine having to type a Data Type, brough to you by JAVASCRIPT'
            });
        }          
        //Git Gud ya Scrub
        if(newMessage.includes('git')) {
            bot.sendMessage({
                to: channelID,
                message: '@Ranner#0198 had to write a GitPush and GitPull batch script for his team one time.....'
            });
        }  
        //Sell out sunday
        if(newMessage.includes('twitch')) {
            bot.sendMessage({
                to: channelID,
                message: 'Yo heres a dank link for Ranner\'s Stream: https://www.twitch.tv/ranner198/'
            });
        }  
        //Just being petty pretty much
        if(newMessage.includes('poly')) {
            bot.sendMessage({
                to: channelID,
                message: '\"STILL LESS POLYS THAN THE SHARK.\"'
            });
        }   
        //Dont escalade
        if(newMessage.includes('vinny')) {
            bot.sendMessage({
                to: channelID,
                message: '\"Elena, don\'t escalade.\"'
            });
        }  
        //Sell out sunday
        if(newMessage.includes('twitch')) {
            bot.sendMessage({
                to: channelID,
                message: 'Yo heres a dank link for Ranner\'s Stream: https://www.twitch.tv/ranner198/'
            });
        }  
        //Worst team N/A
        if(newMessage.includes('into') || newMessage.includes('darkness')) {
            bot.sendMessage({
                to: channelID,
                message: '\"Isn\'t that one girl like head of the Game Design Club?\"'
            });
        }  
        //scrub
        if(newMessage.includes('scrub')) {
            bot.sendMessage({
                to: channelID,
                message: 'Scrub a dub dub, scrub in the tub ;)'
            });
        }  
        //programming
        if(newMessage.includes('programming')) {
            bot.sendMessage({
                to: channelID,
                message: '@Ranner#0198 likes to program for fun what a NERD.'
            });
        }     
        //Cool
        if(newMessage.includes('cool')) {
            bot.sendMessage({
                to: channelID,
                message: 'Did somebody say cool? :sunglasses:'
            });
        }    
        //Big Oof
        if(newMessage.includes('big oof')) {
            bot.sendMessage({
                to: channelID,
                message: 'THATS A BIG OOF THERE MISTER....'
            });
            return;
        }     
        //Oof
        if(newMessage.includes('oof')) {
            bot.sendMessage({
                to: channelID,
                message: 'I oof, therefore I am oof\'d'
            });
        }        
    }


    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            case 'smartmode_on':
            case 'smartmode_On':
            case 'smartMode_On':
                smartMode = true;
                bot.sendMessage({
                    to: channelID,
                    message: 'Smart Mode is turned <On>'
                });
            break;
            case 'smartmode_off':
            case 'smartmode_Off':
            case 'smartMode_Off':
                smartMode = false;
                bot.sendMessage({
                    to: channelID,
                    message: 'Smart Mode is turned <Off>'
                });
            break;
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: "Commands: !babyshark, !ping, !push <push alert>, !add <taskDescription>, !tasks, !delete <keyNum>, " +
                    " !alert <message to alert>, !pushed <what branch you pushed in>, !sharkfact, !date, !rip, !weather, !weather <City Name>, !oof, !oof @<name>," +
                    " !complete <num>, !completed, !smartMode, !smartMode <On/Off>, !meme"
                });
            break
            //baby shark meme 
            /*
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
            */
            case 'ping':
                var startTime = new Date().getTime();
                bot.sendMessage({                    
                    to: channelID,
                    message: new Date().getTime()-startTime + " ms"
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
                    var taskdescription = message.substring(5, message.length);
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
                    message: 'new tracking added!: ' + message.substring(4, message.length)
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
            case 'complete':
                if (message.substring(9) != ' ') {
                    var num = -99;
                    if (message.length == 9)
                        num = message.substring(9);
                    else
                        num = message.substring(9, message.length);

                    fs.readFile('List.json', 'utf-8', function(err, data) {
                        if (err) throw err
                        var jsonData = JSON.parse(data)
                        var tasknum = jsonData.completed.length + 1;
                        var taskdescription = jsonData.tasks[num-1].taskDescription;
                        jsonData.completed.push({
                            taskNum: tasknum,
                            taskDescription: taskdescription
                        })
                        bot.sendMessage({
                            to: channelID,
                            message: "@" + user + " Just moved: " + jsonData.tasks[num-1].taskDescription
                        });
                        for (var i = 0; i < jsonData.tasks.length; i++) {     
                            if (jsonData.tasks[i].taskNum == num) {
                                console.log("Found!");
                                jsonData.tasks.splice(i,1);
                                i++;                            
                            }        
                        }
                        for (var i = jsonData.tasks.length - 1; i >= 0; i--) {
                            jsonData.tasks[i].taskNum = i+1;
                        }
                        fs.writeFile('List.json', JSON.stringify(jsonData), 'utf-8', function(err) {
                            if (err) throw err
                        })
                    })    
                }        
                break;
            case 'completed':
            var jsonData = '';
                fs.readFile('List.json', 'utf-8', function(err, data) {
                    if (err) throw err
                    jsonData = JSON.parse(data)
                    var output = [''];
                    for (var i = 0; i < jsonData.completed.length; i++) {
                        output.push("Task #" + jsonData.completed[i].taskNum + ": " +
                            jsonData.completed[i].taskDescription + ",\r\r");
                    }

                    bot.sendMessage({
                        to: channelID,
                        message: 'The completed tasks List: ' + "\r\r" + output.join('')
                    });
                })
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
            case 'shark':
            case 'fact':
            case 'sharkfact':   
                var jsonData = '';
                fs.readFile('List.json', 'utf-8', function(err, data) {
                    if (err) throw err
                    jsonData = JSON.parse(data)
                    var random = Math.floor(Math.random() * jsonData.sharkfacts.length);               
                    bot.sendMessage({                      
                        to: channelID,
                        message: 'shark fact #' + random + ': ' + jsonData.sharkfacts[random].text
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
                var length = message.length;
                if (length < 5) {
                    bot.sendMessage({                      
                        to: channelID,
                        message: 'puts a flower on @' + user + '\'s grave.:wilted_rose::skull_crossbones:'
                    }); 
                } else {
                    var outputMessage = message.substring(5, length);
                    bot.sendMessage({                      
                        to: channelID,
                        message: 'puts a flower on ' + outputMessage + '\'s grave.:wilted_rose::skull_crossbones:'
                    }); 
                }
            break;            
            case 'weather':
                //Declare Varibales
                var url = '';
                if (message.length <= 8) {
                    url = fronturl + 'Huntsville' + backUrl;
                } else {
                    var holder = '';
                    for (i = 9; i < message.length; i++) {
                        holder += message[i];
                    }
                    url = fronturl + holder + backUrl;                    
                }            
                
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
            case 'mike':
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
                //Set on Repeat ever 8 seconds
                var alarm = setInterval(checkUpdate, 8000);
            break;
            case 'git':
                bot.sendMessage({                      
                    to: channelID,
                    message: "#/bin/C: \nGitGud.pl"
                });
            break;
            case 'wakemeup':
                bot.sendMessage({                      
                    to: channelID,
                    message: 'Wake me up inside!'
                });
            break;
            case 'meme':
                //Request URL webscrape
                webscrape();
                function webscrape() {

                    var URL = '';
                    
                    if (message.length > 6)
                    {
                        if (message.includes('http')) {
                            URL = message.substring(6, message.length) + '/';
                        } else {
                            //The URL will be a redit post
                            URL = ReditURL + message.substring(6, message.length) + '/';
                        }
                        request(URL, function(err, resp, html) {
                            //If there is no error
                            if (!err){
    
                                //The URL Data
                                const $ = cheerio.load(html);
                                
                                //Save embeded urls
                                var returnInfo = [];
    
                                //Treverse the webpage and select the media elements
                                $('.media-element').each(function(i, element){
                                    var temp = $(this).attr('src');
                                    returnInfo.push(temp);
                                }); 

                                //Generate a random number
                                var randomNum = Math.floor(Math.random() * returnInfo.length);

                                //Index 2 is a advertisment constistenly
                                while (randomNum == 2)
                                    randomNum = Math.floor(Math.random() * returnInfo.length);

                                //If the scrape returned something
                                if (returnInfo.length > 0)   
                                {             
                                    //Send to channel
                                    bot.sendMessage({                      
                                        to: channelID,                                  
                                        embed:
                                        {
                                            thumbnail:
                                            {
                                                url: returnInfo[randomNum]
                                            }
                                        }
                                    });
                                } else 
                                    console.log(err);                        
                                }
                        });
                    } else
                    {
                        request(DankMemesURL, function(err, resp, html) {
                        //If there is no error
                        if (!err){

                            //The URL Data
                            const $ = cheerio.load(html);
                            
                            //Save embeded urls
                            var returnInfo = [];

                            //Treverse the webpage and select the media elements
                            $('.media-element').each(function(i, element){
                                var temp = $(this).attr('src');
                                returnInfo.push(temp);
                            }); 

                            //Generate a random number
                            var randomNum = Math.floor(Math.random() * returnInfo.length);
                            
                            //Index 2 is a advertisment constistenly
                            while (randomNum == 2)
                                    randomNum = Math.floor(Math.random() * returnInfo.length);
                            
                            //If the scrape returned something
                            if (returnInfo.length > 0)   
                            {             
                                //Send to channel
                                bot.sendMessage({                      
                                    to: channelID,                                  
                                    embed:
                                    {
                                        thumbnail:
                                        {
                                            url: returnInfo[randomNum]
                                        }
                                    }
                                });
                            } else //if there was an error debug it and log
                                console.log(err);                        
                            }
                        });
                    }
                }
            break;
            
            case 'images':
                bot.sendMessage({
                    to: channelID,
                    message: '!bongocat, !leftsharkgif, !carl, !octocat, !babyshark, !polyhell'
                });
            break;

            //Upload Files
            case 'bongocat':
                bot.uploadFile({
                    to: channelID,
                    file: memeDirectory + 'BongoCat.gif'
                });            
            break;
            case 'leftshark':
            bot.uploadFile({
                to: channelID,
                file: memeDirectory + 'LeftShark.gif'
            });            
            break;
            case 'carl':
            bot.uploadFile({
                to: channelID,
                file: memeDirectory + 'Carl.png'
            });            
            break;
            case 'octocat':
            bot.uploadFile({
                to: channelID,
                file: memeDirectory + 'Octocat.png'
            });            
            break;
            case 'babyshark':
            bot.uploadFile({
                to: channelID,
                file: memeDirectory + 'BabyShark.gif'
            });            
            break;
            case 'polyhell':
            bot.uploadFile({
                to: channelID,
                file: memeDirectory + 'StillLessPolys.jpg'
            });            
            break;
        }
    }
});

//These don't work for some reason????
function GenerateRandom(max) {
    var randomNum = Math.floor(Math.random() * max);
    console.log(randomNum);
    return randomNum;
}
function GenerateRandom(min, max) {
    var randomNum = Math.floor(Math.random(min) * max);
    return randomNum;
}


