import axios from "axios";
import { chartDataa, symbolsData } from "./data";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { useState, useEffect } from "react";
import { ArrowDown, ArrowUp, Briefcase, DollarSign, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table";
import toast from "react-hot-toast";

const Stocks = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [cash, setCash] = useState(10000);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [chartData, setChartData] = useState([]);
  const [isLoadingStock, setIsLoadingStock] = useState(true);
  const [isLoadingSymbols, setIsLoadingSymbols] = useState(false);
  const [stocks, setStocks] = useState(symbolsData);
  const [selectedStock, setSelectedStock] = useState(null);

  const LOCAL = "https://project-finbuddy.onrender.com";

  useEffect(() => {
    const fetchStocks = async () => {
      setIsLoadingSymbols(true);
      try {
        const response = await axios.get(`${LOCAL}/stocks/getSymbols`);
        const data = response?.data?.data || symbolsData;
        setStocks(data);
        if (data.length > 0) handleStockSelect(data[0]);
      } catch (error) {
        console.error("Error fetching stocks:", error);
        toast.error("Failed to fetch stocks");
      } finally {
        setIsLoadingSymbols(false);
      }
    };

    fetchStocks();
  }, []);

  useEffect(() => {
    const value = portfolio.reduce((sum, item) => sum + item.shares * item.currentPrice, 0);
    setPortfolioValue(value);
  }, [portfolio]);

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockSelect = async (stock) => {
    setSelectedStock(stock);
    setIsLoadingStock(true);
    try {
      const response = await axios.get(`${LOCAL}/stocks/getStockData/${stock.symbol}`);
      const data = response?.data?.data;
      setChartData(data?.chartData || []);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      toast.error("Failed to fetch stock data");
    } finally {
      setIsLoadingStock(false);
    }
  };

  const handleBuy = () => {
    if (!selectedStock) return;
    const cost = selectedStock.price * quantity;
    if (cost > cash) return toast.error("Insufficient funds");

    const existingStock = portfolio.find((item) => item.symbol === selectedStock.symbol);
    if (existingStock) {
      const newAvgCost = (existingStock.avgCost * existingStock.shares + cost) / (existingStock.shares + quantity);
      setPortfolio(
        portfolio.map((item) =>
          item.symbol === selectedStock.symbol
            ? { ...item, shares: item.shares + quantity, avgCost: parseFloat(newAvgCost.toFixed(2)) }
            : item
        )
      );
    } else {
      setPortfolio([
        ...portfolio,
        { symbol: selectedStock.symbol, shares: quantity, avgCost: selectedStock.price, currentPrice: selectedStock.price },
      ]);
    }
    setCash(cash - cost);
    toast.success("Purchase successful");
    setQuantity(1);
  };

  const handleSell = () => {
    if (!selectedStock) return;
    const existingStock = portfolio.find((item) => item.symbol === selectedStock.symbol);
    if (!existingStock) return toast.error("No shares to sell");
    if (quantity > existingStock.shares) return toast.error("Insufficient shares");

    const saleProceeds = selectedStock.price * quantity;
    setPortfolio(
      portfolio
        .map((item) =>
          item.symbol === selectedStock.symbol ? { ...item, shares: item.shares - quantity } : item
        )
        .filter((item) => item.shares > 0)
    );
    setCash(cash + saleProceeds);
    toast.success("Sale successful");
    setQuantity(1);
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Virtual Stock Simulator</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Practice trading stocks in a risk-free environment with virtual cash.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Portfolio Summary */}
            <Card className="lg:col-span-3 animate-slide-down">
              <CardHeader>
                <CardTitle>Your Portfolio Summary</CardTitle>
                <CardDescription>Current virtual assets and performance</CardDescription>
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
                      <p className="text-xl font-bold">${portfolioValue.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="glass-card p-4 flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Assets</p>
                      <p className="text-xl font-bold">${(cash + portfolioValue).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market */}
            <Card>
              <CardHeader>
                <CardTitle>Market</CardTitle>
                <div className="relative">
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
                  {isLoadingSymbols ? (
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="animate-spin h-8 w-8 border-4 border-fin-purple border-t-transparent rounded-full"></div>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Symbol</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStocks.length > 0 ? (
                          filteredStocks.map((stock) => (
                            <TableRow
                              key={stock.symbol}
                              className={`cursor-pointer ${
                                selectedStock?.symbol === stock?.symbol ? "bg-fin-purple/10" : ""
                              } hover:bg-fin-gray-100 transition-colors`}
                              onClick={() => handleStockSelect(stock)}
                            >
                              <TableCell className="font-medium">
                                <div>
                                  <div>{stock.symbol}</div>
                                  <div className="text-xs text-gray-500">{stock.name}</div>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={1} className="text-center py-8 text-gray-500">
                              No stocks found matching "{searchTerm}"
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Stock Details */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{selectedStock?.name || "Select a stock"}</CardTitle>
                <CardDescription>
                  {selectedStock && <div className="text-lg font-bold">${selectedStock.price}</div>}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingStock ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="animate-spin h-8 w-8 border-4 border-fin-purple border-t-transparent rounded-full"></div>
                  </div>
                ) : (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                        <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                        <Tooltip
                          formatter={(value) => [`$${Number(value).toFixed(2)}`, "Price"]}
                          labelFormatter={(label) => `Date: ${label}`}
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            padding: "10px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            border: "none",
                          }}
                        />
                        <Area type="monotone" dataKey="price" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
                      </AreaChart>
                    </ResponsiveContainer>
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
