import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CommonModule } from '@angular/common';// very imp for using ngFor 
import { RouterModule } from '@angular/router';
// import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-view',
  standalone: true,
  // commonModule is very imp for using ngFor 
  // ROuterModule is used for navigating or redirection
  imports: [CommonModule, RouterModule],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent implements OnInit {

  lists: any; 
  tasks: any;
  selectedListId: string = '';

  // injected taskservice in this file becase ew want to use its 'createNewList' function
  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute ){}
  
  ngOnInit() {

    

    // every time reload or any change this onInit works
    
      this.route.params.subscribe(
        (params: Params) => {
            this.selectedListId = params['listId'];          
          // every time someone clicks on a list, the url will change
          // and that list's tasks will be only displayed

          // console.log(params['listId']);
          const listid = params['listId'];
          if(listid){
            this.taskService.getTasks(params['listId']).subscribe((tasks: any)=>{
              this.tasks = tasks;   
            })   
          }
        }    
      )

      // this method will get all the lists from db (method declared in taskService)
      this.taskService.getLists().subscribe((lists: any) => {
        this.lists = lists;
      })
  } 

  // this will call to task Service
  // task service calls to web req
  onTaskClick(task: any){
      // when user click on task, set it to completed
      this.taskService.complete(task).subscribe(()=>{ // toggle the completed property of task in db 
        task.completed = !task.completed; // toggle the property in element as well
      })
  }


  // when user clicks on delete btn on a list 
  onDeleteListClick(){
    this.taskService.deleteList(this.selectedListId).subscribe(()=>{
      console.log('deleted the list');
      this.router.navigate(['/lists']);
    });
  }

  // when user clicks on delete btn on a task
  onDeleteTaskClick(id: string){
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any)=>{
      // this.tasks = this.tasks.filter((val: Task) => val._id !== id);
      // console.log(res);
      // console.log(res._listId); 
      // window.location.href = `/lists/${this.selectedListId}`; 
      // this.router.navigate(['/lists']);
      // this.router.navigateByUrl(`/lists/${this.selectedListId}`);
      // window.location.href = `/lists/${this.selectedListId}`;
      window.location.reload();
    });
  }

  
}
