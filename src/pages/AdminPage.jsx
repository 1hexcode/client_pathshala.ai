import { useState } from 'react';
import { Card, Button, Tabs, Badge, SearchInput, Modal } from '../components/common';
import { AdminForm, AdminStats } from '../components/admin';
import { colleges, programs, subjects } from '../data/academics';
import { notes } from '../data/notes';
import { users } from '../data/users';

export function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'colleges', label: 'Colleges', badge: colleges.length },
    { id: 'programs', label: 'Programs', badge: programs.length },
    { id: 'subjects', label: 'Subjects', badge: subjects.length },
    { id: 'notes', label: 'Notes', badge: notes.length },
    { id: 'users', label: 'Users', badge: users.length },
  ];

  const handleAdd = (type) => {
    setAddType(type);
    setShowAddModal(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminStats />;
      
      case 'colleges':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <SearchInput
                placeholder="Search colleges..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="max-w-xs"
              />
              <Button variant="primary" onClick={() => handleAdd('college')}>
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
                      <th className="text-left p-4 font-medium text-muted">Programs</th>
                      <th className="text-left p-4 font-medium text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {colleges
                      .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((college) => (
                        <tr key={college.id} className="border-b border-border hover:bg-hover">
                          <td className="p-4 font-medium text-foreground">{college.name}</td>
                          <td className="p-4 text-muted">{college.shortName}</td>
                          <td className="p-4">
                            <Badge variant="neutral">
                              {programs.filter(p => p.collegeId === college.id).length} programs
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-error">Delete</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        );
      
      case 'programs':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <SearchInput
                placeholder="Search programs..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="max-w-xs"
              />
              <Button variant="primary" onClick={() => handleAdd('program')}>
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
                      <th className="text-left p-4 font-medium text-muted">Subjects</th>
                      <th className="text-left p-4 font-medium text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs
                      .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((program) => {
                        const college = colleges.find(c => c.id === program.collegeId);
                        return (
                          <tr key={program.id} className="border-b border-border hover:bg-hover">
                            <td className="p-4 font-medium text-foreground">{program.name}</td>
                            <td className="p-4 text-muted">{program.shortName}</td>
                            <td className="p-4 text-muted">{college?.shortName}</td>
                            <td className="p-4">
                              <Badge variant="neutral">
                                {subjects.filter(s => s.programId === program.id).length} subjects
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">Edit</Button>
                                <Button variant="ghost" size="sm" className="text-error">Delete</Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        );
      
      case 'subjects':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <SearchInput
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="max-w-xs"
              />
              <Button variant="primary" onClick={() => handleAdd('subject')}>
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
                      <th className="text-left p-4 font-medium text-muted">Credits</th>
                      <th className="text-left p-4 font-medium text-muted">Notes</th>
                      <th className="text-left p-4 font-medium text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects
                      .filter(s => 
                        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        s.code.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((subject) => {
                        const program = programs.find(p => p.id === subject.programId);
                        return (
                          <tr key={subject.id} className="border-b border-border hover:bg-hover">
                            <td className="p-4 font-mono text-sm text-primary">{subject.code}</td>
                            <td className="p-4 font-medium text-foreground">{subject.name}</td>
                            <td className="p-4 text-muted">{program?.shortName}</td>
                            <td className="p-4 text-muted">{subject.credits}</td>
                            <td className="p-4">
                              <Badge variant="neutral">
                                {notes.filter(n => n.subjectId === subject.id).length} notes
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">Edit</Button>
                                <Button variant="ghost" size="sm" className="text-error">Delete</Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        );
      
      case 'notes':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <SearchInput
                placeholder="Search notes..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="max-w-xs"
              />
            </div>
            
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-medium text-muted">Title</th>
                      <th className="text-left p-4 font-medium text-muted">Subject</th>
                      <th className="text-left p-4 font-medium text-muted">Status</th>
                      <th className="text-left p-4 font-medium text-muted">Downloads</th>
                      <th className="text-left p-4 font-medium text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notes
                      .filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((note) => {
                        const subject = subjects.find(s => s.id === note.subjectId);
                        return (
                          <tr key={note.id} className="border-b border-border hover:bg-hover">
                            <td className="p-4 font-medium text-foreground">{note.title}</td>
                            <td className="p-4 text-muted">{subject?.code}</td>
                            <td className="p-4">
                              <Badge variant={note.status === 'ready' ? 'success' : 'warning'}>
                                {note.status}
                              </Badge>
                            </td>
                            <td className="p-4 text-muted">{note.downloads}</td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">View</Button>
                                <Button variant="ghost" size="sm" className="text-error">Remove</Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        );
      
      case 'users':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <SearchInput
                placeholder="Search users..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="max-w-xs"
              />
            </div>
            
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-medium text-muted">Name</th>
                      <th className="text-left p-4 font-medium text-muted">Email</th>
                      <th className="text-left p-4 font-medium text-muted">Role</th>
                      <th className="text-left p-4 font-medium text-muted">Program</th>
                      <th className="text-left p-4 font-medium text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .filter(u => 
                        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        u.email.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((user) => {
                        const program = programs.find(p => p.id === user.programId);
                        return (
                          <tr key={user.id} className="border-b border-border hover:bg-hover">
                            <td className="p-4 font-medium text-foreground">{user.name}</td>
                            <td className="p-4 text-muted">{user.email}</td>
                            <td className="p-4">
                              <Badge variant={user.role === 'admin' ? 'primary' : 'neutral'}>
                                {user.role}
                              </Badge>
                            </td>
                            <td className="p-4 text-muted">{program?.shortName || '—'}</td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">Edit</Button>
                                <Button variant="ghost" size="sm" className="text-error">Suspend</Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Admin Panel</h1>
        <p className="text-muted">Manage colleges, programs, subjects, and users</p>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pills"
        className="mb-6"
      />

      {/* Content */}
      {renderContent()}

      {/* Add Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={`Add ${addType?.charAt(0).toUpperCase()}${addType?.slice(1)}`}
      >
        <AdminForm
          type={addType}
          onSubmit={() => setShowAddModal(false)}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  );
}
