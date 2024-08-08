import { render, screen, cleanup} from'@testing-linrary/react';
import Todo from '../todo';

afterEach(() => {
    cleanup();
});

test('should render non completed todo',() => {
    const todo = {id: 1, title: 'task01', completed: false, }
    render(<Todo todo={todo}/>);
    const todoElement =screen.getByTestId('task-1)')
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent('Task 01');
})

test('should render completed todo',() => {
    const todo = {id: 1, title: 'task02', completed: true, }
    render(<Todo todo={todo}/>);
    const todoElement =screen.getByTestId('task-1)')
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent('Task 02');
})