const localStorageKey = 'todolist'

function validateIfExistsNewTask()
{
    let values     = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let exists     = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newTask()
{
    let input = document.getElementById('input-new-task')
    input.style.border = ''

    // validation
    if(!input.value)
    {
        input.style.border = '1px solid red'
        alert('Digite uma tarefa!')
    }
    else if(validateIfExistsNewTask())
    {
        alert('Já existe uma tarefa com essa descrição!')
    }
    else
    {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        showValues()
    }
    input.value = ''
}

function showValues()
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++)
    {
        list.innerHTML += `<li>${values[i].name}
            <div>
                <button id='btn-ok' class='button-task' onclick='removeItem("${values[i].name}")'>
                    <i class="fa-solid fa-check"></i>
                </button>
                <button id='btn-edit' class='button-task' onclick='editItem("${values[i].name}")'>
                    <i class="fa-solid fa-pen"></i>
                </button>
            </div>
        </li>`
    }
}

function removeItem(data)
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()
}

function editItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name == data);
    
    if (index !== -1) {
        let newTaskName = prompt("Editar tarefa:", values[index].name);
        if (newTaskName !== null && newTaskName.trim() !== '') {
            values[index].name = newTaskName;
            localStorage.setItem(localStorageKey, JSON.stringify(values));
            showValues();
        }
    }
}

showValues()