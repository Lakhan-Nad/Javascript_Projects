let input = document.getElementById("input");
let list = document.getElementById("list");
function func1() {
    if (input.value.length > 0) {
        let br = document.createElement("br")
        let li = document.createElement("li");
        let dbtn = document.createElement("button");
        dbtn.innerHTML = "X";
        dbtn.setAttribute("title", "Click To Delete This Item")
        li.textContent = input.value;
        li.setAttribute("title", "Click To Mark Done/Undone");
        li.appendChild(dbtn);
        list.appendChild(li);
        list.appendChild(br);
        li.addEventListener("click", function () {
            li.classList.toggle("done");
            dbtn.classList.toggle("donebtn");
        })
        dbtn.addEventListener("click", function () {
            list.removeChild(li);
            list.removeChild(br);
        });
        input.value = "";
    }
}
input.addEventListener("keypress", function (event) {
    if (event.which == 13) {
        func1();
    }
})





