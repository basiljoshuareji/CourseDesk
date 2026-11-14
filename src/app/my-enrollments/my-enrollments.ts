import { Component, computed, inject, signal } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course-service';
import { SavedCoursesService } from '../saved-courses.service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-my-enrollments',
  styleUrl: './my-enrollments.css',
  templateUrl: './my-enrollments.html',
})
export class MyEnrollments {
  router = inject(Router)
  courseService = inject(CourseService);
  savedCoursesService = inject(SavedCoursesService);
  courses = signal<Course[]>([]);
   savedCourses = computed(() => {
    const savedIds = this.savedCoursesService.savedIds();
    return this.courses().filter(course => savedIds.includes(course.id));
  });

  isEnrolled = this.savedCoursesService.isEnrolled;

  constructor() {
    this.courseService.getCourses().subscribe(courses => {
      this.courses.set(courses);
    });
  }

  toSignIn(){
    this.savedCoursesService.setEnrolled(true);
    this.router.navigate(['/signIn']);
    
  }
}
