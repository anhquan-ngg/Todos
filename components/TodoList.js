import html from '../core.js';
import {connect} from '../store.js';
import TodoItem from './TodoItem.js';


function TodoList({todos, filter, filters, editingIndex}){
    return html`
		<!-- This section should be hidden by default and shown when there are todos -->
		<section class="main">
			<input 
				id="toggle-all" 
				class="toggle-all" 
				type="checkbox"
				onchange="dispatch('toggleAll', this.checked)"
				${todos.every(filters.completed) && 'checked'}
			>
			<label for="toggle-all">Mark all as complete</label>
			<ul class="todo-list">
				${todos
					.filter(filters[filter])
					.map((todo, index) => TodoItem({todo, index, editingIndex}))
				}
            </ul>
		</section>
    `;
}

export default connect()(TodoList);