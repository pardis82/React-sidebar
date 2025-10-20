import React, { useEffect, useState } from "react";

type TTodo = { userId: number; id: number; title: string; completed: boolean };

type TTodos = Array<TTodo>;

export default function test() {
  const [todo, setTodo] = useState<TTodos>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("https://jsonplaceholder.typicode.com/todos");
      setTodo(await result.json());
    };
    fetchData();
  }, []);

  return (
    <div>
      {todo.map((val, i) => (
        <div key={i}>{val.title}</div>
      ))}
    </div>
  );
}
