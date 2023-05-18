const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const itensSalvos = {
    cnpj: e.target.elements["cnpj"].value,
    razaoSocial: e.target.elements["razaoSocial"].value,
    cpf: e.target.elements["cpf"].value,
    nomeDoRepresentante: e.target.elements["nomeDoRepresentante"].value,
    apelido: e.target.elements["apelido"].value,
    numeroDeFuncionarios: e.target.elements["numeroDeFuncionarios"].value,
    faturamentoAnual: e.target.elements["faturamentoAnual"].value,
  };
  localStorage.setItem("cadastro", JSON.stringify(itensSalvos));

  window.location.href = '../pages/confirmacao.html';
});
camposDoFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificaCampo(campo));
  campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

const tiposDeErro = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooShort",
  "customError",
];
const mensagens = {
  cnpj: {
    valueMissing: "cnpj inválido",
    patternMismatch: "cnpj inválido",
    tooShort: "cnpj inválido",
  },
  razaoSocial: {
    valueMissing: "tamanho máximo de 30 caracteres",
    patternMismatch: "tamanho máximo de 30 caracteres",
    tooShort: "tamanho máximo de 30 caracteres",
  },
  cpf: {
    valueMissing: "cpf inválido.",
    patternMismatch: "cpf inválido.",
    tooShort: "cpf inválido.",
  },
  nomeDoRepresentante: {
    valueMissing: "tamanho máximo de 20 caracteres.",
    patternMismatch: "tamanho máximo de 20 caracteres.",
    tooShort: "tamanho máximo de 20 caracteres.",
  },
  apelido: {
    valueMissing: "tamanho máximo de 10 caracteres.",
    patternMismatch: "tamanho máximo de 10 caracteres.",
    tooShort: "tamanho máximo de 10 caracteres.",
  },
  numeroDeFuncionarios: {
    valueMissing: "campo obrigatório",
    patternMismatch: "campo obrigatório",
    tooShort: "campo obrigatório",
  },
  faturamentoAnual: {
    valueMissing: "campo obrigatório",
    patternMismatch: "campo obrigatório",
    tooShort: "campo obrigatório",
  },
};

function verificaCampo(campo) {
  let mensagem = "";
  campo.setCustomValidity("");
  tiposDeErro.forEach((erro) => {
    if (campo.validity[erro]) {
      mensagem = mensagens[campo.name][erro];
      console.log(mensagem);
    }
  });

  const mensagemErro = campo.parentNode.querySelector(".mensagemErro");
  const validadorDeInput = campo.checkValidity();

  if (!validadorDeInput) {
    mensagemErro.textContent = mensagem;
  } else {
    mensagemErro.textContent = "";
  }
}

function criarMascara() {
  const cnpj = document.getElementsByName("cnpj")[0];
  const cnpjMascara = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
  };
  cnpj.addEventListener("input", (event) => {
    event.target.value = cnpjMascara(event.target.value);
  });

  const cpf = document.getElementsByName("cpf")[0];
  const cpfMascara = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
  };
  cpf.addEventListener("input", (event) => {
    event.target.value = cpfMascara(event.target.value);
  });

  const numeroDeFuncionarios = document.getElementsByName(
    "numeroDeFuncionarios"
  )[0];
  const numeroDeFuncionariosMascara = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/, ".")
      .replace(/\B(?=(\d{3})+(?!\d))/, ".")
      .replace(/\B(?=(\d{3})+(?!\d))/, ".")
      .substr(0, 12);
  };
  numeroDeFuncionarios.addEventListener("input", (event) => {
    event.target.value = numeroDeFuncionariosMascara(event.target.value);
  });

  const faturamentoAnual = document.getElementsByName("faturamentoAnual")[0];
  const faturamentoAnualMascara = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^/, "R$ ")
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
      .substr(0, 13);
  };
  faturamentoAnual.addEventListener("input", (event) => {
    event.target.value = faturamentoAnualMascara(event.target.value);
  });

  const razaoSocial = document.getElementsByName("razaoSocial")[0];
  const razaoSocialMascara = (value) => {
    return value.replace(/[^A-Za-z0-9\s]/g, "").substr(0, 30);
  };
  razaoSocial.addEventListener("input", (event) => {
    event.target.value = razaoSocialMascara(event.target.value);
  });

  const nomeDoRepresentante = document.getElementsByName(
    "nomeDoRepresentante"
  )[0];
  const nomeDoRepresentanteMascara = (value) => {
    return value.substr(0, 20);
  };
  nomeDoRepresentante.addEventListener("input", (event) => {
    event.target.value = nomeDoRepresentanteMascara(event.target.value);
  });

  const apelido = document.getElementsByName("apelido")[0];
  const apelidoMascara = (value) => {
    return value.substr(0, 10);
  };
  apelido.addEventListener("input", (event) => {
    event.target.value = apelidoMascara(event.target.value);
  });
}
criarMascara();
const inputs = Array.from(document.querySelectorAll("input"));
const button = document.querySelector("button");

const checkInputs = () => {
  return inputs.every((input) => input.value !== "");
};

const handleInputChange = () => {
  button.disabled = !checkInputs();
};

inputs.forEach((input) => {
  input.addEventListener("input", handleInputChange);
});