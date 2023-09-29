const btnDescanso = document.querySelectorAll(".app__card-list-item")
const bgHtml = document.querySelector("html")
const imgFundo = document.querySelector(".app__image")
const appTitle = document.querySelector(".app__title")

btnDescanso.forEach(element => {
    element.addEventListener("click", e => {
        element.firstElementChild.classList.add("active")
        if(e.target.innerHTML === "Foco") {
            alterarContexto("foco", 1, 2, element)
            alterarTitle("Otimize sua produtividade,", "mergulhe no que importa.")
        } else if(e.target.innerHTML === "Descanso curto") {
            alterarContexto("descanso-curto", 0, 2, element)
            alterarTitle('Que tal dar uma respirada?', 'Faça uma pausa curta!')
        } else {
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