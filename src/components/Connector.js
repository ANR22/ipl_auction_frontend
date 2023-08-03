import React, { forwardRef, useImperativeHandle, useContext } from "react";
import SockJsClient from "react-stomp";
import { TeamContext } from "../context/TeamContext";
import { AuctionContext } from "../context/AuctionContext";

const Connector = forwardRef((props, ref) => {
  let clientRef = null;
  const { team } = useContext(TeamContext);
  const { auction, setAuction } = useContext(AuctionContext);

  const handleMsg = (msg) => {
    console.log(msg);
    const { type, teamId, playerId, bidAmount, teamName } = msg;
    if (type == "bid") {
      const newcurrentBid = {
        teamId,
        playerId,
        bidAmount,
        teamName,
      };
      setAuction({ ...auction, currentBid: newcurrentBid });
    } else if (type == "nextPlayer") {
      const currentBid = {
        teamId: null,
        playerId: null,
        teamName: null,
        bidAmount: null,
      };
      const { id, name, basePrice, imgUrl } = msg;
      const nextPlayer = { id, name, basePrice, imgUrl };
      setAuction({ ...auction, currentBid: currentBid, player: nextPlayer });
    } else if (type == "auctionOver") {
      setAuction({ ...auction, over: true, started: false });
    }
  };

  useImperativeHandle(ref, () => ({
    sendBidMessage() {
      // const msg = '{"teamId":1,"playerId":1,"teamName":"Chennai Super Kings"}';

      const msg = JSON.stringify({
        teamId: team.id,
        playerId: auction.player.id,
        teamName: team.name,
      });
      clientRef.sendMessage("/app/bid", msg);
    },

    sendTimeOutMessage() {
      const msg = JSON.stringify({
        teamId: team.id,
      });
      clientRef.sendMessage("/app/timerstop", msg);
    },
  }));
  return (
    <div>
      <SockJsClient
        url="http://localhost:8080/gs-guide-websocket"
        topics={["/biddings/listen"]}
        onConnect={() => {
          console.log("connected   ");
        }}
        onMessage={(msg) => {
          handleMsg(msg);
        }}
        ref={(client) => {
          clientRef = client;
        }}
      />
    </div>
  );
});

export default Connector;
