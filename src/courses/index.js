const courseModules = import.meta.glob(['./*.js', '!./index.js', '!./smartring-tasks.js'], {
  eager: true,
});

export function normalizeCourseCode(code) {
  return String(code || '').trim().toUpperCase();
}

function getCourseCodeFromPath(path) {
  const filename = String(path || '').split('/').pop() || '';
  return normalizeCourseCode(filename.replace(/\.js$/i, ''));
}

function isCourseObject(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      Array.isArray(value.tasks) &&
      (value.id || value.code || value.title)
  );
}

function normalizeTask(task, courseId, index) {
  if (!task || typeof task !== 'object') {
    return {
      id: `${courseId}-${String(index + 1).padStart(2, '0')}`,
      title: `題目 ${index + 1}`,
    };
  }

  return {
    ...task,
    id: task.id || `${courseId}-${String(index + 1).padStart(2, '0')}`,
    title: task.title || task.problemTitle || `題目 ${index + 1}`,
  };
}

function normalizeCourseGroup(course, fallbackCode) {
  if (!isCourseObject(course)) return null;

  const fileCode = normalizeCourseCode(fallbackCode);
  const declaredCode = normalizeCourseCode(course.code || course.id);
  const id = declaredCode || fileCode;
  if (!id) return null;

  if (fileCode && declaredCode && fileCode !== declaredCode) {
    console.warn(
      `[Blockly Lab] 課程檔名與課程代碼不一致：檔名 ${fileCode}.js，course.code/id 為 ${declaredCode}。建議題庫轉換器輸出時保持一致。`
    );
  }

  const tasks = (course.tasks || []).map((task, index) => normalizeTask(task, id, index));
  const defaultTaskId = course.defaultTaskId || tasks[0]?.id || '';

  return {
    ...course,
    id,
    code: course.code || id,
    title: course.title || id,
    mode: course.mode || 'learning',
    type: course.type || (id.startsWith('SR') ? 'smartring' : 'programming'),
    tasks,
    defaultTaskId,
    sourceFileCode: fileCode,
  };
}

function extractCourseGroup(module, path) {
  const codeFromPath = getCourseCodeFromPath(path);

  const candidates = [
    module?.default,
    module?.[codeFromPath],
    ...Object.values(module || {}),
  ];

  for (const candidate of candidates) {
    const normalized = normalizeCourseGroup(candidate, codeFromPath);
    if (normalized) return normalized;
  }

  return null;
}

function buildCourseGroups() {
  const groups = {};

  Object.entries(courseModules).forEach(([path, module]) => {
    const courseGroup = extractCourseGroup(module, path);
    if (!courseGroup) return;
    groups[courseGroup.id] = courseGroup;
    if (courseGroup.sourceFileCode && !groups[courseGroup.sourceFileCode]) {
      groups[courseGroup.sourceFileCode] = courseGroup;
    }
  });

  return groups;
}

export const courseGroups = buildCourseGroups();

export function getCourseGroup(code) {
  return courseGroups[normalizeCourseCode(code)] || null;
}

export function getAvailableCourseGroupCodes() {
  return Object.keys(courseGroups).sort();
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

const fallbackPublicCourseTitles = {
  SRB00: 'SmartRing 基礎互動任務',
  SRA00: 'SmartRing 陣列任務',
  SRF00: 'SmartRing 函式仿作任務',
  JSB00: 'Blockly 解題基礎一',
  JSA00: 'Blockly 解題陣列基礎',
  CPB00: '程式競賽基礎題組',
};

export function getPublicCourseGroupListHtml() {
  return publicCourseGroups
    .map((group) => {
      const items = group.codes
        .map((code) => {
          const course = courseGroups[code];
          const title = course?.title || fallbackPublicCourseTitles[code] || '課程內容尚未建立';
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
