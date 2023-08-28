const redirectToHomePage = () => {
  const button = document.querySelector(".new-search__button");
  button.addEventListener("click", () => {
    location.replace("/index.html");
  });
};

redirectToHomePage();
