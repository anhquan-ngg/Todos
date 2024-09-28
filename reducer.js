import storage from './util/storage.js';

const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed,
    },
    editingIndex: null,
}

const actions = {
    add({todos}, title){
        if (title){
            todos.push({title, completed: false});
            storage.set(todos);
        }
    },
    toggle({todos}, index){
        const todo = todos[index];
        todo.completed = !todo.completed;
        storage.set(todos);
    },
    toggleAll({todos}, completed){
        todos.forEach(todo => todo.completed = completed);
        storage.set(todos);
    },
    destroy({todos}, index){
        todos.splice(index, 1);
        storage.set(todos);
    },
    switchFilter(state, filter){
        state.filter = filter;
    },
    clearCompleted(state){
        state.todos = state.todos.filter(state.filters.active);
        storage.set(state.todos);
    },
    edit(state, index){
        state.editingIndex = index;
    },
    endEdit(state, value){
        if (state.editingIndex !== null){
            if (value){
                state.todos[state.editingIndex].title = value;
                storage.set(state.todos);
            }
            else{
                this.destroy(state.todos, state.editingIndex);
            }
            state.editingIndex = null;
        }
    },
    cancelEdit(state){
        state.editingIndex = null;
    }
}

export default function reducer(state = init, action, ...args){
    actions[action] && actions[action](state, ...args);
    return state;
}