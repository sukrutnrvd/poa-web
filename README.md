# Proof of Attendance Web Application

This repository hosts the frontend for the Proof of Attendance (POA) application. The POA app enables users to interact with smart contracts, mint NFTs, and view events they have created.

## Features

- Connect wallet (e.g., MetaMask).
- Create events with Merkle Tree-based whitelisting.
- Mint POA NFTs if eligible.
- View and manage events created by the connected wallet.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- A Web3-compatible wallet like MetaMask.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sukrutnrvd/poa-web.git
   cd poa-web-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```plaintext
    API_ENDPOINT=""
    API_KEY=""
   ```

### Running the App

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Deployment

To build the app for production:

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Related Repositories

- [Smart Contract Repository](https://github.com/sukrutnrvd/poa-smart-contract): Contains the smart contract code for POA NFTs.

## License

This project is licensed under the MIT License.
