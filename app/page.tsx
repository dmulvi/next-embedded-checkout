"use client"; 

import { useState } from "react";
import { CrossmintPaymentElement } from "@crossmint/client-sdk-react-ui";
import Minting from "./components/Minting";

interface PaymentCompletedPayload {
  orderIdentifier: string;
}

function App() {
  const [order, setOrder] = useState<PaymentCompletedPayload | null>(null);
  
  const setArbitraryOrder = () => {
    setOrder({
        orderIdentifier: "3a09a77d-6060-402b-9971-f6507aad6b0b"
      });
    };
  
  return (
    <div className="App">
      <button onClick={setArbitraryOrder}>Set arbitray order identifier</button>

      <CrossmintPaymentElement 
        projectId="b95fe68b-530b-4136-8821-d943ec2df7ac"
        collectionId="cba8a69c-c6ec-45c6-b202-d4288f6d2539"
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
          totalPrice: "0.000778",
          mintReferral: "0x6C3b3225759Cbda68F96378A9F0277B4374f9F06",
          comment: ""
        }}
        onEvent={event => {
          console.log(event);
          if (event.type === "payment:process.succeeded") {
            setOrder(event.payload);
          }
        }}
      />
      
      {order?.orderIdentifier && <Minting orderIdentifier={order.orderIdentifier} />}

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