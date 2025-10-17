import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTodo = () => {
    const v = text.trim();
    if (!v) return;
    setTodos(prev => [...prev, { id: Date.now(), text: v }]);
    setText("");
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
    // si borras el que estabas editando, resetea
    if (editingId === id) cancelEdit();
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const saveEdit = (id) => {
    const v = editingText.trim();
    if (!v) return;
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text: v } : t)));
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">AGREGAR TAREAS</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-grow"
          placeholder="Escribe una tarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") addTodo(); }}
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          onClick={addTodo}
        >
          Agregar
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between border p-2 rounded">
            {editingId === todo.id ? (
              <div className="flex gap-2 flex-1 items-center">
                <input
                  className="border p-2 flex-grow"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") saveEdit(todo.id); }}
                />
                <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={() => saveEdit(todo.id)}>GUARDAR</button>
                <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={cancelEdit}>Cancelar</button>
              </div>
            ) : (
              <>
                <span className="flex-1">{todo.text}</span>
                <div className="flex gap-2 ml-4">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => startEdit(todo)}>Editar</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => deleteTodo(todo.id)}>Eliminar</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
