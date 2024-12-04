import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Cards from "./cards";
import SubscriptionForm from "../components/subscribe";

const Main = () => {
    return (
        <div>
            <Header />
            <main style={{ minHeight: "70vh" }}>
                <Cards />
                <SubscriptionForm />
            </main>
            <Footer />
        </div>
    );
};

export default Main;