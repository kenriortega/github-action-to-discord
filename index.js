const fetch = require('node-fetch');
require('dotenv').config()
const { Client, MessageEmbed } = require('discord.js');

// Create an instance of a Discord client
const client = new Client();

const URL_DEV_TO = 'https://dev.to/api/articles'

const getArticlesByTag = async (tag = "", page = 10) => {
    try {
        const resp = await fetch(`${URL_DEV_TO}?tag=${tag}&per_page=${page}`)
        const data = await resp.json()
        // Extract resume data
        const artilces = data.map(({ title, url, published_timestamp, cover_image, description }) => ({
            title, url, published_timestamp, cover_image, description
        }))
        // console.log(artilces)
        return artilces

    } catch (err) {
        return new Error(`Error was catch: ${err.message}`)
    }
}
    ; (async () => {
        let articles = []
        try {
            articles = await getArticlesByTag("flutter")

        } catch (err) {
            console.log(err)
        }


        client.on('ready', () => {
            const channel = client.channels.cache.find(ch => ch.name === 'dev-to-news')
            if (!channel) return;

            articles.map(({ title, url, published_timestamp, cover_image, description }) => {
                const embed = new MessageEmbed()
                    .setTitle(title)
                    .setColor(0x469E32)
                    .setTimestamp(published_timestamp)
                    .setURL(url)
                    .setImage(cover_image)
                    .setDescription(description)
                channel.send(embed);
            })

        });
        client.login(process.env.TOKEN)

        setTimeout(() => {

            process.exit(0)
        }, 5000)
    })()