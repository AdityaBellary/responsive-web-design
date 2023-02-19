const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".each--lane");

draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault()

        const bottomTask = insertAboveTask(zone, e.clientY)
        const currTask = document.querySelector(".is-dragging")

        if(!bottomTask){
            zone.append(currTask)
        }else{
            zone.insertBefore(currTask, bottomTask)
        }
    })
})

const insertAboveTask = (zone, mouseY) => {
    const elements = zone.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null
    let closestOffset = Number.NEGATIVE_INFINITY

    elements.forEach((task) => {
        const {top} = task.getBoundingClientRect()
        const offset = mouseY - top
        if(offset < 0 && offset > closestOffset){
            closestOffset = offset
            closestTask = task
        }
    })
    return closestTask
}