const clearStorageRedirect = () => {
  const button = document.querySelector(".profile__change-user--button");
  button.addEventListener("click", () => {
    localStorage.removeItem("@gitSearch:githubUserInfo");
    location.replace("../../index.html");
  });
};

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("@gitSearch:githubUserInfo");
  const convertedUser = JSON.parse(user);
  return convertedUser;
};

const renderUserInfo = (obj) => {
  const userName = document.querySelector(".profile__username");
  const userImg = document.querySelector(".profile__image");
  userName.innerText = obj.login;
  userImg.src = obj.avatar_url;
};

const renderUserRepos = async (obj) => {
  const request = await fetch(
    `https://api.github.com/users/${obj.login}/repos`,
    {
      method: "GET",
    }
  )
    .then(async (repositorios) => {
      const reposConvert = await repositorios.json();
      const ul = document.querySelector(".profile__ul");

      reposConvert.forEach((repo) => {
        const li = document.createElement("li");
        const h4 = document.createElement("h4");
        const p = document.createElement("p");
        const a = document.createElement("a");

        h4.innerText = repo.name;
        p.innerText = repo.description
          ? repo.description
          : "Repositório sem descrição";

        a.innerText = "Repositório";
        a.href = repo.html_url;
        a.target = "_blank";

        li.appendChild(h4);
        li.appendChild(p);
        li.appendChild(a);

        ul.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar repositórios:", error);
    });
};

const userInfo = getUserFromLocalStorage();
renderUserInfo(userInfo);
renderUserRepos(userInfo);
clearStorageRedirect();
