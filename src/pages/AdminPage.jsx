import { useState, useEffect, useCallback } from 'react';
import { Card, Button, Tabs, Badge, SearchInput, Modal, Input, Select, Spinner } from '../components/common';
import { useAuth } from '../contexts/AuthContext';
import {
  fetchUsers,
  createAdminUser,
  toggleUserActive,
  fetchColleges,
  createCollege,
  deleteCollege,
  toggleCollegeFavourite,
  fetchPrograms,
  createProgram,
  deleteProgram,
  fetchSubjects,
  createSubject,
  deleteSubject,
  fetchNotes,
  deleteNote,
} from '../utils/api';

export function AdminPage() {
  const { isSuperAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState(isSuperAdmin ? 'admins' : 'colleges');

  const tabs = [
    ...(isSuperAdmin ? [{ id: 'admins', label: 'Admins' }] : []),
    { id: 'colleges', label: 'Colleges' },
    { id: 'programs', label: 'Programs' },
    { id: 'subjects', label: 'Subjects' },
    ...(isSuperAdmin ? [{ id: 'notes', label: 'Notes' }] : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Admin Panel</h1>
        <p className="text-muted">Manage admins, colleges, programs, and subjects</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" className="mb-6" />

      {activeTab === 'admins' && isSuperAdmin && <AdminsTab />}
      {activeTab === 'colleges' && <CollegesTab />}
      {activeTab === 'programs' && <ProgramsTab />}
      {activeTab === 'subjects' && <SubjectsTab />}
      {activeTab === 'notes' && isSuperAdmin && <NotesTab />}
    </div>
  );
}


// ─── Admins Tab (Super Admin Only) ──────────────────────────────────────────

function AdminsTab() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'admin' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUsers('admin');
      setAdmins(data);
    } catch { /* empty */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await createAdminUser(form);
      setShowModal(false);
      setForm({ name: '', email: '', password: '', role: 'admin' });
      load();
    } catch (err) {
      setError(err.message);
    }
    setSubmitting(false);
  };

  const handleToggle = async (userId) => {
    try {
      await toggleUserActive(userId);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="flex justify-center py-12"><Spinner /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted">{admins.length} admin(s)</p>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Admin
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted">Name</th>
                <th className="text-left p-4 font-medium text-muted">Email</th>
                <th className="text-left p-4 font-medium text-muted">Status</th>
                <th className="text-left p-4 font-medium text-muted">Created</th>
                <th className="text-left p-4 font-medium text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border-b border-border hover:bg-hover">
                  <td className="p-4 font-medium text-foreground">{admin.name}</td>
                  <td className="p-4 text-muted">{admin.email}</td>
                  <td className="p-4">
                    <Badge variant={admin.is_active ? 'success' : 'error'}>
                      {admin.is_active ? 'Active' : 'Disabled'}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted text-sm">
                    {new Date(admin.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <Button
                      variant={admin.is_active ? 'ghost' : 'primary'}
                      size="sm"
                      onClick={() => handleToggle(admin.id)}
                    >
                      {admin.is_active ? 'Disable' : 'Enable'}
                    </Button>
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted">No admins yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Admin Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Admin">
        <form onSubmit={handleCreate} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
          <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary" className="flex-1" loading={submitting}>Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


// ─── Colleges Tab ───────────────────────────────────────────────────────────

function CollegesTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', short_name: '', description: '', icon: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try { setItems(await fetchColleges()); } catch { /* empty */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await createCollege(form);
      setShowModal(false);
      setForm({ name: '', short_name: '', description: '', icon: '' });
      load();
    } catch (err) { setError(err.message); }
    setSubmitting(false);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete college "${name}"?`)) return;
    try { await deleteCollege(id); load(); }
    catch (err) { alert(err.message); }
  };

  const handleToggleFav = async (id) => {
    try {
      await toggleCollegeFavourite(id);
      load();
    } catch (err) { alert(err.message); }
  };

  const filtered = items.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex justify-center py-12"><Spinner /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SearchInput placeholder="Search colleges..." value={search} onChange={(e) => setSearch(e.target.value)} onClear={() => setSearch('')} className="max-w-xs" />
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add College
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted">Name</th>
                <th className="text-left p-4 font-medium text-muted">Short Name</th>
                <th className="text-left p-4 font-medium text-muted">Favourite</th>
                <th className="text-left p-4 font-medium text-muted">Description</th>
                <th className="text-left p-4 font-medium text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-border hover:bg-hover">
                  <td className="p-4 font-medium text-foreground">{c.icon} {c.name}</td>
                  <td className="p-4 text-muted">{c.short_name}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleFav(c.id)}
                      className={`text-xl transition-transform hover:scale-110 ${c.is_favourite ? 'grayscale-0' : 'grayscale opacity-30'}`}
                      title={c.is_favourite ? 'Remove from favourites' : 'Add to favourites'}
                    >
                      ⭐
                    </button>
                  </td>
                  <td className="p-4 text-muted text-sm max-w-xs truncate">{c.description || '—'}</td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm" className="text-error" onClick={() => handleDelete(c.id, c.name)}>Delete</Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-muted">No colleges found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add College">
        <form onSubmit={handleCreate} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
          <Input label="College Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. College of Engineering" required />
          <Input label="Short Name" value={form.short_name} onChange={(e) => setForm({ ...form, short_name: e.target.value })} placeholder="e.g. COE" required />
          <Input label="Icon (emoji)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="e.g. ⚙️" />
          <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description" />
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary" className="flex-1" loading={submitting}>Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


// ─── Programs Tab ───────────────────────────────────────────────────────────

function ProgramsTab() {
  const [items, setItems] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', short_name: '', college_id: '', duration: '4', description: '', total_credits: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [p, c] = await Promise.all([fetchPrograms(), fetchColleges()]);
      setItems(p);
      setColleges(c);
    } catch { /* empty */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await createProgram({
        ...form,
        duration: parseInt(form.duration) || 4,
        total_credits: form.total_credits ? parseInt(form.total_credits) : null,
      });
      setShowModal(false);
      setForm({ name: '', short_name: '', college_id: '', duration: '4', description: '', total_credits: '' });
      load();
    } catch (err) { setError(err.message); }
    setSubmitting(false);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete program "${name}"?`)) return;
    try { await deleteProgram(id); load(); }
    catch (err) { alert(err.message); }
  };

  const collegeMap = Object.fromEntries(colleges.map(c => [c.id, c]));
  const filtered = items.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex justify-center py-12"><Spinner /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SearchInput placeholder="Search programs..." value={search} onChange={(e) => setSearch(e.target.value)} onClear={() => setSearch('')} className="max-w-xs" />
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Program
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted">Name</th>
                <th className="text-left p-4 font-medium text-muted">Code</th>
                <th className="text-left p-4 font-medium text-muted">College</th>
                <th className="text-left p-4 font-medium text-muted">Duration</th>
                <th className="text-left p-4 font-medium text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border hover:bg-hover">
                  <td className="p-4 font-medium text-foreground">{p.name}</td>
                  <td className="p-4 text-muted">{p.short_name}</td>
                  <td className="p-4 text-muted">{collegeMap[p.college_id]?.short_name || '—'}</td>
                  <td className="p-4 text-muted">{p.duration} yrs</td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm" className="text-error" onClick={() => handleDelete(p.id, p.name)}>Delete</Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-muted">No programs found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Program">
        <form onSubmit={handleCreate} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
          <Select
            label="College"
            value={form.college_id}
            onChange={(e) => setForm({ ...form, college_id: e.target.value })}
            options={[{ value: '', label: 'Select college' }, ...colleges.map(c => ({ value: c.id, label: c.name }))]}
            required
          />
          <Input label="Program Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Computer Engineering" required />
          <Input label="Short Name" value={form.short_name} onChange={(e) => setForm({ ...form, short_name: e.target.value })} placeholder="e.g. BCE" required />
          <Input label="Duration (years)" type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
          <Input label="Total Credits" type="number" value={form.total_credits} onChange={(e) => setForm({ ...form, total_credits: e.target.value })} />
          <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description" />
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary" className="flex-1" loading={submitting}>Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


