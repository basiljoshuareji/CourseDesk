import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SavedCoursesService {
  readonly savedIds = signal<number[]>([]);
  readonly isEnrolled = signal<boolean>(false);

  toggle(courseId: number) {
    this.savedIds.update(ids =>
      ids.includes(courseId)
        ? ids.filter(id => id !== courseId)
        : [...ids, courseId],
    );
  }

  setEnrolled(value: boolean) {
    this.isEnrolled.set(value);
  }
}
