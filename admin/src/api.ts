const API_BASE = '/api';

export const ADMIN_KEY = 'admin_secret_lingo_master_key';

export const fetchAdminHeaders = () => ({
  'Content-Type': 'application/json',
  'x-admin-key': ADMIN_KEY,
});

export const api = {
  getAnalytics: async () => {
    const res = await fetch(`${API_BASE}/admin/analytics`, { headers: fetchAdminHeaders() });
    return res.json();
  },

  getCourses: async () => {
    const res = await fetch(`${API_BASE}/admin/courses`, { headers: fetchAdminHeaders() });
    return res.json();
  },

  createCourse: async (data: any) => {
    const res = await fetch(`${API_BASE}/admin/courses`, {
      method: 'POST',
      headers: fetchAdminHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateCourse: async (courseId: string, data: any) => {
    const res = await fetch(`${API_BASE}/admin/courses/${courseId}`, {
      method: 'PUT',
      headers: fetchAdminHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getUnits: async (courseId: string) => {
    const res = await fetch(`${API_BASE}/admin/courses/${courseId}/units`, { headers: fetchAdminHeaders() });
    return res.json();
  },

  createUnit: async (data: any) => {
    const res = await fetch(`${API_BASE}/admin/units`, {
      method: 'POST',
      headers: fetchAdminHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getLessons: async (unitId: string) => {
    const res = await fetch(`${API_BASE}/admin/units/${unitId}/lessons`, { headers: fetchAdminHeaders() });
    return res.json();
  },

  createLesson: async (data: any) => {
    const res = await fetch(`${API_BASE}/admin/lessons`, {
      method: 'POST',
      headers: fetchAdminHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getExercises: async (lessonId: string) => {
    const res = await fetch(`${API_BASE}/admin/lessons/${lessonId}/exercises`, { headers: fetchAdminHeaders() });
    return res.json();
  },

  createExercise: async (data: any) => {
    const res = await fetch(`${API_BASE}/admin/exercises`, {
      method: 'POST',
      headers: fetchAdminHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteExercise: async (exerciseId: string) => {
    const res = await fetch(`${API_BASE}/admin/exercises/${exerciseId}`, {
      method: 'DELETE',
      headers: fetchAdminHeaders(),
    });
    return res.json();
  },
};
