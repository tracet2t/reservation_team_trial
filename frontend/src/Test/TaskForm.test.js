import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../features/home/Main';

test('should add a new task', () => {
    const mockOnAddTask = jest.fn();
    render(<TaskForm onAddTask={mockOnAddTask} />);

    fireEvent.change(screen.getByPlaceholderText(/task title/i), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByPlaceholderText(/task description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: '2024-12-31' } });
    fireEvent.change(screen.getByLabelText(/priority/i), { target: { value: 'High' } });

    fireEvent.click(screen.getByText(/add task/i));

    expect(mockOnAddTask).toHaveBeenCalledWith({
        title: 'Test Task',
        description: 'Test Description',
        dueDate: '2024-12-31',
        priority: 'High',
    });
});
