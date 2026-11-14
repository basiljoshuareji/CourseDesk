
export type Category =
  'html' |
  'css' |
  'typescript' |
  'angular' |
  'docker';

export type Level =
  'beginner' |
  'intermediate' |
  'advanced';

export interface Course {
  id: number;
  title: string;
  category: Category;
  level: Level;
  hours: number;
  seats: number;
  enrolled: number;
}

export interface Enrolment {
  id: number;
  courseId: number;
  courseTitle: string;
  name: string;
  email: string;
}

export const CATEGORIES: Category[] = [
  'html',
  'css',
  'typescript',
  'angular',
  'docker'
];

export function seatsLeft(course: Course): number {
  return course.seats - course.enrolled;
}

export function filterCourses( courses: Course[], category: Category | 'all', maxHours?: number): Course[] {
  return courses.filter(course =>
    (category === 'all' || course.category === category) &&
    (maxHours === undefined || course.hours <= maxHours)
  );
}

export function totalHours(courses: Course[]): number {
  return courses.reduce((total, course) => {
    return total + course.hours;
  }, 0);
}

export function sortedByHours(
  courses: Course[],
  descending: boolean = false
): Course[] {
  return [...courses].sort((a, b) =>
    descending
      ? b.hours - a.hours
      : a.hours - b.hours
  );
}
