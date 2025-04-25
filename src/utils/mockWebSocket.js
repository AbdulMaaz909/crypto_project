const getRandomPercentChange = () => {
    // Generate a random percentage between -2% and +2%
    return (Math.random() * 4 - 2).toFixed(2) * 1;
  };
  
  export const simulateCryptoUpdates = (callback) => {
    let initialData = [
      {
        name: "Bitcoin",
        symbol: "BTC",
        logo: "https://cdn.pixabay.com/photo/2015/08/27/11/20/bitcoin-910307_1280.png",
        price: 93759.48,
        percentChange1h: 0.43,
        percentChange24h: 0.93,
        percentChange7d: 11.11,
        marketCap: 1861618902186,
        volume24h: 43874950947,
        circulatingSupply: "19.85M BTC"
      },
      {
        name: "Ethereum",
        symbol: "ETH",
        logo: "https://cdn.pixabay.com/photo/2021/12/30/13/46/ethereum-6903942_1280.png",
        price: 1802.46,
        percentChange1h: 0.60,
        percentChange24h: 3.21,
        percentChange7d: 13.68,
        marketCap: 217581279327,
        volume24h: 23547469307,
        circulatingSupply: "120.71M ETH"
      },
      {
        name: "Tether",
        symbol: "USDT",
        logo: "https://cdn.pixabay.com/photo/2021/06/13/23/40/tether-6334564_1280.png",
        price: 1.00,
        percentChange1h: 0.00,
        percentChange24h: 0.00,
        percentChange7d: 0.04,
        marketCap: 145320022085,
        volume24h: 92288882007,
        circulatingSupply: "145.27B USDT"
      },
      {
        name: "XRP",
        symbol: "XRP",
        logo: "https://media.istockphoto.com/id/1804271053/vector/ripple-area-icon-vector-illustration-eps-10.jpg?s=1024x1024&w=is&k=20&c=vRx-m7bDQLbME5u8dEMwmO16yBAkH2LnIpqV6W4-D9Q=",
        price: 2.22,
        percentChange1h: 0.46,
        percentChange24h: 0.54,
        percentChange7d: 6.18,
        marketCap: 130073814966,
        volume24h: 5131481491,
        circulatingSupply: "58.39B XRP"
      },
      {
        name: "Solana",
        symbol: "SOL",
        logo: "https://cdn.dribbble.com/userupload/3216618/file/original-d780993e1f879cacad0f00a94a92051f.jpg?resize=752x&vertical=center",
        price: 151.51,
        percentChange1h: 0.53,
        percentChange24h: 1.26,
        percentChange7d: 14.74,
        marketCap: 78381958631,
        volume24h: 4881674486,
        circulatingSupply: "517.31M SOL"
      }
    ];
  
    // Send initial data immediately
    callback(initialData);
  
    // Set up interval to simulate real-time updates
    const intervalId = setInterval(() => {
      const updatedData = initialData.map(asset => {
        // Generate random percentage changes
        const priceChange = getRandomPercentChange();
        const newPrice = asset.price * (1 + priceChange / 100);
        
        // Calculate new percentage changes
        const new1h = asset.percentChange1h + getRandomPercentChange() * 0.2;
        const new24h = asset.percentChange24h + getRandomPercentChange() * 0.1;
        const new7d = asset.percentChange7d + getRandomPercentChange() * 0.05;
        
        // Calculate new market cap based on price change
        const newMarketCap = asset.marketCap * (1 + priceChange / 100);
        
        // Generate random volume change
        const volumeChange = getRandomPercentChange() * 2;
        const newVolume = asset.volume24h * (1 + volumeChange / 100);
        
        return {
          ...asset,
          price: newPrice,
          percentChange1h: new1h,
          percentChange24h: new24h,
          percentChange7d: new7d,
          marketCap: newMarketCap,
          volume24h: newVolume,
        };
      });
      
      initialData = updatedData;
      callback(updatedData);
    }, 3000); // Update every 3 seconds
    
    // Return cleanup function
    return () => clearInterval(intervalId);
  };