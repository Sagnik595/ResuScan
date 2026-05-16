export const APP_NAME = "ResuScan";

export const USER_ROUTES = {
  DASHBOARD: "/dashboard",
  UPLOAD: "/upload",
  JOBS: "/jobs",
  PROFILE: "/profile",
};

export const ADMIN_ROUTES = {
  DASHBOARD: "/admin/dashboard",
  ADD_JOB: "/admin/add-job",
  JOBS: "/admin/jobs",
  USERS: "/admin/users",
};

export const MAX_RESUME_SIZE = 5 * 1024 * 1024; // 5 MB

export const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];