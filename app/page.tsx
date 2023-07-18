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
        clientId="5475d794-a9cb-4352-bc72-be196f897366"
        environment="staging"
        recipient={{
          wallet: "0x6C3b3225759Cbda68F96378A9F0277B4374f9F06"
        }}
        emailInputOptions={{
          show: true, 
          // useStripeLink: true
        }}
        currency="USD"
        locale="en-US"
        mintConfig={{
          quantity: "1",
          totalPrice: "0.001972280502482273",
          edition: "0x0286b929a64f9171ef61a564e19546bcd8382c28",
          affiliate: "0x0000000000000000000000000000000000000000",
          affiliateProof: [],
          attributonId: "23334387490496220902756087083339141532635006782258954522352602686392870671321",
        }}
        onEvent={event => {
          switch (event.type) {
            case "quote:status.changed":
              console.log('status changed');
              console.log(event?.payload?.totalPrice?.amount)

              setBreakdown({
                total: 3,
                fee: 1,
              });
              
              break;
            default: 
              console.log(event);
          }
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