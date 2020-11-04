import React, { useState } from 'react';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import './TodoForm.css';

function TodoForm({ onFormSubmitCallback, isFormEdited, todo={} }) {
    const [titleValidationLabel, setTitleValidationLabel] = useState(''); 
    const [descValidationLabel, setDescValidationLabel] = useState('');
    const [authValidationLabel, setAuthValidationLabel] = useState('');
    const [urlValidationLabel, setUrlValidationLabel] = useState('');

    const onFormSubmit = event => {
        event.preventDefault();
    
        const inputs = event.target.elements;
        const newTodoTitle = inputs[0].value;
        const newTodoDesc = inputs[1].value;
        const newTodoPrior = inputs[2].value;
        const newTodoAuth = inputs[3].value.charAt(0).toUpperCase() + inputs[3].value.slice(1);
        const newTodoUrl = inputs[4].value;
    
        let isFormInvalid = false;
        let expressionHtml = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
        let regexHtml = new RegExp(expressionHtml);
        let regexLetters = new RegExp('^[a-zA-Z0-9 ]+$')

        if (newTodoTitle.length < 5 || !newTodoTitle.match(regexLetters)) {
            setTitleValidationLabel('Provide a longer title (min. 5) with no Polish or special characters!')
            isFormInvalid = true;
        } else {
            setTitleValidationLabel('');
        }
        if (newTodoDesc.length < 5 || !newTodoDesc.match(regexLetters)) {
            setDescValidationLabel('Provide a longer description (min. 5) with no Polish or special characters!')
            isFormInvalid = true;
        } else {
            setDescValidationLabel('');
        }
        if (newTodoAuth.length < 3  || !newTodoAuth.match(regexLetters)) {
            setAuthValidationLabel('Provide a longer name (min. 3) with no Polish or special characters!')
            isFormInvalid = true;
        } else {
            setAuthValidationLabel('');
        }
        if (!newTodoUrl.match(regexHtml)) {
        setUrlValidationLabel('the url should have the following format: http://www.gazeta.pl')
        isFormInvalid = true;
        } else {
        setUrlValidationLabel('');
        }
    
        if (isFormInvalid) return;

        for (const input of inputs) {
            input.value = '';
        }

        const todoObject = {
            title: newTodoTitle,
            description: newTodoDesc,
            priority: newTodoPrior ? newTodoPrior : '1',
            author: newTodoAuth,
            url: newTodoUrl,
        }

        if (isFormEdited) {
            todoObject.id = todo.id;
        }
        
        onFormSubmitCallback(todoObject);
    }

    return (
        <section className='input-aside'> 
            <form onSubmit={onFormSubmit}>
                <h2> {isFormEdited ? 'Edit task' : 'Create a task' } </h2>
                <Input
                    placeholder='Go out with a dog'
                    label='Provide a task name'
                    id='taskTitle'
                    name='taskTitle'
                    validationError={titleValidationLabel}
                    value={todo.title}
                />
                <Input 
                    placeholder='Do it after it eats' 
                    label='Provide a task description' 
                    id='taskDesc' 
                    name='taskDesc' 
                    validationError={descValidationLabel}
                    value={todo.description}
                />
                <Select
                    label='Select a task priority' 
                    id='taskPriority' 
                    name='taskPriority'
                    value={todo.priority}
                />
                <Input 
                    placeholder='Dorota' 
                    label='Provide a task author' 
                    id='taskAuthor' 
                    name='taskAuthor' 
                    validationError={authValidationLabel}
                    value={todo.author}
                />
                <Input 
                    placeholder='https://www.gazeta.pl/0,0.html' 
                    label='Provide a task url' 
                    id='taskUrl' 
                    name='taskUrl' 
                    type= 'url'
                    validationError={urlValidationLabel}
                    value={todo.url}
                />
                <Button 
                    variant='add' 
                    type='submit' 
                    label={isFormEdited ? 'SAVE' : 'ADD'} 
                />
            </form>
        </section>
    )
}
export default TodoForm;


