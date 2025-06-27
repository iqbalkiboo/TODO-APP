export const todos = [
  {
    id: 1,
    text: "Project Alpha",
    date: "20/06/2022",
    status: "overdue",
    checked: false,
    subTodos: [],
  },
  {
    id: 2,
    text: "Project 1",
    date: "Today",
    status: "today",
    checked: false,
    subTodos: ["sub Todo 1", "sub Todo 2"],
    editingSub: true,
  },
  {
    id: 3,
    text: "Project 3",
    date: "18/01/2025",
    checked: false,
  },
  {
    id: 4,
    text: "Project 8",
    date: "18/07/2022",
    checked: true,
  },
  {
    id: 5,
    text: "Project 1",
    date: "20/07/2022",
    checked: true,
    subTodos: ["sub Todo 1", "sub Todo 2"],
  },
];
