import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

  
@Injectable({
  providedIn: 'root'
}) 
export class TaskService {

  constructor(private WebReqService: WebRequestService) { }

  getLists(){
    return this.WebReqService.get('lists'); 
  }
  createList(title: string){
    // we will send web req to create a list from here
    return this.WebReqService.post('lists', {title});
  }
  updateList(id: string, title: string){
    // we will send web req to create a list from here
    return this.WebReqService.patch(`lists/${id}`, {title});
  }
  
  deleteList(id: string){
    return this.WebReqService.delete(`lists/${id}`);
  }

  deleteTask(listId: string, taskId: string){
    return this.WebReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  getTasks(listId: string){
    return this.WebReqService.get(`lists/${listId}/tasks`); // this way we are calling the get /lists/:listId  get api
  }
  updateTask(listId: string, taskId: string, title: string){
    // we will send web req to create a list from here
    return this.WebReqService.patch(`lists/${listId}/tasks/${taskId}`, {title});
  }

  createTasks(title: string, listId: string){
    // we will send web req to create a task from here
    return this.WebReqService.post(`lists/${listId}/tasks`, {title}); // api route, payload that will be recieved by req.body using bodyparser
  }

  // this will toggle the .completed property of a task 
  complete(task: any){
    return this.WebReqService.patch(`lists/${task._listId}/tasks/${task._id}`,{
      completed: !task.completed
    })
  }

  

  

  


} 
