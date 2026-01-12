class NoteItem extends HTMLElement {
  constructor() {
    super();
    this._note = {
        id: 0,
        title: "NEED_DATA",
        body: "NEED_DATA",
        createdAt: "",
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
        </div>
        `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("note-item", NoteItem);
