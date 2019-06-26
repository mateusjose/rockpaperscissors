const TOKEN = "NTY0NDU5MjU1NjYzNDI3NTg1.XKoLuA.-ktjVMaP4nnOp6ZLODmLTcr_Sto";

const Discord = require('discord.js');
const client = new Discord.Client();
var games = [{host: "example", join: 0, playerHost: "example", playerJoin: "example", respostaHost: "", respostaJoin: "", status: 0}];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function remove(array, element) {

  /*if(element.playerHost > element.playerJoin)
  {
    let embedHost = new Discord.RichEmbed()
    .setTitle("Game")
    .setDescription("Rock, Paper, Scissors.")
    .setColor(0x00AE86)
    .addField("Result:",
      "You Won")
    .addField(element.host.username+":",
        element.playerHost)
    .addField(element.join.username+":",
        element.playerJoin);
        element.host.send({embedHost});
    let embedJoin = new Discord.RichEmbed()
    .setTitle("Game")
    .setDescription("Rock, Paper, Scissors.")
    .setColor(0xAE0000)
    .addField("Result:",
      "You Lost")
    .addField(element.host.username+":",
        element.playerHost)
    .addField(element.join.username+":",
        element.playerJoin)


        element.join.send({embedJoin});
  }
  else if(element.playerHost < element.playerJoin)
  {
    let embedHost = new Discord.RichEmbed()
    .setTitle("Game")
    .setDescription("Rock, Paper, Scissors.")
    .setColor(0xAE0000)
    .addField("Result:",
      "You Lost")
    .addField(element.host.username+":",
        element.playerHost)
    .addField(element.join.username+":",
        element.playerJoin);
        element.host.send({embedHost});
    let embedJoin = new Discord.RichEmbed()
    .setTitle("Game")
    .setDescription("Rock, Paper, Scissors.")
    .setColor(0x00AE86)
    .addField("Result:",
      "You Won")
    .addField(element.host.username+":",
        element.playerHost)
    .addField(element.join.username+":",
        element.playerJoin)


        element.join.send({embedJoin});
  }
  else if(element.playerHost == element.playerJoin)
  {
    let embedHost = new Discord.RichEmbed()
    .setTitle("Game")
    .setDescription("Rock, Paper, Scissors.")
    .setColor(0x0086AE)
    .addField("Result:",
      "TIE")
    .addField(element.host.username+":",
        element.playerHost)
    .addField(element.join.username+":",
        element.playerJoin);
        element.host.send({embedHost});
    let embedJoin = new Discord.RichEmbed()
    .setTitle("Game")
    .setDescription("Rock, Paper, Scissors.")
    .setColor(0x0086AE)
    .addField("Result:",
      "TIE")
    .addField(element.host.username+":",
        element.playerHost)
    .addField(element.join.username+":",
        element.playerJoin)

        element.join.send({embedJoin});
  }*/




  element.host.send("End of Game!!! Type _==new game_ to start a new game");
  element.join.send("End of Game!!! Type _==new game_ to start a new game");

  const index = array.indexOf(element);

  if (index !== -1) {
    array.splice(index, 1);
  }
}

