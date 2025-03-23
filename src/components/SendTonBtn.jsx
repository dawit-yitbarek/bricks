import React from "react";
import {TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';

function SendTonBtn() {

  return (
    <div className="note">
      <h1>Send Ton</h1>
      <TonConnectButton className="connect-ton-btn"/>
    </div>
  );
}

export default SendTonBtn;
