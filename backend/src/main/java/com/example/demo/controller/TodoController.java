package com.example.demo.controller;

import com.example.demo.entity.Todo;
import com.example.demo.repository.TodoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    private final TodoRepository todoRepository;

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    // READ ALL
    @GetMapping
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    // CREATE
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        //todo.setId(null); // safety
        return todoRepository.save(todo);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo updatedTodo) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todo.setTitle(updatedTodo.getTitle());
        todo.setCompleted(updatedTodo.isCompleted());

        return todoRepository.save(todo);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }
}
