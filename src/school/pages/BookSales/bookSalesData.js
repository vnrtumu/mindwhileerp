// ── Book Sales Module — Dummy Data ────────────────────────────────────────────

export const vendors = [
    { id: 1, name: 'Sri Vijaya Book House', type: 'Wholesaler', phone: '9876543210', address: 'MG Road, Hyderabad', payment: 'Bank Transfer', booksSupplied: 1200, amount: 480000, status: 'Active' },
    { id: 2, name: 'National Book Depot', type: 'Publisher', phone: '9123456780', address: 'Banjara Hills, Hyderabad', payment: 'Cheque', booksSupplied: 850, amount: 320000, status: 'Active' },
    { id: 3, name: 'Rainbow Publishers', type: 'Distributor', phone: '9988776655', address: 'Secunderabad', payment: 'Cash', booksSupplied: 500, amount: 185000, status: 'Active' },
    { id: 4, name: 'Learners Book Center', type: 'Retailer', phone: '9845123456', address: 'Ameerpet, Hyderabad', payment: 'UPI', booksSupplied: 320, amount: 125000, status: 'Inactive' },
    { id: 5, name: 'Saraswati Publications', type: 'Publisher', phone: '9701234567', address: 'Jubilee Hills, Hyderabad', payment: 'Bank Transfer', booksSupplied: 960, amount: 415000, status: 'Active' },
    { id: 6, name: 'Global Book Suppliers', type: 'Wholesaler', phone: '9632587410', address: 'Gachibowli, Hyderabad', payment: 'Cheque', booksSupplied: 740, amount: 292000, status: 'Active' },
];

export const inventory = [
    { id: 1, name: 'Mathematics Class 10', type: 'Set', qty: 200, sets: 180, singles: 20, costPrice: 450, sellingPrice: 550, stock: 120, vendor: 'Sri Vijaya Book House' },
    { id: 2, name: 'Science Class 9', type: 'Set', qty: 150, sets: 130, singles: 20, costPrice: 400, sellingPrice: 490, stock: 18, vendor: 'National Book Depot' },
    { id: 3, name: 'English Grammar', type: 'Single', qty: 300, sets: 0, singles: 300, costPrice: 120, sellingPrice: 160, stock: 75, vendor: 'Rainbow Publishers' },
    { id: 4, name: 'Hindi Vyakaran', type: 'Single', qty: 250, sets: 0, singles: 250, costPrice: 110, sellingPrice: 150, stock: 0, vendor: 'Saraswati Publications' },
    { id: 5, name: 'Social Studies Class 8', 'type': 'Set', qty: 180, sets: 160, singles: 20, costPrice: 380, sellingPrice: 470, stock: 55, vendor: 'National Book Depot' },
    { id: 6, name: 'Computer Science', type: 'Single', qty: 140, sets: 0, singles: 140, costPrice: 220, sellingPrice: 290, stock: 42, vendor: 'Global Book Suppliers' },
    { id: 7, name: 'Physics Class 11', type: 'Set', qty: 100, sets: 90, singles: 10, costPrice: 520, sellingPrice: 640, stock: 8, vendor: 'Learners Book Center' },
    { id: 8, name: 'Chemistry Class 12', type: 'Set', qty: 95, sets: 85, singles: 10, costPrice: 510, sellingPrice: 630, stock: 30, vendor: 'Sri Vijaya Book House' },
];

