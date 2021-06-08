import { News } from "./models/news";

export default async function getNews(): Promise<News[]> {
    // const API_KEY = "a35a9e46d0f84c7994d0ccfd39265b83";
    // const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    // const response = await fetch(`${proxyUrl}https://newsapi.org/v2/everything&q=bitcoin&apiKey=${API_KEY}`);
    const response = await fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=100');
    const newsJson = await response.json();
    return newsJson.map((article: any) => ({
        ...article,
        publishedAt: new Date(article.publishedAt).toLocaleString()
    }))
    
} 