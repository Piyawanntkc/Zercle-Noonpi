let url = "https://pokeapi.co/api/v2/pokemon/";
let count = 0;
ramdomPokemon();

function ramdomPokemon() {
  count += 1;
  let num = Math.floor(Math.random() * 500 + 1);
  fetch(url + num)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //   console.log("pokemon data: ", data);
      insertStat(data);
      insertInformation(data);
      insertPic(data);
    });
}
// for insert pic
let pokePic = document.createElement("img");
let frontDefault = document.createElement("img");
let backDefault = document.createElement("img");
let frontShiny = document.createElement("img");
let backShiny = document.createElement("img");
function insertPic(data) {
  let picContainer = document.getElementById("pokemon_pic");
  let pokemonPic = data.sprites;
  pokePic.setAttribute("src", pokemonPic.front_default);
  pokePic.setAttribute("class", "w-full");
  picContainer.appendChild(pokePic);

  let frontD_pic = document.getElementById("frontDefault_pic");
  let backD_pic = document.getElementById("backDefault_pic");
  let frontS_pic = document.getElementById("frontShiny_pic");
  let backS_pic = document.getElementById("backShiny_pic");

  frontDefault.setAttribute("src", pokemonPic.front_default);
  backDefault.setAttribute("src", pokemonPic.back_default);
  frontShiny.setAttribute("src", pokemonPic.front_shiny);
  backShiny.setAttribute("src", pokemonPic.back_shiny);

  frontDefault.setAttribute("class", "w-full");
  backDefault.setAttribute("class", "w-full");
  frontShiny.setAttribute("class", "w-full");
  backShiny.setAttribute("class", "w-full");

  frontD_pic.appendChild(frontDefault);
  backD_pic.appendChild(backDefault);
  frontS_pic.appendChild(frontShiny);
  backS_pic.appendChild(backShiny);
}
function insertInformation(data) {
  let nameContainer = document.getElementById("pokemon_name");
  let name = data.species.name.toUpperCase();
  let pokeID = document.getElementById("pokemon_id");
  let id = data.id;
  nameContainer.innerHTML = `${name}`;
  pokeID.innerHTML = `POKEMON ID : ${id}`;
}
let dataRadar = {
  labels: [
    "HP",
    "Attack",
    "Defense",
    "Special-Attack",
    "Special-Defense",
    "Speed",
  ],
  datasets: [
    {
      label: "Stats",
      data: [],
      fill: true,
      backgroundColor: "rgba(133, 105, 241, 0.2)",
      borderColor: "rgb(133, 105, 241)",
      pointBackgroundColor: "rgb(133, 105, 241)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(133, 105, 241)",
    },
  ],
};
function insertStat(data) {
  let stat = data.stats;
  console.log(stat);
  let hp = stat[0].base_stat;
  let attack = stat[1].base_stat;
  let defense = stat[2].base_stat;
  let specialAttack = stat[3].base_stat;
  let specialDefense = stat[4].base_stat;
  let speed = stat[5].base_stat;
  console.log(hp);
  console.log(attack);
  console.log(defense);
  console.log(specialAttack);
  console.log(specialDefense);
  console.log(speed);
  dataRadar.datasets[0].data[0] = hp;
  dataRadar.datasets[0].data[1] = attack;
  dataRadar.datasets[0].data[2] = defense;
  dataRadar.datasets[0].data[3] = specialAttack;
  dataRadar.datasets[0].data[4] = specialDefense;
  dataRadar.datasets[0].data[5] = speed;
  const configRadarChart = {
    type: "radar",
    data: dataRadar,
    options: {},
  };
  let chartStatus = Chart.getChart("chartRadar");
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  var chartBar = new Chart(
    document.getElementById("chartRadar"),
    configRadarChart
  );
}
