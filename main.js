    //Variables
    let pickedOneSelect = null;
    let pickedTwoSelect = null;

    let pickedScore = 0;
    
    //Class: RPS Game
    class RPSGame {
        constructor() {
            this.selectionEl = document.querySelector('.rps-selection');
            this.battleEl = document.querySelector('.rps-battle');
            this.pickedOne = document.querySelector('.picked-one');
            this.pickedTwo = document.querySelector('.picked-two');
            this.pickedTwoWaitEl = document.querySelector('.picked-two-wait');
            this.pickedScoreEl = document.querySelector('.rps-score h3');
            this.battleAgainEl = document.querySelector('.rps-battle-again h2')
            this.rulesEl = document.querySelector('.rules-modal');
            this.pickedArr = ['paper', 'scissors', 'rock'];
        }
        //select rps
        selectRps(element) {
            const pick = element.dataset.picked;
            this.selectionEl.classList.add('hide-el');
            this.battleEl.classList.remove('hide-el');
            this.createPickedEl(pick, 1);
            setTimeout(() => {
                this.selectRpsTwo();
            }, 1000);
        }
        //select rps two
        selectRpsTwo() {
            const randomPick = Math.floor(Math.random() * this.pickedArr.length);
            const pick = this.pickedArr[randomPick];
            this.pickedTwoWaitEl.classList.add('hide-el');
            this.createPickedEl(pick, 2);
            setTimeout(() => {
                this.showWinner(pickedOneSelect, pickedTwoSelect);
            }, 500);
        }
        //Show Winner
        showWinner(pickOne, pickTwo) {
            if ((pickOne === 'paper' && pickTwo === 'rock')
            || (pickOne === 'rock' && pickTwo === 'scissors')
            || (pickOne === 'scissors' && pickTwo === 'paper')) {
                pickedScore ++;
                this.pickedOne.classList.add('winner');
                this.showWinnerText('You win');
            } else if (pickOne === pickTwo) {
                this.pickedOne.classList.add('winner');
                this.pickedTwo.classList.add('winner');
                this.showWinnerText('Draw');
            } else {
                pickedScore --;
                this.pickedTwo.classList.add('winner');
                this.showWinnerText('You lose');
            }
            this.updatePickedScore();
        }
        //create picked el
        createPickedEl(picked, pickedChoose) {
            const button = document.createElement('button');
            button.classList.add('btn', `btn-${ picked }`);
            button.innerHTML = `<img src="images/icon-${ picked }.svg" alt="">`;
            if (pickedChoose == 1) {
                const title = this.pickedOne.querySelector('h3');
                this.pickedOne.insertBefore(button, title);
                pickedOneSelect = picked;
            } else if (pickedChoose == 2) {
                const title = this.pickedTwo.querySelector('h3');
                this.pickedTwo.insertBefore(button, title);
                pickedTwoSelect = picked;
            }
        }
        //update picked score
        updatePickedScore() {
            this.pickedScoreEl.textContent = pickedScore;
        }

        //show winner text
        showWinnerText(text) {
            this.battleEl.classList.add('battle-end');
            this.battleAgainEl.innerText = text;
        }

        //start again
        startAgain() {
            this.selectionEl.classList.remove('hide-el');
            this.battleEl.classList.add('hide-el');
            this.battleEl.classList.remove('battle-end');
            this.pickedOne.removeChild(this.pickedOne.querySelector('.btn'));
            this.pickedTwo.removeChild(this.pickedTwo.querySelector('.btn'));
            this.pickedTwoWaitEl.classList.remove('hide-el');
            document.querySelectorAll('.picked').forEach(item => item.classList.remove('winner'));
        }

        //show rules
        showRules() {
            this.rulesEl.classList.remove('hide-modal');
        }

        //hide rules
        hideRules() {
            this.rulesEl.classList.add('hide-modal');
        }
    }

    //Event: DOM Content Loaded
    document.addEventListener('DOMContentLoaded', () => {
        const rpsGame = new RPSGame();

        const rpsBtns = document.querySelectorAll('.rps-selection .btn');
        rpsBtns.forEach(btn => {
            btn.addEventListener('click', e => {
                rpsGame.selectRps(e.currentTarget);
            });
        });

        const playAgainBtn = document.querySelector('.btn-again');
        playAgainBtn.addEventListener('click', () => {
            rpsGame.startAgain();
        });

        const rpsRules = document.querySelector('.rps-rules-btn');
        const closeRpsRules = document.querySelector('.close-rules-modal');
        rpsRules.addEventListener('click', () => {
            rpsGame.showRules();
        });
        closeRpsRules.addEventListener('click', () => {
            rpsGame.hideRules();
        });
    });