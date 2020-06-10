import { Component, OnInit, Output, EventEmitter , ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthService, private notif:NotificationService,
  private user_service:UserService) { }
  
  options:boolean = false;
  user:any;
  @ViewChild('fileInput') fileInput;
  @ViewChild('userImage') userImage;
  allowedExtensions = ['jpg', 'jpeg', 'png'];
  newAvatarString:any;
  allowUpload:boolean = false;
  @Output() displaySidebar = new EventEmitter();
  barsClicked:boolean = false;

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.user = JSON.parse(localStorage.getItem('trim_user'));
  }

  toggleOptions(): void {
    this.options = !this.options;
  }

  logout(): void {
    this.auth.logout(); 
  }

  clickFile(): void {
    this.fileInput.nativeElement.click();
  }

  preview(fileInput:any): void {
    const files = fileInput.files;

    if(files.length > 0) {
        if(this.validate(files[0])) {
            const reader = new FileReader();

            reader.onload = (e) => {
                this.userImage.nativeElement.src = e.target.result;
                this.newAvatarString = e.target.result;
                alert(this.newAvatarString);
            }

            this.allowUpload = true;
            reader.readAsDataURL(files[0]);
        }
    }
  }

  validate(file:File): boolean {
    const ext = file.type.split('/')[1];

    if(!this.allowedExtensions.includes(ext)) {
        this.notif.error('file extension not supported');
        return false;
    }

    if(file.size > 5000000) {
        this.notif.error('Image is too large!');
        return false;
    }

    return true;
  }

  upload():void {
    // this.user_service.changeAvatar(formData).subscribe((res:any) => {
    //     alert(JSON.stringify(res));
    // })
  }

  setBarsClickedState(): void {
    this.barsClicked = !this.barsClicked;
  }

  display(): void {
    this.displaySidebar.emit();
  }

}
    