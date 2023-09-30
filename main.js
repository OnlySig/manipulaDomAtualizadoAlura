const btnDescanso = document.querySelectorAll(".app__card-list-item")
const bgHtml = document.querySelector("html")
const btnComecar = document.querySelector("#start-pause")
const imgFundo = document.querySelector(".app__image")
const imgBtn = document.querySelector(".app__card-primary-butto-icon")
const appTitle = document.querySelector(".app__title")
const inputToggleSwitch = document.querySelector("#alternar-musica")
const tempoTela = document.querySelector("#timer")
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const audioPlay = new Audio("./sons/play.wav")
const audioPause = new Audio("./sons/pause.mp3")
const audioEnd = new Audio("./sons/beep.mp3")

musica.loop = true

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

inputToggleSwitch.addEventListener("change", _ => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

btnDescanso.forEach(element => {
    element.addEventListener("click", e => {
        element.firstElementChild.classList.add("active")
        if(e.target.innerHTML === "Foco") {
            mostrarTempo(tempoDecorridoEmSegundos = 1500)
            alterarContexto("foco", 1, 2, element)
            alterarTitle("Otimize sua produtividade,", "mergulhe no que importa.")
        } else if(e.target.innerHTML === "Descanso curto") {
            mostrarTempo(tempoDecorridoEmSegundos = 300)
            alterarContexto("descanso-curto", 0, 2, element)
            alterarTitle('Que tal dar uma respirada?', 'Faça uma pausa curta!')
        } else if(e.target.innerHTML === "Descanso longo") {
            mostrarTempo(tempoDecorridoEmSegundos = 900)
            alterarContexto("descanso-longo", 1, 0, element)
            alterarTitle('Hora de voltar à superfície.', 'Faça uma pausa longa.')
        }
    })
})

function alterarContexto(contexto, valor1, valor2, element) {
    bgHtml.setAttribute("data-contexto", contexto)
    imgFundo.setAttribute("src", `./imagens/${contexto}.png`)
    element.parentNode.children[valor1].firstElementChild.classList.remove("active")
    element.parentNode.children[valor2].firstElementChild.classList.remove("active")
}

function alterarTitle(h1, h2) {
    appTitle.innerHTML = `
        <h1 class="app__title">
            ${h1}<br>
            <strong class="app__title-strong">${h2}</strong>
        </h1>
    `
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        audioEnd.play()
        alert("acabou!")
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

btnComecar.addEventListener("click", iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) {
        audioPause.play()
        zerar()
        return
    }
    audioPlay.play()
    btnComecar.childNodes[3].textContent = "Pausar"
    imgBtn.src = "./imagens/pause.png"
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
    btnComecar.childNodes[3].textContent = "Começar"
    imgBtn.src = "./imagens/play_arrow.png"
}

function mostrarTempo(tempoParam) {
    tempoParam = tempoDecorridoEmSegundos
    const tempo = new Date(tempoParam * 1000)
    const tempoFormatado = tempo.toLocaleString("pt-br", {minute: '2-digit', second: '2-digit'})
    tempoTela.innerHTML = tempoFormatado
}

mostrarTempo()