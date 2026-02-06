package com.project.TaskManager.exception;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(Long id){
        super("Task not found with id: " + id);
    }
}
