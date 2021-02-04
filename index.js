const fetch = require('node-fetch');

const tags = ['node', 'react', 'flutter', 'css']
const URL_DEV_TO = 'https://dev.to/api/articles'

const getArticlesByTag = async (tag = "", page = 10) => {
    try {
        const resp = await fetch(`${URL_DEV_TO}?tag=${tag}&per_page=${page}`)
        const data = await resp.json()
        // Extract resume data
        const artilces = data.map(({ title, url, published_timestamp }) => ({
            title, url, published_timestamp
        }))
        return artilces

    } catch (err) {
        return new Error(`Error was catch: ${err.message}`)
    }
}
    ; (async () => {
        try {
            const articles = await getArticlesByTag("flutter")

            console.log(articles)
        } catch (err) {
            console.log(err)
        }
    })()