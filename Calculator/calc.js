function start(expini = "") {
    var exp = expini;
    var lastop;
    document.getElementById("text").innerHTML = exp;
    function prval(ope) {
        if (ope == "*" || ope == "/") {
            return 3;
        }
        else if (ope == "+" || ope == "-") {
            return 2;
        }
        else {
            return 1;
        }
    }
    function evaluate(exp) {
        var Exp = [];
        var stack = [];
        var temp = "";
        for (var i = 0; i < exp.length; i++) {
            if (exp[i] == "(") {
                if (temp != "") {
                    Exp.push(Number(temp));
                    temp = "";
                }
                stack.push("(")
            }
            else if (exp[i] == ")") {
                if (temp != "") {
                    Exp.push(Number(temp));
                    temp = "";
                }
                while (stack.length != 0 && stack[stack.length - 1] != "(") {
                    Exp.push(stack.pop());
                }
                stack.pop();
            }
            else if (exp[i] == "+" || exp[i] == "-" || exp[i] == "*" || exp[i] == "/") {
                if (temp != "") {
                    Exp.push(Number(temp));
                    temp = "";
                }
                while (stack.length != 0 && prval(exp[i]) <= prval(stack[stack.length - 1])) {
                    Exp.push(stack.pop());
                }
                stack.push(exp[i]);
            }
            else {
                temp += exp[i];
            }
        }
        if (temp != "") {
            Exp.push(Number(temp));
            temp = "";
        }
        while (stack.length != 0) {
            Exp.push(stack.pop());
        }
        for (var j = 0; j < Exp.length; j++) {
            if (parseFloat(Exp[j]) != NaN && isFinite(Exp[j])) {
                stack.push(Exp[j]);
            }
            else {
                if (stack.length < 2) {
                    return "InvalidExpression";
                }
                let a = Number(stack.pop());
                let b = Number(stack.pop());
                if (Exp[j] == "+") {
                    stack.push(parseFloat(b + a));
                }
                else if (Exp[j] == "-") {
                    stack.push(parseFloat(b - a));
                }
                else if (Exp[j] == "*") {
                    stack.push(parseFloat(b * a));
                }
                else if (Exp[j] == "/") {
                    stack.push(parseFloat(b / a));
                }
                else {
                    return "InvalidExpression";
                }
            }
        }
        if (stack[stack.length - 1] >= 0) {
            return (stack[stack.length - 1].toString(10));
        }
        else {
            return "(0" + stack[stack.length - 1].toString(10) + ")";
        }
    }
    var ex = document.getElementsByClassName("button ex");
    for (var i = 0; i < ex.length; i++) {
        ex[i].addEventListener("click", function () {
            if (this.innerHTML != "-") {
                if (this.innerHTML != "+" && this.innerHTML != "*" && this.innerHTML != "/") {
                    exp = exp + this.innerHTML;
                }
                else {
                    if (lastop == "-" && exp[exp.length - 1] != ")") {
                        exp = exp + ")" + this.innerHTML;
                    }
                    else {
                        exp = exp + this.innerHTML;
                    }
                    lastop = this.innerHTML;
                }
            }
            else {
                if (lastop == "-" && exp[exp.length - 1] != ")") {
                    exp = exp + ")";
                }
                if (exp[exp.length - 1] == "+" || exp[exp.length - 1] == "*" || exp[exp.length - 1] == "/" || exp.length == 0) {
                    exp = exp + "(0-";
                }
                else {
                    exp = exp + "+(0-";
                }
                lastop = this.innerHTML;
            }
            document.getElementById("text").innerHTML = exp.slice(-17);
        })
    }
    document.getElementById("back").addEventListener("click", function () {
        if (exp[exp.length - 1] != "-") {
            exp = exp.substring(0, exp.length - 1);
        }
        else {
            exp = exp.substring(0, exp.length - 3);
        }
        document.getElementById("text").innerHTML = exp;
    })
    document.getElementById("clear").addEventListener("click", function () {
        document.location.reload(true);
    })
    document.getElementById("compute").addEventListener("click", function () {
        if (exp.length != 0) {
            if (lastop == "-" && exp[exp.length - 1] != ")") {
                exp = exp + ")";
            }
            exp = evaluate(exp);
            document.getElementById("text").innerHTML = exp.slice(-17);
        }
    })
}