import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateCryptoData } from "./cryptoSlice";
import { simulateCryptoUpdates } from "../../utils/mockWebSocket";
import CryptoRow from "../../components/CryptoRow";

const CryptoTable = () => {
  const cryptoData = useSelector((state) => state.crypto);
  const dispatch = useDispatch();

  useEffect(() => {
    // Start the simulation when component mounts
    const cleanup = simulateCryptoUpdates((updatedData) => {
      dispatch(updateCryptoData(updatedData));
    });
    
    // Clean up when component unmounts
    return cleanup;
  }, [dispatch]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">1h %</th>
            <th className="p-3">24h %</th>
            <th className="p-3">7d %</th>
            <th className="p-3">Market Cap</th>
            <th className="p-3">24h Volume</th>
            <th className="p-3">Circulating Supply</th>
            <th className="p-3">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((asset, index) => (
            <CryptoRow key={asset.symbol} asset={asset} index={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;