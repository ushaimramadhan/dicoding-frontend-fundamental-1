class AppBar extends HTMLElement {
  // 1. Definisikan atribut apa saja yang mau dipantau
  static get observedAttributes() {
    return ["title"];
  }

  constructor() {
    super();
    // Inisialisasi title default jika atribut tidak diisi
    this._title = "Notes App";
  }

  // 2. Fungsi ini jalan OTOMATIS saat atribut 'title' di HTML berubah/dipasang
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
      this._title = newValue; // Update properti internal
      this.render(); // Render ulang tampilan
    }
  }

  connectedCallback() {
    // Ambil nilai awal dari atribut HTML (jika ada) saat pertama kali dimuat
    if (this.hasAttribute("title")) {
      this._title = this.getAttribute("title");
    }
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="app-bar">
        <h1>${this._title}</h1> 
      </div>
    `;
  }
}

customElements.define("app-bar", AppBar);