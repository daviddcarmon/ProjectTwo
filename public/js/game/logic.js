// let pwr = 11 * (Math.random() * 11) + 4;
let pwr = Math.floor(Math.random() * 25) + 5;
let pwr2 = Math.floor(Math.random() * 25) + 5;

let players = [
  { name: "PlayerOne", health: 100, attack: pwr.toFixed(0) },
  { name: "PlayerTwo", health: 100, attack: pwr2.toFixed(0) },
];

// console.log(players[0]);

module.exports = calAttach = (one, two) => {
  console.log({ one, two });
  let newHealth = one.attack - two.health;
  // function that updates database with newHealth
  return newHealth;
};

console.log(calAttach(players[0], players[1]));
