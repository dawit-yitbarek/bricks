import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import WalletProviderComponent from "./WalletProvider";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import LoginBtn from "./loginBtn";
import Register from "./Register";
import Home from "./Home";
import Logout from "./LogoutBtn";

const App = () => {
    return (
        <WalletProviderComponent>
            <div>
            <Header />
            <Home />
                <h1>Connect to Solana Wallet</h1>
                <WalletMultiButton className="connectSolBtn"/>

                <LoginBtn />
                <Logout />
                <Register />
                <Footer />
            </div>
        </WalletProviderComponent>
    );
};


export default App;
