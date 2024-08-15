import { render, screen, fireEvent } from '@testing-library/react';
import AddTask from '../components/AddTask'; 

test('renders Add Task form', () => {
  render(<AddTask />);
  expect(screen.getByLabelText('Title:')).toBeInTheDocument();
  expect(screen.getByLabelText('Description:')).toBeInTheDocument();
  expect(screen.getByLabelText('Due Date:')).toBeInTheDocument();
  expect(screen.getByLabelText('Priority:')).toBeInTheDocument();
});

test('submits the form', async () => {
  render(<AddTask/>);
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

});
