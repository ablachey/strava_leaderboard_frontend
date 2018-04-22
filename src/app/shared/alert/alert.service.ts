import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AlertService {
  messagesSuccess: string[] = [];
  messagesDanger: string[] = [];
  messagesWarning: string[] = [];

  isLoading: boolean = false;

  constructor(private router?: Router) { }

  addSuccessMessage(message: string): void {
    this.messagesSuccess.push(message);
  }

  addDangerMessage(message: string): void {
    this.messagesDanger.push(message);
  }

  addWarningMessage(message: string): void {
    this.messagesWarning.push(message);
  }

  clear(): void {
    this.messagesSuccess.length = 0;
    this.messagesDanger.length = 0;
    this.messagesWarning.length = 0;
  }

  handleLocalWarnings(e: string) {
    this.clear();
    this.addWarningMessage(e);
    setTimeout(() => { this.clear() }, 5000);
  }


  handleLocalErrors(e: string) {
    this.clear();
    this.addDangerMessage(e);
    setTimeout(() => { this.clear() }, 5000);
  }

  handleErrors(e: any): void {
    this.clear();
    if(e.status == 401) {
      this.addDangerMessage('Your session has expired, please authorize to continue!');
      setTimeout(() => { this.router.navigate(['/auth']) }, 2000);   
    }
    else if(e.status == 403) {
      this.addDangerMessage('Forbidden, please check your credentials');
      setTimeout(() => { this.clear() }, 3000); 
    }
    else if(e.status == 422) {
      this.addMultiple(e);
      setTimeout(() => { this.clear() }, 7000);
    }
    else {
      this.addDangerMessage('There was an error: ' + e.message);
      setTimeout(() => { this.clear() }, 3000);
    }
  }

  private addMultiple(jsonMessage: any): void {
    let fields = JSON.parse(jsonMessage.error.message);
    
    for(let key in fields) {
      let messages = fields[key];
      for(let value of messages) {
        if(value) {
          this.addDangerMessage(value);
        }
      }
    }
  }

  loadingStart(): void {
    this.isLoading = true;
  }

  loadingStop(): void {
    this.isLoading = false;
  }

}
