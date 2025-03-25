import dotenv from 'dotenv';

dotenv.config();
import {trendingNews,categories} from './dataformat.js';
const latestNews = async (req, res) => {
    try {
        const { topic = 'finance', lang = 'en', country = 'in' } = req.body;
        if(!categories.includes(topic)){
            return res.status(500).json({ success: false, error: "No Such Category Exist" });
        }

        // const url = `https://news-api14.p.rapidapi.com/v2/trendings?topic=${topic}&language=${lang}&country=${country}&page=1`;
        // const response = await fetch(url, {
        //     method: 'GET',
        //     headers: {
        //         'x-rapidapi-key': process.env.RAPID_API_KEY,
        //         'x-rapidapi-host': 'news-api14.p.rapidapi.com'
        //     }
        // });

        // if (!response.ok) {
        //     return res.status(response.status).json({ 
        //         success: false, 
        //         error: `API error: ${response.statusText}` 
        //     });
        // }

        // let result = await response.json(); 
        // result = result["data"];

        const result = trendingNews;
        
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
};

export default latestNews;
