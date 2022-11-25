import Prato from "./prato.js";
import Bebida from "./bebida.js";
import Sobremesa from "./sobremesa.js";

const btnConfirmar = document.querySelector(".confirmar");
const btnCancelar = document.querySelector(".cancelar");

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

    this.btnPedir = document.querySelector(".fazer-pedido");
    btnPedir.addEventListener("click", () => {
      this.confirmarPedido();
    });
  }

  verificarPedido() {
    if (
      this.pratoSelecionado &&
      this.bebidaSelecionada &&
      this.sobremesaSelecionada
    ) {
      this.btnPedir.classList.add("ativo");
      this.btnPedir.disabled = false;
      this.btnPedir.innerHTML = "Fazer pedido";
    }
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
    this.verificarPedido();
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
    this.verificarPedido();
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
    this.verificarPedido();
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

  cancelarPedido() {
    const modal = document.querySelector(".overlay");
    modal.classList.add("escondido");
  }
}

class Restaurante {
  constructor(telefone, menu = undefined) {
    this.telefone = telefone;
    if (menu) {
      this.menu = menu;
    } else {
      this.menu = new Menu();
    }
  }

  enviarZap() {
    const telefoneRestaurante = this.telefone;
    const encodedText = encodeURIComponent(
      `Olá, gostaria de fazer o pedido: \n- Prato: ${
        this.menu.pratoSelecionado.nome
      } \n- Bebida: ${this.menu.bebidaSelecionada.nome} \n- Sobremesa: ${
        this.menu.sobremesaSelecionada.nome
      } \nTotal: R$ ${this.menu.getPrecoTotal().toFixed(2)}`
    );

    const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`;
    window.open(urlWhatsapp);
  }
}

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

btnConfirmar.addEventListener("click", () => {
  restaurante.enviarZap();
});

btnCancelar.addEventListener("click", () => {
  menu.cancelarPedido();
});