// ─── Subjects Tab ───────────────────────────────────────────────────────────

function SubjectsTab() {
  const [items, setItems] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', code: '', program_id: '', semester: '', credits: '3', description: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [s, p] = await Promise.all([fetchSubjects(), fetchPrograms()]);
      setItems(s);
      setPrograms(p);
    } catch { /* empty */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await createSubject({
        ...form,
        semester: parseInt(form.semester),
        credits: parseInt(form.credits) || 3,
      });
      setShowModal(false);
      setForm({ name: '', code: '', program_id: '', semester: '', credits: '3', description: '' });
      load();
    } catch (err) { setError(err.message); }
    setSubmitting(false);
  };

  const handleDelete = async (id, code) => {
    if (!confirm(`Delete subject "${code}"?`)) return;
    try { await deleteSubject(id); load(); }
    catch (err) { alert(err.message); }
  };

  const programMap = Object.fromEntries(programs.map(p => [p.id, p]));
  const filtered = items.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex justify-center py-12"><Spinner /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SearchInput placeholder="Search subjects..." value={search} onChange={(e) => setSearch(e.target.value)} onClear={() => setSearch('')} className="max-w-xs" />
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Subject
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted">Code</th>
                <th className="text-left p-4 font-medium text-muted">Name</th>
                <th className="text-left p-4 font-medium text-muted">Program</th>
                <th className="text-left p-4 font-medium text-muted">Semester</th>
                <th className="text-left p-4 font-medium text-muted">Credits</th>
                <th className="text-left p-4 font-medium text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-border hover:bg-hover">
                  <td className="p-4 font-mono text-sm text-primary">{s.code}</td>
                  <td className="p-4 font-medium text-foreground">{s.name}</td>
                  <td className="p-4 text-muted">{programMap[s.program_id]?.short_name || '—'}</td>
                  <td className="p-4 text-muted">Sem {s.semester}</td>
                  <td className="p-4 text-muted">{s.credits}</td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm" className="text-error" onClick={() => handleDelete(s.id, s.code)}>Delete</Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-muted">No subjects found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Subject">
        <form onSubmit={handleCreate} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
          <Select
            label="Program"
            value={form.program_id}
            onChange={(e) => setForm({ ...form, program_id: e.target.value })}
            options={[{ value: '', label: 'Select program' }, ...programs.map(p => ({ value: p.id, label: p.name }))]}
            required
          />
          <Select
            label="Semester"
            value={form.semester}
            onChange={(e) => setForm({ ...form, semester: e.target.value })}
            options={[
              { value: '', label: 'Select semester' },
              ...Array.from({ length: 8 }, (_, i) => ({ value: String(i + 1), label: `Semester ${i + 1}` })),
            ]}
            required
          />
          <Input label="Subject Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="e.g. CS201" required />
          <Input label="Subject Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Data Structures" required />
          <Input label="Credits" type="number" value={form.credits} onChange={(e) => setForm({ ...form, credits: e.target.value })} />
          <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description" />
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary" className="flex-1" loading={submitting}>Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


