import React, { useState } from 'react';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import './TodoCreation.css';

function TodoCreation({ addNewTask }) {
    const [titleValidationLabel, setTitleValidationLabel] = useState('');
    const [descValidationLabel, setDescValidationLabel] = useState('');
    const [authValidationLabel, setAuthValidationLabel] = useState('');
    const [urlValidationLabel, setUrlValidationLabel] = useState('');

    const onFormSubmit = event => {
        event.preventDefault();
    
        const { elements: inputs } = event.target;
        const newTodoTitle = inputs[0].value;
        const newTodoDesc = inputs[1].value;
        const newTodoPrior = inputs[2].value;
        const newTodoAuth = inputs[3].value;
        const newTodoUrl = inputs[4].value;
    
        let isFormInvalid = false;
    
        if (newTodoTitle.length < 5) {
            setTitleValidationLabel('Provide a longer title! (min. 5)')
            isFormInvalid = true;
        } else {
            setTitleValidationLabel('');
        }
        if (newTodoDesc.length < 5) {
            setDescValidationLabel('Provide a longer description! (min. 5)')
            isFormInvalid = true;
        } else {
            setDescValidationLabel('');
        }
        if (newTodoAuth.length < 3  ) {
            setAuthValidationLabel('Provide a longer name! (min. 3)')
            isFormInvalid = true;
        } else {
            setAuthValidationLabel('');
        }
        var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        if (!newTodoUrl.match(regex)) {
        setUrlValidationLabel('the url should have the following format: http://www.gazeta.pl')
        isFormInvalid = true;
        } else {
        setUrlValidationLabel('');
        }
    
        if (isFormInvalid) return;

        const todo = {
            title: newTodoTitle,
            description: newTodoDesc,
            priority: newTodoPrior ? newTodoPrior : '0',
            author: newTodoAuth,
            url: newTodoUrl,
          }
        addNewTask(todo);
        
        for (const input of inputs) {
            input.value = "";
        }
      }

    return (
        <section className="input-side"> 
            <form onSubmit={onFormSubmit}>
                <h2>Create a task</h2>
                <Input
                    placeholder="Go out with a dog"
                    label="Provide a task name"
                    id="taskTitle"
                    name="taskTitle"
                    validationError={titleValidationLabel}
                />
                <Input 
                    placeholder="Do it after it eats" 
                    label="Provide a task description" 
                    id="taskDesc" 
                    name="taskDesc" 
                    validationError={descValidationLabel}
                />
                <Input 
                    placeholder="0" 
                    label="Provide a task priority" 
                    id="taskPriority" 
                    name="taskPriority" 
                    type= "number"
                />
                <Input 
                    placeholder="Dorota" 
                    label="Provide a task author" 
                    id="taskAuthor" 
                    name="taskAuthor" 
                    validationError={authValidationLabel}
                />
                <Input 
                    placeholder="https://www.gazeta.pl/0,0.html" 
                    label="Provide a task url" 
                    id="taskUrl" 
                    name="taskUrl" 
                    type= "url"
                    validationError={urlValidationLabel}
                />
                <Button 
                    variant="add" 
                    type="submit" 
                    size={2} 
                    label="ADD" 
                />
            </form>
        </section>
    )
}
export default TodoCreation;


