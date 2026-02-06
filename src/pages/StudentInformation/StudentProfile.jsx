import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Printer, Mail, Phone, MapPin, Award, Calendar, Book, CreditCard, User } from 'react-feather';
import { StudentContext } from '../../context/StudentContext';

const StudentProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { students } = useContext(StudentContext);
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const foundStudent = students.find(s => s.id === id);
        if (foundStudent) {
            setStudent(foundStudent);
        } else {
            // Handle not found (could redirect or show error)
            // For now just stay loading or show message
        }
    }, [id, students]);

    if (!student) {
        return <div className="p-10 text-center text-gray-500">Loading Student Profile...</div>;
    }

    const DetailRow = ({ label, value, icon: Icon }) => (
        <div className="flex items-start py-3 border-b border-gray-50 last:border-0 hover:bg-blue-50/30 transition-colors px-2 rounded-lg">
            {Icon && <Icon size={16} className="text-blue-300 mt-0.5 mr-3 shrink-0" />}
            <div className="w-1/3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</div>
            <div className="w-2/3 text-sm font-medium text-gray-700 break-words">{value || '-'}</div>
        </div>
    );

    const SectionCard = ({ title, icon: Icon, children }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 hover:shadow-md transition-all duration-300">
            <div className="bg-blue-50/50 px-6 py-4 border-b border-blue-100 flex items-center gap-2">
                {Icon && <Icon size={18} className="text-blue-500" />}
                <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">{title}</h3>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-8 py-5 sticky top-0 z-10 bg-opacity-90 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/student-info/student-list')}
                            className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-blue-600"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">Student Profile</h1>
                            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mt-0.5">
                                <span>Student List</span>
                                <span>•</span>
                                <span className="text-blue-500">Profile Details</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-blue-100 text-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium transition-colors">
                            <Printer size={16} />
                            Print
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium transition-colors">
                            <Edit size={16} />
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column: Overview Card */}
                    <div className="w-full lg:w-1/3 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8 flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
                            <div className="w-32 h-32 rounded-full p-1 bg-white border border-blue-100 shadow-sm relative z-10 mb-4">
                                <img
                                    src={student.image || `https://ui-avatars.com/api/?name=${student.name}&background=fff&color=007bff`}
                                    alt={student.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">{student.name}</h2>
                            <p className="text-blue-500 font-medium text-sm mb-6 bg-blue-50 px-3 py-1 rounded-full">{student.id}</p>

                            <div className="grid grid-cols-2 gap-4 w-full border-t border-gray-50 pt-6">
                                <div>
                                    <span className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Class</span>
                                    <span className="block text-lg font-bold text-gray-700">{student.class}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Section</span>
                                    <span className="block text-lg font-bold text-gray-700">{student.section}</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Contact */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                                <Phone size={16} className="text-blue-400" />
                                Contact Info
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                                        <Phone size={14} />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-gray-400">Phone</span>
                                        <span className="font-medium text-gray-700">{student.phone || 'N/A'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                                        <Mail size={14} />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-gray-400">Email</span>
                                        <span className="font-medium text-gray-700">{student.email || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Detailed Tabs/Sections */}
                    <div className="w-full lg:w-2/3">

                        <SectionCard title="Admission Details" icon={Award}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                                <DetailRow label="Admission No" value={student.admissionNo} />
                                <DetailRow label="Admission Date" value={student.admissionDate} />
                                <DetailRow label="Joined Class" value={student.joinedClass} />
                                <DetailRow label="Roll Number" value={student.rollNo} />
                                <DetailRow label="Category" value={student.category || 'General'} />
                                <DetailRow label="Medium" value={student.medium} />
                            </div>
                        </SectionCard>

                        <SectionCard title="Personal Details" icon={User}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                                <DetailRow label="Date of Birth" value={student.dob} />
                                <DetailRow label="Gender" value={student.gender} />
                                <DetailRow label="Blood Group" value={student.bloodGroup} />
                                <DetailRow label="Mother Tongue" value={student.motherTongue} />
                                <DetailRow label="Religion" value={student.religion} />
                                <DetailRow label="Caste" value={student.caste} />
                                <DetailRow label="Father Name" value={student.fatherName} />
                                <DetailRow label="Mother Name" value={student.motherName} />
                            </div>
                        </SectionCard>

                        <SectionCard title="Address & Bank" icon={MapPin}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                                <div className="md:col-span-2">
                                    <DetailRow label="Current Address" value={student.address} />
                                </div>
                                <DetailRow label="City/Village" value={student.village} />
                                <DetailRow label="State" value={student.state} />
                                <DetailRow label="Bank Account" value={student.accountNo} icon={CreditCard} />
                                <DetailRow label="Bank Name" value={student.bankName} />
                                <DetailRow label="IFSC Code" value={student.ifscCode} />
                            </div>
                        </SectionCard>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentProfile;
