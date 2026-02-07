/**
 * API Service
 * Centralized HTTP client for backend communication
 */

const API_URL = import.meta.env.VITE_API_URL || 'https://likely-jolee-pathsalaai-8856d037.koyeb.app';
const API_BASE = `${API_URL}/api/v1`;

/**
 * Make an authenticated API request
 */
async function request(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    const response = await fetch(`${API_BASE}${endpoint}`, config);

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Network error' }));
        throw new Error(error.detail || `Request failed (${response.status})`);
    }

    return response.json();
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function loginUser(email, password) {
    return request('/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

export async function registerUser(data) {
    return request('/users/register', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function fetchCurrentUser() {
    return request('/users/me');
}

// ─── Admin: Users ────────────────────────────────────────────────────────────

export async function createAdminUser(data) {
    return request('/users/create-admin', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function fetchUsers(role) {
    const query = role ? `?role=${role}` : '';
    return request(`/users/${query}`);
}

export async function toggleUserActive(userId) {
    return request(`/users/${userId}/toggle-active`, { method: 'PATCH' });
}

// ─── Admin: Colleges ─────────────────────────────────────────────────────────

export async function fetchColleges() {
    return request('/admin/colleges');
}

export async function createCollege(data) {
    return request('/admin/colleges', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function deleteCollege(id) {
    return request(`/admin/colleges/${id}`, { method: 'DELETE' });
}

export async function fetchFavouriteColleges() {
    return request('/admin/colleges?favourite=true');
}

export async function toggleCollegeFavourite(id) {
    return request(`/admin/colleges/${id}/toggle-favourite`, { method: 'PATCH' });
}

// ─── Admin: Programs ─────────────────────────────────────────────────────────

export async function fetchPrograms(collegeId) {
    const query = collegeId ? `?college_id=${collegeId}` : '';
    return request(`/admin/programs${query}`);
}

export async function createProgram(data) {
    return request('/admin/programs', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function deleteProgram(id) {
    return request(`/admin/programs/${id}`, { method: 'DELETE' });
}

// ─── Admin: Subjects ─────────────────────────────────────────────────────────

export async function fetchSubjects(programId, semester) {
    const params = new URLSearchParams();
    if (programId) params.set('program_id', programId);
    if (semester) params.set('semester', semester);
    const query = params.toString() ? `?${params}` : '';
    return request(`/admin/subjects${query}`);
}

export async function createSubject(data) {
    return request('/admin/subjects', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function deleteSubject(id) {
    return request(`/admin/subjects/${id}`, { method: 'DELETE' });
}

// ─── Notes ───────────────────────────────────────────────────────────────────

export async function uploadNote(formData) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE}/notes/upload`, {
        method: 'POST',
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData, // FormData — browser sets Content-Type with boundary
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Upload failed' }));
        throw new Error(error.detail || `Upload failed (${response.status})`);
    }

    return response.json();
}

export async function fetchNotes(subjectId, limit) {
    const params = new URLSearchParams();
    if (subjectId) params.set('subject_id', subjectId);
    if (limit) params.set('limit', limit);
    const query = params.toString() ? `?${params}` : '';
    return request(`/notes/${query}`);
}

export async function deleteNote(id) {
    return request(`/notes/${id}`, { method: 'DELETE' });
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export async function fetchStats() {
    return request('/stats/');
}

// ─── Single Note ─────────────────────────────────────────────────────────────

export async function fetchNote(noteId) {
    return request(`/notes/${noteId}`);
}

// ─── Chat ────────────────────────────────────────────────────────────────────

export async function chatAboutNote(noteId, message) {
    return request(`/chat/note/${noteId}`, {
        method: 'POST',
        body: JSON.stringify({ message }),
    });
}
