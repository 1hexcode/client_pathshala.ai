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
  fetchPendingNotes,
  publishNote,
  rejectNote,
  deleteNote,
  fetchLLMModels,
  createLLMModel,
  toggleLLMModel,
  deleteLLMModel,
  createStudent,
  fetchStudents,
  toggleStudentActive,
} from '../utils/api';

export function AdminPage() {
  const { isSuperAdmin, user } = useAuth();
  const [activeTab, setActiveTab] = useState(isSuperAdmin ? 'admins' : 'colleges');

  const tabs = [
    ...(isSuperAdmin ? [{ id: 'admins', label: 'Admins' }] : []),
    { id: 'colleges', label: 'Colleges' },
    { id: 'programs', label: 'Programs' },
    { id: 'subjects', label: 'Subjects' },
    ...(!isSuperAdmin ? [{ id: 'students', label: 'Students' }] : []),
    ...(isSuperAdmin ? [{ id: 'notes', label: 'Notes' }] : []),
    ...(isSuperAdmin ? [{ id: 'models', label: 'AI Models' }] : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Admin Panel</h1>
        <p className="text-muted">Manage admins, colleges, programs, and subjects</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" className="mb-6" />

      {activeTab === 'admins' && isSuperAdmin && <AdminsTab />}
      {activeTab === 'colleges' && <CollegesTab isSuperAdmin={isSuperAdmin} user={user} />}
      {activeTab === 'programs' && <ProgramsTab isSuperAdmin={isSuperAdmin} user={user} />}
      {activeTab === 'subjects' && <SubjectsTab isSuperAdmin={isSuperAdmin} user={user} />}
      {activeTab === 'students' && !isSuperAdmin && <StudentsTab user={user} />}
      {activeTab === 'notes' && isSuperAdmin && <NotesTab />}
      {activeTab === 'models' && isSuperAdmin && <ModelsTab />}
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

function CollegesTab({ isSuperAdmin, user }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', short_name: '', description: '', icon: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');

  // For regular admins, reload their own user to get updated college_id after creation
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const all = await fetchColleges();
      if (isSuperAdmin) {
        setItems(all);
      } else if (user?.college_id) {
        // Admin: show only their own college
        setItems(all.filter(c => c.id === user.college_id));
      } else {
        // Admin with no college yet — show nothing
        setItems([]);
      }
    } catch { /* empty */ }
    setLoading(false);
  }, [isSuperAdmin, user?.college_id]);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await createCollege(form);
      setShowModal(false);
      // Reload the page so the auth context picks up the updated college_id
      // (server has set current_user.college_id — a fresh /users/me call reflects it)
      window.location.reload();
    } catch (err) { setError(err.message); }
    setSubmitting(false);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete college "${name}"?`)) return;
    try { await deleteCollege(id); load(); }
    catch (err) { setError(err.message); }
  };

  const handleToggleFav = async (id) => {
    try {
      await toggleCollegeFavourite(id);
      load();
    } catch (err) { setError(err.message); }
  };

  // Regular admins: they already have a college — no need to create another
  const alreadyHasCollege = !isSuperAdmin && !!user?.college_id;

  const filtered = items.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex justify-center py-12"><Spinner /></div>;

  return (
    <div>
      {error && <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
      <div className="flex items-center justify-between mb-6">
        <SearchInput placeholder="Search colleges..." value={search} onChange={(e) => setSearch(e.target.value)} onClear={() => setSearch('')} className="max-w-xs" />
        {!alreadyHasCollege && (
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add College
          </Button>
        )}
      </div>

      {alreadyHasCollege && items.length === 0 && (
        <div className="p-6 text-center text-muted">Loading your college...</div>
      )}

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
                    {isSuperAdmin && <Button variant="ghost" size="sm" className="text-error" onClick={() => handleDelete(c.id, c.name)}>Delete</Button>}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-muted">
                  {!isSuperAdmin && !user?.college_id
                    ? 'You have not created a college yet. Click "Add College" to get started.'
                    : 'No colleges found'}
                </td></tr>
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

function ProgramsTab({ isSuperAdmin, user }) {
  const [items, setItems] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // For regular admins, college_id is pre-filled and immutable
  const adminCollegeId = !isSuperAdmin ? user?.college_id : null;
  const [form, setForm] = useState({
    name: '', short_name: '',
    college_id: adminCollegeId || '',
    duration: '4', description: '', total_credits: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      // Regular admins only see programs for their college
      const [p, c] = await Promise.all([
        fetchPrograms(adminCollegeId || undefined),
        fetchColleges(),
      ]);
      setItems(p);
      setColleges(adminCollegeId ? c.filter(col => col.id === adminCollegeId) : c);
    } catch { /* empty */ }
    setLoading(false);
  }, [adminCollegeId]);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await createProgram({
        ...form,
        college_id: adminCollegeId || form.college_id,
        duration: parseInt(form.duration) || 4,
        total_credits: form.total_credits ? parseInt(form.total_credits) : null,
      });
      setShowModal(false);
      setForm({ name: '', short_name: '', college_id: adminCollegeId || '', duration: '4', description: '', total_credits: '' });
      load();
    } catch (err) { setError(err.message); }
    setSubmitting(false);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete program "${name}"?`)) return;
    try { await deleteProgram(id); load(); }
    catch (err) { setError(err.message); }
  };

  const collegeMap = Object.fromEntries(colleges.map(c => [c.id, c]));
  const filtered = items.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex justify-center py-12"><Spinner /></div>;

  // Admin has no college yet — prompt them to create one first
  if (!isSuperAdmin && !adminCollegeId) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted text-lg mb-2">No college set up yet</p>
        <p className="text-muted text-sm">Go to the <strong>Colleges</strong> tab and create your college first before adding programs.</p>
      </div>
    );
  }

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
                {isSuperAdmin && <th className="text-left p-4 font-medium text-muted">College</th>}
                <th className="text-left p-4 font-medium text-muted">Duration</th>
                <th className="text-left p-4 font-medium text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border hover:bg-hover">
                  <td className="p-4 font-medium text-foreground">{p.name}</td>
                  <td className="p-4 text-muted">{p.short_name}</td>
                  {isSuperAdmin && <td className="p-4 text-muted">{collegeMap[p.college_id]?.short_name || '—'}</td>}
                  <td className="p-4 text-muted">{p.duration} yrs</td>
                  <td className="p-4">
                    {isSuperAdmin && <Button variant="ghost" size="sm" className="text-error" onClick={() => handleDelete(p.id, p.name)}>Delete</Button>}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={isSuperAdmin ? 5 : 4} className="p-8 text-center text-muted">No programs found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Program">
        <form onSubmit={handleCreate} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
          {/* Super admin picks a college; regular admin sees their college as read-only */}
          {isSuperAdmin ? (
            <Select
              label="College"
              value={form.college_id}
              onChange={(e) => setForm({ ...form, college_id: e.target.value })}
              options={[{ value: '', label: 'Select college' }, ...colleges.map(c => ({ value: c.id, label: c.name }))]}
              required
            />
          ) : (
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted">College</label>
              <div className="px-3 py-2 rounded-lg border border-border bg-surface text-foreground text-sm">
                {colleges[0]?.name || 'Your college'}
              </div>
            </div>
          )}
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

