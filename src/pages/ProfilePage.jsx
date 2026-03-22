import { useState } from 'react';
import { Card, Button, Input, Avatar } from '../components/common';
import { useAuth } from '../contexts/AuthContext';

export function ProfilePage() {
  const { user, updateUser } = useAuth();

  // ── Name section ──────────────────────────────────────────────
  const [name, setName] = useState(user?.name || '');
  const [nameLoading, setNameLoading] = useState(false);
  const [nameSuccess, setNameSuccess] = useState('');
  const [nameError, setNameError] = useState('');

  const handleNameSave = async () => {
    if (!name.trim()) { setNameError('Name cannot be empty'); return; }
    if (name.trim() === user?.name) { setNameError('No changes to save'); return; }
    setNameLoading(true);
    setNameError('');
    setNameSuccess('');
    try {
      await updateUser({ name: name.trim() });
      setNameSuccess('Name updated successfully!');
      setTimeout(() => setNameSuccess(''), 3000);
    } catch (err) {
      setNameError(err.message || 'Failed to update name');
    } finally {
      setNameLoading(false);
    }
  };

  // ── Password section ──────────────────────────────────────────
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState('');
  const [pwErrors, setPwErrors] = useState({});

  const handlePwChange = (e) => {
    const { name: field, value } = e.target;
    setPwForm(prev => ({ ...prev, [field]: value }));
    if (pwErrors[field]) setPwErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handlePasswordSave = async () => {
    const errs = {};
    if (!pwForm.current) errs.current = 'Required';
    if (!pwForm.next) errs.next = 'Required';
    else if (pwForm.next.length < 8) errs.next = 'At least 8 characters';
    if (!pwForm.confirm) errs.confirm = 'Required';
    else if (pwForm.next !== pwForm.confirm) errs.confirm = 'Passwords do not match';
    if (Object.keys(errs).length) { setPwErrors(errs); return; }

    setPwLoading(true);
    setPwErrors({});
    setPwSuccess('');
    try {
      await updateUser({ current_password: pwForm.current, new_password: pwForm.next });
      setPwSuccess('Password changed successfully!');
      setPwForm({ current: '', next: '', confirm: '' });
      setTimeout(() => setPwSuccess(''), 4000);
    } catch (err) {
      // Server tells us which field is wrong
      const msg = err.message || 'Failed to update password';
      if (msg.toLowerCase().includes('current')) {
        setPwErrors({ current: 'Current password is incorrect' });
      } else {
        setPwErrors({ general: msg });
      }
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Avatar name={user?.name || 'User'} size="xl" />
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted text-sm">{user?.email}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* ── Update Name ─────────────────────────────────── */}
        <Card className="p-6">
          <h2 className="text-lg font-display font-semibold text-foreground mb-5 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Display Name
          </h2>

          <div className="space-y-4">
            <Input
              label="Full Name"
              required
              value={name}
              onChange={(e) => { setName(e.target.value); setNameError(''); setNameSuccess(''); }}
              placeholder="Your display name"
              error={nameError}
            />

            {nameSuccess && (
              <div className="flex items-center gap-2 text-sm text-success">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {nameSuccess}
              </div>
            )}

            <div className="flex justify-end">
              <Button variant="primary" onClick={handleNameSave} disabled={nameLoading}>
                {nameLoading ? (
                  <>
                    <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </>
                ) : 'Save Name'}
              </Button>
            </div>
          </div>
        </Card>

        {/* ── Change Password ──────────────────────────────── */}
        <Card className="p-6">
          <h2 className="text-lg font-display font-semibold text-foreground mb-5 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Change Password
          </h2>

          <div className="space-y-4">
            {pwErrors.general && (
              <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-sm text-error">
                {pwErrors.general}
              </div>
            )}

            <Input
              label="Current Password"
              type="password"
              name="current"
              required
              value={pwForm.current}
              onChange={handlePwChange}
              placeholder="Enter your current password"
              error={pwErrors.current}
            />
            <Input
              label="New Password"
              type="password"
              name="next"
              required
              value={pwForm.next}
              onChange={handlePwChange}
              placeholder="At least 8 characters"
              error={pwErrors.next}
            />
            <Input
              label="Confirm New Password"
              type="password"
              name="confirm"
              required
              value={pwForm.confirm}
              onChange={handlePwChange}
              placeholder="Repeat new password"
              error={pwErrors.confirm}
            />

            {pwSuccess && (
              <div className="flex items-center gap-2 text-sm text-success">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {pwSuccess}
              </div>
            )}

            <div className="flex justify-end">
              <Button variant="primary" onClick={handlePasswordSave} disabled={pwLoading}>
                {pwLoading ? (
                  <>
                    <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Updating...
                  </>
                ) : 'Update Password'}
              </Button>
            </div>
          </div>
        </Card>

        {/* ── Account Info (read-only) ─────────────────────── */}
        <Card className="p-6">
          <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Account Info
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted">Email</span>
              <span className="text-foreground font-medium">{user?.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted">Role</span>
              <span className="text-foreground font-medium capitalize">{user?.role}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted">Member since</span>
              <span className="text-foreground font-medium">
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  : '—'}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
