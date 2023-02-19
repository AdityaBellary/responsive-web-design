const btn = document.getElementById("btn")
const todo = document.getElementById("input")
const lane = document.getElementById("todo-lane")
btn.addEventListener("click", () => {
    let value = todo.value
    if(!value){
        return
    }
    const element = document.createElement("p")
    element.innerText = value
    element.classList.add("task")
    element.setAttribute("draggable", "true")
    element.addEventListener("dragstart", () => {
        element.classList.add("is-dragging")
    })
    element.addEventListener("dragend", () => {
        element.classList.remove("is-dragging")
    })
    lane.append(element)
    todo.value = ""
})