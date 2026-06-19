import { SRB00 } from './SRB00.js';
import { SRA00 } from './SRA00.js';
import { SRF00 } from './SRF00.js';
import { JSB00 } from './JSB00.js';

export const courseGroups = {
  [SRB00.id]: SRB00,
  [SRA00.id]: SRA00,
  [SRF00.id]: SRF00,
  [JSB00.id]: JSB00,
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

export function getAvailableCourseGroupListHtml() {
  return getAvailableCourseGroupCodes()
    .map((code) => {
      const group = courseGroups[code];
      return `<li>${group.id}：${group.title}</li>`;
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
