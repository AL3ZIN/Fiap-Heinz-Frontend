import { Injectable } from '@angular/core';
import { icon } from '@fortawesome/fontawesome-svg-core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

constructor() { }

  public success(message: string): void{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  public info(message: string, title: string): void{
    this.showAlert(title, message, 'info');
  }

  public error(message: string, title: string): void{
    this.showAlert(title, message, 'error');
  }

  private showAlert(title: string, message: string, icon: SweetAlertIcon): void{
    Swal.fire(title, message, icon)
  }

}