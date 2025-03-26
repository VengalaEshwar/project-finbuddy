import axios from "axios";

export const getSymbols = async (req, res) => {
    try {
        // Wait for the response from the API
        // const response = await axios.get(`https://www.alphavantage.co/query?function=LISTING_STATUS&date=2010-07-10&state=active&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);
        const response = await axios.get(`https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=demo`);
        const data = response?.data?.split("\n")
        const tokens = data[0]?.split(",")
        tokens[tokens.length - 1] = tokens[tokens.length - 1]?.slice(0, -1);
        const result = [];
        for (let i = 1; i < data.length - 1; i++) {
            const list = {}
            const row = data[i].split(",");
            for (let j = 0; j < tokens.length; j++) {
                if (j === tokens.length - 1) {
                    row[tokens.length - 1] = row[tokens.length - 1]?.slice(0, -1);
                }
                list[tokens[j]] = row[j];
            }
            result.push(list)
        }
        console.log(result);
        return res.status(200).json({ success: true, data: result });
    } catch (e) {
        console.error("Error fetching stock data:", e.message);
        return res.status(500).json({ success: false, error: e.message });
    }
};
export const getStockData = async (req, res) => {
    try {
        console.log(req.params);
        // Wait for the response from the API
        // const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.params.symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`);
        const result1 = response.data["Time Series (Daily)"];
        const chartData =[];
        for(let key of Object.keys(result1)){
            let temp = new Date(result1[key]);
            console.log(key);
            const row = {date: key,price : result1[key]["4. close"]};
            chartData.push(row);
        }
        let displayData = {}
        for(let key of Object.keys(result1)){
            displayData ={
                ...result1[key]
            }
            break;
        }
        let result = { chartData, displayData };
        console.log(result);
        return res.status(200).json({ success: true, data: result });
    } catch (e) {
        console.error("Error fetching stock data:", e.message);
        return res.status(500).json({ success: false, error: e.message });
    }
};

