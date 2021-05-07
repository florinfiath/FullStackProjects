import React from "react";
import { Link, useParams } from "react-router-dom";

const axios = require("axios").default;

const RobotDetails = (props) => {
    const { id } = useParams();
    console.log(id);

    const foundRobot = props.showDetails.find((robot) => id === robot.id);
    console.log(props.showDetails);

const moveRobotRight = async (id) => {
  try {
    axios
      .post("http://localhost:3001/robots/right",
      {id:id})
      .then((res) => props.sendGetRequest());
  } catch (error) {
    console.log(error);
  }
};
const moveRobotLeft = async (id) => {
  try {
    axios
      .post("http://localhost:3001/robots/left",
      {id:id})
      .then((res) => props.sendGetRequest());
  } catch (error) {
    console.log(error);
  }
};
const moveRobot = async (id) => {
  try {
    axios
      .post("http://localhost:3001/robots/forward", { id: id })
      .then((res) => props.sendGetRequest());
  } catch (error) {
    console.log(error);
  }
};

    return (
        <>
            {foundRobot ? (
                <div className="container mt-5 text-white">
                        <Link to="/">Go Back To Main</Link>
                        <h3>Name :</h3>
                        <p>{foundRobot.name}</p>
                        <h4>Position :</h4>
                        <ul className="ml-3">
                            <li className="listStyle">PosX: {foundRobot.posX}</li>
                            <li className="listStyle">PosY:{foundRobot.posY}</li>
                        </ul>
                        <h4>Heading :</h4>
                        <h6 className="ml-3">{foundRobot.direction}</h6>
                    <button onClick={()=>{moveRobotRight(foundRobot.id)}} className="btn btn-secondary btn-xl mr-2 pr-3 pl-3">
                        Right
          </button>
                    <button onClick={()=>{moveRobotLeft(foundRobot.id)}} className="btn btn-secondary btn-xl mr-2 pr-3 pl-3">
                        Left
          </button>
                    <button onClick={()=>{moveRobot(foundRobot.id);}}className="btn btn-secondary btn-xl mr-2 pr-3 pl-3">
                        Move
          </button>
                </div>
            ) : null}
        </>
    );
};


export default RobotDetails;

