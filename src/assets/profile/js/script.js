if (document.getElementById("editor")) {
  var quill = new Quill("#editor", {
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
      ],
    },
    placeholder:
      "متن مختصری برای معرفی خود بنویسید، این متن در صفحه پروفایل شما نمایش داده خواهد شد.",
    theme: "snow",
  });
}

const profileCoverInput = document.getElementById("profileCover");
const profileCoverPreview = document.getElementById("profileCoverPreview");

if (profileCoverInput) {
  profileCoverInput.addEventListener("change", () => {
    const [file] = profileCoverInput.files;
    if (file) {
      profileCoverPreview.src = URL.createObjectURL(file);
      profileCoverPreview.classList.remove("fix-hidden");
    }
  });
}
