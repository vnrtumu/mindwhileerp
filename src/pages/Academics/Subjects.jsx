import React, { useContext, useState } from 'react';
import { AcademicsContext } from '../../context/AcademicsContext';
import { Plus, Trash2, Edit2, BookOpen } from 'react-feather';

const Subjects = () => {
    const { subjects, addSubject, deleteSubject } = useContext(AcademicsContext);
    const [showModal, setShowModal] = useState(false);
    const [newSubject, setNewSubject] = useState({ name: '', code: '', type: 'Theory' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newSubject.name && newSubject.code) {
            addSubject(newSubject);
            setShowModal(false);
            setNewSubject({ name: '', code: '', type: 'Theory' });
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Subjects</h1>
                    <p className="text-gray-500 mt-1">Manage academic subjects</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                    <Plus size={20} />
                    Add Subject
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((sub) => (
                    <div key={sub.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <button className="text-gray-400 hover:text-blue-600 transition-colors">
                                <Edit2 size={16} />
                            </button>
                            <button onClick={() => deleteSubject(sub.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <div className="flex items-start gap-4 mb-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${sub.type === 'Theory' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'}`}>
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg leading-tight">{sub.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{sub.code}</span>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${sub.type === 'Theory' ? 'text-purple-600 bg-purple-50' : 'text-orange-600 bg-orange-50'}`}>
                                        {sub.type}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Simple Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl transform transition-all">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Add New Subject</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
                                <input
                                    type="text"
                                    value={newSubject.name}
                                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                                    placeholder="e.g. Mathematics"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Code</label>
                                <input
                                    type="text"
                                    value={newSubject.code}
                                    onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                                    placeholder="e.g. MATH101"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                <select
                                    value={newSubject.type}
                                    onChange={(e) => setNewSubject({ ...newSubject, type: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                                >
                                    <option value="Theory">Theory</option>
                                    <option value="Practical">Practical</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                >
                                    Save Subject
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Subjects;
