let historyStorage = [];

function history(now) {
	let displayNow = document.querySelector('.display__now');

	displayNow.innerText = now.innerText;
	historyStorage.push(now.innerText);
	let counter = 1;
	for (let i = historyStorage.length - 1; i >= historyStorage.length - 3; i--) {
		let displayHistory = document.querySelector(`.display__history${counter}`);
		if (historyStorage[i] === undefined) {
			displayHistory.innerText = ' ';
		} else {
			displayHistory.innerText = historyStorage[i];
		}
		counter++;
	}
}

function play(event) {
	const sound = document.querySelector(`audio[data-key="${event.keyCode}"]`);
	const key = document.querySelector(`.keys__key[data-key="${event.keyCode}"]`);

	new Promise((resolve, reject) => {
		key.classList.add('playing');
		sound.play();
		resolve();
	})
		.then(() => {
			history(key.lastElementChild);
		})
		.then(() => {
			key.addEventListener('transitionend', event => {
				if (event.propertyName !== 'transform') return;
				event.target.classList.remove('playing');
			});
		})
		.catch(error => {
			wrongButton();
		});
}

function wrongButton() {
	const button = document.querySelector('.wrong-button');

	new Promise((resolve, reject) => {
		button.classList.add('error');
		setTimeout(resolve, 700);
	}).then(() => {
		button.classList.remove('error');
	});
}

window.addEventListener('keydown', play);

let creditsButton = document.querySelector('.credits-button');
let creditsModal = document.querySelector('.credits');
let creditsClose = document.querySelector('.credits__close');

creditsButton.onclick = function () {
	creditsModal.style.display = 'block';
};

creditsClose.onclick = function () {
	creditsModal.style.display = 'none';
};

let settingsButton = document.querySelector('#settings-icon');
let settingsModal = document.querySelector('.settings');
let settingsClose = document.querySelector('.settings__close');

settingsButton.onclick = () => {
	settingsModal.style.display = 'block';
};

settingsClose.onclick = () => {
	settingsModal.style.display = 'none';
};

window.onclick = function (event) {
	if (event.target === creditsModal) {
		creditsModal.style.display = 'none';
	} else if (event.target === settingsModal) {
		settingsModal.style.display = 'none';
	}
};

let localStorage = window.localStorage;

let boxGrey = document.querySelector('.box-grey');
let boxDarkenGrey = document.querySelector('.box-darken-grey');

boxGrey.onclick = () => {
	localStorage.setItem('color', 'grey');
};

boxDarkenGrey.onclick = () => {
	localStorage.setItem('color', 'rgb(68, 68, 68)');
};

let body = document.getElementsByTagName('body');

let set = document.getElementById('set');

set.onclick = () => {
	document.body.style.backgroundColor = localStorage.getItem('color');
};

let reset = document.getElementById('reset');

reset.onclick = () => {
	document.body.style.backgroundColor = 'white';
};
