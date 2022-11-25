import Restaurante from "./restaurante.js";

const TELEFONE_RESTAURANTE = 553299999999;
const restaurante = new Restaurante(TELEFONE_RESTAURANTE);
const menu = restaurante.menu;

menu.adicionarPrato(
  "Estrombelete de Frango",
  "img/frango_yin_yang.png",
  "Um pouco de batata, um pouco de salada",
  14.9
);
menu.adicionarPrato(
  "Asa de Boi",
  "img/frango_yin_yang.png",
  "Com molho shoyu",
  14.9
);
menu.adicionarPrato(
  "Carne de Monstro",
  "img/frango_yin_yang.png",
  "Com batata assada e farofa",
  14.9
);

menu.adicionarBebida(
  "Coquinha gelada",
  "img/coquinha_gelada.png",
  "Lata 350ml",
  4.9
);
menu.adicionarBebida(
  "Caldo de Cana",
  "img/coquinha_gelada.png",
  "Copo 600ml",
  4.9
);
menu.adicionarBebida(
  "Corote Gelado",
  "img/coquinha_gelada.png",
  "Garrafa 400ml",
  4.9
);

menu.adicionarSobremesa(
  "Pudim",
  "img/pudim.png",
  "Gosto de doce de leite",
  7.9
);
menu.adicionarSobremesa("Flam", "img/pudim.png", "Gosto de chocolate", 7.9);
menu.adicionarSobremesa("Brigadeiro", "img/pudim.png", "3 unidades", 7.9);

const pratosContainer = document.querySelector(".opcoes.prato");
menu.pratos.forEach((prato) => pratosContainer.appendChild(prato.getView()));
const bebidasContainer = document.querySelector(".opcoes.bebida");
menu.bebidas.forEach((bebida) =>
  bebidasContainer.appendChild(bebida.getView())
);
const sobremesasContainer = document.querySelector(".opcoes.sobremesa");
menu.sobremesas.forEach((sobremesa) =>
  sobremesasContainer.appendChild(sobremesa.getView())
);
