let income = 0;
let expenses = 0;

const balanceValue = document.getElementById('balance-value');
const totalIncome = document.getElementById('total-income');
const totalExpenses = document.getElementById('total-expenses');
const expenseList = document.getElementById('expenses');

document.getElementById('add-expense').addEventListener('click', addExpense);

function addExpense() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!description || isNaN(amount)) {
        alert('Please enter a valid description and amount.');
        return;
    }

    // Update income or expenses
    if (amount > 0) {
        income += amount;
    } else {
        expenses += Math.abs(amount);
    }

    // Update balance and summary
    updateBalance();
    
    // Add the new expense to the list
    const expenseItem = document.createElement('li');
    expenseItem.innerHTML = `${description}: $${amount}`;
    expenseList.appendChild(expenseItem);

    // Save data to localStorage
    saveData();
}

function updateBalance() {
    const balance = income - expenses;
    balanceValue.innerText = `$${balance.toFixed(2)}`;
    totalIncome.innerText = income.toFixed(2);
    totalExpenses.innerText = expenses.toFixed(2);
}

function saveData() {
    const data = {
        income,
        expenses,
        balance: income - expenses,
        expenseList: expenseList.innerHTML
    };
    localStorage.setItem('expenseTrackerData', JSON.stringify(data));
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('expenseTrackerData'));
    if (data) {
        income = data.income;
        expenses = data.expenses;
        balanceValue.innerText = `$${data.balance.toFixed(2)}`;
        totalIncome.innerText = data.income.toFixed(2);
        totalExpenses.innerText = data.expenses.toFixed(2);
        expenseList.innerHTML = data.expenseList;
    }
}

loadData();
