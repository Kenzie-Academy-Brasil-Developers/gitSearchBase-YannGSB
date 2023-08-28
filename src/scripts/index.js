const baseUrl = "https://api.github.com/users/";

const fetchUserData = async (userName) => {
  const request = await fetch(`${baseUrl}${userName}`, {
    method: "GET",
  })
    .then(async (req) => {
      if (req.ok) {
        const reqConvert = await req.json();

        localStorage.setItem(
          "@gitSearch:githubUserInfo",
          JSON.stringify(reqConvert)
        );
        location.replace("./src/pages/profile.html");
      } else {
        location.replace("./src/pages/error.html");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return fetchUserData;
};

const toErrorPage = () => {
  const errorPageUrl = "/src/pages/error.html";
  window.location.href = errorPageUrl;
};

const handleSearch = () => {
  const button = document.querySelector(".index__button");
  const input = document.querySelector(".index__input");
  button.addEventListener("click", () => {
    const userName = input.value;
    fetchUserData(userName);
  });
};

handleSearch();
