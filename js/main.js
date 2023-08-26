// const button = document.querySelector(".input-container button");
// const input = document.querySelector(".input-container input");
// const list = document.querySelector(".todo-list");

// button.addEventListener("click", () => { //Кнопка, при натисненні на неї - відбувається дана функція
//     const li = document.createElement("li"); //Створюємо список
//     li.className = "todo-list-item";
//     li.innerText = input.value;                         //Прописуємо текст у список, який ми будемо вводити в інпуті
    
//     const doneBtn = document.createElement("button");
//     doneBtn.innerText = "Done";
//     doneBtn.className = "button";

//     const deleteBtn = document.createElement("button"); //Створюємо кнопку 
//     deleteBtn.innerText = "Delete";                     //Прописуємо для кнопки текст "Delete"
//     deleteBtn.className = "button";
    
//     li.appendChild(doneBtn);
//     li.appendChild(deleteBtn);                          //Закидаємо кнопку до li
    
//     list.appendChild(li);                               //Закидаємо список li у list                         
//     input.value = "";                                   //Робимо, щоб input-поле було чисте, після додовання справ
//     input.focus();                                      //Повертаємо фокус на поле введення
    
//     deleteBtn.addEventListener("click", () => {         //Робимо подію - коли натискаємо на кнопку "Delete" - видаляється список
//         list.removeChild(li);
//     })

    
//     doneBtn.addEventListener("click", () => {           //Робимо подію - коли натискаємо на кнопку "Done" - викреслюється список
//         li.classList.toggle("task-done");
//     });
// })


const button = document.querySelector(".input-container button");
const input = document.querySelector(".input-container input");
const list = document.querySelector(".todo-list");

// Завантаження списку справ з LocalStorage під час старту
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
savedTasks.forEach(task => createTaskElement(task));

// Додаємо подію "click" для кнопки "Add Task"
button.addEventListener("click", () => {

    // Отримуємо текст введеного завдання
    const taskText = input.value.trim();
    // Якщо текст не є пустим, створюємо новий об'єкт завдання
    if (taskText === "") return;
    const task = { text: taskText, done: false };
    // Додавання завдання до збережених
    savedTasks.push(task); 
    // Виклик функції для відображення на сторінці
    createTaskElement(task); 
    updateLocalStorage();

    //Робимо, щоб input-поле було чисте, після додовання справ
    input.value = "";   
    //Повертаємо фокус на поле введення                                                
    input.focus();                                                      
});

// Створюємо функцію createTaskElement, яка додає нове завдання до списку на сторінці:
function createTaskElement(task) {
    const li = document.createElement("li");                            //Створюємо список
    li.className = "todo-list-item";                                    //Створюємо клас
    li.innerText = task.text;                                           //Прописуємо текст у список, який ми будемо вводити в інпуті

    const doneBtn = document.createElement("button");                   //Створюємо кнопку Done
    doneBtn.innerText = "Done";
    doneBtn.className = "button";

    const deleteBtn = document.createElement("button");                 //Створюємо кнопку Delete
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "button";

    li.appendChild(doneBtn);                                            //Закидаємо кнопку до li
    li.appendChild(deleteBtn);                                          //Закидаємо кнопку до li
    list.appendChild(li);                                               //Закидаємо список li у list 

    deleteBtn.addEventListener("click", () => {                         //Робимо подію - коли натискаємо на кнопку "Delete" - видаляється список
        list.removeChild(li);
        savedTasks.splice(savedTasks.indexOf(task), 1);                 //Видалення об"єктів з масиву за індексом
        updateLocalStorage();                                           // Виклик функції та оновлення даних на сторінці
    });

    doneBtn.addEventListener("click", () => {                           //Робимо подію - коли натискаємо на кнопку "Done" - викреслюється зі списка
        li.classList.toggle("task-done");                               // Відмічаємо виконане/невиконане завдання
        task.done = !task.done;                                         // Оновлюємо відповідний стан у списку завдань
        updateLocalStorage();                                           // Виклик функції та оновлення даних на сторінці
    });

    if (task.done) {                                                    //Додавання елементів до списку
        li.classList.add("task-done");
    }
}

function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(savedTasks));          //Зберігаємо дані про справи у LocalStorage, оновлюємо і відтворюємо під час
}                                                                       //завантаження сторінки