client.on('message', message => {
  if (message.author == client.user || message.channel.type != "dm") return
  //console.log(games);
  if (games.find(game => game.host.id == message.author.id))
  {
    if (message.content == "==end")
    {
      remove(games, games.find(game => game.host.id == message.author.id));
      console.log(games);
    }
    else
    if (message.content === 'r' || message.content === 'p' || message.content === 's' || message.content === 'rock' || message.content === 'paper' || message.content === 'scissors')
    {
      switch (message.content) {
        case "rock":
          message.content = 'r';
          break;
        case "paper":
          message.content = 'p';
          break;
        case "scissors":
          message.content = 's';
          break;
      }
      console.log("Host round finished")
      if(games.find(game => game.host.id == message.author.id).status === 3) salvarResposta(message, "host");
    }
  }
  else if (games.find(game => game.join.id == message.author.id))
  {
    if (message.content === 'r' || message.content === 'p' || message.content === 's' || message.content === 'rock' || message.content === 'paper' || message.content === 'scissors')
    {
      switch (message.content) {
        case "rock":
          message.content = 'r';
          break;
        case "paper":
          message.content = 'p';
          break;
        case "scissors":
          message.content = 's';
          break;
      }
      if(games.find(game => game.join.id == message.author.id).status === 4) salvarResposta(message, "join");
    }
  }
  else if (message.content.startsWith("==join gameId#"))
  {
    novaConexao(message);
  }
  else if (message.content == "==new game")
  {
    if(!games.find(game => game.host.id == message.author.id))
    {
      //  message.reply("Novo jogo iniciado, utilize os comandos abaixo para jogar: ```r = Para Selecionar Pedra\np = Para Selecionar Papel\ns = Para Selecionar Tesoura```")
      message.reply("Starting a new game, please wait...")
      .then(msg => {
        msg.delete(1000)
      });
      novoJogo(message);
      console.log(games);
    }
  }
  else {
    message.reply("Invalid Command");
  }
});

function salvarResposta(message, target)
{
  var game;
  console.log(target);
  switch (target) {
    case "host":
      game = games.find(game => game.host.id == message.author.id)
      game.respostaHost = message.content;
      message.reply("Waiting "+game.join.username+"`s turn")
      game.status = 4;
      game.join.send("Your Turn!!!");
      console.log(games);
      break;
    case "join":
      game = games.find(game => game.join.id == message.author.id)
      game.respostaJoin = message.content;
      game.status = 5;
      verificarJogadas(message);
      console.log(games);
      break;
    default:
  }
}

function verificarJogadas(message)
{
  var join = message.author.id;
  game = games.find(game => game.join.id == message.author.id)
  response = gameResponse(game.respostaHost, game.respostaJoin);
  console.log("resposta");

  switch (response) {
    case "host":
      game.playerHost++;
      game.host.send("You Won. Points: ("+game.host.username+")"+game.playerHost+"/"+game.playerJoin+"("+game.join.username+")")
      game.join.send("U Lose. Points: ("+game.join.username+")"+game.playerJoin+"/"+game.playerHost+"("+game.host.username+")")
      game.status = 3;
      game.host.send("It`s ur turn again. Go on!");
      game.join.send("Hold on, waiting "+game.host.username+"`s turn.");
      console.log("host ganhou");
      break;
    case "join":
      game.playerJoin++;
      game.host.send("U Lose. Points: ("+game.host.username+")"+game.playerHost+"/"+game.playerJoin+"("+game.join.username+")")
      game.join.send("You Won. Points: ("+game.join.username+")"+game.playerJoin+"/"+game.playerHost+"("+game.host.username+")")
      game.status = 3;
      game.host.send("It`s ur turn again. Go on!");
      game.join.send("Hold on, waiting "+game.host.username+"`s turn.");
      console.log("Join ganhou");
      break;
    case "empate":
      game.host.send("TIE!!! Points: (Vc)"+game.playerHost+"/"+game.playerJoin+"("+game.join.username+")")
      game.join.send("TIE!!! Points: (Vc)"+game.playerJoin+"/"+game.playerHost+"("+game.host.username+")")
      game.status = 3;
      game.host.send("It`s ur turn again. Go on!");
      game.join.send("Hold on, waiting "+game.host.username+"`s turn.");
      break;
  }
}

function novaConexao(message)
{
  //console.log(games);
  var gameId = message.content.replace("==join gameId#", "");
  var game = games.find(game => game.host.id == gameId);
  if(typeof game !== "undefined")
  {
    if(game.join == 0)
    {
      game.join = message.author;
      game.status = 2;
      message.reply("Connected with *"+game.host.username+"*, waiting response.");
      comoJogar(game);
    }
    else {
      message.reply("Game in progress.");
    }
  }
  else
  {
    message.reply("Non-existent game.");
  }
  console.log(games);
}

