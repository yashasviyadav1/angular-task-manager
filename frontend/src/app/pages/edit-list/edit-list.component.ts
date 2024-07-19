import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { TaskService } from '../../task.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './edit-list.component.html',
  styleUrl: './edit-list.component.scss'
})
export class EditListComponent implements OnInit{

  listId: string = '';

  constructor(private route: ActivatedRoute, private taskService:TaskService, private router: Router){}
  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
         this.listId = params['listId'];
          
      }    
    )
  }

  updateList(title: string){
    this.taskService.updateList(this.listId, title).subscribe(()=>{
      this.router.navigate(['/lists', this.listId]);  // means navigate to /list/listid whoose data is updated just now
    })
  }
}
