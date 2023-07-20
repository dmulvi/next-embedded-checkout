"use client"; 

import { useState } from "react";
import { CrossmintPaymentElement } from "@crossmint/client-sdk-react-ui";
//import Minting from "./Minting";

function App() {
  const [order, setOrder] = useState(null);
  const [breakdown, setBreakdown] = useState<{ total: number; fee: number }>();
  
  return (
    <div className="App">
      <CrossmintPaymentElement 
        clientId="_CLIENT_ID_"
        environment="staging"
        // recipient={{
        //   wallet: "0x6C3b3225759Cbda68F96378A9F0277B4374f9F06"
        // }}
        emailInputOptions={{
          show: true, 
          // useStripeLink: true
        }}
        currency="USD"
        locale="en-US"
        mintConfig={{
          quantity: "1",
          totalPrice: "0.0005",
        }}
        onEvent={event => {
          console.log(event);
        }}
      />
      
      {/* <Minting orderIdentifier={order?.orderIdentifier} /> */}
    </div>
  );
}

export default App;

{/*

        uiConfig={{
          fontSizeBase: "0.91rem",
          spacingUnit: "0.274rem",
          borderRadius: "4px",
          fontWeightPrimary: "400",
          fontWeightSecondary: "500",
          colors: {
            background: '#000814',
            backgroundSecondary: '#001D3D',
            backgroundTertiary: '#EEEEEE',
            textPrimary: '#FFFFdd',
            textSecondary: '#EEEEdd',
            accent: '#FFC300',
            danger: '#FFC300',
            textLink: '#FFC300'
          },
        }}
*/}