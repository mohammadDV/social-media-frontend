// document.addEventListener("DOMContentLoaded", function () {
//   const offcanvasToggles = document.querySelectorAll("[offcanvas-switch]");
//   const backdrop = document.querySelector(".backdrop-sm");

//   offcanvasToggles.forEach((offcanvasToggle) => {
//     offcanvasToggle.addEventListener("click", function () {
//       const targetPanel = offcanvasToggle.getAttribute("offcanvas-target");
//       const offcanvasPanel = document.querySelector(
//         `[is-offcanvas-target="${targetPanel}"]`
//       );

//       backdrop.classList.toggle("visible");
//       offcanvasPanel.classList.toggle("hidden");
//       offcanvasPanel.classList.toggle("visible");
//     });
//   });
//   console.log(offcanvasToggles);
// });

document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggles = document.querySelectorAll(
    '[data-bs-toggle="dropdown"]'
  );

  const backdrop = document.querySelector(".backdrop-sm");

  dropdownToggles.forEach((dropdownToggle) => {
    dropdownToggle.addEventListener("show.bs.dropdown", function () {
      backdrop.classList.add("visible");
    });

    dropdownToggle.addEventListener("hide.bs.dropdown", function () {
      backdrop.classList.remove("visible");
    });
  });
});
