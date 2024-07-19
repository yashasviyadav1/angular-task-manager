import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // imp for redirection
import { List } from '../../models/list.model';



@Component({
  selector: 'app-new-list',
  standalone: true,
  imports: [RouterModule],// imp for redirection
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.scss'
}) 
export class NewListComponent implements OnInit {
  constructor(private taskService: TaskService, private router: Router){}
  ngOnInit(){
      
  }
  createList(title: string){ 
    this.taskService.createList(title).subscribe((list: any)=>{
      console.log(list);
      // ones we create a list we navigate to home page again and the active window 
      // willbe the newly created list
      this.router.navigate(['/lists', list._id]);
       // lets naviage to lists/:response._id 
    });
  }


  // manual functions to navigate a page to another route

  // navigateTo(newRoute: string){
  //   this.router.navigate([newRoute]);
  // }
 
  // navigateToMainPage(){
  //   this.router.navigate(['/lists']);
  // }
}
