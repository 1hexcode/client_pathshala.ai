/**
 * API Service
 * Centralized HTTP client for backend communication
 */

const API_BASE = `${import.meta.env.VITE_API_URL}/api/v1`;

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
        let errorMessage = error.detail;
        if (Array.isArray(errorMessage)) {
            // Prettify FastAPI validation errors
            errorMessage = errorMessage.map(e => {
                let field = e.loc ? String(e.loc[e.loc.length - 1]) : '';
                // Convert 'program_id' to 'Program Id'
                field = field.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                
                let msg = e.msg || 'invalid entry';
                const msgLower = msg.toLowerCase();
                
                // Simplify technical type coercion errors to 'is required'
                if (msgLower === 'field required' || 
                    msgLower.includes('valid uuid') || 
                    msgLower.includes('valid integer')) {
                    msg = 'is required';
                }
                
                return field ? `${field} ${msg}` : msg;
            }).join(' • ');
        }
        throw new Error(errorMessage || `Request failed (${response.status})`);
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

// ─── Admin: Students ──────────────────────────────────────────────────────────

export async function createStudent(data) {
    return request('/admin/create-student', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function fetchStudents() {
    return request('/admin/students');
}

export async function toggleStudentActive(userId) {
    return request(`/admin/students/${userId}/toggle-active`, { method: 'PATCH' });
}

export async function deleteStudent(userId) {
    return request(`/admin/students/${userId}`, { method: 'DELETE' });
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

export async function updateCollege(id, data) {
    return request(`/admin/colleges/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
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

export async function updateProgram(id, data) {
    return request(`/admin/programs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
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

export async function updateSubject(id, data) {
    return request(`/admin/subjects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
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

export async function fetchPendingNotes() {
    return request('/notes/pending');
}

export async function publishNote(id) {
    return request(`/notes/${id}/publish`, { method: 'PATCH' });
}

export async function rejectNote(id) {
    return request(`/notes/${id}/reject`, { method: 'PATCH' });
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export async function fetchDashboard() {
    return request('/users/me/dashboard');
}

export async function fetchStats() {
    return request('/stats/');
}

// ─── Single Note ─────────────────────────────────────────────────────────────

export async function fetchNote(noteId) {
    return request(`/notes/${noteId}`);
}

export async function trackDownload(noteId) {
    return request(`/notes/${noteId}/download`, { method: 'POST' });
}

export async function updateProfile(data) {
    return request('/users/me', {
        method: 'PATCH',
        body: JSON.stringify(data),
    });
}

// ─── Chat ────────────────────────────────────────────────────────────────────

export async function chatAboutNote(noteId, message) {
    return request(`/chat/note/${noteId}`, {
        method: 'POST',
        body: JSON.stringify({ message }),
    });
}

// ─── OCR ─────────────────────────────────────────────────────────────────────

export async function ocrExtract(imageFile) {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch(`${API_BASE}/ocr/extract`, {
        method: 'POST',
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'OCR failed' }));
        throw new Error(error.detail || `OCR failed (${response.status})`);
    }

    return response.json();
}

// ─── LLM Models ──────────────────────────────────────────────────────────────

export async function fetchLLMModels() {
    return request('/admin/llm-models');
}

export async function createLLMModel(data) {
    return request('/admin/llm-models', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function updateLLMModel(id, data) {
    return request(`/admin/llm-models/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });
}

export async function toggleLLMModel(id) {
    return request(`/admin/llm-models/${id}/toggle`, {
        method: 'PATCH',
    });
}

export async function deleteLLMModel(id) {
    return request(`/admin/llm-models/${id}`, {
        method: 'DELETE',
    });
}
