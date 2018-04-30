import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AlertService {
  messagesSuccess: string[] = [];
  messagesDanger: string[] = [];
  messagesWarning: string[] = [];

  isLoading: boolean = false;

  constructor(private authService: AuthService) { }

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
    if(e) {
      if(e.status == 400) {
        if(e.error.error === 'token_not_provided') {
          this.addDangerMessage('Token not provided, please authorize to continue!');
        }
        else {
          this.addDangerMessage('Authentication error, please authorize to continue!');
        }
        setTimeout(() => { this.authService.logout() }, 3000);
      }
      else if(e.status == 401) {
        this.addDangerMessage('Your session has expired, please authorize to continue!');
        setTimeout(() => { this.authService.logout() }, 3000);
      }
      else if(e.status == 403) {
        this.addDangerMessage('Forbidden, please check your credentials');
        setTimeout(() => { this.clear() }, 3000); 
      }
      else if(e.status == 422) {
        this.addMultiple(e);
        setTimeout(() => { this.clear() }, 7000);
      }
      else if(e.status == 500) {
        if(e.error.error === 'could_not_connect_to_strava') {
          this.addDangerMessage('Could not connect to Strava');
        }
        else {
          this.addDangerMessage('There was an error: ' + e.error.message);
        }
        setTimeout(() => { this.clear() }, 3000);
      }
      else {
        this.addDangerMessage('There was an error: ' + e.error.message);
        setTimeout(() => { this.clear() }, 3000);
      }
    }
  }

  private addMultiple(jsonMessage: any): void {

    let fields = jsonMessage.error.message;

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

  showSuccess(msg: string) {
    this.addSuccessMessage(msg);
    setTimeout(() => { this.clear() }, 3000);
  }

}
