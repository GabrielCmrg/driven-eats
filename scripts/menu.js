import Prato from "./prato.js";
import Bebida from "./bebida.js";
import Sobremesa from "./sobremesa.js";

export default class Menu {
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
    this.btnPedir.addEventListener("click", () => {
      this.confirmarPedido();
    });

    this.btnCancelar = document.querySelector(".cancelar");
    this.btnCancelar.addEventListener("click", () => {
      this.cancelarPedido();
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
