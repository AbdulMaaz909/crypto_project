# Crypto Tracker

A cryptocurrency tracker application that displays real-time data and dynamic charts for various cryptocurrencies. It allows users to track price fluctuations, market data, and volume over different time periods (1h, 24h, 7d).

## Tech Stack & Architecture

This project was built with the following technologies:

- **Frontend:**
  - **React**: JavaScript library for building user interfaces.
  - **Redux**: For state management and handling real-time updates via WebSocket.
  - **Chart.js**: For rendering dynamic charts that display historical data for each cryptocurrency.
  - **Tailwind CSS**: Utility-first CSS framework for styling the application.
  - **Recharts**: For alternative chart rendering where necessary.

- **Backend :**
  - **WebSocket/Mock WebSocket Simulation**: For real-time updates on cryptocurrency data.

- **Architecture:**
  - **Component-based architecture** in React for modularity.
  - **Redux Store** to manage and dispatch state updates across components.
  - **Real-time updates** using a WebSocket (simulated for demo) to keep the cryptocurrency data updated.

## Setup Instructions

To get started with this project locally, follow the steps below:

### Prerequisites

1. **Node.js** (version >= 14)
2. **npm** (or Yarn)

### Steps to run the project:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/crypto-tracker.git
   cd crypto-tracker

2. **Install dependencies:**

Run the following command to install the necessary dependencies:
## npm install

3. **Run the development server:**

Start the project in development mode:
## npm run dev



