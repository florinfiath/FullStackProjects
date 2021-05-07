import React from "react";
import { Link } from "react-router-dom";
import "../components/css/style.css";


const axios = require("axios").default;

const ShowRobots = (props) => {

  console.log(props);

  const deleteRobotsOnClick = async (id) => {
    try {
      axios
        .delete("http://localhost:3001/robots", {
          data: { id: id },
        })
        .then((response) => props.sendGetRequest(response.data));
    } catch (error) {
      console.log(error);
    }
    console.log(id);
  };

  return (
    <div className="container mt-5 text-white">
      <h2>Robots</h2>
      <ul className="list-group">
        {props.show.map((robot, index) => (
          <div
            key={index}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Link to={`/robotDetails/${robot.id}`}>
              <li className="btn btn-secondary btn-lg">{robot.name}</li>
            </Link>
            <span
              className="btn btn-secondary btn-sm"
              onClick={() => {
                deleteRobotsOnClick(robot.id);
              }}
            >
              Deactivate
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ShowRobots;
