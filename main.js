const btnStart = document.querySelector(".btnStart");
const secStartGame = document.querySelector(".secStartGame");
const tableauScore = document.querySelector(".tableauScore");
const spanNum1 = document.querySelector(".spanNum1");
const spanNum2 = document.querySelector(".spanNum2");
const minSpan = document.getElementById("min");
const secSpan = document.getElementById("sec");
const nbQuest = document.getElementById("quest");
const btnValid = document.getElementById("valider");
const secScore = document.querySelector(".score");
const inputResult = document.getElementById("result");
const secScoreGame = document.querySelector(".secScoreGame");
const btnQuit = document.querySelector(".btnQuit");
const spanScoreGame = document.querySelector(".spanScoreGame");

let questActu = 1;
let score = 0;
let sec = 0;
let min = 0;
let bonneRep = null;
let historiqueScores = [];

btnStart.addEventListener("click", () => {
    secStartGame.style.display = "none";
    const q = addition();
    console.log(q);
    bonneRep = q.result;
    time();
    inputResult.focus();
});

let timer;

const time = () => {
    sec = 0;
    min = 0;

    timer = setInterval(() => {
        sec++;

        if (sec == 60) {
            sec = 0;
            min++;
        }

        secSpan.textContent = sec.toString().padStart(2, "0");
        minSpan.textContent = min.toString();
    }, 1000);

}

btnQuit.addEventListener("click", () => {
    secScoreGame.style.display = "none";
    secStartGame.style.display = "flex";
    questActu = 1;
    score = 0;
    sec = 0;
    min = 0;
    nbQuest.textContent = questActu;
    inputResult.value = "";
});

let previousNum2 = null;

function addition() {
    let num1;
    let num2;

    if (previousNum2 === null) {
        num1 = Math.floor(Math.random() * 9) + 1;
    } else {
        num1 = previousNum2;
    }

    num2 = Math.floor(Math.random() * 9) + 1;

    previousNum2 = num2;

    spanNum1.textContent = num1;
    spanNum2.textContent = num2;

    let result = num1 + num2;
    return { num1, num2, result };
}

function trierScores(historique) {
    for (let i = 0; i < historique.length; i++) {
        for (let j = 0; j < historique.length - 1 - i; j++) {
            if (historique[j].score < historique[j + 1].score) {
                let temp = historique[j];
                historique[j] = historique[j + 1];
                historique[j + 1] = temp;
            }
        }
    }
    return historique;
}


btnValid.addEventListener("click", () => {
    const reponseUtilisateur = Number(inputResult.value);
    if (reponseUtilisateur === bonneRep) {
        score++;
    }
    questActu++;
    nbQuest.textContent = questActu;
    if (questActu <= 20) {
        const q = addition();
        bonneRep = q.result;
        inputResult.value = "";
        inputResult.focus();
    } else {
        clearInterval(timer);
        secScoreGame.style.display = "flex";
        spanScoreGame.textContent = `${score}/20 en ${min}min ${sec}s`;
        historiqueScores.push({ score: score, temps: `${min}min ${sec}s` });
        trierScores(historiqueScores);
        afficherMeilleursScores();
    }
});
function afficherMeilleursScores() {
    trierScores(historiqueScores);

    tableauScore.innerHTML = "";

    const divTotal = createContainer("divTotal", "", "div");

    for (let i = 0; i < 3; i++) {
        const divScore = createContainer("divScore", "", "div");
        const pScore = createText("pScore", "", "p", `N°${i + 1}`);
        const spanScore = createText("spanScore", "", "span",
            historiqueScores[i] ? `${historiqueScores[i].score}pts` : "0pts");
        const spanTemps = createText("spanTemps", "", "span",
            historiqueScores[i] ? historiqueScores[i].temps : "0min0s");

        divScore.appendChild(pScore);
        divScore.appendChild(spanScore);
        divScore.appendChild(spanTemps);
        divTotal.appendChild(divScore);
    }

    tableauScore.appendChild(divTotal);
}


function createContainer(classe="", id="", type){
    const element = document.createElement(type);

    if (classe) element.classList.add(classe);
    if (id) element.id = id;

    return element
}

function createText(classe="", id="", type, text){
    const element = document.createElement(type);

    if (classe) element.classList.add(classe);
    if (id) element.id = id;
    element.textContent = text
    return element
}

    // const divTotal = createContainer("divTotal", "", "div");

    // const firstScore = createContainer("divScore", "", "div");
    // const pScore1 = createText("pScore", "", "p", "N°1");
    // const spanScore1 = createText("spanScore", "", "span", `${score}pts`);
    // const spanTemps1 = createText("spanTemps", "", "span", `${min}min${sec}s`);
    // const secondScore = createContainer("divScore", "", "div");
    // const pScore2 = createText("pScore", "", "p", "N°2");
    // const spanScore2 = createText("spanScore", "", "span", `${score}pts`);
    // const spanTemps2 = createText("spanTemps", "", "span", `${min}min${sec}s`);
    // const lastScore = createContainer("divScore", "", "div");
    // const pScore3 = createText("pScore", "", "p", "N°3");
    // const spanScore3 = createText("spanScore", "", "span", `${score}pts`);
    // const spanTemps3 = createText("spanTemps", "", "span", `${min}min${sec}s`);


    // divTotal.appendChild(firstScore);
    // firstScore.appendChild(pScore1);
    // firstScore.appendChild(spanScore1);
    // firstScore.appendChild(spanTemps1);

    // divTotal.appendChild(secondScore);
    // secondScore.appendChild(pScore2);
    // secondScore.appendChild(spanScore2);
    // secondScore.appendChild(spanTemps2);

    // divTotal.appendChild(lastScore);
    // lastScore.appendChild(pScore3);
    // lastScore.appendChild(spanScore3);
    // lastScore.appendChild(spanTemps3);

    // tableauScore.appendChild(divTotal);