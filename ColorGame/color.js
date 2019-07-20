function generate() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

var square = document.getElementsByClassName("square");
var r = Math.floor(Math.random() * 6);
var pickedcolor = "rgb(0,0,0)";
function changeColors() {
    document.getElementById("refresh").innerHTML = "RefreshColors";
    document.getElementById("message").innerHTML = "";
    document.getElementById("headbox").style.background = "slateblue";
    for (s of square) {
        s.style.background = generate();
    }
    r = Math.floor(Math.random() * 6);
    pickedcolor = square[r].style.background;
    document.getElementById("colorval").innerHTML = "Guess the color : " + pickedcolor.toUpperCase();
    for (var i = 0; i < 6; i++) {
        square[i].addEventListener("click", function () {
            var clickedcolor = this.style.background;
            if (clickedcolor == pickedcolor) {
                for (var i = 0; i < 6; i++) {
                    square[i].style.background = clickedcolor;
                }
                document.getElementById("headbox").style.background = clickedcolor;
                document.getElementById("message").innerHTML = "Correct";
                document.getElementById("refresh").innerHTML = "Play Again?";
            }
            else {
                this.style.background = "black";
                document.getElementById("message").innerHTML = "Try Again!";
            }
        })
    }
}