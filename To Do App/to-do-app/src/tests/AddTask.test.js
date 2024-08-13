import { render, screen, fireEvent } from '@testing-library/react';
import AddTask from '../components/AddTask'; 

const mockOnAddTask = jest.fn();

test('renders Add Task form', () => {
  render(<AddTask onAddTask={mockOnAddTask} />);
  expect(screen.getByLabelText('Title:')).toBeInTheDocument();
  expect(screen.getByLabelText('Description:')).toBeInTheDocument();
  expect(screen.getByLabelText('Due Date:')).toBeInTheDocument();
  expect(screen.getByLabelText('Priority:')).toBeInTheDocument();
});

test('submits the form', async () => {
  render(<AddTask onAddTask={mockOnAddTask} />);
  fireEvent.change(screen.getByLabelText('Title:'), {
    target: { value: 'Test Task' },
  });
  fireEvent.change(screen.getByLabelText('Description:'), {
    target: { value: 'Test Description' },
  });
  fireEvent.change(screen.getByLabelText('Due Date:'), {
    target: { value: '2024-08-13' },
  });
  fireEvent.change(screen.getByLabelText('Priority:'), {
    target: { value: 'High' },
  });
  fireEvent.submit(screen.getByText('Add Task'));

  expect(mockOnAddTask).toHaveBeenCalledWith({
    title: 'Test Task',
    description: 'Test Description',
    dueDate: '2024-08-13',
    priority: 'High',
  });

  expect(mockOnAddTask).toHaveBeenCalledTimes(1);
});
