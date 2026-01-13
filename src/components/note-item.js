class NoteItem extends HTMLElement {
  constructor() {
    super();
    this._note = {
      id: 0,
      title: 'NEED_DATA',
      body: 'NEED_DATA',
      createdAt: '',
      archived: false,
    };
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="note-item">
            <h3>${this._note.title}</h3>
            <p>${this._note.body}</p>
            <button class="btn-delete" type="button">Hapus</button>
        </div>
        `;

    const deleteBtn = this.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('delete-note', {
          detail: { id: this._note.id },
          bubbles: true,
        }),
      );
    });
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('note-item', NoteItem);
