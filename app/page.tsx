"use client";

import { useState, useEffect, useRef } from "react";
import {
  CrossmintPaymentElement,
  useCrossmintEvents,
} from "@crossmint/client-sdk-react-ui";
import { JSONTree } from "react-json-tree";

interface PaymentCompletedPayload {
  orderIdentifier: string;
}

function App() {
  const [orderIdentifier, setOrderIdentifier] = useState<string | null>(null);
  const [txnComplete, setTxnComplete] = useState<boolean>(false);
  const [orderStarted, setOrderStarted] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  const { listenToMintingEvents } = useCrossmintEvents({
    environment: "staging",
  });

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (events.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [events.length]);

  if (orderIdentifier && !complete) {
    // prevent constant polling
    if (txnComplete && orderComplete) {
      setComplete(true);
      return;
    }

    listenToMintingEvents({ orderIdentifier }, (event) => {
      setEvents((events) => [...events, event]);

      switch (event.type) {
        case "transaction:fulfillment.succeeded":
        case "transaction:fulfillment.failed":
          setTxnComplete(true);
          break;
        case "order:process.started":
          setOrderStarted(true);
          break;
        case "order:process.finished":
          setOrderComplete(true);
          break;
        default:
          break;
      }
      console.log(event.type, ":", event);
      console.log(JSON.stringify(event, null, 2));
    });
  }

  return (
    <div className="grid grid-cols-3 grid-flow-col gap-5">
      <div className="grid col-span-2 p-1">
        <CrossmintPaymentElement
          projectId="e56a55e2-d4b1-4701-8709-2af6a73d9bb5"
          collectionId="849002d8-83a0-4a80-886c-17360f067f93"
          environment="staging"
          emailInputOptions={{
            show: true,
          }}
          currency="USD"
          locale="en-US"
          mintConfig={{
            _quantity: "1",
            totalPrice: "0.0001",
            _id: "3",
          }}
          onEvent={(event) => {
            console.log(event.type, event);
            console.log(JSON.stringify(event, null, 2));

            setEvents((events) => [...events, event]);

            if (event.type === "payment:process.succeeded") {
              setOrderIdentifier(event.payload.orderIdentifier);
            }
          }}
        />
      </div>
      <div className="col-span-1">
        <div className="flex-row overflow-y-auto event-window">
          {events.map((event, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center w-full"
              >
                <div className="flex items-center justify-between w-full event-title font-mono font-bold text-white">
                  {event.type}
                </div>
                <div className="flex w-full text-secondary-text event-viewer">
                  <JSONTree hideRoot data={event} />
                </div>
              </div>
            );
          })}
          <div ref={ref} />
        </div>
      </div>
    </div>
  );
}

export default App;

{
  /*

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
*/
}
