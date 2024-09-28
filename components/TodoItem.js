import html from '../core.js';

function TodoItem({todo, index, editingIndex}){
    return html`
        <li class="${todo.completed && 'completed'} ${index === editingIndex && 'editing'}">
			<div class="view">
				<input 
					class="toggle"
					type="checkbox" 
					${todo.completed && 'checked'}
					onchange="dispatch('toggle', ${index})"	
				>
				<label ondblclick="dispatch('edit', ${index})">${todo.title}</label>
				<button 
					class="destroy"
					onclick = "dispatch('destroy', ${index})"
				></button>
			</div>
			<input 
				class="edit" 
				value="${todo.title}"
				onblur="dispatch('endEdit', this.value.trim())"
				onkeyup="event.keyCode === 13 && dispatch('endEdit', this.value.trim()) || event.keyCode === 27 && dispatch('cancelEdit')"
			>
		</li>
    `;
}

export default TodoItem;