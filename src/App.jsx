import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import CryptoTable from "./features/crypto/CryptoTable";

const App = () => {
  return (
    <Provider store={store}>
      <div className="p-4 min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Crypto Price Tracker</h1>
        <CryptoTable />
      </div>
    </Provider>
  );
};

export default App;
