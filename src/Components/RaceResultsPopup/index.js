import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";
import "./index.css";
import { MdOutlineRestartAlt } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";

const getOrdinalSuffix = (position) => {
  const lastDigit = position % 10;
  const secondLastDigit = Math.floor(position / 10) % 10;

  if (secondLastDigit === 1) {
    return "th"; // If the teens, use "th" for 11th, 12th, 13th, ...
  }

  switch (lastDigit) {
    case 1:
      return "st👑";
    case 2:
      return "nd🔴";
    case 3:
      return "rd🟢";
    default:
      return "th";
  }
};

const RaceResultsPopup = ({ participants, onClose, onRestart }) => {
  const sortedParticipants = [...participants].sort((a, b) => {
    // Assuming speed is a string with " KM/H", you might need to adjust the comparison
    const speedA = parseInt(a.speed);
    const speedB = parseInt(b.speed);

    return speedB - speedA; // Sorting in descending order
  });
  return (
    <Popup open={true} closeOnDocumentClick onClose={onClose}>
      <div className="popup-content">
        <h2>SCORE BOARD</h2>

        <div className="tables">
          <table>
            <thead>
              <tr>
                <th className="he">Position</th>
                <th>Name</th>
                <th>Speed</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody className="tables">
              {sortedParticipants.map((participant, index) => (
                <tr key={index} className="tr-d">
                  <td>
                    {index + 1}
                    {getOrdinalSuffix(index + 1)}
                  </td>
                  <td>{participant.name}</td>
                  <td>{participant.speed}</td>
                  <td>{participant.time}</td>
                  <td>{participant.endtime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="buttons-container">
          <button onClick={onRestart}>
            <MdOutlineRestartAlt />
            Restart
          </button>
          <Link className="link" to="/">
            <button className="back-button" onClick={onClose}>
              <IoMdArrowBack />
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </Popup>
  );
};

export default RaceResultsPopup;
