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

txtWillTranslate.addEventListener("onkeydown", (e) => {
  e.preventDefault();
  const text = txtWillTranslate.textContent;
  txtTranslated.textContent = "";
  fetchReply(text);
});

async function fetchReply(text) {
  try {
    const response = await fetch("/.netlify/functions/openai", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json();
    txtTranslated.innerText = jsonData.reply;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
