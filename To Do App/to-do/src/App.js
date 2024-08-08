import './App.css';
import Todo from './components/todo';

function App() {
  const todos = [
  {id: 1, title: 'task01', completed: false, },
  {id: 2, title: 'task 02', completed: true, },
  ];
  return (
    <div className ="App">
      {todos.map((todo) => {
      return (<Todo todo={todo}/>)
      })}
    </div>
  );
}

export default App;
