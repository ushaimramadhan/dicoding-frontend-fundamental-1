class NoteItem extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
        <div class="note-item">
            <h3 class="note-title">Contoh Judul</h3>
            <p class="note-body">Ini adalah isi catatan contoh.</p>
        </div>
        `;
  }
}

customElements.define("note-item", NoteItem);
