var tudoList = document.querySelector("#todo-list");
var inp = document.querySelector("#todo-input");


inp.addEventListener(
    'keyup',
    function (e) {
        if (e.key == "Enter") {
            var items = document.createElement('li')
            items.innerHTML = `<span class="todo-text">${this.value}</span>
                <button  class="todo-remove">Remove</button>`


            items.querySelector('.todo-remove').addEventListener('click', function () {
                items.remove();
            });


            items.querySelector('.todo-text').addEventListener('click', function () {
                this.classList.toggle('stick');
            });


            tudoList.appendChild(items)
            this.value = ""
        }

    }
)