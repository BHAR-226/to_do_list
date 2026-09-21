import clients.TaskView;
import repository.TaskRepository;
import services.TaskServices;

import java.util.Scanner;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {

    public static void main(String[] args) {
        TaskRepository repo = new TaskRepository();
        TaskServices services = new TaskServices(repo);
        Scanner sc = new Scanner(System.in);
        TaskView view = new TaskView(services, sc);

        System.out.println("______Welcome to To do list by BHAR_____");
        System.out.println(" Here command board : " +
                "1- List the differents tasks" +
                "2- Create a task" +
                "3- Modify a task knowing his id" +
                "4- List the differents tasks in details" +
                "5- Search a task by name or id" +
                "6- Filter task by deadline or priority" +
                "7- Execute a task" +
                "8- Show the finished task" +
                "9- delete a task " +
                "10- Print the deatail of a task by id");
        String loop = "";
        //while loop.toLowerCase()!=
        int choice;
        while (!loop.toLowerCase().equals("q")) {
            System.out.println("Choose your command : ");
            choice = sc.nextInt();
            sc.nextLine();
            switch (choice) {
                case 1:
                    System.out.println("____Tasks lists : _____");
                    view.showTasks();
                    break;
                case 2:
                    view.newTask();
                    break;
                case 3: {
                    System.out.println("Id : ");
                    int id = sc.nextInt();
                    view.modify(id);
                    break;
                }
                case 4:
                    view.showTasksInDetails();
                    break;
                case 5:
                    view.searchTasks();
                    break;
                case 6:
                    view.filterTask();
                    break;
                case 7: {
                    System.out.println("Id : ");
                    int id = sc.nextInt();
                    view.executeTask(id);
                    break;
                }
                case 8:
                    System.out.println("_____ Finished task : ______");
                    view.showFinishedTask();
                    break;
                case 9: {
                    System.out.println("Id : ");
                    int id = sc.nextInt();
                    view.deleteTask(id);
                    break;
                }
                case 10: {
                    System.out.println("Id : ");
                    int id = sc.nextInt();
                    view.printTask(id);
                    break;
                }
                default:
                    System.out.println("Enter a correct value!");

            }
            System.out.println("Press q to quit !");
            loop = sc.nextLine();
        }

    }
}