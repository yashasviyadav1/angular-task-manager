import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [RouterModule], // necessary for navigating or using routerLink
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements OnInit {

  listId: string = '';  
  constructor(private taskService: TaskService, private route:ActivatedRoute, private router: Router){ }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }    
    )
  }

  // this method will be called from the html file's add-task div
  // and this method will call the taskService file's function
  // then taskservice file will call the webservice file's function
  // and finally webservice will connect us to backend  
    createTask(title: string){  
       this.taskService.createTasks(title, this.listId).subscribe((newTask: any)=>{
          // as soon as a task is added to that list
          // we just go back to prev url using ../ i.e the prev list that was open 
          this.router.navigate(['../'],{relativeTo: this.route });
       });  
    }

} 
