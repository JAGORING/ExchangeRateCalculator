'use strict;'
const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');
const swapBtn = document.getElementById('swap');
const swapMsg = document.getElementById('rate');


function executeCalculator() {
	fetch("https://v6.exchangerate-api.com/v6/eabe4e268e5ddc56dc14f4c2/latest/KRW")
	.then(response => response.json())
	.then(data => { 
		const rate = data.conversion_rates[currencyTwo.value] / data.conversion_rates[currencyOne.value];
		amountTwo.value = (amountOne.value * rate).toFixed(2);
		swapMsg.innerText = `1 ${currencyOne.value} = ${rate.toFixed(2)} ${currencyTwo.value}`;
	})
	.catch(console.log);
}

swapBtn.addEventListener('click', () => {

	let dataSwap = currencyOne.value;
	currencyOne.value = currencyTwo.value;
	currencyTwo.value = dataSwap;
	executeCalculator();
});

function setEvent(target, event){
	target.addEventListener(event, executeCalculator);
}

setEvent(currencyOne, 'click');
setEvent(currencyTwo, 'click');
setEvent(amountOne, 'input');
setEvent(amountTwo, 'input');

executeCalculator();