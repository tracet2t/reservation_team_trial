import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Home from "./Home";

const mockStore = configureStore([]);
const initialState = {
  todos: {
    todos: [
      {
        id: 1,
        title: "Test Task 1",
        description: "Description for task 1",
        dueDate: "2024-08-25",
        priority: "High",
        isCompleted: 0,
      },
    ],
    status: "idle",
  },
};

describe("Home Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("renders Home component", () => {
    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    // Check if the search input is rendered
    expect(screen.getByPlaceholderText("Search....")).toBeInTheDocument();

    // Check if the Add Category button is rendered
    expect(screen.getByText("Add Category")).toBeInTheDocument();

    // Check if the task table is rendered
    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Description for task 1")).toBeInTheDocument();
  });

  it("opens and closes the modal for editing", () => {
    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    // Click the Edit button to open the modal
    fireEvent.click(screen.getByText("Edit"));

    // Check if the modal is opened
    expect(screen.getByText("Edit Task")).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByText("Close"));

    // Check if the modal is closed
    expect(screen.queryByText("Edit Task")).not.toBeInTheDocument();
  });

  it("shows no data found when no todos are available", () => {
    store = mockStore({
      todos: {
        todos: [],
        status: "idle",
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    // Check if "No data found" is displayed
    expect(screen.getByText("No data found")).toBeInTheDocument();
  });
});
