const depositBtn = document.getElementById("deposit-button");
const withdrawBtn = document.getElementById("withdraw-button");
const transferBtn = document.getElementById("transfer-button");
const changePassBtn = document.getElementById("change-password-button");
const logoutBtn = document.getElementById("logout-button");
const balanceText = document.getElementById("balance");

let balance = 1000;
let CORRECT_PIN = "1234";
let pinTries = 3;

const deposit = () => {
    const depositAmount = parseFloat(prompt("Cantidad que desea ingresar"));

    if (depositAmount > 0) {
        balance += depositAmount;

        alert(`Depositados ${depositAmount}€ con éxito.`);
        showBalance();
    } else {
        console.log("Cantidad no valida");
    }
};

const withdraw = () => {
    const withdrawAmount = parseFloat(prompt("Cantidad que desea retirar"));

    if (withdrawAmount > 0 && withdrawAmount <= balance) {
        balance -= withdrawAmount;

        alert(`Retirados ${withdrawAmount}€ con éxito.`);
        showBalance();
    } else {
        console.log("Cantidad no valida");
    }
};

const transfer = () => {
    const transferAmount = parseFloat(prompt("Cantidad a transferir"));

    if (transferAmount > 0 && transferAmount <= balance) {
        const bankAccount = prompt("Cuenta de destino de la transferencia");
        balance -= transferAmount;

        alert(`Tranferidos ${transferAmount}€ a la cuenta ${bankAccount}`);
        showBalance();
    } else {
        console.log("Cantidad no valida");
    }
};

const changePass = () => {
    const pin = prompt("Ingrese su PIN");

    if (pin === CORRECT_PIN) {
        const newPIN = prompt("Ingrese su nuevo PIN");
        CORRECT_PIN = newPIN;

        alert(`Su nuevo PIN es ${CORRECT_PIN}`);
    } else {
        console.log("PIN incorrect");
    }
};

const logout = () => {
    document.location.href = "templates/logout.html";
};

const login = () => {
    let pin = prompt("Ingrese su PIN");

    while (pin !== CORRECT_PIN && pinTries > 1) {
        pinTries--;
        alert(`PIN incorrecto. Le quedan ${pinTries} intentos.`);
        pin = prompt("Ingrese su PIN");
    }

    if (pin !== CORRECT_PIN) {
        document.location.href = "templates/block.html";
    }
};

const showBalance = () => {
    balanceText.innerText = balance.toFixed(2);
};

depositBtn.addEventListener("click", deposit);
withdrawBtn.addEventListener("click", withdraw);
transferBtn.addEventListener("click", transfer);
changePassBtn.addEventListener("click", changePass);
logoutBtn.addEventListener("click", logout);

login();
showBalance();
