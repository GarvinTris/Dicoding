document.addEventListener("DOMContentLoaded", ()=> {
    const subid = document.getElementById('form');
    subid.addEventListener("submit", (e)=> {
        e.preventDefault();
        addTodo();
    });      
    
    const todos = [];
    const RENDER_EVENT = 'Rendering';
    document.addEventListener(RENDER_EVENT, () => {
        const uncompletedTODOList = document.getElementById('todos');
        uncompletedTODOList.innerHTML = '';

        const completedTODOList = document.getElementById("completed-todos");
        completedTODOList.innerHTML = '';
 
  for (const todoItem of todos) {
    const todoElement = makeTodo(todoItem);

    if(!todoItem.is){
        uncompletedTODOList.append(todoElement);
    }
    else {
        completedTODOList.append(todoElement);
    }
  }
    });
    function addTodo(){
        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;

        const generate = generateId();
        const Todoadd = todoObject(generate,title,date,false);
        todos.push(Todoadd);
        document.dispatchEvent(new Event(RENDER_EVENT));
    }
    function generateId(){
        return+ new Date;
    }
    function todoObject(id,task,date,is){
        return {
            id,
            task,
            date,
            is
        }
    }
    function makeTodo(todoObject) {
        const textTitle = document.createElement('h2');
        textTitle.innerText = todoObject.task;
       
        const textTimestamp = document.createElement('p');
        textTimestamp.innerText = todoObject.date;
       
        const textContainer = document.createElement('div');
        textContainer.classList.add('inner');
        textContainer.append(textTitle, textTimestamp);
       
        const container = document.createElement('div');
        container.classList.add('item', 'shadow');
        container.append(textContainer);
        container.setAttribute('id', `todo-${todoObject.id}`);
       
        if(todoObject.is){
            const undobutton = document.createElement('button');
            undobutton.classList.add('undo-button')

            undobutton.addEventListener("click",()=>{
                undoTask(todoObject.id);
            });
            const trashbutton = document.createElement('button');
            trashbutton.classList.add('trash-button')

            trashbutton.addEventListener("click",()=>{
                removeTask(todoObject.id);
            });
            container.append(undobutton,trashbutton);
        } else {
            const checkbutton = document.createElement('button');
            checkbutton.classList.add('check-button')

            checkbutton.addEventListener("click",()=>{
                checkTask(todoObject.id);
            });
            container.append(checkbutton);
        }
        return container;
      }
    function checkTask(todoId){
        const chtask =  findid(todoId)
        if(chtask == null) return;

        chtask.is = true;
        document.dispatchEvent(new Event(RENDER_EVENT));
    }
    function findid(todoId){
        for(const todoitem of todos){
            if(todoitem.id === todoId){
                return todoitem;
            }
        }
        return null;
    }
    function removeTask(todoid){
        const retask = findid(todoid);

        if(retask === -1) return;

        todos.splice(todoObject,1)
        document.dispatchEvent(new Event(RENDER_EVENT));
    }
    function undoTask(todoId){
        const untask = findid(todoId)

        if(untask === null) return;

        untask.is = false;
        document.dispatchEvent(new Event(RENDER_EVENT));
    }
});
