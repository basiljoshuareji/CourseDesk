import { Component, computed, inject, signal } from '@angular/core';
import { Course, Category, CATEGORIES, filterCourses, totalHours } from '../course';
import { UpperCasePipe } from '@angular/common';
import { CourseService } from '../course-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SavedCoursesService } from '../saved-courses.service';

@Component({
  imports: [RouterLink, UpperCasePipe],
  selector: 'app-courses',
  styleUrl: './courses.css',
  templateUrl: './courses.html',
})
export class Courses {
  private readonly courseService = inject(CourseService);

  private readonly route = inject(ActivatedRoute);


  private readonly router = inject(Router);

  readonly savedCourses = inject(SavedCoursesService);

  courses = signal<Course[]>([]);
  categories = CATEGORIES;
  selectedCategory = signal<Category | 'all'>('all');
  maxHours = signal<number | undefined>(undefined);
  selectedCourseId = signal<number | null>(null);
  savedIds = this.savedCourses.savedIds;
  
  shown = computed(() => {
    const courseId = this.selectedCourseId();
    if (courseId !== null) {
      return this.courses().filter(course => course.id === courseId);
    }

    return filterCourses(this.courses(), this.selectedCategory(), this.maxHours());
  });
  shownHours = computed(() => totalHours(this.shown()));

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.selectedCourseId.set(id === null ? null : Number(id));
    });

    this.route.queryParamMap.subscribe(params => {
      const category = CATEGORIES.find(candidate => candidate === params.get('category'));
      this.selectedCategory.set(category ?? 'all');

      const maxHours = params.get('maxHours');
      const parsedHours = maxHours === null || maxHours.trim() === '' ? undefined : Number(maxHours);
      this.maxHours.set(
        parsedHours !== undefined && Number.isFinite(parsedHours) && parsedHours >= 0
          ? parsedHours
          : undefined,
      );
    });

    this.courseService.getCourses().subscribe(data => {
      this.courses.set(data);
    });
  }

  selectCategory(category: Category | 'all') {
    this.selectedCategory.set(category);
    this.updateQueryParams();
  }

  updateMaxHours(value: string) {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      this.maxHours.set(undefined);
      this.updateQueryParams();
      return;
    }

    const hours = Number(trimmedValue);
    if (Number.isFinite(hours) && hours >= 0) {
      this.maxHours.set(hours);
      this.updateQueryParams();
    }
  }

  private updateQueryParams() {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: this.selectedCategory() === 'all' ? null : this.selectedCategory(),
        maxHours: this.maxHours() ?? null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  toggleSaved(courseId: number) {
    this.savedCourses.toggle(courseId);
  }
}