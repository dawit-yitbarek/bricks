import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SendTonBtn from "./SendTonBtn";


function App() {
  return (
    <div>
      <Header />
      <SendTonBtn />
      <Footer />
    </div>
  );
}

export default App;
