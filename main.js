const { Client, Intents, MessageEmbed  } = require('discord.js');
var axios = require('axios');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

const prefix = '!';


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    setInterval(function(){ 
        axios.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=ETHERSCAN API HERE`).then(response => {
                    client.user.setActivity(`GWEI: ${response.data.result.ProposeGasPrice}`, { type: 'WATCHING' });
                }).catch(function (error) {
                    console.log(error)
                })
    }, 5000);
});

client.on('message', async (message) => {
try{
      headers = {
    "Accept": "application/json",
    "X-API-KEY": "MODULENFT.XYZ API KEY HERE"
}
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();
    const [responseOne] = await Promise.all([
    axios.get(`https://api.modulenft.xyz/api/v1/opensea/collection/info?type=${args[1]}`),
  ]);
    if(message.author.bot) return;
    if(cmd == "find") { 
      const SecondResponse = await axios.get(`https://api.modulenft.xyz/api/v1/opensea/token/info?tokenId=${args[2]}&collection=` + responseOne.data.info.contractAddress)
      const ThirdResponse = await axios.get(`https://api.opensea.io/api/v1/collection/` + args[1] + `/stats`)
      const FourthResponse = await axios.get(`https://api.modulenft.xyz/api/v1/opensea/orders/salesV2?type=` + args[1] + `&count=1&currencySymbol=ETH&offset=0`)
            const infoEmbed2 = new MessageEmbed()
                .setColor('#ffffff')
                .setURL(`https://opensea.io/assets/ethereum/${SecondResponse.data.info.collectionInfo.address}/${args[2]}`)
                .setTitle(`Search for ${responseOne.data.collection} #${SecondResponse.data.info.tokenInfo.tokenId}`)
                .setDescription(responseOne.data.info.description)
                .setImage(SecondResponse.data.info.tokenInfo.image)
                .setFooter("Lumiere Tools | Powered by Module",'https://media.discordapp.net/attachments/943189337766506557/964903847392870430/Lumiere_AI_logo.png?width=1365&height=1365')
              .addFields(
                  { name: 'Floor Price:', value: `${Math.round(ThirdResponse.data.stats.floor_price * 1000) / 1000}Ξ`, inline: true },
                  { name: 'Volume:', value: `${Math.round(ThirdResponse.data.stats.total_volume * 1) / 1}Ξ`, inline: true },
                  { name: 'Latest Sale:', value: `${FourthResponse.data.sales[0].price}Ξ`, inline: true },
                )
                .setTimestamp()
            message.channel.send({embeds: [infoEmbed2]})}
 } catch (err) {
  console.log("An error occurred: " + err)
}
});

client.login("TOKEN HERE");