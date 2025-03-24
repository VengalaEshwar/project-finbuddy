//imports
import axios from "axios";
import { chartDataa, symbolsData } from "./data";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { useState, useEffect } from "react";
import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  DollarSign,
  LineChart,
  RefreshCw,
  Search,
TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"; //TooltipProps
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/Table";
const Stocks = () => {

  //required states

  //portfolio
  const [portfolio, setPortfolio] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [cash, setCash] = useState(10000);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [chartData, setChartData] = useState(chartDataa);
  const [isLoading, setIsLoading] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(stocks[0]);

  // Calculate portfolio value whenever portfolio changes
  useEffect(() => {
    const value = portfolio.reduce(
      (sum, item) => sum + item.shares * item.currentPrice,
      0
    );
    setPortfolioValue(value);
  }, [portfolio]);


  const LOCAL = "http://localhost:5000/";
  //this useEffect fetches the stock symbols
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        // const response = await axios.get(LOCAL + "stocks/getSymbols");
        // const data = response?.data?.data;
        
        const data = symbolsData;
        
        // console.log(data);
        setStocks([...data]);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };
    fetchStocks();
  }, []);

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockSelect = async (stock) => {
    // setSelectedStock(stock);
    setIsLoading(true);
    // const receivedData = await axios.get(LOCAL + "stocks/getStockData/" + stock.symbol);
    // const data = receivedData?.data?.data;
    // setChartData(data);
    // console.log(data);
    setChartData(chartDataa);
    setIsLoading(false);
  };

  const handleBuy = () => {
    const cost = selectedStock.price * quantity;

    if (cost > cash) {
      windows.alert("You don't have enough cash to complete this purchase.");
      // toast({
      //   title: "Insufficient funds",
      //   description: "You don't have enough cash to complete this purchase.",
      //   variant: "destructive"
      // });
      return;
    }

    // Check if stock already in portfolio
    const existingStock = portfolio.find(
      (item) => item.symbol === selectedStock.symbol
    );

    if (existingStock) {
      // Update existing position
      const newAvgCost =
        (existingStock.avgCost * existingStock.shares + cost) /
        (existingStock.shares + quantity);

      setPortfolio(
        portfolio.map((item) =>
          item.symbol === selectedStock.symbol
            ? {
                ...item,
                shares: item.shares + quantity,
                avgCost: parseFloat(newAvgCost.toFixed(2)),
              }
            : item
        )
      );
    } else {
      // Add new position
      setPortfolio([
        ...portfolio,
        {
          symbol: selectedStock.symbol,
          shares: quantity,
          avgCost: selectedStock.price,
          currentPrice: selectedStock.price,
        },
      ]);
    }

    // Deduct cash
    setCash(cash - cost);
    window.alert("Purchase successful");
    // toast({
    //   title: "Purchase successful",
    //   description: `You bought ${quantity} shares of ${selectedStock.symbol} for $${cost.toFixed(2)}.`
    // });

    setQuantity(1);
  };

  const handleSell = () => {
    const existingStock = portfolio.find(
      (item) => item.symbol === selectedStock.symbol
    );

    if (!existingStock) {
      window.alert(`You don't own any shares of ${selectedStock.symbol}.`);
      // toast({
      //   title: "No shares to sell",
      //   description: `You don't own any shares of ${selectedStock.symbol}.`,
      //   variant: "destructive"
      // });
      return;
    }

    if (quantity > existingStock.shares) {
      window.alert(`You only have ${existingStock.shares} shares to sell.`);
      // toast({
      //   title: "Insufficient shares",
      //   description: `You only have ${existingStock.shares} shares to sell.`,
      //   variant: "destructive"
      // });
      return;
    }

    const saleProceeds = selectedStock.price * quantity;

    // Update portfolio
    const updatedPortfolio = portfolio
      .map((item) =>
        item.symbol === selectedStock.symbol
          ? {
              ...item,
              shares: item.shares - quantity,
            }
          : item
      )
      .filter((item) => item.shares > 0);

    setPortfolio(updatedPortfolio);

    // Add cash
    setCash(cash + saleProceeds);
    window.alert("Sale successful");
    // toast({
    //   title: "Sale successful",
    //   description: `You sold ${quantity} shares of ${selectedStock.symbol} for $${saleProceeds.toFixed(2)}.`
    // });

    setQuantity(1);
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* This is page header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Virtual Stock Simulator
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Practice trading stocks in a risk-free environment with virtual
              cash. Learn how the market works before investing real money.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Portfolio summary */}
            <Card className="lg:col-span-3 animate-slide-down">
              <CardHeader>
                <CardTitle>Your Portfolio Summary</CardTitle>
                <CardDescription>
                  Current virtual assets and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-card p-4 flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Available Cash</p>
                      <p className="text-xl font-bold">${cash.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="glass-card p-4 flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Portfolio Value</p>
                      <p className="text-xl font-bold">
                        ${portfolioValue.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="glass-card p-4 flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Assets</p>
                      <p className="text-xl font-bold">
                        ${(cash + portfolioValue).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stock list */}
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Market</span>
                  {/* <Button variant="outline" size="icon" className="h-8 w-8">
                    <RefreshCw className="h-4 w-4" />
                  </Button> */}
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder="Search stocks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] overflow-y-auto pr-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Symbol</TableHead>
                        {/* <TableHead>Price</TableHead>
                        <TableHead>Change</TableHead> */}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStocks.map((stock) => (
                        <TableRow
                          key={stock.symbol}
                          className={`cursor-pointer ${
                            selectedStock?.symbol === stock?.symbol
                              ? "bg-fin-purple/10"
                              : ""
                          } hover:bg-fin-gray-100 transition-colors`}
                          onClick={() => handleStockSelect(stock)}
                        >
                          <TableCell className="font-medium">
                            <div>
                              <div>{stock?.symbol}</div>
                              <div className="text-xs text-gray-500">
                                {stock?.name}
                              </div>
                            </div>
                          </TableCell>
                          {/* <TableCell>
                            ${"N/A" stock?.price.toFixed(2)}
                          </TableCell> */}
                          {/* <TableCell
                            className={
                              stock?.change >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            <div className="flex items-center">
                              {stock.change >= 0 ? (
                                <ArrowUp className="h-3 w-3 mr-1" />
                              ) : (
                                <ArrowDown className="h-3 w-3 mr-1" />
                              )}
                              {"N/A" Math.abs(stock?.change).toFixed(2)}%
                            </div>
                          </TableCell> */}
                        </TableRow>
                      ))}

                      {filteredStocks.length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            className="text-center py-8 text-gray-500"
                          >
                            No stocks found matching "{searchTerm}"
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Stock details */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {selectedStock ? selectedStock.name : "Select a stock"}
                </CardTitle>
                <CardDescription>
                  {selectedStock ? (
                    <div className="flex items-center mt-1">
                      <span className="text-lg font-bold mr-2">
                        ${selectedStock.price.toFixed(2)}
                      </span>
                      <span
                        className={`flex items-center ${
                          selectedStock.change >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedStock.change >= 0 ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(selectedStock.change).toFixed(2)}%
                      </span>
                    </div>
                  ) : (
                    "Stock details will appear here"
                  )}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {isLoading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="animate-spin h-8 w-8 border-4 border-fin-purple border-t-transparent rounded-full"></div>
                  </div>
                ) : (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={chartDataa} //need to change it later
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorPrice"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#8B5CF6"
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="95%"
                              stopColor="#8B5CF6"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#f0f0f0"
                        />
                        <XAxis
                          dataKey="date"
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            const month = String(date.getMonth() + 1).padStart(
                              2,
                              "0"
                            ); // Converts to 2-digit month
                            const day = String(date.getDate()).padStart(2, "0"); // Converts to 2-digit day
                            return `${month}-${day}`;
                          }}
                        />

                        <YAxis
                          domain={["auto", "auto"]}
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                          formatter={(value) => [
                            `$${Number(value).toFixed(2)}`,
                            "Price",
                          ]}
                          labelFormatter={(label) => `Date: ${label}`}
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            padding: "10px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            border: "none",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="#8B5CF6"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorPrice)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {(true || selectedStock )&& (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Trade
                      </h3>
                      <div className="flex items-center space-x-2 mb-4">
                        <Input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(parseInt(e.target.value) || 1)
                          }
                          className="w-20"
                        />
                        <span className="text-sm">
                          Shares × ${selectedStock?.price.toFixed(2)} = $
                          {(selectedStock?.price * quantity).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleBuy}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          Buy
                        </Button>
                        <Button
                          onClick={handleSell}
                          className="flex-1 bg-red-600 hover:bg-red-700"
                          variant="destructive"
                        >
                          Sell
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Your Position
                      </h3>
                      {portfolio.find(
                        (item) => item.symbol === selectedStock.symbol
                      ) ? (
                        <div>
                          {portfolio
                            .filter(
                              (item) => item.symbol === selectedStock.symbol
                            )
                            .map((item) => {
                              const marketValue =
                                item.shares * item.currentPrice;
                              const profit =
                                marketValue - item.shares * item.avgCost;
                              const profitPercent =
                                (profit / (item.shares * item.avgCost)) * 100;

                              return (
                                <div
                                  key={item.symbol}
                                  className="glass-card p-3"
                                >
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">
                                      Shares:
                                    </span>
                                    <span>{item.shares}</span>
                                  </div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">
                                      Avg Cost:
                                    </span>
                                    <span>${item.avgCost.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">
                                      Market Value:
                                    </span>
                                    <span>${marketValue.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm font-medium">
                                      Profit/Loss:
                                    </span>
                                    <span
                                      className={
                                        profit >= 0
                                          ? "text-green-600"
                                          : "text-red-600"
                                      }
                                    >
                                      ${profit.toFixed(2)} (
                                      {profitPercent.toFixed(2)}%)
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 py-3">
                          You don't own any shares of {selectedStock?.symbol}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Portfolio holdings */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Your Holdings</CardTitle>
                <CardDescription>Current portfolio positions</CardDescription>
              </CardHeader>
              <CardContent>
                {portfolio.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Shares</TableHead>
                        <TableHead>Avg Cost</TableHead>
                        <TableHead>Current Price</TableHead>
                        <TableHead>Market Value</TableHead>
                        <TableHead>Profit/Loss</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {portfolio.map((item, index) => {
                        const marketValue = item.shares * item.currentPrice;
                        const profit = marketValue - item.shares * item.avgCost;
                        const profitPercent =
                          (profit / (item.shares * item.avgCost)) * 100;

                        return (
                          <TableRow key={item.symbol || index}>
                            <TableCell className="font-medium">
                              {item.symbol}
                            </TableCell>
                            <TableCell>{item.shares}</TableCell>
                            <TableCell>${item.avgCost.toFixed(2)}</TableCell>
                            <TableCell>
                              ${item.currentPrice.toFixed(2)}
                            </TableCell>
                            <TableCell>${marketValue.toFixed(2)}</TableCell>
                            <TableCell
                              className={
                                profit >= 0 ? "text-green-600" : "text-red-600"
                              }
                            >
                              ${profit.toFixed(2)} ({profitPercent.toFixed(2)}%)
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      Your portfolio is empty
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Start building your portfolio by buying some stocks!
                    </p>
                    <Button asChild variant="outline">
                      <a href="#market">Browse Market</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stocks;
