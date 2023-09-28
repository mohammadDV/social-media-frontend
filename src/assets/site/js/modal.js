document.addEventListener("DOMContentLoaded", function () {
  // Grabbers
  const loginCaller = document.getElementById("loginCaller");
  const signupDesktopCaller = document.getElementById("signupDesktopCaller");
  const signupMobileCaller = document.getElementById("signupMobileCaller");
  const mobileMenuCaller = document.getElementById("mobileMenuCaller");
  const mobileMenuCloser = document.getElementById("mobileMenuCloser");
  const modalPanel = document.getElementById("modalPanel");
  const modalOverly = document.getElementById("modalOverly");

  // Handlers
  const loginHandler = () => {
    const title = "ورود به ورزش تایمز";
    const data = `
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">ایمیل</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">پسورد</label>
          <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">من را بخاطر بسپار</label>
        </div>
        <button type="submit" class="btn vt-btv-primary w-100">ورود</button>
      </form>
      `;

    // Populate data
    populateModal(title, data);
    // Show modal
    displayModal();
  };
  const signupHandler = () => {
    const title = "ثبت نام در ورزش تایمز";
    const data = `
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">ایمیل</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">پسورد</label>
          <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">من را بخاطر بسپار</label>
        </div>
        <button type="submit" class="btn vt-btv-primary w-100">ثبت اطلاعات</button>
      </form>
      `;

    // Populate data
    populateModal(title, data);
    // Show modal
    displayModal();
  };
  const mobileMenuHandler = () => {
    const title = "فهرست پیوند ها و صفحات";
    const data = `
      <ul class="nav flex-column">
        <li class="nav-item">
          <button class="btn vt-menu-btn active">
            صفحه اصلی
          </button>
        </li>
        <li class="nav-item">
          <button class="btn vt-menu-btn">
            اخبار داخلی
          </button>
        </li>
        <li class="nav-item">
          <button class="btn vt-menu-btn">
            اخبار خارجی
          </button>
        </li>
        <li class="nav-item">
          <button class="btn vt-menu-btn">
            تحلیل فوتبالی
          </button>
        </li>
        <li class="nav-item">
          <button class="btn vt-menu-btn">
            غیر فوتبالی
          </button>
        </li>
        <li class="nav-item">
          <button class="btn vt-menu-btn">
            جداول لیگ
          </button>
        </li>
        <li class="nav-item">
          <button class="btn vt-menu-btn">
            ویدیو ها
          </button>
        </li>
        <li class="nav-item">
          <button class="btn vt-menu-btn">
            دانشنامه
          </button>
        </li>
      </ul>
      `;

    // Populate data
    populateModal(title, data);
    // Show modal
    displayModal();
  };

  // Functions
  const populateModal = (title, data) => {
    const modalPanelTitle = document.querySelector(".modal-panel--title");
    const modalPanelBodyInner = document.querySelector(
      ".modal-panel--body--inner"
    );

    modalPanelTitle.innerHTML = `<span>${title}</span>`;
    modalPanelBodyInner.innerHTML = `${data}`;
  };
  const displayModal = () => {
    modalPanel.classList.add("visibe");
    modalOverly.classList.add("visibe");
  };
  const hideModal = () => {
    modalPanel.classList.remove("visibe");
    modalOverly.classList.remove("visibe");
  };

  // Callers

  // loginCaller
  if (loginCaller) {
    loginCaller.addEventListener("click", loginHandler);
  }
  // signupCaller
  if (signupMobileCaller) {
    signupMobileCaller.addEventListener("click", signupHandler);
  }
  if (signupDesktopCaller) {
    signupDesktopCaller.addEventListener("click", signupHandler);
  }
  // mobileMenuCaller
  if (mobileMenuCaller) {
    mobileMenuCaller.addEventListener("click", mobileMenuHandler);
  }
  // Closers
  if (modalOverly) {
    modalOverly.addEventListener("click", hideModal);
  }
  if (mobileMenuCloser) {
    mobileMenuCloser.addEventListener("click", hideModal);
  }
});
