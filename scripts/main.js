const btnConfirmar = document.querySelector(".confirmar");
const btnCancelar = document.querySelector(".cancelar");
const btnPedir = document.querySelector(".fazer-pedido");

class Prato {
  constructor(nome, imagem, descricao, preco) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;
    this.elemento = document.createElement("div");
    this.selecionado = false;
  }

  selecionar() {
    this.selecionado = true;
    this.elemento.classList.add("selecionado");
  }

  desselecionar() {
    this.selecionado = false;
    this.elemento.classList.remove("selecionado");
  }

  getView() {
    const view = this.elemento;
    view.classList.add("opcao");
    view.addEventListener("click", () => {
      selecionarPrato(this);
    });
    view.innerHTML = `
        <img src="${this.imagem}" />
        <div class="titulo">${this.nome}</div>
        <div class="descricao">${this.descricao}</div>
        <div class="fundo">
            <div class="preco">R$ ${this.preco.toFixed(2)}</div>
            <div class="check">
                <ion-icon name="checkmark-circle"></ion-icon>
            </div>
        </div>
    `;

    return view;
  }
}

class Bebida {
  constructor(nome, imagem, descricao, preco) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;
    this.elemento = document.createElement("div");
    this.selecionado = false;
  }

  selecionar() {
    this.selecionado = true;
    this.elemento.classList.add("selecionado");
  }

  desselecionar() {
    this.selecionado = false;
    this.elemento.classList.remove("selecionado");
  }

  getView() {
    const view = this.elemento;
    view.classList.add("opcao");
    view.addEventListener("click", () => {
      selecionarBebida(this);
    });
    view.innerHTML = `
        <img src="${this.imagem}" />
        <div class="titulo">${this.nome}</div>
        <div class="descricao">${this.descricao}</div>
        <div class="fundo">
            <div class="preco">R$ ${this.preco.toFixed(2)}</div>
            <div class="check">
                <ion-icon name="checkmark-circle"></ion-icon>
            </div>
        </div>
    `;

    return view;
  }
}

class Sobremesa {
  constructor(nome, imagem, descricao, preco) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;
    this.elemento = document.createElement("div");
    this.selecionado = false;
  }

  selecionar() {
    this.selecionado = true;
    this.elemento.classList.add("selecionado");
  }

  desselecionar() {
    this.selecionado = false;
    this.elemento.classList.remove("selecionado");
  }

  getView() {
    const view = this.elemento;
    view.classList.add("opcao");
    view.addEventListener("click", () => {
      selecionarSobremesa(this);
    });
    view.innerHTML = `
        <img src="${this.imagem}" />
        <div class="titulo">${this.nome}</div>
        <div class="descricao">${this.descricao}</div>
        <div class="fundo">
            <div class="preco">R$ ${this.preco.toFixed(2)}</div>
            <div class="check">
                <ion-icon name="checkmark-circle"></ion-icon>
            </div>
        </div>
    `;

    return view;
  }
}

class Menu {
  constructor(pratos = [], bebidas = [], sobremesas = []) {
    this.pratos = pratos;
    this.bebidas = bebidas;
    this.sobremesas = sobremesas;

    this.pratoSelecionado = null;
    this.bebidaSelecionada = null;
    this.sobremesaSelecionada = null;
  }

  adicionarPrato(nome, imagem, descricao, preco) {
    const novoPrato = new Prato(nome, imagem, descricao, preco);
    this.pratos.push(novoPrato);
  }

  adicionarBebida(nome, imagem, descricao, preco) {
    const novaBebida = new Bebida(nome, imagem, descricao, preco);
    this.bebidas.push(novaBebida);
  }

  adicionarSobremesa(nome, imagem, descricao, preco) {
    const novaSobremesa = new Sobremesa(nome, imagem, descricao, preco);
    this.sobremesas.push(novaSobremesa);
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

function selecionarPrato(prato) {
  const selecionado = menu.pratos.reduce((resultado, atual) => {
    if (resultado) return resultado;
    if (atual.selecionado) return atual;
  }, undefined);
  if (selecionado) {
    selecionado.desselecionar();
  }
  prato.selecionar();

  menu.pratoSelecionado = {
    nome: prato.nome,
    preco: prato.preco,
  };
  verificarPedido();
}

function selecionarBebida(bebida) {
  const selecionado = menu.bebidas.reduce((resultado, atual) => {
    if (resultado) return resultado;
    if (atual.selecionado) return atual;
  }, undefined);
  if (selecionado) {
    selecionado.desselecionar();
  }
  bebida.selecionar();

  menu.bebidaSelecionada = { nome: bebida.nome, preco: bebida.preco };
  verificarPedido();
}

function selecionarSobremesa(sobremesa) {
  const selecionado = menu.sobremesas.reduce((resultado, atual) => {
    if (resultado) return resultado;
    if (atual.selecionado) return atual;
  }, undefined);
  if (selecionado) {
    selecionado.desselecionar();
  }
  sobremesa.selecionar();

  menu.sobremesaSelecionada = { nome: sobremesa.nome, preco: sobremesa.preco };
  verificarPedido();
}

function getPrecoTotal() {
  return (
    menu.pratoSelecionado.preco +
    menu.bebidaSelecionada.preco +
    menu.sobremesaSelecionada.preco
  );
}

function confirmarPedido() {
  const modal = document.querySelector(".overlay");
  modal.classList.remove("escondido");

  document.querySelector(".confirmar-pedido .prato .nome").innerHTML =
    menu.pratoSelecionado.nome;
  document.querySelector(".confirmar-pedido .prato .preco").innerHTML =
    menu.pratoSelecionado.preco.toFixed(2);

  document.querySelector(".confirmar-pedido .bebida .nome").innerHTML =
    menu.bebidaSelecionada.nome;
  document.querySelector(".confirmar-pedido .bebida .preco").innerHTML =
    menu.bebidaSelecionada.preco.toFixed(2);

  document.querySelector(".confirmar-pedido .sobremesa .nome").innerHTML =
    menu.sobremesaSelecionada.nome;
  document.querySelector(".confirmar-pedido .sobremesa .preco").innerHTML =
    menu.sobremesaSelecionada.preco.toFixed(2);

  document.querySelector(".confirmar-pedido .total .preco").innerHTML =
    getPrecoTotal().toFixed(2);
}

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
    } \nTotal: R$ ${getPrecoTotal().toFixed(2)}`
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
  confirmarPedido();
});
