import React, { useContext, useMemo, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StudentContext } from '../../context/StudentContext';
import './StudentCategories.css';
import HeaderActionButton from './components/HeaderActionButton';
import BackButton from './components/BackButton';

const StudentCategories = () => {
        const navigate = useNavigate();
        const location = useLocation();
        const { categories, deleteCategory } = useContext(StudentContext);
        const [q, setQ] = useState('');
        const [page, setPage] = useState(1);
        const perPage = 8;
        const [showToast, setShowToast] = useState(false);

        useEffect(() => {
            if (location.state && location.state.created) {
                setShowToast(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                const t = setTimeout(() => setShowToast(false), 3000);
                // clear location state (optional) - cannot directly mutate, but navigation away will clear
                return () => clearTimeout(t);
            }
        }, [location.state]);

        const filtered = useMemo(() => {
            if (!q) return categories;
            const s = q.toLowerCase();
            return categories.filter(c => (c.name || '').toLowerCase().includes(s) || (c.description || '').toLowerCase().includes(s));
        }, [categories, q]);

        const paged = filtered.slice((page-1)*perPage, page*perPage);

        return (
            <div className="student-cats-page animate-fade">
                <div className="page-header">
                    <div>
                        <div className="back-button-wrapper">
                            <BackButton title="Go back to Student Categories" />
                            <div>
                                <h3>Student Categories</h3>
                                <p className="muted">Manage categories used to tag students</p>
                            </div>
                        </div>
                    </div>
                    <div className="page-actions">
                        <input className="search-input" placeholder="Search categories..." value={q} onChange={e => { setQ(e.target.value); setPage(1); }} />
                        <HeaderActionButton to={'/school/dashboard'} label={'Back to Dashboard'} />
                        <button className="btn btn-primary" onClick={() => navigate('/school/add-category')}>Add New Category</button>
                    </div>
                </div>

                <div className="card soft-card">
                    {categories.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📦</div>
                            <h4>No categories found</h4>
                            <p>Create your first category to get started.</p>
                            <div style={{marginTop:12}}>
                                <button className="btn btn-primary" onClick={() => navigate('/school/student-categories')}>Add New Category</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="table-wrap">
                                <table className="records-table">
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paged.map(cat => (
                                            <tr key={cat.id} className="hover-row animate-fade-row">
                                                <td><strong className="cat-name">{cat.name}</strong></td>
                                                <td>
                                                    <div className="action-icons">
                                                        <button className="icon-btn" title="Edit" onClick={() => navigate(`/school/student-categories?edit=${cat.id}`)}>
                                                            ✎
                                                        </button>
                                                        <button className="icon-btn" title="Delete" onClick={() => { if (confirm('Delete this category?')) deleteCategory(cat.id); }}>
                                                            🗑
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="pagination">
                                <div>Showing {(page-1)*perPage+1} - {Math.min(page*perPage, filtered.length)} of {filtered.length}</div>
                                <div className="pages">
                                    <button className="btn small" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}>Prev</button>
                                    <button className="btn small" onClick={() => setPage(p => p+1)} disabled={page*perPage >= filtered.length}>Next</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {showToast && <div className="snackbar success">Category created successfully</div>}
            </div>
        );
};

export default StudentCategories;
