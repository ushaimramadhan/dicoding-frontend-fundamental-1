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
            <input type="text" id="title" name="title" required />
            <p id="titleValidation" class="validation-message"></p>
          </div>
          
          <div class="form-group">
            <label for="body">Isi Catatan</label>
            <textarea id="body" name="body" required></textarea>
            <p id="bodyValidation" class="validation-message"></p>
          </div>
          
          <button type="submit">Tambah Catatan</button>
        </form>
      </div>
    `;

    // 1. Ambil elemen
    const form = this.querySelector("form");
    const titleInput = this.querySelector("#title");
    const titleError = this.querySelector("#titleValidation");
    const bodyInput = this.querySelector("#body");
    const bodyError = this.querySelector("#bodyValidation");

    // 2. Fungsi Logika Validasi (Cek aturan di sini)
    const customValidationHandler = (event) => {
      event.target.setCustomValidity(""); // Reset validitas bawaan

      if (event.target.validity.valueMissing) {
        event.target.setCustomValidity("Wajib diisi.");
        return;
      }

      // Aturan Khusus: Minimal 6 karakter
      if (event.target.id === "body" && event.target.value.length < 6) {
        event.target.setCustomValidity("Minimal panjang karakter adalah 6.");
        return;
      }
    };

    // 3. Fungsi Menampilkan Error ke Layar
    const updateValidationUI = (event, errorElement) => {
      const isValid = event.target.checkValidity();

      if (!isValid) {
        // Jika tidak valid: Tampilkan pesan & warna merah
        errorElement.innerText = event.target.validationMessage;
        event.target.classList.add("invalid");
      } else {
        // Jika valid: Bersihkan pesan & warna merah
        errorElement.innerText = "";
        event.target.classList.remove("invalid");
      }
    };

    // 4. Pasang Event Listener 'blur' (Jalan saat KLIK LUAR)
    //    Ini yang akan memicu pesan error muncul seketika.
    titleInput.addEventListener("blur", (event) => {
      customValidationHandler(event); // Cek aturan
      updateValidationUI(event, titleError); // Tampilkan hasil
    });

    bodyInput.addEventListener("blur", (event) => {
      customValidationHandler(event);
      updateValidationUI(event, bodyError);
    });

    // 5. Pasang Event Listener 'input' (Jalan saat MENGETIK)
    //    Ini biar error-nya hilang real-time kalau user sudah memperbaiki tulisannya.
    titleInput.addEventListener("input", (event) => {
      customValidationHandler(event);
      // Hanya update UI jika inputan jadi valid (hilangkan merah)
      // Biar user ga diganggu merah-merah pas baru ngetik 1 huruf
      if (event.target.validity.valid) {
        updateValidationUI(event, titleError);
      }
    });

    bodyInput.addEventListener("input", (event) => {
      customValidationHandler(event);
      if (event.target.validity.valid) {
        updateValidationUI(event, bodyError);
      }
    });

    // 6. Handle Submit Utama
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Cek validitas semua input dulu sebelum proses
      if (!form.checkValidity()) {
        return; // Stop kalau masih ada yang error
      }

      const newNote = {
        id: `notes-${Math.random().toString(36).substring(2, 9)}`,
        title: titleInput.value,
        body: bodyInput.value,
        createdAt: new Date().toISOString(),
        archived: false,
      };

      this.dispatchEvent(
        new CustomEvent("submit-note", {
          detail: newNote,
          bubbles: true,
        })
      );

      form.reset();
      // Bersihkan sisa style error setelah submit berhasil
      titleError.innerText = "";
      bodyError.innerText = "";
      titleInput.classList.remove("invalid");
      bodyInput.classList.remove("invalid");
    });
  }
}

customElements.define("note-input", NoteInput);
