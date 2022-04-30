const button = document.querySelector("#instructions");
const article = document.querySelector("article");

const displayInstructions = (event) => {
  if (article.dataset.display === "false") {
    article.dataset.display = "true";
  } else {
    article.dataset.display = "false";
  }
};

button.addEventListener("click", displayInstructions);
