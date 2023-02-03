var displayLobbyExists = false
var displayRoletaExists = false
var statusBot
var colunaAusencia = 0
var duziaAusencia = 0
var altosBaixosRep = 0
var coresRep = 0
var parImparRep = 0
var alternanciaAltosBaixos = 0
var alternanciaCores = 0
var alternanciaParImpar = 0
var colunaRep = 0
var duziaRep = 0
var daniloRep = 0
var ficha = 0
var stopGain = 0
var stopLoss = 0
var cobrirZero = 0
var gale = 0
var roletas = []
var token = ''
var chat = ''

var fichaAposta = 0
var fichaZero = 0
var contagemAcertos = 0
var contagemErros = 0

var visaoLobby = 0
var fichasRoletas = []

// metodo de envio de mensagens do telegram
var request = new XMLHttpRequest();
var messageId = ''

function enviarMsgTelegram(msg) {
    try {
        if (token != undefined && token != '' && chat != undefined && chat != '') {

            request.onreadystatechange = function () {
                if (request.readyState == XMLHttpRequest.DONE) {
                    messageId = JSON.parse(request.response).result.message_id
                }
            }
            request.open("POST", `https://api.telegram.org/bot${token}/sendMessage`, true)
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
            request.send(JSON.stringify({ chat_id: chat, text: msg }))

        }
    } catch (err) {
        console.log('Erro na Api do Telegram - não enviou a mensagem')
        atualizarHistorico('Erro na Api do Telegram - não enviou a mensagem')
    }

}

function apagarMsgTelegram() {
    try {
        if (token != undefined && token != '' && chat != undefined && chat != '') {
            request.open("POST", `https://api.telegram.org/bot${token}/deleteMessage`, true)
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
            request.send(JSON.stringify({ chat_id: chat, message_id: messageId }))
        }
    } catch (err) {
        console.log('Erro na Api do Telegram - não apagou a mensagem')
        atualizarHistorico('Erro na Api do Telegram - não apagou a mensagem')
    }

}

function atualizarHistorico(protocolo) {
    chrome.storage.local.get(["historico"], (res) => {

        var historico = []
        if (res.historico == undefined) {
            historico = []
        } else {
            historico = res.historico
        }

        historico.push(protocolo)

        chrome.storage.local.set({
            historico,
        }, () => {
        })

    })
}

