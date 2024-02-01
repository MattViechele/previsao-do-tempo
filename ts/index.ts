const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");

const sectionTempoInfo = document.querySelector("#tempo-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionTempoInfo) return;

  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert("O local precisa ter pelo menos 3 letras");
    return;
  }

  try {
    const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&lang=pt_br&appid=36641337fcd82e5006466307dbf4b15c`
    );

    const dados = await resposta.json();

    const infos = {
      temperatura: Math.floor(dados.main.temp / 10),
      local: dados.name,
      icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
    };

    sectionTempoInfo.innerHTML = `
    <div class="tempo-dados">
      <h2>${infos.local}</h2>
  
      <span>${infos.temperatura}°C</span>
    </div>
  
    <img src="${infos.icone}">
    `;
  } catch (err) {
    console.log("Deu uma erro na obtenção dos dados da API.", err);
  }
});
