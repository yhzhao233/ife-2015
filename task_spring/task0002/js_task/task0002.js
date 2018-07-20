function $(id) {
    return document.getElementById(id);
}

function add(num1, num2) {
    return parseInt(num1) + parseInt(num2);
}

function renderResult(result) {
    $("result").innerHTML = result;
}

function addEventHandle() {
    let num1 = $("number1").value;
    let num2 = $("number2").value;
    let result = add(num1, num2);
    renderResult(result);
}

function initEvent() {
    $("addbtn").addEventListener("click", addEventHandle, false);
}
initEvent();

