import React, { useState } from 'react';
import { getStudents, saveStudent } from '../../services/storage';
import type { Student } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { UserPlus, Search, Users, Key } from 'lucide-react';

export const StudentManagementPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(getStudents());
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState('');

  const [studentId, setStudentId] = useState(`PUM26${Math.floor(100 + Math.random() * 900)}`);
  const [name, setName] = useState('');
  const [classSection, setClassSection] = useState('8-A');
  const [medium] = useState<'TA' | 'EN' | 'BOTH'>('TA');
  const [pin, setPin] = useState('4821');

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newStd: Student = {
      id: `std-${Date.now()}`,
      student_id: studentId.toUpperCase().trim(),
      name: name.trim(),
      pin: pin.trim(),
      class_section: classSection,
      medium: medium,
      status: 'ACTIVE',
      xp: 0,
      level: 1,
      streak_days: 0,
      last_active_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    };

    saveStudent(newStd);
    setStudents(getStudents());
    setShowAddModal(false);
    setName('');
    setStudentId(`PUM26${Math.floor(100 + Math.random() * 900)}`);
  };

  const handleResetPin = (std: Student) => {
    const newPin = prompt(`Enter new 4-digit PIN for ${std.name} (${std.student_id}):`, '4821');
    if (newPin && newPin.trim()) {
      const updated = { ...std, pin: newPin.trim() };
      saveStudent(updated);
      setStudents(getStudents());
      alert(`PIN for ${std.name} updated to ${newPin.trim()}`);
    }
  };

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.student_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-400" />
            Student Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">PUM School, Echampatti Class 8 Aspirants ({students.length} Total)</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Student</span>
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Search student by name or Student ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No students found"
          description="Add your first student to get started."
          action={{ label: 'Add Student', onClick: () => setShowAddModal(true) }}
          className="bg-slate-900 border border-slate-800 rounded-3xl"
        />
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          {/* Desktop Data Table */}
          <div className="hidden sm:block">
            <div className="p-4 bg-slate-950 font-bold text-xs text-slate-400 uppercase tracking-wider grid grid-cols-12 gap-2 border-b border-slate-800">
              <div className="col-span-2">Student ID</div>
              <div className="col-span-4">Name</div>
              <div className="col-span-2 text-center">Class / Medium</div>
              <div className="col-span-2 text-center">XP & Level</div>
              <div className="col-span-2 text-right pr-2">Actions</div>
            </div>

            <div className="divide-y divide-slate-800 text-xs">
              {filtered.map(std => (
                <div key={std.id} className="p-4 grid grid-cols-12 gap-2 items-center text-slate-200 hover:bg-slate-800/40 transition-colors">
                  <div className="col-span-2 font-mono font-bold text-purple-400">
                    {std.student_id}
                  </div>

                  <div className="col-span-4 font-bold text-white">
                    {std.name}
                    <span className="block text-[10px] font-mono text-slate-500 font-normal">PIN: {std.pin}</span>
                  </div>

                  <div className="col-span-2 text-center font-semibold">
                    8-{std.class_section} ({std.medium})
                  </div>

                  <div className="col-span-2 text-center font-bold text-amber-400">
                    {std.xp} XP (Lvl {std.level})
                  </div>

                  <div className="col-span-2 text-right pr-2">
                    <button
                      onClick={() => handleResetPin(std)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[11px] rounded-lg border border-slate-700 transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <Key className="w-3 h-3" />
                      <span>Reset PIN</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Cards Layout */}
          <div className="sm:hidden divide-y divide-slate-800">
            {filtered.map(std => (
              <div key={std.id} className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-white text-sm">{std.name}</div>
                    <div className="font-mono text-xs font-bold text-purple-400">{std.student_id} • PIN: {std.pin}</div>
                  </div>
                  <Badge variant={std.status} />
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
                  <span>Class 8-{std.class_section} ({std.medium})</span>
                  <span className="font-bold text-amber-400">{std.xp} XP (Lvl {std.level})</span>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => handleResetPin(std)}
                    className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-lg border border-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Reset PIN</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-xl font-bold text-white">Add New Student Account</h3>
            
            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Student ID</label>
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S. Kavitha"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Class Section</label>
                  <select
                    value={classSection}
                    onChange={(e) => setClassSection(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="8-A">8-A</option>
                    <option value="8-B">8-B</option>
                    <option value="8-C">8-C</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Initial PIN</label>
                  <input
                    type="text"
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl cursor-pointer hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl cursor-pointer shadow-md"
                >
                  Create Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