export const sales = [
    { id: 1, student: 'Aarav Sharma', class: 'Class 10', book: 'Mathematics Class 10', qty: 1, type: 'Set', price: 550, payment: 'Cash', date: '2026-02-20' },
    { id: 2, student: 'Priya Reddy', class: 'Class 9', book: 'Science Class 9', qty: 1, type: 'Set', price: 490, payment: 'UPI', date: '2026-02-21' },
    { id: 3, student: 'Rohit Kumar', class: 'Class 8', book: 'Social Studies Class 8', qty: 1, type: 'Set', price: 470, payment: 'Cash', date: '2026-02-21' },
    { id: 4, student: 'Sneha Patel', class: 'Class 6', book: 'English Grammar', qty: 2, type: 'Single', price: 160, payment: 'Cheque', date: '2026-02-22' },
    { id: 5, student: 'Arjun Verma', class: 'Class 11', book: 'Physics Class 11', qty: 1, type: 'Set', price: 640, payment: 'Cash', date: '2026-02-22' },
    { id: 6, student: 'Kavya Menon', class: 'Class 12', book: 'Chemistry Class 12', qty: 1, type: 'Set', price: 630, payment: 'UPI', date: '2026-02-23' },
    { id: 7, student: 'Vivek Singh', class: 'Class 7', book: 'Hindi Vyakaran', qty: 1, type: 'Single', price: 150, payment: 'Cash', date: '2026-02-23' },
    { id: 8, student: 'Ananya Das', class: 'Class 9', book: 'Computer Science', qty: 1, type: 'Single', price: 290, payment: 'Card', date: '2026-02-24' },
    { id: 9, student: 'Ravi Teja', class: 'Class 10', book: 'Mathematics Class 10', qty: 1, type: 'Set', price: 550, payment: 'UPI', date: '2026-02-24' },
    { id: 10, student: 'Lakshmi Priya', class: 'Class 8', book: 'English Grammar', qty: 1, type: 'Single', price: 160, payment: 'Cash', date: '2026-02-25' },
];

export const returns = [
    { id: 1, student: 'Priya Reddy', book: 'Science Class 9', qty: 1, reason: 'Damaged pages', date: '2026-02-22', status: 'Approved' },
    { id: 2, student: 'Rohit Kumar', book: 'Social Studies Class 8', qty: 1, reason: 'Wrong edition', date: '2026-02-23', status: 'Pending' },
    { id: 3, student: 'Sneha Patel', book: 'English Grammar', qty: 1, reason: 'Duplicate', date: '2026-02-23', status: 'Approved' },
    { id: 4, student: 'Arjun Verma', book: 'Physics Class 11', qty: 1, reason: 'Not needed', date: '2026-02-24', status: 'Rejected' },
    { id: 5, student: 'Kavya Menon', book: 'Hindi Vyakaran', qty: 1, reason: 'Wrong class', date: '2026-02-24', status: 'Pending' },
];

export const monthlySalesData = [
    { month: 'Apr', sales: 18000, revenue: 22000 },
    { month: 'May', sales: 24000, revenue: 29000 },
    { month: 'Jun', sales: 48000, revenue: 58000 },
    { month: 'Jul', sales: 42000, revenue: 51000 },
    { month: 'Aug', sales: 55000, revenue: 66000 },
    { month: 'Sep', sales: 31000, revenue: 38000 },
    { month: 'Oct', sales: 20000, revenue: 25000 },
    { month: 'Nov', sales: 27000, revenue: 33000 },
    { month: 'Dec', sales: 43000, revenue: 52000 },
    { month: 'Jan', sales: 33000, revenue: 40000 },
    { month: 'Feb', sales: 45000, revenue: 54000 },
    { month: 'Mar', sales: 60000, revenue: 72000 },
];

export const stockVsSoldData = [
    { book: 'Math 10', stock: 120, sold: 80 },
    { book: 'Science 9', stock: 18, sold: 132 },
    { book: 'English Gr', stock: 75, sold: 225 },
    { book: 'Hindi Vya', stock: 0, sold: 250 },
    { book: 'SST 8', stock: 55, sold: 125 },
    { book: 'CS', stock: 42, sold: 98 },
];

export const vendorWiseData = [
    { vendor: 'Sri Vijaya', sales: 185000, books: 420 },
    { vendor: 'National', sales: 142000, books: 310 },
    { vendor: 'Rainbow', sales: 98000, books: 220 },
    { vendor: 'Saraswati', sales: 175000, books: 390 },
    { vendor: 'Global', sales: 120000, books: 265 },
];

export const paymentMethodData = [
    { name: 'Cash', value: 42, color: '#28c76f' },
    { name: 'UPI', value: 31, color: '#3d5ee1' },
    { name: 'Cheque', value: 15, color: '#ff9f43' },
    { name: 'Card', value: 12, color: '#00cfe8' },
];
