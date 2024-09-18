const form = document.querySelector('#form');
const input = document.querySelector('.input_form');
const taskList = document.querySelector('.tasklist');
const emptyBlock = document.querySelector('.emptyList')

let tasks = [];
if (localStorage.getItem('memory')) {
    JSON.parse(localStorage.getItem('memory'))
    // console.log(JSON.parse(localStorage.getItem('memory')))
    tasks = JSON.parse(localStorage.getItem('memory'))
}

tasks.forEach(function (task) {
    const cssClass = task.done ? 'task_list_item additional done ' : 'task_list_item additional'

    //добавляем задачу в массив

   
     
        const task_html = `<li id='${task.id}' class="${cssClass}">
                    <span class="task_title "> ${task.text}</span>
                    <div class="task_list_buttons">
                        <button data-action='done' class="btn_action">
                            <img class='tick' src="img/tick.svg" alt="" width="18" height="18">
                        </button>
                        <button data-action='delete' class="btn_action">
                            <img class='cross' src="img/cross.svg" alt="" width="18" height="18">
                        </button>
                    </div>
                </li>`;
        taskList.insertAdjacentHTML('beforeend', task_html);
    }
)






form.addEventListener('submit', addTask);

//удаление задачи 

taskList.addEventListener('click', deleteTask)
//отмечаем задачу завершенной
taskList.addEventListener('click', completedTask)

checkEmptyList()

function addTask(e) {
    e.preventDefault();
    //достаем текст из инпута
    const taskText = input.value;


    //описываем задачу в виде обьекта
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    const cssClass = newTask.done ? 'task_list_item additional done ' : 'task_list_item additional'

    //добавляем задачу в массив



    if (taskText === '') {
        alert('Введите текст задачи');
        return;
    }
    else {
        const task_html = `<li id='${newTask.id}' class="${cssClass}">
                    <span class="task_title "> ${newTask.text}</span>
                    <div class="task_list_buttons">
                        <button data-action='done' class="btn_action">
                            <img class='tick' src="img/tick.svg" alt="" width="18" height="18">
                        </button>
                        <button data-action='delete' class="btn_action">
                            <img class='cross' src="img/cross.svg" alt="" width="18" height="18">
                        </button>
                    </div>
                </li>`;
        taskList.insertAdjacentHTML('beforeend', task_html);
        //очищаем поле ввода и возращаем на него фокус
        input.value = '';
        input.focus();
        tasks.push(newTask)
    }

    //формируем разметку для новой задачи


    // if (taskList.children.length > 1) {
    //     emptyBlock.classList.add('text_hidden');
    // }

    checkEmptyList()

    setItem()
}

function deleteTask(e) {
    if (e.target.dataset.action === 'delete') {
        const parentNode = e.target.closest('li');

        const taskId = Number(parentNode.id);
        const index = tasks.findIndex(function (task) {
            console.log(task)
            if (task.id === taskId) {
                return true
            }
        })
        console.log(tasks)


        //удаляем задачу из массива с задачами
        tasks.splice(index, 1)


        //удаляем задачу
        parentNode.remove();
        //проверка списка задач на наличие, если их нет показываем "список дел пуст"
        // if (taskList.children.length === 1) {
        //     emptyBlock.classList.remove('text_hidden')

        // }
    }
    checkEmptyList()
    setItem()


}

function completedTask(e) {
    if (e.target.dataset.action === 'done') {
        const parentNode = e.target.closest('li')
        const parentId = Number(parentNode.id)
        const indexx = tasks.findIndex(function (tt) {
            if (parentId === tt.id) {
                return true
            }


        })
        if (parentId !== -1) {
            tasks[indexx].done = !tasks[indexx].done;
            console.log(tasks[indexx].done)
        }
        if (tasks[indexx].done === true) {
            parentNode.classList.add('done')
        }
        else {
            parentNode.classList.remove('done')
        }

    }
    setItem()
}



function checkEmptyList() {

    const empty = `<li class="emptyList task_list_item ">
    <img class="leaf" src="img/leaf.svg" width="50px" alt="">
    <div class=" empty-list_title">Список дел пуст</div>
</li>`
    if (tasks.length === 0) {
        if (!taskList.querySelector('.emptyList')) {
            taskList.insertAdjacentHTML('afterbegin', empty);
        }
        else {
            const emptyListEl = taskList.querySelector('.emptyList');
            if (emptyListEl) {
                console.log(emptyListEl)
                emptyListEl.remove();
            }
        }
    }
    if (tasks.length > 0) {
        const emptyListEl = taskList.querySelector('.emptyList');
        if (emptyListEl) {
            emptyListEl.remove()
        };

    }
}



function setItem() {
    localStorage.setItem('memory', JSON.stringify(tasks))
}




