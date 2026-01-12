class NoteInput extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="note-input-container">
            <h2>Tambah Catatan Baru</h2>
            <form id="form">
                <div class="form-group">
                <label for="title">Judul</label>
                <input type="text" id="title" name="title" placeholder="Masukkan judul..." required />
                </div>

                <div class="form-group">
                <label for="body">Isi Catatan</label>
                <textarea id="body" name="body" placeholder="Masukkan isi catatan..." required></textarea>
                </div>

                <button type="submit">Tambah Catatan</button>
            </form>
        </div>
        `;
  }
}

customElements.define("note-input", NoteInput);
