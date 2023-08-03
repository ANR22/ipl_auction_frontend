import { AuctionContext } from "../context/AuctionContext";
import { TeamContext } from "../context/TeamContext";
import { useContext, useEffect, useRef, useState } from "react";
import Connector from "../components/Connector";

import "../styles/auction.css";
const Auction = () => {
  const { team } = useContext(TeamContext);
  const { auction, setAuction } = useContext(AuctionContext);
  const childRef = useRef();
  const intervalref = useRef();
  const [timer, setTimer] = useState(-1);
  const [timerStopSent, setTimerStopSent] = useState(false);

  useEffect(() => {
    intervalref.current = setInterval(() => {
      if (timer > 0) setTimer((prevSeconds) => prevSeconds - 1);
      else {
        if (!timerStopSent && auction.started) {
          childRef.current.sendTimeOutMessage();
          console.log("sent");
          setTimerStopSent(() => true);
        }
      }
    }, 1000);

    return () => {
      clearInterval(intervalref.current);
    };
  }, [timer, timerStopSent]);

  useEffect(() => {
    setTimer(30);
    setTimerStopSent(() => false);
  }, [auction]);

  const getAuctionDetails = async () => {
    const response = await fetch("http://localhost:8080/auction/details", {
      method: "GET",
    });

    const get_auction = await response.json();
    console.log(get_auction);
    setAuction(get_auction);
  };

  useEffect(() => {
    getAuctionDetails();
  }, []);

  return (
    <div>
      <div className="team-name">{team.name}</div>
      <Connector ref={childRef} />
      {auction.started ? (
        <div className="auction-container">
          <div className="timer">Timer: {timer}s</div>
          <div className="player-container">
            <div className="player-info">
              <div className="player-info-item">
                <div className="player-label center-text">Player details</div>
              </div>
              <hr />
              <div className="player-info-item">
                <div className="player-label">Id:</div>
                <div className="player-value">{auction.player.id}</div>
              </div>
              <div className="player-info-item">
                <div className="player-label">Name:</div>
                <div className="player-value">{auction.player.name}</div>
              </div>
              <div className="player-info-item">
                <div className="player-label">Base Price:</div>
                <div className="player-value">{auction.player.basePrice}</div>
              </div>
            </div>
            <div className="player-img-container">
              <img
                src={auction.player.imgUrl}
                className="player-img"
                alt="Player"
              />
            </div>
            <div className="current-bid-info">
              <div className="current-bid-info-item">
                <div className="current-bid-label center-text">Current Bid</div>
                {/* <div className="current-bid-value">{auction.player.name}</div> */}
              </div>
              <hr />
              <div className="current-bid-info-item">
                <div className="current-bid-label">Bidding Team:</div>
                <div className="current-bid-value">
                  {auction.currentBid.teamName}
                </div>
              </div>
              <div className="current-bid-info-item">
                <div className="current-bid-label">Bid Amount:</div>
                <div className="current-bid-value">
                  {auction.currentBid.bidAmount}
                </div>
              </div>
            </div>
          </div>
          <button
            className="button"
            disabled={timerStopSent}
            onClick={() => childRef.current.sendBidMessage()}
          >
            Bid
          </button>
        </div>
      ) : (
        <button disabled={auction.over} onClick={getAuctionDetails}>
          Refresh
        </button>
      )}
      {auction.over && <div>Auction is over</div>}
    </div>
  );
};

export default Auction;
