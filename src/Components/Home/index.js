import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";

import "./index.css";

function Home() {
  const [participants, setParticipants] = useState([]);
  const [name, setname] = useState("");
  const [speed, setspeed] = useState("");
  const [time, settime] = useState("");
  const [fielderror, setfielderror] = useState(false);
  const [participentserror, setparticipentserror] = useState(false);

  const restform = () => {
    setspeed("");
    settime("");
    setname("");
  };

  useEffect(() => {
    // Retrieve stored data from localStorage
    const storedParticipants = JSON.parse(localStorage.getItem("participants"));
    if (storedParticipants) {
      setParticipants(storedParticipants);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("participants", JSON.stringify(participants));
  }, [participants]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && speed && time) {
      let newUser = {
        id: uuidv4(),
        name: name,
        speed: speed + " KM/H",
        time: time,
        endtime: "-",
      };
      if (participants.length < 10) {
        setParticipants((prevParticipants) => [...prevParticipants, newUser]);
        restform();
        setfielderror(false);
      } else {
        setparticipentserror(true);
      }
    } else {
      setfielderror(true);
    }
  };

  return (
    <div className="bg-container">
      <div className="form-Container">
        <h1>RUNNER DETAILS</h1>
        <p className="para">You can add max 10 patisipants</p>
        <form onSubmit={handleSubmit}>
          <div className="label-container">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              className="name"
              placeholder="Username"
              type="text"
              required
              id="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="label-container">
            <label className="label" htmlFor="speed">
              Speed
              <input
                className="name"
                type="number"
                required
                placeholder="Speed"
                id="speed"
                value={speed}
                onChange={(e) => setspeed(e.target.value)}
              />
              Km/h
            </label>
          </div>
          <div className="label-container">
            <label className="label" htmlFor="time">
              Start Time
            </label>
            <input
              className="name"
              pattern="[0-9]{2}:[0-9]{2}"
              placeholder="HH:mm"
              id="time"
              value={time}
              onChange={(e) => settime(e.target.value)}
            />
          </div>
          {fielderror && <p className="error">*Please fill all the fields</p>}
          {participentserror && (
            <p className="error">*Maximum participations are completed </p>
          )}

          <button type="submit" className="button">
            + ADD RUNNER
          </button>
        </form>
      </div>

      <div>
        <ListOfParticipents participants={participants} />
      </div>
    </div>
  );
}

function ListOfParticipents({ participants }) {
  const navigate = useNavigate();

  const navigates = () => {
    if (participants.length >= 2) {
      navigate("/RaceTrack");
    } else {
      alert("Minimum 2 participents required to start");
    }
  };

  return (
    <div className="participents-container">
      <div className="table">
        <h1>List of participents</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Speed</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody className="tables">
            {participants.map((participant, index) => (
              <tr key={index} className="tr-d">
                <td>{participant.name}</td>
                <td>{participant.speed}</td>
                <td>{participant.time}</td>
                <td>{participant.endtime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="last-content">
        <hr />
        <div className="bn">
          <button type="button" onClick={navigates}>
            Start Race{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Home;
