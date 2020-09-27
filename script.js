// references draggable elements
const draggables = document.querySelectorAll('.draggable')
// references where we're going to drop draggable elements
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        // fired by initial click
        // console.log('drag start')
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        // repeatedly logs while dragging; stops when outside container
        // console.log('drag over')
        e.preventDefault() // prevents cursor from turning into ban symbol
        const dragging = document.querySelector('.dragging')

        // container.appendChild(dragging) // always puts the dragging at the end of container

        // 2nd params = y position of mouse while dragging
        const afterElement = getDragAfterElement(container, e.clientY)
        if (!afterElement) {
            // if dragging element is above no other element, afterElement is undefined, cau
            container.appendChild(dragging)
        } else {
            container.insertBefore(dragging, afterElement)
        }
    })
})

function getDragAfterElement(container, y) {
    // y = y axis of mouse position

    // In the container that we're dragging over, find every draggable element, except the one that we're currently dragging
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        // console.log(box)
        // DOMRect {
        //   bottom: 300 // y axis
        //   height: 52
        //   left: 16 // x axis
        //   right: 380 // x axis
        //   top: 248 // y axis
        //   width: 364
        //   x: 16
        //   y: 248
        // }
        // distance between mouse cursor and center of the box
        const offset = y - box.top - box.height / 2 // HELP: y?
        // if offset < 0 == we're hovering over above that element
        if (offset < 0 && offset > closest.offset) {
            // new closest offset
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY } /* initial offset; closer than any other element */).element
}
