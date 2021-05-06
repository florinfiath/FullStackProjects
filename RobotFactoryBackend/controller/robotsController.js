const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);
const isEmpty = require('lodash.isempty')

rotateLeft = (direction) => {
  switch (direction) {
    case "NORTH":
      return "WEST";
    case "EAST":
      return "NORTH";
    case "SOUTH":
      return "EAST";
    case "WEST":
      return "SOUTH";
      default: 
      return direction;
  }
};
rotateRight = (direction) => {
    switch (direction) {
      case "NORTH":
        return "EAST";
      case "EAST":
        return "SOUTH";
      case "SOUTH":
        return "WEST";
      case "WEST":
        return "NORTH";
      default:
        return direction;
    }
  };
moveRobot = (robot) => {
    switch (robot.direction) {
      case "NORTH":
        robot.posY++;
        break;
      case "EAST":
        robot.posX++;
        break;
      case "SOUTH":
        robot.posY--;
        break;
      case "WEST":
        robot.posX--;
        break;
      default:
        null;
    } 
    return {
      posX: robot.posX,
      posY: robot.posY
    }
  };

  exports.getRobots = (req, res) => {
    const robots = db.get("robots").value();
    res.status(200).send(robots);
  };

  exports.addRobot = (req, res, next) => {
    try{
      if(isEmpty(req.body)) {
        const error  =new Error ("INVALID REQUEST MESSAGE");
        error.status = 400;
        error.stack = null;
        next(error)
      }else{
        const robot = req.body;
        db.get("robots")
        .push(robot)
        .last()
        .assign({id: Date.now().toString()})
        .write();
        res.status(200).send(robot)
      }
    }catch(error){
      console.log(error);
      next(error);
    }
    
  };

  exports.deleteRobot = (req, res) => {
    const robotId = req.body.id;
    db.get("robots").remove({ id: robotId }).write();
    res.status(200).send('Successfully removed');
  }

  exports.rotateLeft = (req, res) => {
    const robotId = req.body.id;
    const robot = db.get("robots").find({ id: robotId }).value();

    db.get("robots")
      .find({ id: robotId })
      .assign({
        direction: rotateLeft(robot.direction),
      })
      .write();
    res.status(200).send(robot);
  };

 exports.rotateRight = (req, res) => {
  const robotId = req.body.id;
  const robot = db.get("robots").find({ id: robotId }).value();
  db.get("robots")
    .find({ id: robotId })
    .assign({
      direction: rotateRight(robot.direction),
    })
    .write();
  res.status(200).send(robot);
};

 exports.moveRobot = (req, res) => {
    const robotId = req.body.id;
    let robot = db.get('robots').find({ id: robotId }).value();
    let robotDirection = moveRobot(robot);
    db.get("robots")
      .find({ id: robotId })
      .assign({
        posX: robotDirection.posX,
        posY: robotDirection.posY
      })
      .write();
    res.status(200).send(robot)
}