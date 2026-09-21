package services;

import models.Task;
import repository.TaskRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static java.lang.Integer.parseInt;
import static models.Statut.Finished;

public class TaskServices {
    private TaskRepository repo;
    private int nextId = 1;

    public TaskServices(TaskRepository repo){
        this.repo = repo;
    }

    public Task newTask (String name, String description,
                         Date deadline, Integer priority){
        Task task = new Task();

        task.setId(nextId++);
        task.setName(name);
        if (description!= null && !description.isBlank() ){ task.setDescription(description);}
        if (deadline!= null) {task.setDeadline (deadline);}
        if (priority != null){ task.setPriority(priority);}

        repo.createTask(task);
        return task;
    }

    public Task modifyTask (int id, String name, String description,
                            Date deadline, Integer priority){
        Task taskToModify = repo.getTaskById(id);//handle the case when it return a null value
        if(name!=null && !name.isBlank()) {taskToModify.setName(name);}
        if (description!= null && !description.isBlank() ){ taskToModify.setDescription(description);}
        if (deadline!= null) {taskToModify.setDeadline (deadline);}
        if (priority != null){ taskToModify.setPriority(priority);}

        return taskToModify;
    }

    public List<Task> taskList (){
        List <Task> tasks = repo.getAllTask();
        // return a sorted task list sorted first by statut,
        // then deadline and finaly priority
        tasks.sort( Comparator.comparing ((Task t)->t.getStatut())
                .thenComparing(Task::getDeadline,
                        Comparator.nullsLast(Comparator.naturalOrder()))
                .thenComparing(Task::getPriority, Comparator.reverseOrder())
        );
        return tasks;
    }

    public List<Task> search(String searchInput){
        List<Task> results= new ArrayList<Task>();
        // the user can search a task by writing the name or the id
        try{
            int id = parseInt(searchInput);
            Task task = repo.getTaskById(id);
            if (task != null) {
                results.add(task);
            }
        } catch (NumberFormatException e){
            results = repo.getTasksByName(searchInput);
        }
        return results;
    }
    public Task getTask (int id ){ return repo.getTaskById(id);}

    public List<Task> filter(String filterInput){
        // the user can filtr the task by priority, deadline,
        List<Task> results= new ArrayList<Task>();
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

        try {
            int priority = parseInt(filterInput);
            results =repo.getTaskByPriority(priority);
        } catch (NumberFormatException e){
            try{
                Date date = formatter.parse(filterInput);
                results = repo.getAllTask().stream()
                        .filter(t->t.getDeadline() !=null && t.getDeadline().equals(date))
                        .collect(Collectors.toList());
            }catch (ParseException ex){
                System.out.println ("Invalid filter");
            }
        }
        return results;
    }

    public void execute(int id){
        Task task = repo.getTaskById(id);
        //change a task statut from waiting to finished
        task.setStatut(Finished);
    }

    public List<Task> getFinishedTask(){
        //to print the finished task
        return repo.getTaskByStatut(Finished);
    }
    public List<Task> deleteTask(int id){
        return repo.deleteTaskById(id);
    }

}
