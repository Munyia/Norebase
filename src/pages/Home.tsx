import { useEffect, useState } from 'react';

interface Coin {
    id: string;
    name: string;
    symbol: string;
    price_usd: string;
    tsupply: string; 
}

const Home = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await fetch('https://api.coinlore.net/api/tickers/');
      const data = await response.json();
      setCoins(data.data);
    };
    fetchCoins();
  }, []);

  const paginatedCoins = coins.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < coins.length) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="overflow-auto">
      <table className="min-w-full border-collapse border border-gray-200 hidden sm:table">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-4">💰 Coin</th>
            <th className="p-4">📜 Code</th>
            <th className="p-4">😛 Price</th>
            <th className="p-4">📊 Supply</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCoins.map((coin, index) => (
            <tr key={coin.id} className={`text-sm ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="p-4">{coin.name}</td>
              <td className="p-4">{coin.symbol}</td>
              <td className="p-4">${coin.price_usd}</td>
              <td className="p-4">{coin.tsupply}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Responsive Card Layout for Smaller Devices */}
      <div className="sm:hidden">
        {paginatedCoins.map((coin, index) => (
          <div
            key={coin.id}
            className={`p-4 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} mb-4 rounded-md shadow-md`}
          >
            <div className="font-bold">💰 Coin: {coin.name}</div>
            <div className="font-bold">📜 Code: {coin.symbol}</div>
            <div>😛 Price: ${coin.price_usd}</div>
            <div>📊 Supply: {coin.tsupply}</div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mx-5 items-center my-4">
        {currentPage > 1 ? (
          <button
            onClick={handlePrevPage}
            className="p-2 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            &larr; Previous
          </button>
        ) : (
          <span className="w-20"></span> // Empty span for alignment
        )}
        
        {currentPage * itemsPerPage < coins.length && (
          <button
            onClick={handleNextPage}
            className="p-2 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Next &rarr;
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
