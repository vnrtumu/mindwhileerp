import React, { useContext, useState } from 'react';
import { AcademicsContext } from '../../context/AcademicsContext';
import { Plus, Trash2, Edit2, Book } from 'react-feather';

const Classes = () => {
    const { classes, addClass, deleteClass } = useContext(AcademicsContext);
    const [showModal, setShowModal] = useState(false);
    const [newClass, setNewClass] = useState({ name: '', numeric: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newClass.name && newClass.numeric) {
            addClass(newClass);
            setShowModal(false);
            setNewClass({ name: '', numeric: '' });
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Classes</h1>
                    <p className="text-gray-500 mt-1">Manage academic classes</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                    <Plus size={20} />
                    Add Class
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {classes.map((cls) => (
                    <div key={cls.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <button className="text-gray-400 hover:text-blue-600 transition-colors">
                                <Edit2 size={16} />
                            </button>
                            <button onClick={() => deleteClass(cls.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Book size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">{cls.name}</h3>
                                <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-0.5 rounded">ID: {cls.id}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500 mt-2 pt-4 border-t border-gray-50">
                            <span>Numeric Value</span>
                            <span className="font-semibold text-gray-700">{cls.numeric}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Simple Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl transform transition-all">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Add New Class</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
                                <input
                                    type="text"
                                    value={newClass.name}
                                    onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                                    placeholder="e.g. Class 1"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numeric Value</label>
                                <input
                                    type="number"
                                    value={newClass.numeric}
                                    onChange={(e) => setNewClass({ ...newClass, numeric: e.target.value })}
                                    placeholder="e.g. 1"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                                    required
                                />
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
                                    Save Class
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Classes;
