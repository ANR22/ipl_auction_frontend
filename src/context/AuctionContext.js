import { createContext, useState } from "react";

export const AuctionContext = createContext();

export const initialAuctionState = {
  started: false,
  over: false,
  currentBid: {
    teamId: null,
    playerId: null,
    teamName: null,
    bidAmount: 0.0,
  },
  player: {
    id: null,
    name: "",
    basePrice: null,
    imgUrl: null,
  },
};

// export const initialAuctionState = {
//   started: true,
//   over: false,
//   currentBid: {
//     teamId: 1,
//     playerId: 1,
//     teamName: "Royal Challengers Bangalore",
//     bidAmount: 2.0,
//   },
//   player: {
//     id: 1,
//     name: "Virat Kohli",
//     basePrice: 2.0,
//     imgUrl:
//       "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPLHeadshot2023/2.png",
//   },
// };

const AuctionProvider = ({ children }) => {
  const [auction, setAuction] = useState(initialAuctionState);

  return (
    <AuctionContext.Provider
      value={{
        auction,
        setAuction,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};

export default AuctionProvider;
