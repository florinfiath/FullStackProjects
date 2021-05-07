import React, { useRef, useState} from 'react';

const axios = require("axios").default;


const AddRobots = (props) => {
  
    const [name,setName] = useState('');

    const inputRef = useRef();

      const addRobot = async (robotName) => {
      
        try {
          axios
            .post("http://localhost:3001/robots", {
              name: robotName,
              posX: 0,
              posY: 0,
              direction: "NORTH"
            }).then((response)=>{props.add(name)})
        } catch (error) {
          console.log(error);
        }
      };

    const addRobotsOnClick = async () => {
        // props.add(inputRef.current.value);
        addRobot(inputRef.current.value);
        inputRef.current.value =''
        setName("");
  
    }

    return (
      <section>
        <div className="container mt-5 text-white">
          <h2>Create a new robot</h2>
          <h3>Name :</h3>
          <div className="input-group mb-3">
            <input
              ref={inputRef}
              type="text"
              className=""
              id="basic-url"
              aria-describedby="basic-addon3"
            />
          </div>
          <button
            onClick={() => addRobotsOnClick()}
            type="button"
            className="btn btn-secondary btn-lg"
          >
            Create
          </button>
        </div>
  
      </section>
    );
};

export default AddRobots;