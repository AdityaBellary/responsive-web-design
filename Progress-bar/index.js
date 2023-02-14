const btn = document.getElementById("btn")
const progressBar = document.getElementById("progress")
btn.addEventListener("click", move)
let count = 0
function handleClick() {
    let clonedProgress = progressBar.cloneNode(true)
    clonedProgress.style.display = "block"
    setTimeout(() => {
        clonedProgress.querySelector(".bar").classList.add("loading")
    })
    document.body.appendChild(clonedProgress)
}
var i = 0;
function move() {
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("bar");
      var width = 0; 
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
          elem.innerHTML = width  + "%";
        }
      }
    }
  }