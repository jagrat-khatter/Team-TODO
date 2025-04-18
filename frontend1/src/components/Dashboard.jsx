import React, { useState, useEffect } from 'react';
import '../App.css'; // Ensure this file contains the required styles

const Dashboard = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState([]); // State to store the list of todos
    const [error, setError] = useState('');

    // Fetch the JWT token from localStorage
    const jwtToken = localStorage.getItem('jwtToken');

    // Function to fetch and render updated todos
    const fetchTodos = async () => {
        if (!jwtToken) {
            setError('❌ No JWT token found. Please log in again.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/user/todos', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setTodos([...data]); // Default to an empty array if data.todos is null or undefined
                setError(''); // Clear any previous errors
            } else {
                const errorData = await response.json();
                setError(`❌ Failed to fetch todos: ${errorData.msg}`);
            }
        } catch (err) {
            console.error('Error fetching todos:', err);
            setTodos([]); // Default to an empty array on error
            setError('❌ An error occurred while fetching todos.');
        }
    };

    // Function to handle adding a new todo
    const handleAddTodo = async () => {
        if (!title.trim() || !description.trim()) {
            alert('⚠️ Title and description cannot be empty.');
            return;
        }

        if (!jwtToken) {
            alert('❌ No JWT token found. Please log in again.');
            return;
        }

        const payload = {
            title: title,
            description: description,
        };

        try {
            const response = await fetch('http://localhost:3000/user/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`, // Include JWT in Authorization header
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('✅ Todo added successfully!');
                setTitle(''); // Clear the input fields
                setDescription('');
                fetchTodos(); // Fetch the updated list of todos
            } else {
                const errorData = await response.json();
                alert(`❌ Failed to add todo: ${errorData.msg}`);
            }
        } catch (err) {
            console.error('Error adding todo:', err);
            alert('❌ An error occurred while adding the todo.');
        }
    };

    // Fetch todos when the component mounts
    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-card">
                <h2 className="dashboard-heading">📊 Dashboard</h2>
                <p className="dashboard-text">Manage your todos here.</p>

                <input
                    type="text"
                    placeholder="📝 Enter title"
                    className="dashboard-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="📄 Enter description"
                    className="dashboard-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button className="dashboard-button" onClick={handleAddTodo}>
                    ➕ Add Todo
                </button>

                {error && <div className="error-box">{error}</div>}

                <div className="todos-box">
                <h3>📋 Your Todos</h3>
                {todos.length > 0 ? (
                    <ul className="todos-list">
                        {todos.map((todo) => (
                            <li key={todo.id} className="todo-item">
                                <strong className="todo-title">{todo.title}</strong>: <span className="todo-description">{todo.description}</span>
                                <br />
                                <span className={`todo-status ${todo.status ? 'completed' : 'pending'}`}>
                                    Status: {todo.status ? 'Completed' : 'Pending'}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-todos">No todos available. Add some!</p>
                )}
            </div>
            </div>
        </div>
    );
};

export default Dashboard;