// ─── Notes Tab (Super Admin Only) ───────────────────────────────────────────

function formatFileSize(bytes) {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function NotesTab() {
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [n, s] = await Promise.all([fetchNotes(), fetchSubjects()]);
      setNotes(n);
      setSubjects(s);
    } catch { /* empty */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete note "${title}"? This will also remove the file from disk.`)) return;
    try {
      await deleteNote(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const subjectMap = Object.fromEntries(subjects.map(s => [s.id, s]));
  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex justify-center py-12"><Spinner /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SearchInput
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
          className="max-w-xs"
        />
        <p className="text-muted text-sm">{notes.length} note(s) total</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted">Title</th>
                <th className="text-left p-4 font-medium text-muted">Subject</th>
                <th className="text-left p-4 font-medium text-muted">Size</th>
                <th className="text-left p-4 font-medium text-muted">Views</th>
                <th className="text-left p-4 font-medium text-muted">Status</th>
                <th className="text-left p-4 font-medium text-muted">Uploaded</th>
                <th className="text-left p-4 font-medium text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((n) => (
                <tr key={n.id} className="border-b border-border hover:bg-hover">
                  <td className="p-4 font-medium text-foreground max-w-xs truncate">{n.title}</td>
                  <td className="p-4 text-muted">
                    <Badge variant="neutral">
                      {subjectMap[n.subject_id]?.code || '—'}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted text-sm">{formatFileSize(n.file_size)}</td>
                  <td className="p-4 text-muted text-sm">{n.views}</td>
                  <td className="p-4">
                    <Badge variant={n.status === 'ready' ? 'success' : 'warning'}>
                      {n.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted text-sm">
                    {new Date(n.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {n.file_url && (
                        <a
                          href={n.file_url?.startsWith('http') ? n.file_url : `${import.meta.env.VITE_API_URL}${n.file_url}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button variant="ghost" size="sm">View File</Button>
                        </a>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-error"
                        onClick={() => handleDelete(n.id, n.title)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted">
                    {notes.length === 0 ? 'No notes uploaded yet' : 'No notes match your search'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
