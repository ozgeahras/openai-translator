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

txtWillTranslate.addEventListener("mouseover", (e) => {
  console.log("this wil be the function");
  e.preventDefault();
  fetchReply();
});

async function fetchReply() {
  try {
    const response = await fetch("/.netlify/functions/openai", {
      method: "POST",
      body: JSON.stringify({ text: txtWillTranslate.value }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json();
    console.log(jsonData);
    txtTranslated.innerText = jsonData.reply;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