function SubjectsTab({ isSuperAdmin, user }) {
  const [items, setItems] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', code: '', program_id: '', semester: '', credits: '3', description: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');

  const adminCollegeId = !isSuperAdmin ? user?.college_id : null;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      // Regular admins: fetch programs for their college, then subjects for those programs only
      const p = await fetchPrograms(adminCollegeId || undefined);
      setPrograms(p);

      if (!isSuperAdmin && adminCollegeId) {
        // Fetch subjects only for the admin's college's programs
        const programIds = new Set(p.map(prog => prog.id));
        const allSubjects = await fetchSubjects();
        setItems(allSubjects.filter(s => programIds.has(s.program_id)));
      } else {
        setItems(await fetchSubjects());
      }
    } catch { /* empty */ }
    setLoading(false);
  }, [adminCollegeId, isSuperAdmin]);

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
    catch (err) { setError(err.message); }
  };

  const programMap = Object.fromEntries(programs.map(p => [p.id, p]));
  const filtered = items.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex justify-center py-12"><Spinner /></div>;

  // Admin has no college yet — show prompt
  if (!isSuperAdmin && !adminCollegeId) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted text-lg mb-2">No college set up yet</p>
        <p className="text-muted text-sm">Go to the <strong>Colleges</strong> tab and create your college first before adding subjects.</p>
      </div>
    );
  }



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
                    {isSuperAdmin && <Button variant="ghost" size="sm" className="text-error" onClick={() => handleDelete(s.id, s.code)}>Delete</Button>}
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
  const [allNotes, setAllNotes] = useState([]);
  const [pendingNotes, setPendingNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('pending'); // pending | published | all

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [n, p, s] = await Promise.all([fetchNotes(), fetchPendingNotes(), fetchSubjects()]);
      setAllNotes(n);
      setPendingNotes(p);
      setSubjects(s);
    } catch { /* empty */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const [actionError, setActionError] = useState('');

  const handlePublish = async (id, title) => {
    if (!confirm(`Publish note "${title}"? It will become visible to everyone.`)) return;
    setActionError('');
    try { await publishNote(id); load(); }
    catch (err) { setActionError(err.message); }
  };

  const handleReject = async (id, title) => {
    if (!confirm(`Reject note "${title}"?`)) return;
    setActionError('');
    try { await rejectNote(id); load(); }
    catch (err) { setActionError(err.message); }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete note "${title}"? This will also remove the file from storage.`)) return;
    setActionError('');
    try { await deleteNote(id); load(); }
    catch (err) { setActionError(err.message); }
  };

  const subjectMap = Object.fromEntries(subjects.map(s => [s.id, s]));

  const displayNotes = filter === 'pending'
    ? pendingNotes
    : filter === 'published'
      ? allNotes
      : [...pendingNotes, ...allNotes];

  const filtered = displayNotes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  const statusVariant = (s) => {
    if (s === 'ready') return 'success';
    if (s === 'pending') return 'warning';
    return 'error';
  };

  const filterTabs = [
    { id: 'pending', label: `Pending (${pendingNotes.length})` },
    { id: 'published', label: `Published (${allNotes.length})` },
    { id: 'all', label: 'All' },
  ];

  if (loading) return <div className="flex justify-center py-12"><Spinner /></div>;

  return (
    <div>
      {actionError && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {actionError}
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <SearchInput
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
          className="max-w-xs"
        />
        <Tabs tabs={filterTabs} activeTab={filter} onChange={setFilter} variant="pills" />
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
                    <Badge variant={statusVariant(n.status)}>
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
                          <Button variant="ghost" size="sm">View</Button>
                        </a>
                      )}
                      {n.status === 'pending' && (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handlePublish(n.id, n.title)}
                          >
                            Publish
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-error"
                            onClick={() => handleReject(n.id, n.title)}
                          >
                            Reject
                          </Button>
                        </>
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
                    {filter === 'pending' ? 'No pending notes to review' : 'No notes found'}
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


// ─── AI Models Tab (Super Admin Only) ───────────────────────────────────────

function ModelsTab() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ platform: 'groq', model_id: '', display_name: '', api_key: '', priority: '0' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try { setModels(await fetchLLMModels()); } catch { /* empty */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await createLLMModel({
        ...form,
        priority: parseInt(form.priority) || 0,
      });
      setShowModal(false);
      setForm({ platform: 'groq', model_id: '', display_name: '', api_key: '', priority: '0' });
      load();
    } catch (err) { setError(err.message); }
    setSubmitting(false);
  };

  const handleToggle = async (id) => {
    try { await toggleLLMModel(id); load(); }
    catch (err) { alert(err.message); }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete model "${name}"?`)) return;
    try { await deleteLLMModel(id); load(); }
    catch (err) { alert(err.message); }
  };

  if (loading) return <div className="flex justify-center py-12"><Spinner /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted">{models.length} model(s) configured</p>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Model
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted">Name</th>
                <th className="text-left p-4 font-medium text-muted">Platform</th>
                <th className="text-left p-4 font-medium text-muted">Model ID</th>
                <th className="text-left p-4 font-medium text-muted">Priority</th>
                <th className="text-left p-4 font-medium text-muted">Status</th>
                <th className="text-left p-4 font-medium text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.id} className="border-b border-border hover:bg-hover">
                  <td className="p-4 font-medium text-foreground">{m.display_name}</td>
                  <td className="p-4">
                    <Badge variant={m.platform === 'groq' ? 'success' : 'neutral'}>
                      {m.platform}
                    </Badge>
                  </td>
                  <td className="p-4 font-mono text-sm text-muted">{m.model_id}</td>
                  <td className="p-4 text-muted">{m.priority}</td>
                  <td className="p-4">
                    <Badge variant={m.is_enabled ? 'success' : 'error'}>
                      {m.is_enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button
                        variant={m.is_enabled ? 'ghost' : 'primary'}
                        size="sm"
                        onClick={() => handleToggle(m.id)}
                      >
                        {m.is_enabled ? 'Disable' : 'Enable'}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-error" onClick={() => handleDelete(m.id, m.display_name)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {models.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted">
                    No AI models configured. Add one to enable chat features.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add AI Model">
        <form onSubmit={handleCreate} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
          <Select
            label="Platform"
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value })}
            options={[
              { value: 'groq', label: 'Groq' },
              { value: 'openrouter', label: 'OpenRouter' },
            ]}
            required
          />
          <Input label="Model ID" value={form.model_id} onChange={(e) => setForm({ ...form, model_id: e.target.value })} placeholder="e.g. llama-3.1-8b-instant" required />
          <Input label="Display Name" value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })} placeholder="e.g. Llama 3.1 8B (Groq)" required />
          <Input label="API Key" type="password" value={form.api_key} onChange={(e) => setForm({ ...form, api_key: e.target.value })} placeholder="sk-..." required />
          <Input label="Priority" type="number" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} placeholder="0 = highest" />
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary" className="flex-1" loading={submitting}>Add Model</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


