const express = require('express');
const cors = require('cors');


const server = express();
server.use(express.json());
server.use(cors());

const sendUserError = (msg, res) => {
  res.status(422);
  res.json({ Error: msg });
  return;
};

let games = [
  {
    title: 'Pacman',
    genre: "Arcade"
  }
];
server.get('/games', (req, res) => {
  res.json(games);
});
let smurfId = 0;

server.post('/games', (req, res) => {
  const { title, genre } = req.body;
  const newGame = { title, genre };
  if (!title || !genre) {
    return res.status(422).json({
      message: "Fail!"
    }
    );
  }
  const findGameByTitle = game => {
    return game.title === title;
  };
  if (games.find(findGameByTitle)) {
    return sendUserError(
      `Error! ${title} already exists in the game DB.`,
      res
    );
  }

  games.push(newGame);
  res.json(games);
});

// server.put('/smurfs/:id', (req, res) => {
//   const { id } = req.params;
//   const { name, age, height } = req.body;
//   const findSmurfById = smurf => {
//     return smurf.id == id;
//   };
//   const foundSmurf = smurfs.find(findSmurfById);
//   if (!foundSmurf) {
//     return sendUserError('No Smurf found by that ID', res);
//   } else {
//     if (name) foundSmurf.name = name;
//     if (age) foundSmurf.age = age;
//     if (height) foundSmurf.height = height;
//     res.json(smurfs);
//   }
// });

// server.delete('/smurfs/:id', (req, res) => {
//   const { id } = req.params;
//   const foundSmurf = smurfs.find(smurf => smurf.id == id);

//   if (foundSmurf) {
//     const SmurfRemoved = { ...foundSmurf };
//     smurfs = smurfs.filter(smurf => smurf.id != id);
//     res.status(200).json(smurfs);
//   } else {
//     sendUserError('No smurf by that ID exists in the smurf DB', res);
//   }
// });


module.exports = server