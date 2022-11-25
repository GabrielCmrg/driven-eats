import Menu from "./menu.js";

export default class Restaurante {
  constructor(telefone, menu = undefined) {
    this.telefone = telefone;
    this.btnConfirmar = document.querySelector(".confirmar");
    this.btnConfirmar.addEventListener("click", () => {
      this.enviarZap();
    });

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
