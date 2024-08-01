var tudoList = document.querySelector("#todo-list");
var inp = document.querySelector("#todo-input");


inp.addEventListener(
    'keyup',
    function (e) {
        console.log()
        if (e.key == "Enter") {
            var items = document.createElement('li')
            items.innerHTML = `<span class="todo-text">${this.value}</span>
                <button  class="todo-remove">Remove</button>`


            items.querySelector('.todo-remove').addEventListener('click', function () {
                items.remove();
            });


            items.querySelector('.todo-text').addEventListener('click', function () {
                items.classList.toggle('stick');
            });


            tudoList.appendChild(items)
            this.value = ""
        }

    }
)


document.addEventListener(
    'contextmenu',
    function (e) {
        e.preventDefault()
    }

)

document.addEventListener(
    'keydown',
    function (e) {
        if (e.ctrlKey == true && shiftKey == true && e.key == I) {
            e.preventDefault()
        }
    }
)