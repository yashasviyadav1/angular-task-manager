import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { TaskService } from '../../task.service';
@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})

export class EditTaskComponent implements OnInit{

  taskId: string = '';
  listId: string = '';

  constructor(private route: ActivatedRoute, private taskService:TaskService, private router: Router){}
  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
         this.taskId = params['taskId'];
         this.listId = params['listId'];
      }    
    )
  }

  updateTask(title: string){
    this.taskService.updateTask(this.listId, this.taskId, title).subscribe(()=>{
      this.router.navigate(['/lists', this.listId]);  // means navigate to /list/listid whoose data is updated just now
    })
  }
}