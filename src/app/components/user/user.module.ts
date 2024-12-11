import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  {path: "", redirectTo:"profile", pathMatch:"full"},
  {path: "profile", component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: "edit", component: EditProfileComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    UserProfileComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
