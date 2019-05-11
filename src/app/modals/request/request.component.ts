import { Component, OnInit } from '@angular/core';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import { UserService } from 'src/app/services/user.service';

import { RequestsService } from 'src/app/services/requests.service';
import { User } from 'src/app/interfaces/user';


export interface PromptModel {
  scope: any;
  currentRequest: any;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent extends DialogComponent<PromptModel, any> implements PromptModel, OnInit  {

  scope: any;
  currentRequest: any;
  shouldAdd: string = 'yes';
  friendUser: User;

  constructor(public dialogService: DialogService,
              private userService: UserService,
              private requestsService: RequestsService) {
                super(dialogService); 
                
               }

  accept() {
    if(this.shouldAdd === 'yes') {
      this.requestsService.setRequestStatus(this.currentRequest, 'accepted').then( (data)=> {
        console.log(data);
        this.userService.addFriend(this.scope.user.uid, this.currentRequest.sender).then( (res)=> {
          this.dialogService.removeAll();

        }).catch((err)=> {
          console.log(err);
        });
      
      }).catch((err)=> {
        console.log(err);
      });
    } else if(this.shouldAdd === 'no') {
      this.requestsService.setRequestStatus(this.currentRequest, 'rejected').then( (data)=> {
        this.dialogService.removeAll();
      }).catch((err)=> {
        console.log(err);
      })
    } else if(this.shouldAdd === 'later') {
      this.requestsService.setRequestStatus(this.currentRequest, 'decide_later').then( (data)=> {
        this.dialogService.removeAll();
      }).catch((err)=> {
        console.log(err);
      })
    }
  }

  ngOnInit() {
    if (this.currentRequest.sender) {
      this.userService.getUserById(this.currentRequest.sender).valueChanges().subscribe((data: User)=> {
        this.friendUser = data;
      }, (err)=> {
        console.log(err);
      });
    }
  }
}
