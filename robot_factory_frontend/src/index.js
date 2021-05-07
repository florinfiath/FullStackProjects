import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import AddRobots from './components/addRobots';
import ShowRobots from './components/showRobots';
import RobotDetails from './components/robotDetails';




const axios = require("axios").default;

const App = () => {

    const [robot,setRobot] = useState([]);

      useEffect(() => {
        sendGetRequest();
      }, []);

      const sendGetRequest = async () => {
        try {
          await axios.get("http://localhost:3001/robots").then((response) => setRobot(response.data));

        } catch (err) {
          console.error(err);
        }
      };

    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <AddRobots add={sendGetRequest} />
            <ShowRobots show={robot} sendGetRequest={sendGetRequest} />
          </Route>
          <Route path="/robotDetails/:id">
            <RobotDetails showDetails={robot} sendGetRequest={sendGetRequest} />
          </Route>
        </Switch>
      </Router>
    );

};

ReactDOM.render(<App/>,document.getElementById('root'))

