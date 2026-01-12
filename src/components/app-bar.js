class AppBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="app-bar">
        <h1>Notes App</h1>
      </div>
    `;
  }
}

customElements.define("app-bar", AppBar);
