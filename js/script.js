const display = document.querySelector('.display');
const apagar = document.querySelector('.btn-apaga');
const ponto = document.querySelector('.btn-ponto');
const igual = document.querySelector('.btn-igual');
const hist = document.querySelector('.btn-hist');
const apaga_hist = document.querySelector('.btn-apaga-hist');
const janela_hist = document.querySelector('.historico');
const calculadora = document.querySelector('.calc');
const exp = document.querySelector('.expressao');
const fecha = document.querySelector('.btn-fechar');


let numeros = Array();
let operacoes = Array();
let expressao = '';

let p = false;

let aux1;
let aux2;

function insert(num) {
    display.value += Number(num);
}

function operacao(op) {

    if(display.value === '') {
        return;
    }
        operacoes.push(op);
        numeros.push(Number(display.value));

        expressao += display.value;
        expressao += op;

        display.placeholder = display.value;
        display.value = '';

        p = false;
    
    
}

function operacao1(op) {

    if(display.value !== '') {

        switch(op) {
            case 'p':
                display.value = Number(display.value) * 0.1;
                p = false;
                break;
            case 'r':
                display.value = Math.sqrt(Number(display.value));
                p = false;
                break;
            case 'i':
                display.value = Math.pow(Number(display.value), -1);
                p = false;
                break;
            case 'o':
                display.value = Number(display.value) * -1;
                p = false;
                break;
            case 's':
                display.value = Math.sin(Number(display.value));
                p = false;
                break;
            case 'c':
                display.value = Math.cos(Number(display.value));
                p = false;
                break;
            case 't':
                display.value = Math.tan(Number(display.value));
                p = false;
                break;
        }
    }
    
}

function identifica_sinal(sinal) {
    return operacoes[0] === sinal;
}

function aux() {
    aux1 = numeros[0];
    aux2 = numeros[1];
    numeros.shift();
    numeros.shift();
}

apagar.addEventListener('click', () => {
    display.value = '';
    p = false;
})

ponto.addEventListener('click', () => {
    if(p === false) {
        display.value += '.';
        p = true;
    }
})

igual.addEventListener('click', () => {
    if(display.value != '') {
        numeros.push(Number(display.value));
        expressao += display.value;
        expressao += '=';

        while(numeros.length > 1) {
            if(identifica_sinal('+')) {
                aux();
                numeros.unshift(Number(aux1) + Number(aux2));
            } else if(identifica_sinal('-')) {
                aux();
                numeros.unshift(Number(aux1) - Number(aux2));
            } else if(identifica_sinal('x')) {
                aux();
                numeros.unshift(Number(aux1) * Number(aux2));
            } else if(identifica_sinal('^')) {
                aux();
                numeros.unshift(Math.pow(Number(aux1), Number(aux2)));
            } else if(identifica_sinal('/')) {
                aux();
                numeros.unshift(Number(aux1) / Number(aux2));
            }
            operacoes.shift();
        }
        display.value = numeros[0];
        display.placeholder = '';
        numeros.shift();
        expressao += display.value;

        exp.innerHTML += expressao + "<br>";

        expressao = '';

    }
})

hist.addEventListener('click', () => {
    janela_hist.classList.remove('hidden');
    calculadora.classList.add('hidden');
})

apaga_hist.addEventListener('click', () => {
    exp.innerHTML = '';
})

fecha.addEventListener('click', () => {
    janela_hist.classList.add('hidden');
    calculadora.classList.remove('hidden');

})