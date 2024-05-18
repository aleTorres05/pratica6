const fs = require("fs");

let arg = process.argv[3];

const dbFile = "db.json";

const obtenerListNombres = () => {
  let content = fs.readFileSync(dbFile, "utf8");
  if (!content.koders) {
    console.log("No hay Koderes");
  }
  return JSON.parse(content).koders;
};

const crearlistaNombres = (nombreArg, listaNombres) => {
  const fileExist = fs.existsSync(dbFile);
  if (!fileExist) {
    fs.writeFileSync(dbFile, JSON.stringify({ koders: [] }));
  }
  listaNombres = obtenerListNombres();
  listaNombres.push(nombreArg);
  updateKoders(listaNombres);
};

const listarKoders = (listaNombres) => {
  listaNombres = obtenerListNombres();
  if (!listaNombres.koders) {
    console.log("No hay Koders");
  }
  listaNombres.forEach((arg, idx) => {
    console.log(idx, "-", arg);
  });
};

const eliminarNombre = (listaNombres, idx) => {
  console.log(`Se elimino: ${listaNombres.at(idx)}`);
  listaNombres.splice(idx, 1);
  updateKoders(listaNombres);
  listarKoders();
};

const limparLista = (listaNombres) => {
  listaNombres = [];
  updateKoders(listaNombres);
};

function updateKoders(koders) {
  const newKoders = { koders: koders };
  const newKodersAsSting = JSON.stringify(newKoders);
  fs.writeFileSync(dbFile, newKodersAsSting);
}

const main = () => {
  let option = process.argv[2];
  let listaNombres = obtenerListNombres();

  if (option.toLocaleLowerCase() === "add") {
    crearlistaNombres(arg, listaNombres);
    listarKoders();
  } else if (option.toLocaleLowerCase() === "ls") {
    listarKoders();
  } else if (option.toLocaleLowerCase() === "rm") {
    eliminarNombre(listaNombres, arg);
  } else if (option.toLocaleLowerCase() === "reset") {
    limparLista();
  } else {
    console.error("No es una opcion valida");
    process.exit(1);
  }
};

main();
