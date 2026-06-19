import { SRB00 } from './SRB00.js';
import { SRA00 } from './SRA00.js';
import { SRF00 } from './SRF00.js';
import { JSB00 } from './JSB00.js';
import { JSA00 } from './JSA00.js';
import { CPB00 } from './CPB00.js';

export const courseGroups = {
  [SRB00.id]: SRB00,
  [SRA00.id]: SRA00,
  [SRF00.id]: SRF00,
  [JSB00.id]: JSB00,
  [JSA00.id]: JSA00,
  [CPB00.id]: CPB00,
};

export function normalizeCourseCode(code) {
  return String(code || '').trim().toUpperCase();
}

export function getCourseGroup(code) {
  return courseGroups[normalizeCourseCode(code)] || null;
}

export function getAvailableCourseGroupCodes() {
  return Object.keys(courseGroups);
}

export function getCourseModeLabel(mode) {
  return mode === 'contest' || mode === 'competition' ? '競賽模式' : '學習模式';
}

export function getCourseTypeLabel(type) {
  return type === 'programming' ? '程式解題' : 'SmartRing';
}

export const publicCourseGroups = [
  { category: 'SmartRing 課程', codes: ['SRB00', 'SRA00', 'SRF00'] },
  { category: '程式解題課程', codes: ['JSB00', 'JSA00', 'CPB00'] },
];

export function getPublicCourseGroupListHtml() {
  return publicCourseGroups
    .map((group) => {
      const items = group.codes
        .map((code) => {
          const course = courseGroups[code];
          const title = course?.title || '尚未建立課程內容';
          return `<li><code>${code}</code>${title}</li>`;
        })
        .join('');

      return `
        <section class="modal-section">
          <h3>${group.category}</h3>
          <ul class="public-course-list">${items}</ul>
        </section>
      `;
    })
    .join('');
}

export function getDefaultTask(courseGroup) {
  if (!courseGroup?.tasks?.length) return null;
  return (
    courseGroup.tasks.find((task) => task.id === courseGroup.defaultTaskId) ||
    courseGroup.tasks[0]
  );
}

export function getTaskById(courseGroup, taskId) {
  if (!courseGroup?.tasks?.length) return null;
  return courseGroup.tasks.find((task) => task.id === taskId) || null;
}
