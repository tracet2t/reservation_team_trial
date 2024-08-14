import { render, screen, fireEvent, within } from '@testing-library/react';
import { act } from 'react'; // Updated import
import ToDo from './ToDo';

describe('ToDo Component', () => {
  beforeEach(() => {
    render(<ToDo />);
  });

  test('renders To-Do List title', () => {
    expect(screen.getByText('To-Do List')).toBeInTheDocument();
  });

  test('adds a new task', () => {
    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: 'New Task' }
    });
    fireEvent.click(screen.getByText(/Add Task/i));
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  test('edits an existing task', () => {
    // Add a task first
    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: 'Test Task to Edit' }
    });
    fireEvent.click(screen.getByText(/Add Task/i));
  
    // Find the task item and its corresponding edit button
    const taskItem = screen.getByText('Test Task to Edit').closest('li');
    const editButton = within(taskItem).getByRole('button', { name: /Edit/i });
    fireEvent.click(editButton);
  
    // Change the title and save
    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: 'Updated Task' }
    });
    fireEvent.click(screen.getByText(/Update Task/i)); // Updated this line to match the actual button text
  
    // Assertions
    expect(screen.getByText('Updated Task')).toBeInTheDocument();
    expect(screen.queryByText('Test Task to Edit')).toBeNull();
  });
  
  
  
  test('deletes a task', () => {
    // Add a task first
    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: 'Test Task to Delete' }
    });
    fireEvent.click(screen.getByText(/Add Task/i));
  
    // Find the task item and its corresponding delete button
    const taskItem = screen.getByText('Test Task to Delete').closest('li');
    const deleteButton = within(taskItem).getByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButton);
  
    // Assertion
    expect(screen.queryByText('Test Task to Delete')).toBeNull();
  });
  
  
  

  test('marks a task as completed and then pending', () => {
    // Add a task first
    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: 'Task to Complete' }
    });
    fireEvent.click(screen.getByText(/Add Task/i));

    // Mark as completed
    fireEvent.click(screen.getByText(/Mark as Completed/i));
    expect(screen.getByText('Task to Complete').closest('li')).toHaveClass('completed');

    // Mark as pending
    fireEvent.click(screen.getByText(/Mark as Pending/i));
    expect(screen.getByText('Task to Complete').closest('li')).not.toHaveClass('completed');
  });

  test('filters tasks by completed status', () => {
    // Add tasks first
    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: 'Completed Task' }
    });
    fireEvent.click(screen.getByText(/Add Task/i));
    fireEvent.click(screen.getByText(/Mark as Completed/i));
  
    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: 'Pending Task' }
    });
    fireEvent.click(screen.getByText(/Add Task/i));
  
    // Filter by completed status
    const filterButtons = screen.getAllByText(/Completed/i);
    fireEvent.click(filterButtons[0]); // Click the first button
  
    // Ensure filtering logic is correct
    expect(screen.getByText('Completed Task')).toBeInTheDocument();
    expect(screen.queryByText('Pending Task')).toBeNull();
  });
  

  test('searches tasks by title or description', () => {
    // Add tasks first
    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: 'Task 1' }
    });
    fireEvent.click(screen.getByText(/Add Task/i));
    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: 'Task 2' }
    });
    fireEvent.click(screen.getByText(/Add Task/i));

    // Search for tasks
    fireEvent.change(screen.getByPlaceholderText(/Search tasks/i), {
      target: { value: 'Task 1' }
    });
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).toBeNull();
  });
});
