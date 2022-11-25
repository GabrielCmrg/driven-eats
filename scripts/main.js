import Prato from "./prato.js";
import Bebida from "./bebida.js";
import Sobremesa from "./sobremesa.js";

const btnConfirmar = document.querySelector(".confirmar");
const btnCancelar = document.querySelector(".cancelar");
const btnPedir = document.querySelector(".fazer-pedido");

class Menu {
  constructor(pratos = [], bebidas = [], sobremesas = []) {
    this.pratos = pratos;
    this.bebidas = bebidas;
    this.sobremesas = sobremesas;

    this.pratos.forEach(this.adicionarPratoListener);
    this.bebidas.forEach(this.adicionarBebidaListener);
    this.sobremesas.forEach(this.adicionarSobremesaListener);

    this.pratoSelecionado = null;
    this.bebidaSelecionada = null;
    this.sobremesaSelecionada = null;
  }

  getPrecoTotal() {
    return (
      this.pratoSelecionado.preco +
      this.bebidaSelecionada.preco +
      this.sobremesaSelecionada.preco
    );
  }

  adicionarPrato(nome, imagem, descricao, preco) {
    const novoPrato = new Prato(nome, imagem, descricao, preco);
    this.adicionarPratoListener(novoPrato);
    this.pratos.push(novoPrato);
  }

  adicionarBebida(nome, imagem, descricao, preco) {
    const novaBebida = new Bebida(nome, imagem, descricao, preco);
    this.adicionarBebidaListener(novaBebida);
    this.bebidas.push(novaBebida);
  }

  adicionarSobremesa(nome, imagem, descricao, preco) {
    const novaSobremesa = new Sobremesa(nome, imagem, descricao, preco);
    this.adicionarSobremesaListener(novaSobremesa);
    this.sobremesas.push(novaSobremesa);
  }

  selecionarPrato(prato) {
    const selecionado = this.pratos.reduce((resultado, atual) => {
      if (resultado) return resultado;
      if (atual.selecionado) return atual;
    }, undefined);
    if (selecionado) {
      selecionado.desselecionar();
    }
    prato.selecionar();

    this.pratoSelecionado = {
      nome: prato.nome,
      preco: prato.preco,
    };
    verificarPedido();
  }

  selecionarBebida(bebida) {
    const selecionado = this.bebidas.reduce((resultado, atual) => {
      if (resultado) return resultado;
      if (atual.selecionado) return atual;
    }, undefined);
    if (selecionado) {
      selecionado.desselecionar();
    }
    bebida.selecionar();

    this.bebidaSelecionada = { nome: bebida.nome, preco: bebida.preco };
    verificarPedido();
  }

  selecionarSobremesa(sobremesa) {
    const selecionado = this.sobremesas.reduce((resultado, atual) => {
      if (resultado) return resultado;
      if (atual.selecionado) return atual;
    }, undefined);
    if (selecionado) {
      selecionado.desselecionar();
    }
    sobremesa.selecionar();

    this.sobremesaSelecionada = {
      nome: sobremesa.nome,
      preco: sobremesa.preco,
    };
    verificarPedido();
  }

  adicionarPratoListener(prato) {
    const elemento = prato.elemento;
    elemento.addEventListener("click", () => this.selecionarPrato(prato));
  }

  adicionarBebidaListener(bebida) {
    const elemento = bebida.elemento;
    elemento.addEventListener("click", () => this.selecionarBebida(bebida));
  }

  adicionarSobremesaListener(sobremesa) {
    const elemento = sobremesa.elemento;
    elemento.addEventListener("click", () =>
      this.selecionarSobremesa(sobremesa)
    );
  }

  confirmarPedido() {
    const modal = document.querySelector(".overlay");
    modal.classList.remove("escondido");

    document.querySelector(".confirmar-pedido .prato .nome").innerHTML =
      this.pratoSelecionado.nome;
    document.querySelector(".confirmar-pedido .prato .preco").innerHTML =
      this.pratoSelecionado.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .bebida .nome").innerHTML =
      this.bebidaSelecionada.nome;
    document.querySelector(".confirmar-pedido .bebida .preco").innerHTML =
      this.bebidaSelecionada.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .sobremesa .nome").innerHTML =
      this.sobremesaSelecionada.nome;
    document.querySelector(".confirmar-pedido .sobremesa .preco").innerHTML =
      this.sobremesaSelecionada.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .total .preco").innerHTML =
      this.getPrecoTotal().toFixed(2);
  }
}

const menu = new Menu();

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

function cancelarPedido() {
  const modal = document.querySelector(".overlay");
  modal.classList.add("escondido");
}

function enviarZap() {
  const telefoneRestaurante = 553299999999;
  const encodedText = encodeURIComponent(
    `Olá, gostaria de fazer o pedido: \n- Prato: ${
      menu.pratoSelecionado.nome
    } \n- Bebida: ${menu.bebidaSelecionada.nome} \n- Sobremesa: ${
      menu.sobremesaSelecionada.nome
    } \nTotal: R$ ${menu.getPrecoTotal().toFixed(2)}`
  );

  const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`;
  window.open(urlWhatsapp);
}

function verificarPedido() {
  if (
    menu.pratoSelecionado &&
    menu.bebidaSelecionada &&
    menu.sobremesaSelecionada
  ) {
    btnPedir.classList.add("ativo");
    btnPedir.disabled = false;
    btnPedir.innerHTML = "Fazer pedido";
  }
}

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

btnConfirmar.addEventListener("click", () => {
  enviarZap();
});

btnCancelar.addEventListener("click", () => {
  cancelarPedido();
});

btnPedir.addEventListener("click", () => {
  menu.confirmarPedido();
});
