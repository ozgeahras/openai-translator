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

txtWillTranslate.addEventListener("keypress", (e) => {
  console.log("this wil be the function");
  e.preventDefault();
  fetchReply();
});

async function fetchReply() {
  const response = await fetch("/.netlify/functions/openai", {
    method: "POST",
    body: JSON.stringify({ text: txtWillTranslate.value }),
    headers: { "Content-Type": "application/json" },
  });

  const { reply } = await response.json();
  txtTranslated.innerText = reply;
}
