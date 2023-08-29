import "./style.css";

const selLanguage = document.getElementById("languages");
const txtWillTranslate = document.getElementById("will-translate");
const txtTranslated = document.getElementById("translated");

selLanguage.addEventListener("change", () => {
  selectLanguage(selLanguage.value);
});

function selectLanguage(language) {
  console.log("selected language: ", language);
}
