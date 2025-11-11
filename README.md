
# CropTrust DApp

![CropTrust Logo](./frontend/public/CroptrustLog.png)

CropTrust is a decentralized application that connects farmers directly with consumers, creating a transparent and efficient marketplace for agricultural products. This platform leverages blockchain technology to ensure secure transactions and traceability in the food supply chain.

## About The Project

The CropTrust DApp is designed to empower farmers by providing them with a platform to list their products and reach a wider market. Consumers, in turn, can purchase fresh produce directly from the source, with the assurance of quality and authenticity provided by a decentralized system. The platform is built with a modern, user-friendly interface and is powered by a secure smart contract backend (to be developed) on the Base network.

## Features

- **Decentralized Marketplace:** Browse and purchase a wide variety of agricultural products directly from farmers.
- **User Authentication:** Securely sign up and log in using wallet-based authentication powered by Privy.
- **Farmer Dashboard:** A comprehensive dashboard for farmers to manage their product listings, track sales, and monitor earnings.
- **Product Listings:** Easily create and manage detailed product listings with images, descriptions, and pricing.
- **Secure Payments:** Transactions are handled through a secure escrow system, ensuring that funds are only released when both parties are satisfied.
- **Wallet Integration:** Manage your funds and transactions with an integrated wallet interface.
- **Transparent Supply Chain:** (Future) Track the journey of your food from the farm to your table.

## Built With

### Frontend

- [Next.js](https://nextjs.org/) - React framework for server-rendered applications.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
- [Privy](https://www.privy.io/) - For wallet-based user authentication.
- [Radix UI](https://www.radix-ui.com/) - For accessible and unstyled UI components.
- [Framer Motion](https://www.framer.com/motion/) - For animations.

### Backend (Smart Contract)

- [Hardhat](https://hardhat.org/) - Ethereum development environment for professionals.
- [Solidity](https://docs.soliditylang.org/) - The smart contract programming language.
- [Base](https://base.org/) - The target blockchain for deployment.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/croptrust-dapp.git
    cd croptrust-dapp
    ```
2.  **Install frontend dependencies**
    ```sh
    cd frontend
    npm install
    ```
3.  **Set up environment variables**

    Create a `.env.local` file in the `frontend` directory and add your Privy App ID:

    ```
    NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
    ```

### Running the Application

1.  **Start the frontend development server**
    ```sh
    npm run dev
    ```
2.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project is organized into two main directories: `frontend` and `smart-contract`.

-   **`frontend/`**: Contains the Next.js application.
    -   **`app/`**: The main application routes and pages.
    -   **`components/`**: Reusable React components.
    -   **`hooks/`**: Custom React hooks for managing application logic.
    -   **`lib/`**: Utility functions and providers.
    -   **`public/`**: Static assets like images and icons.
-   **`smart-contract/`**: (To be developed) Will contain the Hardhat project with the Solidity smart contracts.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - email@example.com

Project Link: [https://github.com/your_username/croptrust-dapp](https://github.com/your_username/croptrust-dapp)
