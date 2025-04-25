import { useEffect, useState, memo, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CryptoRow = memo(({ asset, index }) => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);
  
  // Format large numbers for display
  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
  };
  
  // Helper function to determine color based on positive/negative value
  const colorClass = (value) => (value > 0 ? "text-green-500" : "text-red-500");
  
  // Update price history when asset price changes
  useEffect(() => {
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setPriceHistory(prev => {
      // Keep only last 7 data points for the chart
      const newHistory = [...prev, asset.price];
      if (newHistory.length > 7) {
        return newHistory.slice(-7);
      }
      return newHistory;
    });
    
    setTimeLabels(prev => {
      const newLabels = [...prev, timeStr];
      if (newLabels.length > 7) {
        return newLabels.slice(-7);
      }
      return newLabels;
    });
  }, [asset.price]);
  
  // Prepare chart data - memoize to prevent unnecessary re-renders
  const chartData = useMemo(() => ({
    labels: timeLabels,
    datasets: [
      {
        label: asset.symbol,
        borderColor: asset.percentChange24h >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
        backgroundColor: asset.percentChange24h >= 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        data: priceHistory,
        pointRadius: 0,
        pointHoverRadius: 3,
      },
    ],
  }), [priceHistory, timeLabels, asset.symbol, asset.percentChange24h]);
  
  // Chart options - memoize for performance
  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: { 
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: { 
        display: false,
        grid: { display: false },
      },
      y: { 
        display: false,
        grid: { display: false },
      },
    },
    animation: {
      duration: 500,
    },
  }), []);

  return (
    <tr key={asset.symbol} className="border-b hover:bg-gray-50">
      <td className="p-3">{index}</td>
      <td className="p-3 flex items-center gap-2">
        <img
          src={asset.logo}
          alt={asset.symbol}
          className="h-6 w-6 object-contain"
        />
        <span className="font-medium">{asset.name}</span>
        <span className="text-gray-500 text-xs">{asset.symbol}</span>
      </td>
      <td className="p-3 font-medium">${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      <td className={`p-3 ${colorClass(asset.percentChange1h)}`}>{asset.percentChange1h.toFixed(2)}%</td>
      <td className={`p-3 ${colorClass(asset.percentChange24h)}`}>{asset.percentChange24h.toFixed(2)}%</td>
      <td className={`p-3 ${colorClass(asset.percentChange7d)}`}>{asset.percentChange7d.toFixed(2)}%</td>
      <td className="p-3">${formatNumber(asset.marketCap)}</td>
      <td className="p-3">${formatNumber(asset.volume24h)}</td>
      <td className="p-3">{asset.circulatingSupply}</td>
      <td className="p-3">
        <div className="h-12 w-32">
          {priceHistory.length > 1 && (
            <Line data={chartData} options={chartOptions} />
          )}
        </div>
      </td>
    </tr>
  );
}, (prevProps, nextProps) => {
  // Optimization: only re-render when price or percentages change
  return prevProps.asset.price === nextProps.asset.price &&
         prevProps.asset.percentChange1h === nextProps.asset.percentChange1h &&
         prevProps.asset.percentChange24h === nextProps.asset.percentChange24h &&
         prevProps.asset.percentChange7d === nextProps.asset.percentChange7d;
});

export default CryptoRow;