import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconChevronLeft, IconSearch, IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import '../Accounts/Accounts.css';

const ManageBooks = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        author: '',
        subjectCode: '',
        price: '',
        quantity: '',
        rackNo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Book Added:', formData);
        setShowAddModal(false);
    };

    const [books, setBooks] = useState([
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', isbn: '978-0743273565', rackNo: 'A1', quantity: 5, available: 3 },
        { id: 2, title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', isbn: '978-0553380163', rackNo: 'B2', quantity: 2, available: 1 },
        { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Classic', isbn: '978-0061120084', rackNo: 'A3', quantity: 4, available: 4 },
    ]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            setBooks(prev => prev.filter(book => book.id !== id));
        }
    };

    const handleEdit = (book) => {
        setFormData({
            name: book.title,
            author: book.author,
            subjectCode: book.isbn,
            price: '0.00', // Default placeholder as it's not in the books object
            quantity: book.quantity.toString(),
            rackNo: book.rackNo
        });
        setShowAddModal(true);
    };

    return (
        <div className="accounts-page">
            <div className="page-header">
                <div className="page-title">
                    <div className="d-flex align-items-center gap-2">
                        <button className="action-btn" onClick={() => navigate(-1)}>
                            <IconChevronLeft size={20} />
                        </button>
                        <h4>Manage Books</h4>
                    </div>
                    <nav className="breadcrumb">
                        <span>Dashboard</span> / <span>Library</span> / <span className="current">Books</span>
                    </nav>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    <IconPlus size={18} />
                    Add New Book
                </button>
            </div>

            <div className="accounts-card">
                <div className="card-header">
                    <h5>Book Inventory</h5>
                </div>
                <div className="card-body">
                    <div className="filters-row">
                        <div className="search-box">
                            <IconSearch size={18} />
                            <input
                                type="text"
                                placeholder="Search by book title, author or ISBN..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Category</th>
                                    <th>ISBN</th>
                                    <th>Rack No</th>
                                    <th>Qty</th>
                                    <th>Available</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map(book => (
                                    <tr key={book.id}>
                                        <td style={{ fontWeight: '500' }}>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.category}</td>
                                        <td>{book.isbn}</td>
                                        <td>{book.rackNo}</td>
                                        <td>{book.quantity}</td>
                                        <td>{book.available}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="action-btn edit" title="Edit" onClick={() => handleEdit(book)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <IconEdit size={18} />
                                                </button>
                                                <button className="action-btn delete" title="Delete" onClick={() => handleDelete(book.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <IconTrash size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Book Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content add-income-modal">
                        <div className="modal-header">
                            <h3>Add Book</h3>
                            <button type="button" className="close-btn" onClick={() => setShowAddModal(false)}>
                                <IconPlus size={20} style={{ transform: 'rotate(45deg)' }} />
                            </button>
                        </div>
                        <form className="modal-body" onSubmit={handleSubmit} style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                            <div className="form-group full-width">
                                <label>Name <span style={{ color: '#ea5455' }}>*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter book name"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Author <span style={{ color: '#ea5455' }}>*</span></label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter author name"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Subject code <span style={{ color: '#ea5455' }}>*</span></label>
                                <input
                                    type="text"
                                    name="subjectCode"
                                    value={formData.subjectCode}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter subject code"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Price <span style={{ color: '#ea5455' }}>*</span></label>
                                <input
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter price"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Quantity <span style={{ color: '#ea5455' }}>*</span></label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter quantity"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Rack no <span style={{ color: '#ea5455' }}>*</span></label>
                                <input
                                    type="text"
                                    name="rackNo"
                                    value={formData.rackNo}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter rack number"
                                />
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button type="submit" className="btn-submit">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBooks;
