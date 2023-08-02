export const http = "http://localhost:3000";

export async function get(dados, temInput, temSelect) {
  try {
    const response = await axios.get(`${http}/${dados}`);

    document.querySelector(".alinharLoading").style.display = "none";

    if (temInput) {
      const inputs = document.querySelectorAll("input");
      for (let input of inputs) {
        input.removeAttribute("disabled", "disabled");
      };
    };

    if (temSelect) {
      const selects = document.querySelectorAll("select");
      for (let select of selects) {
        select.removeAttribute("disabled", "disabled");
      };
    };

    return response.data;
  } catch {
    mensagemErro("Desculpe, nosso servidor está fora do ar no momento!");
  };
};

export async function colocarNoSelect(dados, select) {
  for (let i of dados) {
    const option = document.createElement("option");
    const text = document.createTextNode(i.nome);

    option.append(text);
    option.value = i.id;
    select.append(option);
  };
};

export function alertarErro(div, mensagem) {
  div.classList.add("alert", "alert-danger");

  const tag = document.createElement("p");
  const text = document.createTextNode(mensagem);
  tag.append(text);
  tag.style.margin = 0;

  return tag;
};

export function mensagemErro(mensagem) {
  const main = document.querySelector("main");
  main.style.filter = "blur(5px)";

  const error = document.createElement("div");
  error.style.backgroundColor = "white";
  error.style.padding = "20px";
  error.style.fontSize = "20px";
  error.style.border = "2px solid black";
  error.style.position = "absolute";
  error.style.top = "50%";
  error.style.left = "50%";
  error.style.transform = "translate(-50%, -50%)";

  const text = document.createTextNode(mensagem);
  error.append(text);
  document.body.append(error);

  const inputs = document.querySelectorAll("input");
  for (let input of inputs) {
    input.setAttribute("disabled", "disabled");
  };

  const selects = document.querySelectorAll("select");
  for (let select of selects) {
    select.setAttribute("disabled", "disabled");
  };
};

export function mensagemBotao(mensagem, mensagemBotao, link) {
  const main = document.querySelector("main");
  main.style.filter = "blur(5px)";

  const error = document.createElement("div");
  error.style.backgroundColor = "white";
  error.style.padding = "20px";
  error.style.fontSize = "20px";
  error.style.border = "2px solid black";
  error.style.position = "absolute";
  error.style.top = "50%";
  error.style.left = "50%";
  error.style.transform = "translate(-50%, -50%)";

  const text = document.createTextNode(mensagem);
  error.append(text);

  const button = document.createElement("button");
  const textButton = document.createTextNode(mensagemBotao);
  button.append(textButton);

  const a = document.createElement("a");
  a.append(button);

  a.href = `${link}`;
  a.style.padding = "0px 10px";
  a.style.margin = "25px 0px";

  const div = document.createElement("div");
  div.style.display = "grid";
  div.style.placeItems = "center";
  div.append(a);

  error.append(div);
  document.body.append(error);

  const inputs = document.querySelectorAll("input");
  for (let input of inputs) {
    input.setAttribute("disabled", "disabled");
  };

  const selects = document.querySelectorAll("select");
  for (let select of selects) {
    select.setAttribute("disabled", "disabled");
  };
};