if (document.baseURI.includes('c365play')) {
    fichasRoletas = [{ nome: 'Super Spin Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
    { nome: 'bet365 Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'bet365 Dutch Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Ruleta Latinoamérica bet365', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Roleta Brasileira bet365', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Who Wants To Be a Millionaire? Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
    { nome: 'Mega Fire Blaze Roulette Live', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
    { nome: 'Quantum Roulette Live', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
    { nome: 'Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Age Of The Gods Bonus Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
    { nome: 'Football Roulette', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
    { nome: 'Hindi Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Speed Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Greek  Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Turkish Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Roleta Brasileira', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Quantum Auto Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
    { nome: 'Speed Auto Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Prestige Roulette', valores: ['5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'American Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
    { nome: 'Deutsches Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Auto Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Greek Quantum Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
    { nome: 'UK Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Bucharest Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Roulette Italiana', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Arabic Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Auto Roulette 2', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] },
    { nome: 'Nederlandstalige Roulette', valores: ['2.5', '5', '25', '50', '125', '500', '2.5k', '5k', '25k'] }]
} else if (document.baseURI.includes('cachedownload')) {
    fichasRoletas = [
        { nome: 'Ruleta Betano en Español', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Roleta Brasileira', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Mega Fire Blaze Roulette Live', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Who Wants To Be a Millionaire? Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'x1000 Quantum Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k'] },
        { nome: 'Quantum Roulette Live', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Football Roulette', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'American Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Speed Roulette', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Roulette', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k', '5k'] },
        { nome: 'Age Of The Gods Bonus Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Prestige Roulette', valores: ['5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Quantum Auto Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'UK Roulette', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Roulette Italiana', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Speed Auto Roulette', valores: ['0.5', '1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Auto Roulette', valores: ['0.5', '1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Bucharest Roulette', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Greek Quantum Roulette', valores: ['1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Turkish Roulette', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Deutsches Roulette', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Arabic Roulette', valores: ['0.5', '1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Hindi Roulette', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Greek  Roulette', valores: ['2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Auto Roulette 2', valores: ['0.5', '1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] },
        { nome: 'Nederlandstalige Roulette', valores: ['0.5', '1', '2.5', '5', '20', '50', '100', '500', '2k', '5k'] }]

}

var primeiraDuzia = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
var segundaDuzia = ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
var terceiraDuzia = ['25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36']
var primeiraColuna = ['1', '4', '7', '10', '13', '16', '19', '22', '25', '28', '31', '34']
var segundaColuna = ['2', '5', '8', '11', '14', '17', '20', '23', '26', '29', '32', '35']
var terceiraColuna = ['3', '6', '9', '12', '15', '18', '21', '24', '27', '30', '33', '36']
var numerosVermelhos = ['1', '3', '5', '7', '9', '12', '14', '16', '18', '19', '21', '23', '25', '27', '30', '32', '34', '36']
var numerosPretos = ['2', '4', '6', '8', '10', '11', '13', '15', '17', '20', '22', '24', '26', '28', '29', '31', '33', '35']
var numerosPares = ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '32', '34', '36']
var numerosImpares = ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23', '25', '27', '29', '31', '33', '35']
var numerosBaixos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
var numerosAltos = ['19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36']
var numerosDanilo = ['1', '2', '3', '34', '35', '36', '0']

var roletasLobby = []

var rodada = 0
var ciclo = 0
var sequenciaAtual = []
// 1- duzia 2- coluna 3- altos baixos 4- cores 5- impar par
var estrategiaEncontrada = ''
var cicloGale = 1

//chaves de aposta
var chaveRepeteDobra = false
var chave0 = false
var chaveD1 = false
var chaveD2 = false
var chaveD3 = false
var chaveC1 = false
var chaveC2 = false
var chaveC3 = false
var chaveAlto = false
var chaveBaixo = false
var chaveVermelho = false
var chavePreto = false
var chaveImpar = false
var chavePar = false
var chaveDanilo = false

function zerarChaves() {
    chaveRepeteDobra = false
    chave0 = false
    chaveD1 = false
    chaveD2 = false
    chaveD3 = false
    chaveC1 = false
    chaveC2 = false
    chaveC3 = false
    chaveAlto = false
    chaveBaixo = false
    chaveVermelho = false
    chavePreto = false
    chaveImpar = false
    chavePar = false
    chaveDanilo = false
}

function salvarConfig() {
    chrome.storage.local.set({
        configuracao,
    }, () => {
    })
}

function carregarConfiguracao() {
    chrome.storage.local.get(["configuracao"], (res) => {
        configuracao = res.configuracao

        statusBot = configuracao.status
        alternanciaAltosBaixos = configuracao.alternanciaAltosBaixos
        alternanciaCores = configuracao.alternanciaCores
        alternanciaParImpar = configuracao.alternanciaParImpar
        colunaRep = configuracao.favorColuna
        duziaRep = configuracao.favorDuzia
        colunaAusencia = configuracao.coluna
        duziaAusencia = configuracao.duzia
        altosBaixosRep = configuracao.altosBaixos
        coresRep = configuracao.cores
        parImparRep = configuracao.parImpar
        daniloRep = configuracao.danilo
        ficha = configuracao.ficha
        stopGain = configuracao.gain
        stopLoss = configuracao.loss
        cobrirZero = configuracao.zero
        gale = configuracao.gale
        roletas = configuracao.roletas
        token = res.configuracao.token
        chat = res.configuracao.chat
    })
}

function dataHora() {
    var date = new Date
    var seconds = date.getSeconds()
    var minutes = date.getMinutes()
    var hour = date.getHours()

    return `${hour}:${minutes}:${seconds}`
}

function inserirTextoDisplay(texto, tela) {
    if (tela == 1) {
        var textoDisplay = document.getElementById("displaybotlobby")
        textoDisplay.textContent = `${texto}`
    } else if (tela == 2) {
        var textoDisplay = document.getElementById("displaybotroleta")
        textoDisplay.textContent = `${texto}`
    }

}

function analisandoEstrategias() {
    var qtdRoletas = document.getElementsByClassName('lobby-tables__item').length
    if (qtdRoletas > 1) {

        rodada = 0
        sequenciaAtual = []
        zerarChaves()
        estrategiaEncontrada = ''

        if (!displayLobbyExists) {
            if (document.querySelector('.lobby-header__filterqDmLZJ0RC7XlyyjENEqe')) {
                painelLobby = document.querySelector('.lobby-header__filterqDmLZJ0RC7XlyyjENEqe')
            } else if (document.querySelector('.lobby__filter')) {
                painelLobby = document.querySelector('.lobby__filter')
            }
            painelLobby.insertAdjacentHTML('afterbegin', '<h1 id = "displaybotlobby" style="width: 90%;color: white;text-align: center; font-size: xx-large;font-weight: bolder;align-self: center;"></h1>')
            displayRoletaExists = false
            displayLobbyExists = true
        }

        inserirTextoDisplay(`MRV RUSH - ${contagemAcertos} ACERTOS - ${contagemErros} ERROS - MONITORANDO`, 1)
        listarRoletasLobby(qtdRoletas)
        for (let i = 0; i < qtdRoletas; i++) {
            if (roletas.includes(roletasLobby[i].nome) && validarRoleta(roletasLobby[i].nome)) {
                if (estrategiaCoresAlternancia(roletasLobby[i].sequencia) == 1) {
                    estrategiaEncontrada = 'coresAlt'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaImparParAlternancia(roletasLobby[i].sequencia) == 1) {
                    estrategiaEncontrada = 'parImparAlt'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaAltosbaixosAlternancia(roletasLobby[i].sequencia) == 1) {
                    estrategiaEncontrada = 'altosBaixosAlt'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaColunasTendencia(roletasLobby[i].sequencia) == 1) {
                    estrategiaEncontrada = 'ct1'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaColunasTendencia(roletasLobby[i].sequencia) == 2) {
                    estrategiaEncontrada = 'ct2'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaColunasTendencia(roletasLobby[i].sequencia) == 3) {
                    estrategiaEncontrada = 'ct3'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaDuziasTendencia(roletasLobby[i].sequencia) == 1) {
                    estrategiaEncontrada = 'dt1'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaDuziasTendencia(roletasLobby[i].sequencia) == 2) {
                    estrategiaEncontrada = 'dt2'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaDuziasTendencia(roletasLobby[i].sequencia) == 3) {
                    estrategiaEncontrada = 'dt3'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaDuzias(roletasLobby[i].sequencia) == 1) {
                    estrategiaEncontrada = 'd1'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaDuzias(roletasLobby[i].sequencia) == 2) {
                    estrategiaEncontrada = 'd2'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaDuzias(roletasLobby[i].sequencia) == 3) {
                    estrategiaEncontrada = 'd3'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaColunas(roletasLobby[i].sequencia) == 1) {
                    estrategiaEncontrada = 'c1'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaColunas(roletasLobby[i].sequencia) == 2) {
                    estrategiaEncontrada = 'c2'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaColunas(roletasLobby[i].sequencia) == 3) {
                    estrategiaEncontrada = 'c3'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaAltosbaixos(roletasLobby[i].sequencia) == 1) {
                    estrategiaEncontrada = 'alto'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaAltosbaixos(roletasLobby[i].sequencia) == 2) {
                    estrategiaEncontrada = 'baixo'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaCores(roletasLobby[i].sequencia) == 1) {
                    estrategiaEncontrada = 'vermelho'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaCores(roletasLobby[i].sequencia) == 2) {
                    estrategiaEncontrada = 'preto'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaParImpar(roletasLobby[i].sequencia) == 1) {
                    estrategiaEncontrada = 'impar'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaParImpar(roletasLobby[i].sequencia) == 2) {
                    estrategiaEncontrada = 'par'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else if (estrategiaDanilo(roletasLobby[i].sequencia) == 1) {
                    estrategiaEncontrada = 'danilo1'
                    document.getElementsByClassName('lobby-tables__item')[getRoletaLobby(qtdRoletas, roletasLobby[i].nome)].getElementsByClassName('lobby-table__game-logo')[0].click()
                    roletasLobby = []
                    break
                } else {
                    inserirTextoDisplay(`MRV RUSH - ${contagemAcertos} ACERTOS - ${contagemErros} ERROS - MONITORANDO`, 1)
                }
            }
        }
    } else {
        var cargaRoleta = document.getElementsByClassName('table-info__nameWp_dByC6ZNXpXrcSPbRB').length
        if (cargaRoleta > 0) {
            if (!displayRoletaExists) {
                painelRoleta = document.querySelector('.account-panel');
                painelRoleta.insertAdjacentHTML('beforeend', '<span id = "displaybotroleta" style="margin: 10px;width: 90%;color: white;text-align: left;"></span>');
                displayRoletaExists = true
                displayLobbyExists = false
            }
            var nomeRoleta = document.getElementsByClassName('table-info__nameWp_dByC6ZNXpXrcSPbRB')[0].outerText
            var roleta = carregarRoleta()

            if (document.getElementsByClassName('close-button game-tutorial__close-buttonvoI4pu9XqNQ2VHkfTWq7').length == 1) {
                document.getElementsByClassName('close-button game-tutorial__close-buttonvoI4pu9XqNQ2VHkfTWq7')[0].click()
            }

            if (document.getElementsByClassName('timer').length == 1) {
                executarAposta()
            }

            if (JSON.stringify(sequenciaAtual) != JSON.stringify(roleta[0].sequencia)) {
                sequenciaAtual = roleta[0].sequencia
                if (estrategiaEncontrada == 'coresAlt') {
                    if (rodada == 0) {
                        if (estrategiaCoresAlternancia(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando alternancia de cores`)
                            inserirTextoDisplay('confirmando alternancia de cores', 2)
                        }
                    } else if (rodada == 1) {
                        if ((numerosPretos.includes(roleta[0].sequencia[0]) && numerosVermelhos.includes(roleta[0].sequencia[1]))
                            || (numerosPretos.includes(roleta[0].sequencia[1]) && numerosVermelhos.includes(roleta[0].sequencia[0]))) {
                            rodada++
                            if (numerosPretos.includes(roleta[0].sequencia[0])) {
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chavePreto = true
                                    enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros pretos\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                    inserirTextoDisplay('apostando numeros pretos - cobrindo zero', 2)
                                } else {
                                    chavePreto = true
                                    enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros pretos\n🤖 ${gale} Martingale`)
                                    inserirTextoDisplay('apostando numeros pretos', 2)
                                }
                            } else {
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chaveVermelho = true
                                    enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros vermelhos\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                    inserirTextoDisplay('apostando numeros vermelhos - cobrindo zero', 2)
                                } else {
                                    chaveVermelho = true
                                    enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros vermelhos\n🤖 ${gale} Martingale`)
                                    inserirTextoDisplay('apostando numeros vermelhos', 2)
                                }
                            }

                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if ((numerosVermelhos.includes(roleta[0].sequencia[0]) && numerosVermelhos.includes(roleta[0].sequencia[1]))
                            || (numerosPretos.includes(roleta[0].sequencia[1]) && numerosPretos.includes(roleta[0].sequencia[0]))
                            || roleta[0].sequencia[0] == '0') {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA ALTERNANCIA DE CORES COBRINDO ZERO' : 'ESTRATÉGIA ALTERNANCIA DE CORES SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if ((numerosVermelhos.includes(roleta[0].sequencia[0]) && numerosVermelhos.includes(roleta[0].sequencia[1]))
                                || (numerosPretos.includes(roleta[0].sequencia[1]) && numerosPretos.includes(roleta[0].sequencia[0]))) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                    ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA ALTERNANCIA DE CORES COBRINDO ZERO' : 'ESTRATÉGIA ALTERNANCIA DE CORES SEM COBRIR ZERO'} : 
                                    ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    //no gale verifica qual foi a aposta
                                    if (numerosPretos.includes(roleta[0].sequencia[0])) {
                                        if (cobrirZero != 0) {
                                            chave0 = true
                                            chavePreto = true
                                        } else {
                                            chavePreto = true
                                        }
                                    } else if (numerosVermelhos.includes(roleta[0].sequencia[0])) {
                                        if (cobrirZero != 0) {
                                            chave0 = true
                                            chaveVermelho = true
                                        } else {
                                            chaveVermelho = true
                                        }
                                    } else {
                                        chaveRepeteDobra = true
                                    }

                                    inserirTextoDisplay('gale em alternancias de cores', 2)

                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                    ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA ALTERNANCIA DE CORES COBRINDO ZERO' : 'ESTRATÉGIA ALTERNANCIA DE CORES SEM COBRIR ZERO'} : 
                                    ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                //no gale verifica qual foi a aposta
                                if (numerosPretos.includes(roleta[0].sequencia[0])) {
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chavePreto = true
                                    } else {
                                        chavePreto = true
                                    }
                                } else if (numerosVermelhos.includes(roleta[0].sequencia[0])) {
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chaveVermelho = true
                                    } else {
                                        chaveVermelho = true
                                    }
                                } else {
                                    chaveRepeteDobra = true
                                }

                                inserirTextoDisplay('gale em alternancias de cores', 2)
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA ALTERNANCIA DE CORES COBRINDO ZERO' : 'ESTRATÉGIA ALTERNANCIA DE CORES SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'parImparAlt') {
                    if (rodada == 0) {
                        if (estrategiaImparParAlternancia(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando alternancia de par e impar`)
                            inserirTextoDisplay('confirmando alternancia de par e impar', 2)
                        }
                    } else if (rodada == 1) {
                        if ((numerosImpares.includes(roleta[0].sequencia[0]) && numerosPares.includes(roleta[0].sequencia[1]))
                            || (numerosImpares.includes(roleta[0].sequencia[1]) && numerosPares.includes(roleta[0].sequencia[0]))) {
                            rodada++
                            if (numerosImpares.includes(roleta[0].sequencia[0])) {
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chaveImpar = true
                                    enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros impares\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                    inserirTextoDisplay('apostando numeros impares - cobrindo zero', 2)
                                } else {
                                    chaveImpar = true
                                    enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros impares\n🤖 ${gale} Martingale`)
                                    inserirTextoDisplay('apostando numeros impares', 2)
                                }
                            } else {
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chavePar = true
                                    enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros pares\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                    inserirTextoDisplay('apostando numeros pares - cobrindo zero', 2)
                                } else {
                                    chavePar = true
                                    enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros pares\n🤖 ${gale} Martingale`)
                                    inserirTextoDisplay('apostando numeros pares', 2)
                                }
                            }

                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if ((numerosPares.includes(roleta[0].sequencia[0]) && numerosPares.includes(roleta[0].sequencia[1]))
                            || (numerosImpares.includes(roleta[0].sequencia[1]) && numerosImpares.includes(roleta[0].sequencia[0]))
                            || roleta[0].sequencia[0] == '0') {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA ALTERNANCIA DE IMPAR E PAR COBRINDO ZERO' : 'ESTRATÉGIA ALTERNANCIA DE IMPAR E PAR SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if ((numerosPares.includes(roleta[0].sequencia[0]) && numerosPares.includes(roleta[0].sequencia[1]))
                                || (numerosImpares.includes(roleta[0].sequencia[1]) && numerosImpares.includes(roleta[0].sequencia[0]))) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA ALTERNANCIA DE IMPAR E PAR COBRINDO ZERO' : 'ESTRATÉGIA ALTERNANCIA DE IMPAR E PAR SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    //no gale verifica qual foi a aposta
                                    if (numerosPares.includes(roleta[0].sequencia[0])) {
                                        if (cobrirZero != 0) {
                                            chave0 = true
                                            chavePar = true
                                        } else {
                                            chavePar = true
                                        }
                                    } else if (numerosImpares.includes(roleta[0].sequencia[0])) {
                                        if (cobrirZero != 0) {
                                            chave0 = true
                                            chaveImpar = true
                                        } else {
                                            chaveImpar = true
                                        }
                                    } else {
                                        chaveRepeteDobra = true
                                    }

                                    inserirTextoDisplay('gale em alternancia de impar e par', 2)

                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA ALTERNANCIA DE IMPAR E PAR COBRINDO ZERO' : 'ESTRATÉGIA ALTERNANCIA DE IMPAR E PAR SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                //no gale verifica qual foi a aposta
                                if (numerosPares.includes(roleta[0].sequencia[0])) {
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chavePar = true
                                    } else {
                                        chavePar = true
                                    }
                                } else if (numerosImpares.includes(roleta[0].sequencia[0])) {
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chaveImpar = true
                                    } else {
                                        chaveImpar = true
                                    }
                                } else {
                                    chaveRepeteDobra = true
                                }

                                inserirTextoDisplay('gale em alternancia de impar e par', 2)
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA ALTERNANCIA DE IMPAR E PAR COBRINDO ZERO' : 'ESTRATÉGIA ALTERNANCIA DE IMPAR E PAR SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'altosBaixosAlt') {
                    if (rodada == 0) {
                        if (estrategiaAltosbaixosAlternancia(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando alternancia de altos e baixos`)
                            inserirTextoDisplay('confirmando alternancia de altos e baixos', 2)
                        }
                    } else if (rodada == 1) {
                        if ((numerosBaixos.includes(roleta[0].sequencia[0]) && numerosAltos.includes(roleta[0].sequencia[1]))
                            || (numerosBaixos.includes(roleta[0].sequencia[1]) && numerosAltos.includes(roleta[0].sequencia[0]))) {
                            rodada++
                            if (numerosBaixos.includes(roleta[0].sequencia[0])) {
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chaveBaixo = true
                                    enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros baixos\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                    inserirTextoDisplay('apostando numeros baixos - cobrindo zero', 2)
                                } else {
                                    chaveBaixo = true
                                    enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros baixos\n🤖 ${gale} Martingale`)
                                    inserirTextoDisplay('apostando numeros baixos', 2)
                                }
                            } else {
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chaveAlto = true
                                    enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros altos\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                    inserirTextoDisplay('apostando numeros altos - cobrindo zero', 2)
                                } else {
                                    chaveAlto = true
                                    enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros altos\n🤖 ${gale} Martingale`)
                                    inserirTextoDisplay('apostando numeros altos', 2)
                                }
                            }

                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if ((numerosAltos.includes(roleta[0].sequencia[0]) && numerosAltos.includes(roleta[0].sequencia[1]))
                            || (numerosBaixos.includes(roleta[0].sequencia[1]) && numerosBaixos.includes(roleta[0].sequencia[0]))
                            || roleta[0].sequencia[0] == '0') {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA ALTERNANCIA DE ALTOS E BAIXOS COBRINDO ZERO' : 'ESTRATÉGIA ALTERNANCIA DE ALTOS E BAIXOS SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if ((numerosAltos.includes(roleta[0].sequencia[0]) && numerosAltos.includes(roleta[0].sequencia[1]))
                                || (numerosBaixos.includes(roleta[0].sequencia[1]) && numerosBaixos.includes(roleta[0].sequencia[0]))) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA ALTERNANCIA DE ALTOS E BAIXOS COBRINDO ZERO' : 'ESTRATÉGIA ALTERNANCIA DE ALTOS E BAIXOS SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    //no gale verifica qual foi a aposta
                                    if (numerosAltos.includes(roleta[0].sequencia[0])) {
                                        if (cobrirZero != 0) {
                                            chave0 = true
                                            chaveAlto = true
                                        } else {
                                            chaveAlto = true
                                        }
                                    } else if (numerosBaixos.includes(roleta[0].sequencia[0])) {
                                        if (cobrirZero != 0) {
                                            chave0 = true
                                            chaveBaixo = true
                                        } else {
                                            chaveBaixo = true
                                        }
                                    } else {
                                        chaveRepeteDobra = true
                                    }

                                    inserirTextoDisplay('gale em alternancia de altos e baixos', 2)

                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                    ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA ALTERNANCIA DE ALTOS E BAIXOS COBRINDO ZERO' : 'ESTRATÉGIA ALTERNANCIA DE ALTOS E BAIXOS SEM COBRIR ZERO'} : 
                                    ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                //no gale apenas dobra a aposta ativando qualquer chave de cores
                                //no gale verifica qual foi a aposta
                                if (numerosAltos.includes(roleta[0].sequencia[0])) {
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chaveAlto = true
                                    } else {
                                        chaveAlto = true
                                    }
                                } else if (numerosBaixos.includes(roleta[0].sequencia[0])) {
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chaveBaixo = true
                                    } else {
                                        chaveBaixo = true
                                    }
                                } else {
                                    chaveRepeteDobra = true
                                }
                                inserirTextoDisplay('gale em alternancia de altos e baixos', 2)
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA ALTERNANCIA DE ALTOS E BAIXOS COBRINDO ZERO' : 'ESTRATÉGIA ALTERNANCIA DE ALTOS E BAIXOS SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'ct1') {
                    if (rodada == 0) {
                        if (estrategiaColunasTendencia(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando primeira coluna`)
                            inserirTextoDisplay('confirmando primeira coluna', 2)
                        }
                    } else if (rodada == 1) {
                        if (primeiraColuna.includes(roleta[0].sequencia[0]) && primeiraColuna.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chaveC1 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando primeira coluna\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando primeira coluna - cobrindo zero', 2)
                            } else {
                                chaveC1 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando primeira coluna\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando primeira coluna', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }
                    } else if (rodada > 1) {
                        if (primeiraColuna.includes(roleta[0].sequencia[0]) || roleta[0].sequencia[0] == '0') {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA PRIMERA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA PRIMEIRA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (primeiraColuna.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA PRIMERA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA PRIMEIRA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chaveC1 = true
                                        inserirTextoDisplay('gale primeira coluna - cobrindo zero', 2)
                                    } else {
                                        chaveC1 = true
                                        inserirTextoDisplay('gale primeira coluna', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA PRIMERA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA PRIMEIRA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chaveC1 = true
                                    inserirTextoDisplay('gale primeira coluna - cobrindo zero', 2)
                                } else {
                                    chaveC1 = true
                                    inserirTextoDisplay('gale primeira coluna', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA PRIMERA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA PRIMEIRA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'ct2') {
                    if (rodada == 0) {
                        if (estrategiaColunasTendencia(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando segunda coluna`)
                            inserirTextoDisplay('confirmando segunda coluna', 2)
                        }
                    } else if (rodada == 1) {
                        if (segundaColuna.includes(roleta[0].sequencia[0]) && segundaColuna.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chaveC2 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando segunda coluna\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando segunda coluna - cobrindo zero', 2)
                            } else {
                                chaveC2 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando segunda coluna\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando segunda coluna', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if (segundaColuna.includes(roleta[0].sequencia[0]) || roleta[0].sequencia[0] == '0') {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA SEGUNDA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA SEGUNDA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (segundaColuna.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA SEGUNDA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA SEGUNDA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chaveC2 = true
                                        inserirTextoDisplay('gale segunda coluna - cobrindo zero', 2)
                                    } else {
                                        chaveC2 = true
                                        inserirTextoDisplay('gale segunda coluna', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA SEGUNDA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA SEGUNDA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chaveC2 = true
                                    inserirTextoDisplay('gale segunda coluna - cobrindo zero', 2)
                                } else {
                                    chaveC2 = true
                                    inserirTextoDisplay('gale segunda coluna', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA SEGUNDA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA SEGUNDA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'ct3') {
                    if (rodada == 0) {
                        if (estrategiaColunasTendencia(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando terceira coluna`)
                            inserirTextoDisplay('confirmando terceira coluna', 2)
                        }
                    } else if (rodada == 1) {
                        if (terceiraColuna.includes(roleta[0].sequencia[0]) && terceiraColuna.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chaveC3 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando terceira coluna\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando terceira coluna - cobrindo zero', 2)
                            } else {
                                chaveC3 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando terceira coluna\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando terceira coluna', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if (terceiraColuna.includes(roleta[0].sequencia[0]) || roleta[0].sequencia[0] == '0') {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA SEGUNDA TERCEIRA COBRINDO ZERO' : 'ESTRATÉGIA TERCEIRA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (terceiraColuna.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA SEGUNDA TERCEIRA COBRINDO ZERO' : 'ESTRATÉGIA TERCEIRA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chaveC3 = true
                                        inserirTextoDisplay('gale terceira coluna - cobrindo zero', 2)
                                    } else {
                                        chaveC3 = true
                                        inserirTextoDisplay('gale terceira coluna', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                    ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA SEGUNDA TERCEIRA COBRINDO ZERO' : 'ESTRATÉGIA TERCEIRA COLUNA SEM COBRIR ZERO'} : 
                                    ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chaveC3 = true
                                    inserirTextoDisplay('gale terceira coluna - cobrindo zero', 2)
                                } else {
                                    chaveC3 = true
                                    inserirTextoDisplay('gale terceira coluna', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA SEGUNDA TERCEIRA COBRINDO ZERO' : 'ESTRATÉGIA TERCEIRA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'dt1') {
                    if (rodada == 0) {
                        if (estrategiaDuziasTendencia(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando primeira duzia`)
                            inserirTextoDisplay('confirmando primeira duzia', 2)
                        }
                    } else if (rodada == 1) {
                        if (primeiraDuzia.includes(roleta[0].sequencia[0]) && primeiraDuzia.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chaveD1 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando primeira duzia\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando primeira duzia - cobrindo zero', 2)
                            } else {
                                chaveD1 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando primeira duzia\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando primeira duzia', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if (primeiraDuzia.includes(roleta[0].sequencia[0]) || roleta[0].sequencia[0] == '0') {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA PRIMEIRA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA PRIMEIRA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (primeiraDuzia.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA PRIMEIRA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA PRIMEIRA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chaveD1 = true
                                        inserirTextoDisplay('gale primeira duzia - cobrindo zero', 2)
                                    } else {
                                        chaveD1 = true
                                        chaveD3 = true
                                        inserirTextoDisplay('gale primeira duzia', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                    ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA PRIMEIRA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA PRIMEIRA DUZIA SEM COBRIR ZERO'} : 
                                    ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chaveD1 = true
                                    inserirTextoDisplay('gale primeira duzia - cobrindo zero', 2)
                                } else {
                                    chaveD1 = true
                                    inserirTextoDisplay('gale primeira duzia', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA PRIMEIRA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA PRIMEIRA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'dt2') {
                    if (rodada == 0) {
                        if (estrategiaDuziasTendencia(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando segunda duzia`)
                            inserirTextoDisplay('confirmando segunda duzia', 2)
                        }
                    } else if (rodada == 1) {
                        if (segundaDuzia.includes(roleta[0].sequencia[0]) && segundaDuzia.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chaveD2 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando segunda duzia\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando segunda duzia - cobrindo zero', 2)
                            } else {
                                chaveD2 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando segunda duzia\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando segunda duzia', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if (segundaDuzia.includes(roleta[0].sequencia[0]) || roleta[0].sequencia[0] == '0') {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA SEGUNDA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA SEGUNDA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (segundaDuzia.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA SEGUNDA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA SEGUNDA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chaveD2 = true
                                        inserirTextoDisplay('gale segunda duzia - cobrindo zero', 2)
                                    } else {
                                        chaveD2 = true
                                        inserirTextoDisplay('gale segunda duzia', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA SEGUNDA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA SEGUNDA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chaveD2 = true
                                    inserirTextoDisplay('gale segunda duzia - cobrindo zero', 2)
                                } else {
                                    chaveD2 = true
                                    inserirTextoDisplay('gale segunda duzia', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA SEGUNDA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA SEGUNDA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'dt3') {
                    if (rodada == 0) {
                        if (estrategiaDuziasTendencia(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando terceira duzia`)
                            inserirTextoDisplay('confirmando terceira duzia', 2)
                        }
                    } else if (rodada == 1) {
                        if (terceiraDuzia.includes(roleta[0].sequencia[0]) && terceiraDuzia.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chaveD3 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando terceira duzia\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando terceira duzia - cobrindo zero', 2)
                            } else {
                                chaveD3 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando terceira duzia\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando terceira duzia', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if (terceiraDuzia.includes(roleta[0].sequencia[0]) || roleta[0].sequencia[0] == '0') {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA TERCEIRA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA TERCEIRA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (terceiraDuzia.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA TERCEIRA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA TERCEIRA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chaveD3 = true
                                        inserirTextoDisplay('gale terceira duzia - cobrindo zero', 2)
                                    } else {
                                        chaveD3 = true
                                        inserirTextoDisplay('gale terceira duzia', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA TERCEIRA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA TERCEIRA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chaveD3 = true
                                    inserirTextoDisplay('gale terceira duzia - cobrindo zero', 2)
                                } else {
                                    chaveD3 = true
                                    inserirTextoDisplay('gale terceira duzia', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA TERCEIRA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA TERCEIRA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'd1') {
                    if (rodada == 0) {
                        if (estrategiaDuzias(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando ausencia primeira duzia`)
                            inserirTextoDisplay('confirmando ausencia primeira duzia', 2)
                        }
                    } else if (rodada == 1) {
                        if (!primeiraDuzia.includes(roleta[0].sequencia[0]) && !primeiraDuzia.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chaveD1 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando primeira duzia\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando primeira duzia - cobrindo zero', 2)
                            } else {
                                chaveD1 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando primeira duzia\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando primeira duzia', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if (primeiraDuzia.includes(roleta[0].sequencia[0]) || roleta[0].sequencia[0] == '0') {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA PRIMEIRA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA PRIMEIRA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (primeiraDuzia.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA PRIMEIRA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA PRIMEIRA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chaveD1 = true
                                        inserirTextoDisplay('gale primeira duzia - cobrindo zero', 2)
                                    } else {
                                        chaveD1 = true
                                        chaveD3 = true
                                        inserirTextoDisplay('gale primeira duzia', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA PRIMEIRA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA PRIMEIRA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chaveD1 = true
                                    inserirTextoDisplay('gale primeira duzia - cobrindo zero', 2)
                                } else {
                                    chaveD1 = true
                                    inserirTextoDisplay('gale primeira duzia', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA PRIMEIRA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA PRIMEIRA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'd2') {
                    if (rodada == 0) {
                        if (estrategiaDuzias(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando ausencia segunda duzia`)
                            inserirTextoDisplay('confirmando ausencia segunda duzia', 2)
                        }
                    } else if (rodada == 1) {
                        if (!segundaDuzia.includes(roleta[0].sequencia[0]) && !segundaDuzia.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chaveD2 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando segunda duzia\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando segunda duzia - cobrindo zero', 2)
                            } else {
                                chaveD2 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando segunda duzia\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando segunda duzia', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if (segundaDuzia.includes(roleta[0].sequencia[0]) || roleta[0].sequencia[0] == '0') {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA SEGUNDA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA SEGUNDA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (segundaDuzia.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA SEGUNDA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA SEGUNDA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chaveD2 = true
                                        inserirTextoDisplay('gale segunda duzia - cobrindo zero', 2)
                                    } else {
                                        chaveD2 = true
                                        inserirTextoDisplay('gale segunda duzia', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA SEGUNDA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA SEGUNDA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chaveD2 = true
                                    inserirTextoDisplay('gale segunda duzia - cobrindo zero', 2)
                                } else {
                                    chaveD2 = true
                                    inserirTextoDisplay('gale segunda duzia', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA SEGUNDA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA SEGUNDA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'd3') {
                    if (rodada == 0) {
                        if (estrategiaDuzias(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando ausencia terceira duzia`)
                            inserirTextoDisplay('confirmando ausencia terceira duzia', 2)
                        }
                    } else if (rodada == 1) {
                        if (!terceiraDuzia.includes(roleta[0].sequencia[0]) && !terceiraDuzia.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chaveD3 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando terceira duzia\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando terceira duzia - cobrindo zero', 2)
                            } else {
                                chaveD3 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando terceira duzia\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando terceira duzia', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if (terceiraDuzia.includes(roleta[0].sequencia[0]) || roleta[0].sequencia[0] == '0') {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA TERCEIRA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA TERCEIRA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (terceiraDuzia.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA TERCEIRA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA TERCEIRA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chaveD3 = true
                                        inserirTextoDisplay('gale terceira duzia - cobrindo zero', 2)
                                    } else {
                                        chaveD3 = true
                                        inserirTextoDisplay('gale terceira duzia', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                    ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA TERCEIRA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA TERCEIRA DUZIA SEM COBRIR ZERO'} : 
                                    ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chaveD3 = true
                                    inserirTextoDisplay('gale terceira duzia - cobrindo zero', 2)
                                } else {
                                    chaveD3 = true
                                    inserirTextoDisplay('gale terceira duzia', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA TERCEIRA DUZIA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA TERCEIRA DUZIA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'c1') {
                    if (rodada == 0) {
                        if (estrategiaColunas(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando ausencia primeira coluna`)
                            inserirTextoDisplay('confirmando ausencia primeira coluna', 2)
                        }
                    } else if (rodada == 1) {
                        if (!primeiraColuna.includes(roleta[0].sequencia[0]) && !primeiraColuna.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chaveC1 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando primeira coluna\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando primeira coluna - cobrindo zero', 2)
                            } else {
                                chaveC1 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando primeira coluna\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando primeira coluna', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }
                    } else if (rodada > 1) {
                        if (primeiraColuna.includes(roleta[0].sequencia[0]) || roleta[0].sequencia[0] == '0') {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA PRIMERA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA PRIMERA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (primeiraColuna.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA PRIMERA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA PRIMERA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chaveC1 = true
                                        inserirTextoDisplay('gale primeira coluna - cobrindo zero', 2)
                                    } else {
                                        chaveC1 = true
                                        inserirTextoDisplay('gale primeira coluna', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                    ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA PRIMERA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA PRIMERA COLUNA SEM COBRIR ZERO'} : 
                                    ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chaveC1 = true
                                    inserirTextoDisplay('gale primeira coluna - cobrindo zero', 2)
                                } else {
                                    chaveC1 = true
                                    inserirTextoDisplay('gale primeira coluna', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA PRIMERA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA PRIMERA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'c2') {
                    if (rodada == 0) {
                        if (estrategiaColunas(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando ausencia segunda coluna`)
                            inserirTextoDisplay('confirmando ausencia segunda coluna', 2)
                        }
                    } else if (rodada == 1) {
                        if (!segundaColuna.includes(roleta[0].sequencia[0]) && !segundaColuna.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chaveC2 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando segunda coluna\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando segunda coluna - cobrindo zero', 2)
                            } else {
                                chaveC2 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando segunda coluna\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando segunda coluna', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if (segundaColuna.includes(roleta[0].sequencia[0]) || roleta[0].sequencia[0] == '0') {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA SEGUNDA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA SEGUNDA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (segundaColuna.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA SEGUNDA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA SEGUNDA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chaveC2 = true
                                        inserirTextoDisplay('gale segunda coluna - cobrindo zero', 2)
                                    } else {
                                        chaveC2 = true
                                        inserirTextoDisplay('gale segunda coluna', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA SEGUNDA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA SEGUNDA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chaveC2 = true
                                    inserirTextoDisplay('gale segunda coluna - cobrindo zero', 2)
                                } else {
                                    chaveC2 = true
                                    inserirTextoDisplay('gale segunda coluna', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA SEGUNDA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA SEGUNDA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'c3') {
                    if (rodada == 0) {
                        if (estrategiaColunas(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando ausencia terceira coluna`)
                            inserirTextoDisplay('confirmando ausencia terceira coluna', 2)
                        }
                    } else if (rodada == 1) {
                        if (!terceiraColuna.includes(roleta[0].sequencia[0]) && !terceiraColuna.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chaveC3 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando terceira coluna\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando terceira coluna - cobrindo zero', 2)
                            } else {
                                chaveC3 = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando terceira coluna\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando terceira coluna', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if (terceiraColuna.includes(roleta[0].sequencia[0]) || roleta[0].sequencia[0] == '0') {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA TERCEIRA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA TERCEIRA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (terceiraColuna.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA TERCEIRA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA TERCEIRA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chaveC3 = true
                                        inserirTextoDisplay('gale terceira coluna - cobrindo zero', 2)
                                    } else {
                                        chaveC3 = true
                                        inserirTextoDisplay('gale terceira coluna', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                    ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA TERCEIRA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA TERCEIRA COLUNA SEM COBRIR ZERO'} : 
                                    ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chaveC3 = true
                                    inserirTextoDisplay('gale terceira coluna - cobrindo zero', 2)
                                } else {
                                    chaveC3 = true
                                    inserirTextoDisplay('gale terceira coluna', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA AUSENCIA TERCEIRA COLUNA COBRINDO ZERO' : 'ESTRATÉGIA AUSENCIA TERCEIRA COLUNA SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'alto') {
                    if (rodada == 0) {
                        if (estrategiaAltosbaixos(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando numeros altos`)
                            inserirTextoDisplay('confirmando numeros altos', 2)
                        }
                    } else if (rodada == 1) {
                        if (numerosAltos.includes(roleta[0].sequencia[0]) && numerosAltos.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chaveAlto = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros altos\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando numeros altos - cobrindo zero', 2)
                            } else {
                                chaveAlto = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros altos\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando numeros altos', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if (!numerosBaixos.includes(roleta[0].sequencia[0])) {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS ALTOS COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS ALTOS SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (numerosAltos.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS ALTOS COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS ALTOS SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chaveRepeteDobra = true
                                        inserirTextoDisplay('gale numeros altos - cobrindo zero', 2)
                                    } else {
                                        chaveRepeteDobra = true
                                        inserirTextoDisplay('gale numeros altos', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS ALTOS COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS ALTOS SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chaveRepeteDobra = true
                                    inserirTextoDisplay('gale numeros altos - cobrindo zero', 2)
                                } else {
                                    chaveRepeteDobra = true
                                    inserirTextoDisplay('gale numeros altos', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS ALTOS COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS ALTOS SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'baixo') {
                    if (rodada == 0) {
                        if (estrategiaAltosbaixos(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando numeros baixos`)
                            inserirTextoDisplay('confirmando numeros baixos', 2)
                        }
                    } else if (rodada == 1) {
                        if (numerosBaixos.includes(roleta[0].sequencia[0]) && numerosBaixos.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chaveBaixo = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros baixos\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando numeros baixos - cobrindo zero', 2)
                            } else {
                                chaveBaixo = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros baixos\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando numeros baixos', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if (!numerosAltos.includes(roleta[0].sequencia[0])) {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS BAIXOS COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS BAIXOS SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (numerosBaixos.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS BAIXOS COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS BAIXOS SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chaveRepeteDobra = true
                                        inserirTextoDisplay('gale numeros baixos - cobrindo zero', 2)
                                    } else {
                                        chaveRepeteDobra = true
                                        inserirTextoDisplay('gale numeros baixos', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                    ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS BAIXOS COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS BAIXOS SEM COBRIR ZERO'} : 
                                    ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chaveRepeteDobra = true
                                    inserirTextoDisplay('gale numeros baixos - cobrindo zero', 2)
                                } else {
                                    chaveRepeteDobra = true
                                    inserirTextoDisplay('gale numeros baixos', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS BAIXOS COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS BAIXOS SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'vermelho') {
                    if (rodada == 0) {
                        if (estrategiaCores(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando numeros vermelhos`)
                            inserirTextoDisplay('confirmando numeros vermelhos', 2)
                        }
                    } else if (rodada == 1) {
                        if (numerosVermelhos.includes(roleta[0].sequencia[0]) && numerosVermelhos.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chaveVermelho = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros vermelhos\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando numeros vermelhos - cobrindo zero', 2)
                            } else {
                                chaveVermelho = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros vermelhos\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando numeros vermelhos', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if (!numerosPretos.includes(roleta[0].sequencia[0])) {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS VERMELHOS COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS VERMELHOS SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (numerosVermelhos.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS VERMELHOS COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS VERMELHOS SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chaveRepeteDobra = true
                                        inserirTextoDisplay('gale numeros vermelhos - cobrindo zero', 2)
                                    } else {
                                        chaveRepeteDobra = true
                                        inserirTextoDisplay('gale numeros vermelhos', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                    ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS VERMELHOS COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS VERMELHOS SEM COBRIR ZERO'} : 
                                    ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chaveRepeteDobra = true
                                    inserirTextoDisplay('gale numeros vermelhos - cobrindo zero', 2)
                                } else {
                                    chaveRepeteDobra = true
                                    inserirTextoDisplay('gale numeros vermelhos', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS VERMELHOS COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS VERMELHOS SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'preto') {
                    if (rodada == 0) {
                        if (estrategiaCores(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando numeros pretos`)
                            inserirTextoDisplay('confirmando numeros pretos', 2)
                        }
                    } else if (rodada == 1) {
                        if (numerosPretos.includes(roleta[0].sequencia[0]) && numerosPretos.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chavePreto = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros pretos\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando numeros pretos - cobrindo zero', 2)
                            } else {
                                chavePreto = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros pretos\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando numeros pretos', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if (!numerosVermelhos.includes(roleta[0].sequencia[0])) {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS PRETOS COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS PRETOS SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (numerosPretos.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS PRETOS COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS PRETOS SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chaveRepeteDobra = true
                                        inserirTextoDisplay('gale numeros pretos - cobrindo zero', 2)
                                    } else {
                                        chaveRepeteDobra = true
                                        inserirTextoDisplay('gale numeros pretos', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                    ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS PRETOS COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS PRETOS SEM COBRIR ZERO'} : 
                                    ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chaveRepeteDobra = true
                                    inserirTextoDisplay('gale numeros pretos - cobrindo zero', 2)
                                } else {
                                    chaveRepeteDobra = true
                                    inserirTextoDisplay('gale numeros pretos', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS PRETOS COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS PRETOS SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'impar') {
                    if (rodada == 0) {
                        if (estrategiaParImpar(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando numeros impares`)
                            inserirTextoDisplay('confirmando numeros impares', 2)
                        }
                    } else if (rodada == 1) {
                        if (numerosImpares.includes(roleta[0].sequencia[0]) && numerosImpares.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chaveImpar = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros impares\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando numeros impares - cobrindo zero', 2)
                            } else {
                                chaveImpar = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros impares\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando numeros impares', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if (!numerosPares.includes(roleta[0].sequencia[0])) {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS IMPARES COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS IMPARES SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (numerosImpares.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS IMPARES COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS IMPARES SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chaveRepeteDobra = true
                                        inserirTextoDisplay('gale numeros impares - cobrindo zero', 2)
                                    } else {
                                        chaveRepeteDobra = true
                                        inserirTextoDisplay('gale numeros impares', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS IMPARES COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS IMPARES SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chaveRepeteDobra = true
                                    inserirTextoDisplay('gale numeros impares - cobrindo zero', 2)
                                } else {
                                    chaveRepeteDobra = true
                                    inserirTextoDisplay('gale numeros impares', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS IMPARES COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS IMPARES SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'par') {
                    if (rodada == 0) {
                        if (estrategiaParImpar(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando numeros pares`)
                            inserirTextoDisplay('confirmando numeros pares', 2)
                        }
                    } else if (rodada == 1) {
                        if (numerosPares.includes(roleta[0].sequencia[0]) && numerosPares.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chavePar = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros pares\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando numeros pares - cobrindo zero', 2)
                            } else {
                                chavePar = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando numeros pares\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando numeros pares', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }

                    } else if (rodada > 1) {
                        if (!numerosImpares.includes(roleta[0].sequencia[0])) {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS PARES COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS PARES SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (numerosPares.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS PARES COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS PARES SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chaveRepeteDobra = true
                                        inserirTextoDisplay('gale numeros pares - cobrindo zero', 2)
                                    } else {
                                        chaveRepeteDobra = true
                                        inserirTextoDisplay('gale numeros pares', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                    ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS PARES COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS PARES SEM COBRIR ZERO'} : 
                                    ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chaveRepeteDobra = true
                                    inserirTextoDisplay('gale numeros pares - cobrindo zero', 2)
                                } else {
                                    chaveRepeteDobra = true
                                    inserirTextoDisplay('gale numeros pares', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA NUMEROS PARES COBRINDO ZERO' : 'ESTRATÉGIA NUMEROS PARES SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }
                } else if (estrategiaEncontrada == 'danilo1') {
                    if (rodada == 0) {
                        if (estrategiaDaniloTendencia(sequenciaAtual) == 0) {
                            rodada = 0
                            sequenciaAtual = []
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        } else {
                            rodada++
                            enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 confirmando repetição danilo`)
                            inserirTextoDisplay('confirmando repetição danilo', 2)
                        }
                    } else if (rodada == 1) {
                        if (numerosDanilo.includes(roleta[0].sequencia[0]) && numerosDanilo.includes(roleta[0].sequencia[1])) {
                            rodada++
                            if (cobrirZero != 0) {
                                chave0 = true
                                chaveDanilo = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando estratégia danilo\n👀 cobrindo zero\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('postando estratégia danilo - cobrindo zero', 2)
                            } else {
                                chaveDanilo = true
                                enviarMsgTelegram(`🤖 MRV RUSH\n🎰 ${nomeRoleta}\n👀 apostando estratégia danilo\n🤖 ${gale} Martingale`)
                                inserirTextoDisplay('apostando estratégia danilo', 2)
                            }
                        } else {
                            rodada = 0
                            sequenciaAtual = []
                            apagarMsgTelegram()
                            zerarChaves()
                            document.getElementsByClassName('close-button header__close-button')[0].click()
                        }
                    } else if (rodada > 1) {
                        if (numerosDanilo.includes(roleta[0].sequencia[0]) || roleta[0].sequencia[0] == '0') {
                            if (cobrirZero != 0 && roleta[0].sequencia[0] == '0') {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA DANILO COBRINDO ZERO' : 'ESTRATÉGIA DANILO SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else if (numerosDanilo.includes(roleta[0].sequencia[0])) {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} GREEN : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA DANILO COBRINDO ZERO' : 'ESTRATÉGIA DANILO SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`✅✅✅${roleta[0].sequencia[0]}✅✅✅`)
                                cicloGale = 1
                                contagemAcertos++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            } else {
                                if (gale > rodada - 2) {
                                    cicloGale = cicloGale * 2
                                    rodada++
                                    if (cobrirZero != 0) {
                                        chave0 = true
                                        chaveDanilo = true
                                        inserirTextoDisplay('gale danilo - cobrindo zero', 2)
                                    } else {
                                        chaveDanilo = true
                                        inserirTextoDisplay('gale danilo', 2)
                                    }
                                } else {
                                    atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA DANILO COBRINDO ZERO' : 'ESTRATÉGIA DANILO SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                    enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                    cicloGale = 1
                                    contagemErros++
                                    rodada = 0
                                    sequenciaAtual = []
                                    zerarChaves()
                                    document.getElementsByClassName('close-button header__close-button')[0].click()
                                }
                            }
                        } else {
                            if (gale > rodada - 2) {
                                cicloGale = cicloGale * 2
                                rodada++
                                if (cobrirZero != 0) {
                                    chave0 = true
                                    chaveDanilo = true
                                    inserirTextoDisplay('gale danilo - cobrindo zero', 2)
                                } else {
                                    chaveDanilo = true
                                    inserirTextoDisplay('gale danilo', 2)
                                }
                            } else {
                                atualizarHistorico(`${fichaAposta == 0 ? 'SIMULAÇÃO' : ''} ${dataHora()} RED : 
                                ${nomeRoleta} / ${cobrirZero != 0 ? 'ESTRATÉGIA DANILO COBRINDO ZERO' : 'ESTRATÉGIA DANILO SEM COBRIR ZERO'} : 
                                ${JSON.stringify(sequenciaAtual)}`)
                                enviarMsgTelegram(`❌❌❌${roleta[0].sequencia[0]}❌❌❌`)
                                cicloGale = 1
                                contagemErros++
                                rodada = 0
                                sequenciaAtual = []
                                zerarChaves()
                                document.getElementsByClassName('close-button header__close-button')[0].click()
                            }
                        }

                    }

                } else {
                    zerarChaves()
                    document.getElementsByClassName('close-button header__close-button')[0].click()
                }
            }
        }
    }

}

function carregarVisao() {
    if (visaoLobby == 0) {
        if (document.getElementsByClassName('lobby-tables__item').length > 0) {
            document.getElementsByClassName('lobby-tables__item')[0].scrollIntoView()
            visaoLobby++
        }
    } else if (visaoLobby == 1) {
        if (document.getElementsByClassName('lobby-tables__item').length > 10) {
            document.getElementsByClassName('lobby-tables__item')[10].scrollIntoView()
            visaoLobby++
        } else {
            visaoLobby = 0
        }
    } else if (visaoLobby == 2) {
        if (document.getElementsByClassName('lobby-tables__item').length > 20) {
            document.getElementsByClassName('lobby-tables__item')[20].scrollIntoView()
            visaoLobby++
        } else {
            visaoLobby = 0
        }
    } else if (visaoLobby == 3) {
        if (document.getElementsByClassName('lobby-tables__item').length > 30) {
            document.getElementsByClassName('lobby-tables__item')[30].scrollIntoView()
            visaoLobby++
        } else {
            visaoLobby = 0
        }
    } else if (visaoLobby == 4) {
        if (document.getElementsByClassName('lobby-tables__item').length > 40) {
            document.getElementsByClassName('lobby-tables__item')[30].scrollIntoView()
            visaoLobby++
        } else {
            visaoLobby = 0
        }
    } else {
        visaoLobby = 0
    }
}

function getRoletaLobby(qtd, nome) {
    for (let i = 0; i < qtd; i++) {
        if (document.getElementsByClassName('lobby-tables__item')[i].getElementsByClassName('lobby-table__name-container')[0] != undefined &&
            document.getElementsByClassName('lobby-tables__item')[i].getElementsByClassName('lobby-table__name-container')[0].outerText == nome) {
            return i
        }
    }
}

function listarRoletasLobby(qtd) {

    carregarVisao()

    for (let i = 0; i < qtd; i++) {
        if (document.getElementsByClassName('lobby-tables__item')[i].getElementsByClassName('lobby-table__name-container').length == 1) {
            nomeRoleta = document.getElementsByClassName('lobby-tables__item')[i].getElementsByClassName('lobby-table__name-container')[0].outerText
        } else {
            nomeRoleta = 'roleta-bonus'
        }
        if (document.getElementsByClassName('lobby-tables__item')[i].getElementsByClassName('roulette-historyfOmuwAaXbwHRa3HTIjFP').length == 1) {
            sequenciaRoleta = document.getElementsByClassName('lobby-tables__item')[i].getElementsByClassName('roulette-historyfOmuwAaXbwHRa3HTIjFP')[0].outerText
        } else {
            sequenciaRoleta = []
        }

        if (sequenciaRoleta.length != 0) {
            var listaSequenciaOld = sequenciaRoleta.split("\n")
            var sizesequencia = listaSequenciaOld.length
            var listaSequenciaNew = []
            for (let i = 0; i < sizesequencia; i++) {
                if (listaSequenciaOld[i].charAt(0) != "x") {
                    listaSequenciaNew.push(listaSequenciaOld[i])
                }
            }

            if (roletasLobby.filter(function (obj) { return obj.nome == nomeRoleta }).length == 0) {
                roletasLobby.push({ nome: nomeRoleta, sequencia: listaSequenciaNew, lobby: listaSequenciaNew })
            } else if (roletasLobby.filter(function (obj) { return obj.nome == nomeRoleta }).length == 1) {
                if (JSON.stringify(listaSequenciaNew) != JSON.stringify(roletasLobby.filter(function (obj) { return obj.nome == nomeRoleta })[0].lobby)) {
                    roletasLobby.filter(function (obj) { return obj.nome == nomeRoleta })[0].lobby = listaSequenciaNew
                    roletasLobby.filter(function (obj) { return obj.nome == nomeRoleta })[0].sequencia.unshift(listaSequenciaNew[0])
                    if (roletasLobby.filter(function (obj) { return obj.nome == nomeRoleta })[0].sequencia.length > 50) {
                        roletasLobby.filter(function (obj) { return obj.nome == nomeRoleta })[0].sequencia.pop()
                    }
                }
            }

        }

    }

}

function validarRoleta(nome) {
    validouFichaAposta = false
    validouFichaZero = false
    for (let i = 0; i < fichasRoletas.length; i++) {
        if (fichasRoletas[i].nome == nome) {

            if (ficha == 0) {
                validouFichaAposta = true
            } else if (ficha == 1) {
                if (fichasRoletas[i].valores.includes('0.5')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('0.5')
                    validouFichaAposta = true
                }
            } else if (ficha == 2) {
                if (fichasRoletas[i].valores.includes('1')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('1')
                    validouFichaAposta = true
                }
            } else if (ficha == 3) {
                if (fichasRoletas[i].valores.includes('2.5')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('2.5')
                    validouFichaAposta = true
                }
            } else if (ficha == 4) {
                if (fichasRoletas[i].valores.includes('5')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('5')
                    validouFichaAposta = true
                }
            } else if (ficha == 5) {
                if (fichasRoletas[i].valores.includes('5')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('5')
                    validouFichaAposta = true
                }
            } else if (ficha == 6) {
                if (fichasRoletas[i].valores.includes('5')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('5')
                    validouFichaAposta = true
                }
            } else if (ficha == 7) {
                if (fichasRoletas[i].valores.includes('20')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('20')
                    validouFichaAposta = true
                }
            } else if (ficha == 8) {
                if (fichasRoletas[i].valores.includes('25')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('25')
                    validouFichaAposta = true
                }
            } else if (ficha == 9) {
                if (fichasRoletas[i].valores.includes('50')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('50')
                    validouFichaAposta = true
                }
            } else if (ficha == 10) {
                if (fichasRoletas[i].valores.includes('100')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('100')
                    validouFichaAposta = true
                }
            } else if (ficha == 11) {
                if (fichasRoletas[i].valores.includes('125')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('125')
                    validouFichaAposta = true
                    break
                }
            } else if (ficha == 12) {
                if (fichasRoletas[i].valores.includes('500')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('500')
                    validouFichaAposta = true
                }
            } else if (ficha == 13) {
                if (fichasRoletas[i].valores.includes('2k')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('2k')
                    validouFichaAposta = true
                }
            } else if (ficha == 14) {
                if (fichasRoletas[i].valores.includes('2.5k')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('2.5k')
                    validouFichaAposta = true
                }
            } else if (ficha == 15) {
                if (fichasRoletas[i].valores.includes('5k')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('5k')
                    validouFichaAposta = true
                }
            } else if (ficha == 16) {
                if (fichasRoletas[i].valores.includes('25k')) {
                    fichaAposta = fichasRoletas[i].valores.indexOf('25k')
                    validouFichaAposta = true
                }
            }

            if (cobrirZero == 1) {
                if (fichasRoletas[i].valores.includes('0.5')) {
                    fichaZero = fichasRoletas[i].valores.indexOf('0.5')
                    validouFichaZero = true
                }
            } else if (cobrirZero == 2) {
                if (fichasRoletas[i].valores.includes('1')) {
                    fichaZero = fichasRoletas[i].valores.indexOf('1')
                    validouFichaZero = true
                }
            } else if (cobrirZero == 3) {
                if (fichasRoletas[i].valores.includes('2.5')) {
                    fichaZero = fichasRoletas[i].valores.indexOf('2.5')
                    validouFichaZero = true
                }
            } else if (cobrirZero == 4) {
                if (fichasRoletas[i].valores.includes('5')) {
                    fichaZero = fichasRoletas[i].valores.indexOf('5')
                    validouFichaZero = true
                }
            } else if (cobrirZero == 5) {
                if (fichasRoletas[i].valores.includes('5')) {
                    fichaZero = fichasRoletas[i].valores.indexOf('5')
                    validouFichaZero = true
                }
            } else if (cobrirZero == 6) {
                if (fichasRoletas[i].valores.includes('5')) {
                    fichaZero = fichasRoletas[i].valores.indexOf('5')
                    validouFichaZero = true
                }
            } else if (cobrirZero == 7) {
                if (fichasRoletas[i].valores.includes('20')) {
                    fichaZero = fichasRoletas[i].valores.indexOf('20')
                    validouFichaZero = true
                }
            } else if (cobrirZero == 8) {
                if (fichasRoletas[i].valores.includes('25')) {
                    fichaZero = fichasRoletas[i].valores.indexOf('25')
                    validouFichaZero = true
                }
            } else if (cobrirZero == 9) {
                if (fichasRoletas[i].valores.includes('50')) {
                    fichaZero = fichasRoletas[i].valores.indexOf('50')
                    validouFichaZero = true
                }
            } else if (cobrirZero == 10) {
                if (fichasRoletas[i].valores.includes('100')) {
                    fichaZero = fichasRoletas[i].valores.indexOf('100')
                    validouFichaZero = true
                }
            } else if (cobrirZero == 11) {
                if (fichasRoletas[i].valores.includes('125')) {
                    fichaZero = fichasRoletas[i].valores.indexOf('125')
                    validouFichaZero = true
                    break
                }
            } else if (cobrirZero == 12) {
                if (fichasRoletas[i].valores.includes('500')) {
                    fichaZero = fichasRoletas[i].valores.indexOf('500')
                    validouFichaZero = true
                }
            } else if (cobrirZero == 13) {
                if (fichasRoletas[i].valores.includes('2k')) {
                    fichaZero = fichasRoletas[i].valores.indexOf('2k')
                    validouFichaZero = true
                }
            } else if (cobrirZero == 14) {
                if (fichasRoletas[i].valores.includes('2.5k')) {
                    fichaZero = fichasRoletas[i].valores.indexOf('2.5k')
                    validouFichaZero = true
                }
            } else if (cobrirZero == 15) {
                if (fichasRoletas[i].valores.includes('5k')) {
                    fichaZero = fichasRoletas[i].valores.indexOf('5k')
                    validouFichaZero = true
                }
            } else if (cobrirZero == 16) {
                if (fichasRoletas[i].valores.includes('25k')) {
                    fichaZero = fichasRoletas[i].valores.indexOf('25k')
                    validouFichaZero = true
                }
            } else if (cobrirZero == 0) {
                validouFichaZero = true
            }

            if (validouFichaAposta && validouFichaZero) {
                break
            }

        }
    }

    if (validouFichaAposta && validouFichaZero) {
        return true
    } else {
        return false
    }


}

function carregarRoleta() {
    roleta = []
    nomeRoleta = document.getElementsByClassName('table-info__nameWp_dByC6ZNXpXrcSPbRB')[0].outerText
    sequenciaRoleta = document.getElementsByClassName('roulette-historyfOmuwAaXbwHRa3HTIjFP')[0].outerText
    var listaSequenciaOld = sequenciaRoleta.split("\n")
    var sizesequencia = listaSequenciaOld.length
    var listaSequenciaNew = []
    for (let i = 0; i < sizesequencia; i++) {
        if (listaSequenciaOld[i].charAt(0) != "x") {
            listaSequenciaNew.push(listaSequenciaOld[i])
        }
    }

    roleta.push({ nome: nomeRoleta, sequencia: listaSequenciaNew })

    return roleta

}

function estrategiaImparParAlternancia(roleta) {
    imparParAlt = 0
    roleta.reverse()
    for (let i = 0; i < roleta.length; i++) {

        if (roleta[i - 1] != undefined) {
            if (numerosImpares.includes(roleta[i]) && numerosPares.includes(roleta[i - 1])) {
                imparParAlt++
            } else if (numerosImpares.includes(roleta[i - 1]) && numerosPares.includes(roleta[i])) {
                imparParAlt++
            } else {
                imparParAlt = 0
            }
        }
    }
    if (parseInt(alternanciaParImpar) == 0) {
        roleta.reverse()
        return 0
    } else if (imparParAlt == parseInt(alternanciaParImpar)) {
        roleta.reverse()
        return 1
    } else {
        roleta.reverse()
        return 0
    }
}

function estrategiaCoresAlternancia(roleta) {
    coresAlt = 0
    roleta.reverse()
    for (let i = 0; i < roleta.length; i++) {

        if (roleta[i - 1] != undefined) {
            if (numerosVermelhos.includes(roleta[i]) && numerosPretos.includes(roleta[i - 1])) {
                coresAlt++
            } else if (numerosVermelhos.includes(roleta[i - 1]) && numerosPretos.includes(roleta[i])) {
                coresAlt++
            } else {
                coresAlt = 0
            }
        }
    }
    if (parseInt(alternanciaCores) == 0) {
        roleta.reverse()
        return 0
    } else if (coresAlt == parseInt(alternanciaCores)) {
        roleta.reverse()
        return 1
    } else {
        roleta.reverse()
        return 0
    }
}

function estrategiaAltosbaixosAlternancia(roleta) {
    altosBaixosAlt = 0
    roleta.reverse()
    for (let i = 0; i < roleta.length; i++) {

        if (roleta[i - 1] != undefined) {
            if (numerosAltos.includes(roleta[i]) && numerosBaixos.includes(roleta[i - 1])) {
                altosBaixosAlt++
            } else if (numerosAltos.includes(roleta[i - 1]) && numerosBaixos.includes(roleta[i])) {
                altosBaixosAlt++
            } else {
                altosBaixosAlt = 0
            }
        }
    }
    if (parseInt(alternanciaAltosBaixos) == 0) {
        roleta.reverse()
        return 0
    } else if (altosBaixosAlt == parseInt(alternanciaAltosBaixos)) {
        roleta.reverse()
        return 1
    } else {
        roleta.reverse()
        return 0
    }
}

function estrategiaDuziasTendencia(roleta) {
    repeticaoPrimeiraDuzia = 0
    repeticaoSegundaDuzia = 0
    repeticaoTerceiraDuzia = 0
    roleta.reverse()
    for (let i = 0; i < roleta.length; i++) {
        if (primeiraDuzia.includes(roleta[i])) {
            repeticaoPrimeiraDuzia++
            repeticaoSegundaDuzia = 0
            repeticaoTerceiraDuzia = 0
        } else if (segundaDuzia.includes(roleta[i])) {
            repeticaoPrimeiraDuzia = 0
            repeticaoSegundaDuzia++
            repeticaoTerceiraDuzia = 0
        } else if (terceiraDuzia.includes(roleta[i])) {
            repeticaoPrimeiraDuzia = 0
            repeticaoSegundaDuzia = 0
            repeticaoTerceiraDuzia++
        } else {
            repeticaoPrimeiraDuzia = 0
            repeticaoSegundaDuzia = 0
            repeticaoTerceiraDuzia = 0
        }
    }
    if (parseInt(duziaRep) == 0) {
        roleta.reverse()
        return 0
    } else if (repeticaoPrimeiraDuzia == parseInt(duziaRep)) {
        roleta.reverse()
        return 1
    } else if (repeticaoSegundaDuzia == parseInt(duziaRep)) {
        roleta.reverse()
        return 2
    } else if (repeticaoTerceiraDuzia == parseInt(duziaRep)) {
        roleta.reverse()
        return 3
    } else {
        roleta.reverse()
        return 0
    }
}

function estrategiaDanilo(roleta, daniloRep) {
    let contagemEspeciais = 0;
  
    for (let i = 0; i < roleta.length; i++) {
      if (numerosDanilo.includes(roleta[i])) {
        contagemEspeciais++;
      }
    }
  
    if (contagemEspeciais >= daniloRep) {
      return 1;
    } else {
      return 0;
    }
  }

function estrategiaColunasTendencia(roleta) {
    repeticaoPrimeiraColuna = 0
    repeticaoSegundaColuna = 0
    repeticaoTerceiraColuna = 0
    roleta.reverse()
    for (let i = 0; i < roleta.length; i++) {
        if (primeiraColuna.includes(roleta[i])) {
            repeticaoPrimeiraColuna++
            repeticaoSegundaColuna = 0
            repeticaoTerceiraColuna = 0
        } else if (segundaColuna.includes(roleta[i])) {
            repeticaoPrimeiraColuna = 0
            repeticaoSegundaColuna++
            repeticaoTerceiraColuna = 0
        } else if (terceiraColuna.includes(roleta[i])) {
            repeticaoPrimeiraColuna = 0
            repeticaoSegundaColuna = 0
            repeticaoTerceiraColuna++
        } else {
            repeticaoPrimeiraColuna = 0
            repeticaoSegundaColuna = 0
            repeticaoTerceiraColuna = 0
        }
    }
    if (parseInt(colunaRep) == 0) {
        roleta.reverse()
        return 0
    } else if (repeticaoPrimeiraColuna == parseInt(colunaRep)) {
        roleta.reverse()
        return 1
    } else if (repeticaoSegundaColuna == parseInt(colunaRep)) {
        roleta.reverse()
        return 2
    } else if (repeticaoTerceiraColuna == parseInt(colunaRep)) {
        roleta.reverse()
        return 3
    } else {
        roleta.reverse()
        return 0
    }
}

function estrategiaDuzias(roleta) {
    repeticaoPrimeiraDuzia = 0
    repeticaoSegundaDuzia = 0
    repeticaoTerceiraDuzia = 0
    roleta.reverse()
    for (let i = 0; i < roleta.length; i++) {
        if (primeiraDuzia.includes(roleta[i])) {
            repeticaoPrimeiraDuzia = 0
            repeticaoSegundaDuzia++
            repeticaoTerceiraDuzia++
        } else if (segundaDuzia.includes(roleta[i])) {
            repeticaoPrimeiraDuzia++
            repeticaoSegundaDuzia = 0
            repeticaoTerceiraDuzia++
        } else if (terceiraDuzia.includes(roleta[i])) {
            repeticaoPrimeiraDuzia++
            repeticaoSegundaDuzia++
            repeticaoTerceiraDuzia = 0
        } else {
            repeticaoPrimeiraDuzia = 0
            repeticaoSegundaDuzia = 0
            repeticaoTerceiraDuzia = 0
        }
    }
    if (parseInt(duziaAusencia) == 0) {
        roleta.reverse()
        return 0
    } else if (repeticaoPrimeiraDuzia == parseInt(duziaAusencia)) {
        roleta.reverse()
        if (repeticaoSegundaDuzia == parseInt(duziaAusencia) || repeticaoTerceiraDuzia == parseInt(duziaAusencia)) {
            return 0
        } else {
            return 1
        }
    } else if (repeticaoSegundaDuzia == parseInt(duziaAusencia)) {
        roleta.reverse()
        if (repeticaoPrimeiraDuzia == parseInt(duziaAusencia) || repeticaoTerceiraDuzia == parseInt(duziaAusencia)) {
            return 0
        } else {
            return 2
        }
    } else if (repeticaoTerceiraDuzia == parseInt(duziaAusencia)) {
        roleta.reverse()
        if (repeticaoSegundaDuzia == parseInt(duziaAusencia) || repeticaoPrimeiraDuzia == parseInt(duziaAusencia)) {
            return 0
        } else {
            return 3
        }
    } else {
        roleta.reverse()
        return 0
    }
}

function estrategiaColunas(roleta) {
    repeticaoPrimeiraColuna = 0
    repeticaoSegundaColuna = 0
    repeticaoTerceiraColuna = 0
    roleta.reverse()
    for (let i = 0; i < roleta.length; i++) {
        if (primeiraColuna.includes(roleta[i])) {
            repeticaoPrimeiraColuna = 0
            repeticaoSegundaColuna++
            repeticaoTerceiraColuna++
        } else if (segundaColuna.includes(roleta[i])) {
            repeticaoPrimeiraColuna++
            repeticaoSegundaColuna = 0
            repeticaoTerceiraColuna++
        } else if (terceiraColuna.includes(roleta[i])) {
            repeticaoPrimeiraColuna++
            repeticaoSegundaColuna++
            repeticaoTerceiraColuna = 0
        } else {
            repeticaoPrimeiraColuna = 0
            repeticaoSegundaColuna = 0
            repeticaoTerceiraColuna = 0
        }
    }
    if (parseInt(colunaAusencia) == 0) {
        roleta.reverse()
        return 0
    } else if (repeticaoPrimeiraColuna == parseInt(colunaAusencia)) {
        roleta.reverse()
        if (repeticaoSegundaColuna == parseInt(colunaAusencia) || repeticaoTerceiraColuna == parseInt(colunaAusencia)) {
            return 0
        } else {
            return 1
        }
    } else if (repeticaoSegundaColuna == parseInt(colunaAusencia)) {
        roleta.reverse()
        if (repeticaoPrimeiraColuna == parseInt(colunaAusencia) || repeticaoTerceiraColuna == parseInt(colunaAusencia)) {
            return 0
        } else {
            return 2
        }
    } else if (repeticaoTerceiraColuna == parseInt(colunaAusencia)) {
        roleta.reverse()
        if (repeticaoPrimeiraColuna == parseInt(colunaAusencia) || repeticaoSegundaColuna == parseInt(colunaAusencia)) {
            return 0
        } else {
            return 3
        }
    } else {
        roleta.reverse()
        return 0
    }
}

function estrategiaCores(roleta) {
    repeticaoVermelho = 0
    repeticaoPreto = 0
    roleta.reverse()
    for (let i = 0; i < roleta.length; i++) {
        if (numerosPretos.includes(roleta[i])) {
            repeticaoVermelho = 0
            repeticaoPreto++
        } else if (numerosVermelhos.includes(roleta[i])) {
            repeticaoVermelho++
            repeticaoPreto = 0
        } else {
            repeticaoVermelho = 0
            repeticaoPreto = 0
        }
    }
    if (parseInt(coresRep) == 0) {
        roleta.reverse()
        return 0
    } else if (repeticaoVermelho == parseInt(coresRep)) {
        roleta.reverse()
        return 1
    } else if (repeticaoPreto == parseInt(coresRep)) {
        roleta.reverse()
        return 2
    } else {
        roleta.reverse()
        return 0
    }
}

function estrategiaAltosbaixos(roleta) {
    repeticaoAlto = 0
    repeticaoBaixo = 0
    roleta.reverse()
    for (let i = 0; i < roleta.length; i++) {
        if (numerosAltos.includes(roleta[i])) {
            repeticaoAlto++
            repeticaoBaixo = 0
        } else if (numerosBaixos.includes(roleta[i])) {
            repeticaoAlto = 0
            repeticaoBaixo++
        } else {
            repeticaoAlto = 0
            repeticaoBaixo = 0
        }
    }
    if (parseInt(altosBaixosRep) == 0) {
        roleta.reverse()
        return 0
    } else if (repeticaoAlto == parseInt(altosBaixosRep)) {
        roleta.reverse()
        return 1
    } else if (repeticaoBaixo == parseInt(altosBaixosRep)) {
        roleta.reverse()
        return 2
    } else {
        roleta.reverse()
        return 0
    }
}

function estrategiaParImpar(roleta) {
    repeticaoImpar = 0
    repeticaoPar = 0
    roleta.reverse()
    for (let i = 0; i < roleta.length; i++) {
        if (numerosImpares.includes(roleta[i])) {
            repeticaoImpar++
            repeticaoPar = 0
        } else if (numerosPares.includes(roleta[i])) {
            repeticaoImpar = 0
            repeticaoPar++
        } else {
            repeticaoImpar = 0
            repeticaoPar = 0
        }
    }
    if (parseInt(parImparRep) == 0) {
        roleta.reverse()
        return 0
    } else if (repeticaoImpar == parseInt(parImparRep)) {
        roleta.reverse()
        return 1
    } else if (repeticaoPar == parseInt(parImparRep)) {
        roleta.reverse()
        return 2
    } else {
        roleta.reverse()
        return 0
    }
}

function dobrarAposta() {

    click((Math.trunc(document.getElementsByClassName('action-buttons')[0].children[1].getBoundingClientRect().x)
        + Math.trunc(document.getElementsByClassName('action-buttons')[0].children[1].getBoundingClientRect().width / 2)),
        (Math.trunc(document.getElementsByClassName('action-buttons')[0].children[1].getBoundingClientRect().y)
            + Math.trunc(document.getElementsByClassName('action-buttons')[0].children[1].getBoundingClientRect().height / 2)))

    click((Math.trunc(document.getElementsByClassName('action-buttons')[0].children[1].getBoundingClientRect().x)
        + Math.trunc(document.getElementsByClassName('action-buttons')[0].children[1].getBoundingClientRect().width / 2)),
        (Math.trunc(document.getElementsByClassName('action-buttons')[0].children[1].getBoundingClientRect().y)
            + Math.trunc(document.getElementsByClassName('action-buttons')[0].children[1].getBoundingClientRect().height / 2)))

}


function executarAposta() {

    if (chaveRepeteDobra) {
        dobrarAposta()
        chaveRepeteDobra = false
    }

    if (chave0) {
        if (ficha != 0) {
            click((Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaZero].children[0].getBoundingClientRect().x)
                + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaZero].children[0].getBoundingClientRect().width / 2)),
                (Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaZero].children[0].getBoundingClientRect().y)
                    + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaZero].children[0].getBoundingClientRect().height / 2)))

            if (estrategiaEncontrada == 'altosBaixosAlt'
                || estrategiaEncontrada == 'coresAlt'
                || estrategiaEncontrada == 'parImparAlt') {
                for (let i = 0; i < cicloGale; i++) {
                    if (cobrirZero == 5) {
                        apostar0()
                        apostar0()
                    } else if (cobrirZero == 6) {
                        apostar0()
                        apostar0()
                        apostar0()
                    } else {
                        apostar0()
                    }
                }
            } else if (cicloGale == 1 || cicloGale == 2) {
                if (cobrirZero == 5) {
                    apostar0()
                    apostar0()
                } else if (cobrirZero == 6) {
                    apostar0()
                    apostar0()
                    apostar0()
                } else {
                    apostar0()
                }
            }
        }

        chave0 = false
    }

    if (chaveD1) {
        if (ficha != 0) {
            click((Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().x)
                + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().width / 2)),
                (Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().y)
                    + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().height / 2)))

            if (cicloGale > 2) {
                dobrarAposta()
            } else {
                if (ficha == 5) {
                    apostarD1()
                    apostarD1()
                } else if (ficha == 6) {
                    apostarD1()
                    apostarD1()
                    apostarD1()
                } else {
                    apostarD1()
                }
            }
        }
        chaveD1 = false
    }

    if (chaveD2) {
        if (ficha != 0) {
            click((Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().x)
                + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().width / 2)),
                (Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().y)
                    + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().height / 2)))

            if (cicloGale > 2) {
                dobrarAposta()
            } else {
                if (ficha == 5) {
                    apostarD2()
                    apostarD2()
                } else if (ficha == 6) {
                    apostarD2()
                    apostarD2()
                    apostarD2()
                } else {
                    apostarD2()
                }
            }
        }
        chaveD2 = false
    }

    if (chaveD3) {
        if (ficha != 0) {
            click((Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().x)
                + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().width / 2)),
                (Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().y)
                    + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().height / 2)))

            if (cicloGale > 2) {
                dobrarAposta()
            } else {
                if (ficha == 5) {
                    apostarD3()
                    apostarD3()
                } else if (ficha == 6) {
                    apostarD3()
                    apostarD3()
                    apostarD3()
                } else {
                    apostarD3()
                }
            }
        }
        chaveD3 = false
    }

    if (chaveC1) {
        if (ficha != 0) {
            click((Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().x)
                + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().width / 2)),
                (Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().y)
                    + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().height / 2)))

            if (cicloGale > 2) {
                dobrarAposta()
            } else {
                if (ficha == 5) {
                    apostarC1()
                    apostarC1()
                } else if (ficha == 6) {
                    apostarC1()
                    apostarC1()
                    apostarC1()
                } else {
                    apostarC1()
                }
            }
        }
        chaveC1 = false
    }

    if (chaveC2) {
        if (ficha != 0) {
            click((Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().x)
                + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().width / 2)),
                (Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().y)
                    + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().height / 2)))

            if (cicloGale > 2) {
                dobrarAposta()
            } else {
                if (ficha == 5) {
                    apostarC2()
                    apostarC2()
                } else if (ficha == 6) {
                    apostarC2()
                    apostarC2()
                    apostarC2()
                } else {
                    apostarC2()
                }
            }
        }
        chaveC2 = false
    }

    if (chaveC3) {
        if (ficha != 0) {
            click((Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().x)
                + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().width / 2)),
                (Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().y)
                    + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().height / 2)))

            if (cicloGale > 2) {
                dobrarAposta()
            } else {
                if (ficha == 5) {
                    apostarC3()
                    apostarC3()
                } else if (ficha == 6) {
                    apostarC3()
                    apostarC3()
                    apostarC3()
                } else {
                    apostarC3()
                }
            }
        }
        chaveC3 = false
    }
    
    if (chaveDanilo) {
        if (ficha != 0) {
            click((Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().x)
                + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().width / 2)),
                (Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().y)
                    + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().height / 2)))

            if (cicloGale > 2) {
                dobrarAposta()
            } else {
                if (ficha == 5) {
                    apostarDanilo()
                    apostarDanilo()
                } else if (ficha == 6) {
                    apostarDanilo()
                    apostarDanilo()
                    apostarDanilo()
                } else {
                    apostarDanilo()
                }
            }
        }
        chaveDanilo = false
    }

    if (chaveAlto) {
        if (ficha != 0) {
            click((Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().x)
                + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().width / 2)),
                (Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().y)
                    + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().height / 2)))

            if (cicloGale > 1) {
                if (estrategiaEncontrada == 'altosBaixosAlt') {
                    for (let i = 0; i < cicloGale; i++) {
                        if (ficha == 5) {
                            apostarAlto()
                            apostarAlto()
                        } else if (ficha == 6) {
                            apostarAlto()
                            apostarAlto()
                            apostarAlto()
                        } else {
                            apostarAlto()
                        }
                    }
                } else {
                    dobrarAposta()
                }
            } else {
                if (ficha == 5) {
                    apostarAlto()
                    apostarAlto()
                } else if (ficha == 6) {
                    apostarAlto()
                    apostarAlto()
                    apostarAlto()
                } else {
                    apostarAlto()
                }
            }
        }
        chaveAlto = false
    }

    if (chaveBaixo) {
        if (ficha != 0) {
            click((Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().x)
                + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().width / 2)),
                (Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().y)
                    + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().height / 2)))

            if (cicloGale > 1) {
                if (estrategiaEncontrada == 'altosBaixosAlt') {
                    for (let i = 0; i < cicloGale; i++) {
                        if (ficha == 5) {
                            apostarBaixo()
                            apostarBaixo()
                        } else if (ficha == 6) {
                            apostarBaixo()
                            apostarBaixo()
                            apostarBaixo()
                        } else {
                            apostarBaixo()
                        }
                    }
                } else {
                    dobrarAposta()
                }
            } else {
                if (ficha == 5) {
                    apostarBaixo()
                    apostarBaixo()
                } else if (ficha == 6) {
                    apostarBaixo()
                    apostarBaixo()
                    apostarBaixo()
                } else {
                    apostarBaixo()
                }
            }
        }
        chaveBaixo = false
    }

    if (chaveVermelho) {
        if (ficha != 0) {
            click((Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().x)
                + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().width / 2)),
                (Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().y)
                    + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().height / 2)))

            if (cicloGale > 1) {
                if (estrategiaEncontrada == 'coresAlt') {
                    for (let i = 0; i < cicloGale; i++) {
                        if (ficha == 5) {
                            apostarVermelho()
                            apostarVermelho()
                        } else if (ficha == 6) {
                            apostarVermelho()
                            apostarVermelho()
                            apostarVermelho()
                        } else {
                            apostarVermelho()
                        }
                    }
                } else {
                    dobrarAposta()
                }
            } else {
                if (ficha == 5) {
                    apostarVermelho()
                    apostarVermelho()
                } else if (ficha == 6) {
                    apostarVermelho()
                    apostarVermelho()
                    apostarVermelho()
                } else {
                    apostarVermelho()
                }
            }
        }
        chaveVermelho = false
    }

    if (chavePreto) {
        if (ficha != 0) {
            click((Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().x)
                + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().width / 2)),
                (Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().y)
                    + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().height / 2)))

            if (cicloGale > 1) {
                if (estrategiaEncontrada == 'coresAlt') {
                    for (let i = 0; i < cicloGale; i++) {
                        if (ficha == 5) {
                            apostarPreto()
                            apostarPreto()
                        } else if (ficha == 6) {
                            apostarPreto()
                            apostarPreto()
                            apostarPreto()
                        } else {
                            apostarPreto()
                        }
                    }
                } else {
                    dobrarAposta()
                }
            } else {
                if (ficha == 5) {
                    apostarPreto()
                    apostarPreto()
                } else if (ficha == 6) {
                    apostarPreto()
                    apostarPreto()
                    apostarPreto()
                } else {
                    apostarPreto()
                }
            }
        }
        chavePreto = false
    }

    if (chaveImpar) {
        if (ficha != 0) {
            click((Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().x)
                + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().width / 2)),
                (Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().y)
                    + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().height / 2)))

            if (cicloGale > 1) {
                if (estrategiaEncontrada == 'parImparAlt') {
                    for (let i = 0; i < cicloGale; i++) {
                        if (ficha == 5) {
                            apostarImpar()
                            apostarImpar()
                        } else if (ficha == 6) {
                            apostarImpar()
                            apostarImpar()
                            apostarImpar()
                        } else {
                            apostarImpar()
                        }
                    }
                } else {
                    dobrarAposta()
                }
            } else {
                if (ficha == 5) {
                    apostarImpar()
                    apostarImpar()
                } else if (ficha == 6) {
                    apostarImpar()
                    apostarImpar()
                    apostarImpar()
                } else {
                    apostarImpar()
                }
            }
        }
        chaveImpar = false
    }

    if (chavePar) {
        if (ficha != 0) {
            click((Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().x)
                + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().width / 2)),
                (Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().y)
                    + Math.trunc(document.getElementsByClassName('chip arrow-slider__element')[fichaAposta].children[0].getBoundingClientRect().height / 2)))

            if (cicloGale > 1) {
                if (estrategiaEncontrada == 'parImparAlt') {
                    for (let i = 0; i < cicloGale; i++) {
                        if (ficha == 5) {
                            apostarPar()
                            apostarPar()
                        } else if (ficha == 6) {
                            apostarPar()
                            apostarPar()
                            apostarPar()
                        } else {
                            apostarPar()
                        }
                    }
                } else {
                    dobrarAposta()
                }
            } else {
                if (ficha == 5) {
                    apostarPar()
                    apostarPar()
                } else if (ficha == 6) {
                    apostarPar()
                    apostarPar()
                    apostarPar()
                } else {
                    apostarPar()
                }
            }
        }
        chavePar = false
    }
}

