export default class Sobremesa {
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
