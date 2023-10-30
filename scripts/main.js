const depositBtn = document.getElementById("deposit-button");
const withdrawBtn = document.getElementById("withdraw-button");
const transferBtn = document.getElementById("transfer-button");
const changePassBtn = document.getElementById("change-password-button");
const logoutBtn = document.getElementById("logout-button");
const balanceText = document.getElementById("balance");

const amountWrapper = document.getElementById("amount-wrapper");
const amountInput = document.getElementById("amount-input");
const amountBtn = document.getElementById("amount-button");
const accountInput = document.getElementById("account-input");

let balance = 1000;
let CORRECT_PIN = "1234";
let pinTries = 3;
// let regularExpresion = "/^(ES\d{22}$/";

const deposit = () => {
    const depositAmount = parseFloat(amountInput.value);

    if (!isNaN(depositAmount) && depositAmount > 0) {
        balance += depositAmount;

        alert(`Depositados ${depositAmount}€ con éxito.`);
        showBalance();

        amountInput.value = "";
    } else {
        alert("Cantidad no válida.");
    }
};

const withdraw = () => {
    const withdrawAmount = parseFloat(amountInput.value);

    if (
        !isNaN(withdrawAmount) &&
        withdrawAmount > 0 &&
        withdrawAmount <= balance
    ) {
        balance -= withdrawAmount;

        alert(`Retirados ${withdrawAmount}€ con éxito.`);
        showBalance();

        amountInput.value = "";
    } else {
        alert("Cantidad no válida.");
    }
};

const transfer = () => {
    const transferAmount = parseFloat(amountInput.value);
    const transferAccount = accountInput.value;

    if (
        transferAccount !== "" &&
        !isNaN(transferAmount) &&
        transferAmount > 0 &&
        transferAmount <= balance
    ) {
        balance -= transferAmount;

        alert(`Tranferidos ${transferAmount}€ a la cuenta ${transferAccount}`);
        showBalance();

        amountInput.value = "";
        accountInput.value = "";
    } else {
        alert("Cantidad o cuenta de destino no válida.");
    }
};

const changePass = () => {
    const pin = prompt("Ingrese su PIN actual");

    if (pin === CORRECT_PIN) {
        const newPIN = prompt("Ingrese su nuevo PIN");
        CORRECT_PIN = newPIN;

        alert(`Su nuevo PIN es: ${CORRECT_PIN}`);
    } else {
        alert(
            "PIN incorrecto. No se ha realizado ningún cambio en su PIN de la cuenta."
        );
    }
};

const logout = () => {
    alert("Gracias por utilizar el cajero. Hasta luego.");
    document.location.href = "templates/logout.html";
};

const login = () => {
    let pin = prompt("Ingrese su PIN");

    while (pin !== CORRECT_PIN && pinTries > 1) {
        pinTries--;
        alert(`PIN incorrecto. Le quedan ${pinTries} intentos.`);
        pin = prompt("Ingrese su PIN");
    }

    if (pin === CORRECT_PIN) {
        showBalance();
    } else {
        alert(
            `PIN incorrecto. Ya no le quedan intentos. El cajero se ha bloqueado.`
        );
        document.location.href = "templates/block.html";
    }
};

const showBalance = () => {
    balanceText.innerText = balance;
};

depositBtn.addEventListener("click", () => {
    amountBtn.innerText = "Depositar";
    amountWrapper.classList.remove("hidden");
    accountInput.classList.add("hidden");
});
withdrawBtn.addEventListener("click", () => {
    amountBtn.innerText = "Retirar";
    amountWrapper.classList.remove("hidden");
    accountInput.classList.add("hidden");
});
transferBtn.addEventListener("click", () => {
    amountBtn.innerText = "Transferir";
    amountWrapper.classList.remove("hidden");
    accountInput.classList.remove("hidden");
});
changePassBtn.addEventListener("click", changePass);
logoutBtn.addEventListener("click", logout);

amountBtn.addEventListener("click", () => {
    if (amountBtn.innerText === "Depositar") {
        deposit();
    } else if (amountBtn.innerText === "Retirar") {
        withdraw();
    } else if (amountBtn.innerText === "Transferir") {
        transfer();
    }
});

login();
showBalance();
