import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Courses } from './courses/courses';
import { NotFound } from './not-found/not-found';
import { MyEnrollments } from './my-enrollments/my-enrollments';
import { SignIn } from './sign-in/sign-in';


export const routes: Routes = [
    {path : 'home' , component : Home},
    {path : '', redirectTo:'home', pathMatch:'full'},

    {path : 'courses' , component: Courses},
    {path : 'courses/:id' , component : Courses},

    {
        path : 'about',
        loadComponent: () => import('./about/about').then(m => m.About)
    },
    
    {path : 'myEnrolments' , component : MyEnrollments},

    {path : 'signIn' , component : SignIn},
    {path : '**' , component : NotFound}

];