// ─── Students Tab (Admin Only) ───────────────────────────────────────────────

function StudentsTab({ user }) {
  const [students, setStudents] = useState([]);
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', year: '', semester: '' });
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const [s, colleges] = await Promise.all([fetchStudents(), fetchColleges()]);
      setStudents(s);
      // Find the admin's own college by college_id
      if (user?.college_id) {
        setCollege(colleges.find(c => c.id === user.college_id) || null);
      }
    } catch { /* empty */ }
    setLoading(false);
  }, [user?.college_id]);

  useEffect(() => { reload(); }, [reload]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await createStudent({
        name: form.name,
        email: form.email,
        password: form.password,
        year: form.year ? parseInt(form.year) : undefined,
        semester: form.semester ? parseInt(form.semester) : undefined,
      });
      setShowModal(false);
      setForm({ name: '', email: '', password: '', year: '', semester: '' });
      reload();
    } catch (err) { setError(err.message); }
    setSubmitting(false);
  };

  const handleToggle = async (userId) => {
    setActionError('');
    try { await toggleStudentActive(userId); reload(); }
    catch (err) { setActionError(err.message); }
  };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex justify-center py-12"><Spinner /></div>;

  return (
    <div>
      {actionError && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {actionError}
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <SearchInput placeholder="Search students..." value={search} onChange={(e) => setSearch(e.target.value)} onClear={() => setSearch('')} className="max-w-xs" />
        <Button variant="primary" onClick={() => { setError(''); setShowModal(true); }}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Student
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted">Name</th>
                <th className="text-left p-4 font-medium text-muted">Email</th>
                <th className="text-left p-4 font-medium text-muted">College</th>
                <th className="text-left p-4 font-medium text-muted">Year / Sem</th>
                <th className="text-left p-4 font-medium text-muted">Status</th>
                <th className="text-left p-4 font-medium text-muted">Joined</th>
                <th className="text-left p-4 font-medium text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-border hover:bg-hover">
                  <td className="p-4 font-medium text-foreground">{s.name}</td>
                  <td className="p-4 text-muted">{s.email}</td>
                  <td className="p-4 text-muted">{college?.short_name || '—'}</td>
                  <td className="p-4 text-muted text-sm">
                    {s.year ? `Year ${s.year}` : '—'}{s.semester ? ` / Sem ${s.semester}` : ''}
                  </td>
                  <td className="p-4">
                    <Badge variant={s.is_active ? 'success' : 'error'}>
                      {s.is_active ? 'Active' : 'Disabled'}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted text-sm">
                    {new Date(s.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <Button
                      variant={s.is_active ? 'ghost' : 'primary'}
                      size="sm"
                      onClick={() => handleToggle(s.id)}
                    >
                      {s.is_active ? 'Disable' : 'Enable'}
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted">
                    No students yet. Use &ldquo;Add Student&rdquo; to create your first student account.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Student">
        <form onSubmit={handleCreate} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
          <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted">Associated College</label>
            <div className="px-3 py-2 rounded-lg border border-border bg-surface text-foreground text-sm">
              {college ? `${college.icon ? college.icon + ' ' : ''}${college.name}` : 'Your college'}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Year" type="number" placeholder="e.g. 1" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
            <Input label="Semester" type="number" placeholder="e.g. 1" value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary" className="flex-1" loading={submitting}>Create Student</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