function click(x, y) {
    var ev = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'screenX': x,
        'screenY': y
    });
    var el = document.elementFromPoint(x, y);
    el.dispatchEvent(ev);
}


function apostar0() {
    if (document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[3] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[3].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[3].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[3].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[3].getBoundingClientRect().height / 2)))
    } else if (document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[2] != undefined) {
        click((Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[2].getBoundingClientRect().x)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[2].getBoundingClientRect().width / 2)),
            (Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[2].getBoundingClientRect().y)
                + Math.trunc(document.getElementsByClassName('roulette-table-cell_straight-0')[1].children[2].getBoundingClientRect().height / 2)))
    }


}

function apostarD1() {
    click((Math.trunc(document.getElementsByClassName('roulette-table-cell_side-first-dozen')[0].children[1].getBoundingClientRect().x)
        + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-first-dozen')[0].children[1].getBoundingClientRect().width / 2)),
        (Math.trunc(document.getElementsByClassName('roulette-table-cell_side-first-dozen')[0].children[1].getBoundingClientRect().y)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-first-dozen')[0].children[1].getBoundingClientRect().height / 2)) + 2)

}

function apostarD2() {
    click((Math.trunc(document.getElementsByClassName('roulette-table-cell_side-second-dozen')[0].children[1].getBoundingClientRect().x)
        + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-second-dozen')[0].children[1].getBoundingClientRect().width / 2)),
        (Math.trunc(document.getElementsByClassName('roulette-table-cell_side-second-dozen')[0].children[1].getBoundingClientRect().y)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-second-dozen')[0].children[1].getBoundingClientRect().height / 2)) + 2)

}

function apostarD3() {
    click((Math.trunc(document.getElementsByClassName('roulette-table-cell_side-third-dozen')[0].children[1].getBoundingClientRect().x)
        + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-third-dozen')[0].children[1].getBoundingClientRect().width / 2)),
        (Math.trunc(document.getElementsByClassName('roulette-table-cell_side-third-dozen')[0].children[1].getBoundingClientRect().y)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-third-dozen')[0].children[1].getBoundingClientRect().height / 2)) + 2)

}

function apostarC1() {
    click((Math.trunc(document.getElementsByClassName('roulette-table-cell_side-bottom-column')[0].children[1].getBoundingClientRect().x)
        + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-bottom-column')[0].children[1].getBoundingClientRect().width / 2)),
        (Math.trunc(document.getElementsByClassName('roulette-table-cell_side-bottom-column')[0].children[1].getBoundingClientRect().y)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-bottom-column')[0].children[1].getBoundingClientRect().height / 2)))

}

function apostarC2() {
    click((Math.trunc(document.getElementsByClassName('roulette-table-cell_side-middle-column')[0].children[1].getBoundingClientRect().x)
        + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-middle-column')[0].children[1].getBoundingClientRect().width / 2)),
        (Math.trunc(document.getElementsByClassName('roulette-table-cell_side-middle-column')[0].children[1].getBoundingClientRect().y)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-middle-column')[0].children[1].getBoundingClientRect().height / 2)))

}

function apostarC3() {
    click((Math.trunc(document.getElementsByClassName('roulette-table-cell_side-top-column')[0].children[1].getBoundingClientRect().x)
        + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-top-column')[0].children[1].getBoundingClientRect().width / 2)),
        (Math.trunc(document.getElementsByClassName('roulette-table-cell_side-top-column')[0].children[1].getBoundingClientRect().y)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-top-column')[0].children[1].getBoundingClientRect().height / 2)))

}

function apostarDanilo() {
    const clickOnElement = (className) => {
      const element = document.getElementsByClassName(className)[0].children[1];
      click(
        Math.trunc(element.getBoundingClientRect().x) + Math.trunc(element.getBoundingClientRect().width / 2),
        Math.trunc(element.getBoundingClientRect().y) + Math.trunc(element.getBoundingClientRect().height / 2)
      );
    };
  
    clickOnElement('path[data-automation-locator="betPlace.line-4-5-6-7-8-9"]');
    clickOnElement('path[data-automation-locator="betPlace.line-10-11-12-13-14-15"]');
    clickOnElement('path[data-automation-locator="betPlace.line-16-17-18-19-20-21"]');
    clickOnElement('path[data-automation-locator="betPlace.line-22-23-24-25-26-27"]');
    clickOnElement('path[data-automation-locator="betPlace.line-28-29-30-31-32-33"]');
}

function apostarAlto() {
    click((Math.trunc(document.getElementsByClassName('roulette-table-cell_side-high')[0].children[1].getBoundingClientRect().x)
        + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-high')[0].children[1].getBoundingClientRect().width / 2)),
        (Math.trunc(document.getElementsByClassName('roulette-table-cell_side-high')[0].children[1].getBoundingClientRect().y)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-high')[0].children[1].getBoundingClientRect().height / 2)))

}

function apostarBaixo() {
    click((Math.trunc(document.getElementsByClassName('roulette-table-cell_side-low')[0].children[1].getBoundingClientRect().x)
        + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-low')[0].children[1].getBoundingClientRect().width / 2)),
        (Math.trunc(document.getElementsByClassName('roulette-table-cell_side-low')[0].children[1].getBoundingClientRect().y)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-low')[0].children[1].getBoundingClientRect().height / 2)))

}

function apostarVermelho() {
    click((Math.trunc(document.getElementsByClassName('roulette-table-cell_side-red')[0].children[1].getBoundingClientRect().x)
        + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-red')[0].children[1].getBoundingClientRect().width / 2)),
        (Math.trunc(document.getElementsByClassName('roulette-table-cell_side-red')[0].children[1].getBoundingClientRect().y)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-red')[0].children[1].getBoundingClientRect().height / 2)))

}

function apostarPreto() {
    click((Math.trunc(document.getElementsByClassName('roulette-table-cell_side-black')[0].children[1].getBoundingClientRect().x)
        + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-black')[0].children[1].getBoundingClientRect().width / 2)),
        (Math.trunc(document.getElementsByClassName('roulette-table-cell_side-black')[0].children[1].getBoundingClientRect().y)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-black')[0].children[1].getBoundingClientRect().height / 2)))

}

function apostarPar() {
    click((Math.trunc(document.getElementsByClassName('roulette-table-cell_side-even')[0].children[1].getBoundingClientRect().x)
        + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-even')[0].children[1].getBoundingClientRect().width / 2)),
        (Math.trunc(document.getElementsByClassName('roulette-table-cell_side-even')[0].children[1].getBoundingClientRect().y)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-even')[0].children[1].getBoundingClientRect().height / 2)))

}

function apostarImpar() {
    click((Math.trunc(document.getElementsByClassName('roulette-table-cell_side-odd')[0].children[1].getBoundingClientRect().x)
        + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-odd')[0].children[1].getBoundingClientRect().width / 2)),
        (Math.trunc(document.getElementsByClassName('roulette-table-cell_side-odd')[0].children[1].getBoundingClientRect().y)
            + Math.trunc(document.getElementsByClassName('roulette-table-cell_side-odd')[0].children[1].getBoundingClientRect().height / 2)))

}

setInterval(() => {
    try {
        carregarConfiguracao()
        ciclo++
        if (statusBot == 0) {
            if (document.getElementsByClassName('lobby-tables__item').length > 1) {
                if (!displayLobbyExists) {
                    if (document.querySelector('.lobby-header__filterqDmLZJ0RC7XlyyjENEqe')) {
                        painelLobby = document.querySelector('.lobby-header__filterqDmLZJ0RC7XlyyjENEqe')
                    } else if (document.querySelector('.lobby__filter')) {
                        painelLobby = document.querySelector('.lobby__filter')
                    }
                    painelLobby.insertAdjacentHTML('afterbegin', '<h1 id = "displaybotlobby" style="width: 90%;color: white;text-align: center; font-size: xx-large;font-weight: bolder;align-self: center;"></h1>')
                    displayRoletaExists = false
                    displayLobbyExists = true
                }
                inserirTextoDisplay(`MRV RUSH bloqueado`, 1)
            }
        } else if (stopGain == contagemAcertos || stopLoss == contagemErros) {
            if (document.getElementsByClassName('modal-footer-btn modal-footer-btn_resolve modal-footer-btn_full').length == 1) {
                document.getElementsByClassName('modal-footer-btn modal-footer-btn_resolve modal-footer-btn_full')[0].click()
            }
            if (document.getElementsByClassName('lobby-tables__item').length > 1) {
                if (!displayLobbyExists) {
                    if (document.querySelector('.lobby-header__filterqDmLZJ0RC7XlyyjENEqe')) {
                        painelLobby = document.querySelector('.lobby-header__filterqDmLZJ0RC7XlyyjENEqe')
                    } else if (document.querySelector('.lobby__filter')) {
                        painelLobby = document.querySelector('.lobby__filter')
                    }
                    painelLobby.insertAdjacentHTML('afterbegin', '<h1 id = "displaybotlobby" style="width: 90%;color: white;text-align: center; font-size: xx-large;font-weight: bolder;align-self: center;"></h1>')
                    displayRoletaExists = false
                    displayLobbyExists = true
                }
                inserirTextoDisplay(`MRV RUSH - ${contagemAcertos} ACERTOS - ${contagemErros} ERROS`, 1)
            }
            if (ciclo > 200 && document.getElementsByClassName('lobby-tables__item').length > 1) {
                document.getElementsByClassName('lobby-table__game-logo')[14].click()
            } else if (ciclo > 200 && document.getElementsByClassName('lobby-tables__item').length == 0) {
                zerarChaves()
                document.getElementsByClassName('close-button header__close-button')[0].click()
                ciclo = 0
            }
        } else {
            if (document.getElementsByClassName('modal-footer-btn modal-footer-btn_resolve modal-footer-btn_full').length == 1) {
                document.getElementsByClassName('modal-footer-btn modal-footer-btn_resolve modal-footer-btn_full')[0].click()
            }

            if (ciclo > 200 && document.getElementsByClassName('lobby-tables__item').length > 1) {
                document.getElementsByClassName('lobby-table__game-logo')[14].click()
                estrategiaEncontrada = ''
                ciclo = 0
            }
            if (document.getElementsByClassName('welcome-modal__footer welcome-footer').length == 1) {
                document.getElementsByClassName('welcome-modal__footer welcome-footer')[0].children[0].click()
            }

            if (document.getElementsByClassName('welcome-modal__footer welcome-footer').length == 1) {
                document.getElementsByClassName('welcome-modal__footer welcome-footer')[0].click()
            }

            if (document.getElementsByClassName('modal-button__textsTEBj_JYXKh_SqB6cL2k').length > 0) {
                document.getElementsByClassName('modal-button__textsTEBj_JYXKh_SqB6cL2k')[0].click()
            }

            analisandoEstrategias()
        }

    } catch (err) {
        console.log(err)
    }

}, 4000)
