// RaceTrack.js
import React, { useEffect, useState } from "react";
import RaceResultsPopup from "../RaceResultsPopup";
import "./index.css"; // Import the CSS file

const RaceTrack = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    // Fetch participants from localStorage when the component mounts
    const storedParticipants = JSON.parse(localStorage.getItem("participants"));
    if (storedParticipants) {
      setParticipants(storedParticipants);
    }

    // Start the race timer
    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array to run only once on mount

  // Convert seconds to MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Add leading zeros if necessary
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEFG";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  const randomColor = getRandomColor();

  const handleClosePopup = () => setPopupOpen(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPopupOpen(true);
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array to run only once on mount

  const handelReset = () => {
    setElapsedTime(0);
    setPopupOpen(false);
  };

  return (
    <div>
      {isPopupOpen ? (
        <RaceResultsPopup
          participants={participants}
          onClose={handleClosePopup}
          onRestart={handelReset}
        />
      ) : (
        <div className="racer">
          <div className="track-outer">
            {participants.map((participant, index) => (
              <div key={index} className={`track track${index + 1}`}>
                <div
                  className="runner-name person"
                  style={{ backgroundColor: randomColor }}
                >
                  {participant.name}
                </div>
              </div>
            ))}
          </div>
          <div className="center-container">
            <div className="timer">
              Elapsed Time:<span>{formatTime(elapsedTime)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaceTrack;
