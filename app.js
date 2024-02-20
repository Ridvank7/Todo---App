//* ======================================================
//*                     TODO APP
//* ======================================================

//! JSON.stringfy : Veriyi JSON formatina donusturmek amaciyla kullanilir

//! JSON.parse : JSON nesnelerini JavaScript'e donusturmeye diger bir deyisle okumamiz amaciyla kullanilir.

//? Selectors

const addBtn = document.getElementById("todo-button");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-ul");

// todos dizisini localStorage'daki veriler ile guncelle
//! eger localStorage'da todos adinda bir item bulunmazsa ise bos array atamasi yap
let todos = JSON.parse(localStorage.getItem("TODOS")) || [];
console.log(todos);

const renderSavedTodos = () => {
  todos.forEach((todo) => {
    createListElement(todo);
  });
};

renderSavedTodos();

addBtn.addEventListener("click", () => {
  if (todoInput.value.trim() === "") {
    alert("Please enter new todo");
  } else {
    const newTodo = {
      id: new Date().getTime(),
      completed: false,
      text: todoInput.value,
    };

    createListElement(newTodo);

    //? Yeni olusturulan todo'yu diziye sakla
    todos.push(newTodo);

    localStorage.setItem("TODOS", JSON.stringify(todos));

    todoInput.value = "";
  }
});

function createListElement(newTodo) {
  //? yeni bir li elementi olustur

  const li = document.createElement("li");
  //   li.id = newTodo.id;
  li.setAttribute("id", newTodo.id);

  // newTodo.completed ? li.classList.add("done") : null;
  // if (newTodo.completed) li.classList.add("done");
  newTodo.completed && li.classList.add("done");

  //? check ikonu olustur ve li elementine bagla
  const okIcon = document.createElement("i");
  okIcon.setAttribute("class", "fas fa-check");
  li.appendChild(okIcon);

  //? todo basligi icin bir p elementi ve yazi dugumu olusturarak li'ye bagla
  const p = document.createElement("p");
  const pTextNode = document.createTextNode(newTodo.text);
  p.appendChild(pTextNode);
  li.appendChild(p);

  //? delete ikonu olustur ve li elementine bagla
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash");
  li.appendChild(deleteIcon);

  //? meydana gelen li elementini ul'ye child olarak bagla
  todoUl.appendChild(li);
}

//! Ul elementinin cocuklarindan herhangi birisinden bir event gelirse
//! bunu tespit et ve gerekini yap. (Capturing)
todoUl.addEventListener("click", (e) => {
  console.log(e.target.parentElement);

  const id = e.target.parentElement.getAttribute("id");
  //! event, bir okey butonundan geldi ise
  //? ilgili li elementinde done adinda bir class'i varsa bunu sil
  //?  aksi takdirde ekle (DOM)
  if (e.target.classList.contains("fa-check")) {
    e.target.parentElement.classList.toggle("done");

    // todos dizisindeki ilgili elementin completed kismini guncelle
    todos.map((todo, index) => {
      if (todo.id == id) {
        todos[index].completed = !todos[index].completed;
      }
    });
    console.log(todos);

    // todos dizisinin son halini localStorage'a sakla
    localStorage.setItem("TODOS", JSON.stringify(todos));

    //! event, bir delete butonundan geldi ise
  } else if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();

    //? Dizinin ilgili elementini sil
    todos = todos.filter((todo) => todo.id != id);

    // todos dizisinin son halini localStorage'a sakla
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }
});

//? Enter tusu ile ekleme mumkun olsun
todoInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    addBtn.click();
  }
});

//? Baslangicta input aktif olsun
window.onload = function () {
  todoInput.focus();
};
