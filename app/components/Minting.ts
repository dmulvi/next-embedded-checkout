import { useCrossmintEvents } from "@crossmint/client-sdk-react-ui";

interface MintingProps {
  orderIdentifier: string;
}

function Minting({ orderIdentifier }: MintingProps) {
  console.log('minting component:', orderIdentifier);

  const { listenToMintingEvents } = useCrossmintEvents({
    environment: "staging",
  });

  if (orderIdentifier) {
    listenToMintingEvents(
      { orderIdentifier },
      (event) => {
        console.log(event.type, ':', event)
      }
    );
  }

  return null;
}

export default Minting;