function novoJogo(message)
{
  games.push(
  {
      "host": message.author,
      "join": 0,
      "playerHost": 0,
      "playerJoin": 0,
      "respostaHost": "",
      "respostaJoin": "",
      "status": 1 //1 = Esperando Conexao \ 2 = Jogadores Conectados \ 3 = Host Joga \ 4 = Join Joga \ 5 = Calcula
  })
  message.reply("New Game created. Please, tell your friend to send a DM to the bot with this code. ```==join gameId#"+message.author.id+"```");
  aguardandoConexao(message);
  //game(message);
}

function comoJogar(game)
{
  game.host.send("To play, use the commands bellow: ```r or rock = To select Rock\np or paper = To select Paper\ns or scissors = To select Scissors```");
  game.join.send("To play, use the commands bellow: ```r or rock = To select Rock\np or paper = To select Paper\ns or scissors = To select Scissors```");
}

function aguardandoConexao(message)
{
  var waitJoin = setInterval(function() {
    if(games.find(game => game.host.id == message.author.id).status === 2 )
    {
      message.reply("Player Connected");
      message.reply("Starting the game in 3 sec")
        .then(msg => {
          msg.delete(1000)
          message.reply("Starting the game in 2 sec")
            .then(msg => {
              msg.delete(1000)
              message.reply("Starting the game in 1 sec")
                .then(msg => {
                  msg.delete(1000)
                  message.reply("Starting...")
                    .then(msg => {
                      msg.delete(1000)
                      hostPlay(message);
                    })
                })
            })
        })
      clearInterval(waitJoin);
    }
    else {
      //message.reply("Aguardando Jogador...").then(msg => {msg.delete(500)});
    }
  }, 1000)
}

function hostPlay(message) {
  message.author.send("Play First");
  game = games.find(game => game.host.id == message.author.id)
  game.status = 3;
}

function resposta(x, message)
{
  let playerGame = games.find(game => game.host.id == message.author.id)
  var embed = new Discord.RichEmbed()
  .setTitle("Game")
  .setDescription("Rock, Paper, Scissors.")
  switch (x) {
    case 0:
      embed
      .setColor(0xAE0000)
      .addField("Result:",
        "You lose!")
      .addField("You:",
          playerGame.player)
      .addField("Computer:",
          playerGame.computer)
      break;
    case 1:
      embed
      .setColor(0x00AE86)
      .addField("Result:",
        "You Won!")
      .addField("You:",
          playerGame.player)
      .addField("Computer:",
          playerGame.computer)
      break;
    case 2:
      embed
      .setColor(0x0086AE)
      .addField("Resultado:",
        "Empatou!")
      .addField("Você:",
          playerGame.player)
      .addField("Computador:",
          playerGame.computer)
      break;
    default:

  }

  message.channel.send({embed});
}

function ganhou(message)
{
  console.log("Usuario Ganhou");
  games.find(game => game.host.id == message.author.id).player++;
  console.log(games.find(game => game.host.id == message.author.id));
  resposta(1,message);
}

function perdeu(message)
{
  console.log("Usuario Perdeu");
  games.find(game => game.host.id == message.author.id).computer++;
  console.log(games.find(game => game.host.id == message.author.id));
  resposta(0,message);
}

function empate(message)
{
  console.log("Empate");
  console.log(games.find(game => game.host.id == message.author.id));
  resposta(2,message);
}

function getComputerChoice()
{
  const choices = ['r','p','s'];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function gameResponse(host, join)
{
  switch (host + join) {
    case "rs":
    case "pr":
    case "sp":
      return "host";
      break;
    case "rp":
    case "ps":
    case "sr":
      return "join";
      break;
    case "rr":
    case "pp":
    case "ss":
      return "empate";
      break;
  }
}

client.login(TOKEN);
