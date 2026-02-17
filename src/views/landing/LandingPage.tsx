import { useState, useEffect } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Icon } from '@iconify/react';
import '../../css/pages/landing.css';

// ─── Types ───
interface PageSection {
    id: string;
    title: string;
    subtitle: string;
    visible: boolean;
}

interface NavMenuItem {
    id: string;
    title: string;
    url: string;
    visible: boolean;
    isButton: boolean;
}

// ─── Default Data ───
const DEFAULT_SECTIONS: PageSection[] = [
    { id: 'hero', title: 'Hero', subtitle: 'School ERP | Multi School Management System with Apps', visible: true },
    { id: 'features', title: 'Features', subtitle: 'Explore Our Top Features', visible: true },
    { id: 'panel_preview', title: 'Panel Preview', subtitle: 'Intuitive School Admin Panel', visible: true },
    { id: 'pricing', title: 'Pricing', subtitle: 'Flexible Pricing Packages', visible: true },
    { id: 'contact', title: 'Contact', subtitle: "Let's Get In Touch", visible: true },
    { id: 'faq', title: 'FAQ', subtitle: 'Frequently Asked Questions', visible: true },
];

const DEFAULT_NAV_ITEMS: NavMenuItem[] = [
    { id: 'nav-features', title: 'Features', url: '#features', visible: true, isButton: false },
    { id: 'nav-faq', title: 'FAQ', url: '#faq', visible: true, isButton: false },
    { id: 'nav-contact', title: 'Contact', url: '#contact', visible: true, isButton: false },
    { id: 'nav-start-trial', title: 'Start Trial', url: '/auth/auth2/register', visible: true, isButton: true },
    { id: 'nav-parent', title: 'Parent & Student Portal', url: '/auth/auth2/login', visible: true, isButton: false },
];

const FEATURES = [
    { icon: 'solar:user-id-bold', title: 'Student Management' },
    { icon: 'solar:book-2-bold', title: 'Academics Management' },
    { icon: 'solar:users-group-rounded-bold', title: 'Staff Management' },
    { icon: 'solar:card-bold', title: 'Online Fee Collection' },
    { icon: 'solar:clipboard-check-bold', title: 'Exams & Marksheets' },
    { icon: 'solar:chat-round-dots-bold', title: 'Parent Communication' },
    { icon: 'solar:fingerprint-scan-bold', title: 'Biometric Integration' },
    { icon: 'solar:map-point-wave-bold', title: 'Live GPS Tracking' },
    { icon: 'solar:smartphone-bold', title: 'Mobile Apps' },
    { icon: 'solar:wallet-money-bold', title: 'Automated Payroll' },
    { icon: 'solar:document-text-bold', title: 'Template Builder' },
    { icon: 'solar:monitor-bold', title: 'Online Examination' },
];

const PRICING = [
    {
        name: 'Trial Plan',
        price: '₹0',
        period: '/mo',
        features: ['Up to 50 Students', 'All Core Modules', 'Unlimited Staff Logins', 'Email & SMS Notifications', 'Basic Support'],
        featured: false,
    },
    {
        name: 'Growth Plan',
        price: '₹2,999',
        period: '/mo',
        features: ['Up to 500 Students', 'All Core Modules', 'Unlimited Staff Logins', 'Email & SMS Notifications', 'Priority Support'],
        featured: true,
    },
    {
        name: 'Enterprise Plan',
        price: '₹5,999',
        period: '/mo',
        features: ['Up to 1500 Students', 'All Core Modules', 'Unlimited Staff Logins', 'Email & SMS Notifications', 'Dedicated Support'],
        featured: false,
    },
];

const FAQS = [
    { q: 'Is there a setup fee?', a: 'No, there are no setup fees. You can start with our free trial plan and upgrade to a paid plan at any time. Our setup process is fully automated and takes just a few minutes.' },
    { q: 'Can I upgrade or downgrade my plan later?', a: 'Absolutely! You can change your plan at any time from your admin dashboard. The changes will be reflected immediately. Any unused credits from your current plan will be prorated.' },
    { q: 'Is my school\'s data safe and secure?', a: 'Yes, security is our top priority. We use industry-standard encryption (AES-256), and your data is stored in secure, SOC-2 compliant data centers. We also perform regular backups and security audits.' },
    { q: 'Do you provide customer support?', a: 'Yes, we offer email and chat support for all plans. Growth and Enterprise plans receive priority support with dedicated account managers and faster response times.' },
    { q: 'Can I use it for multiple school branches?', a: 'Yes! Our multi-school architecture is designed to handle multiple branches or school groups under a single admin panel. Each branch gets its own isolated data while you maintain a centralized overview.' },
];

// ─── Helpers ───
const loadSections = (): PageSection[] => {
    try {
        const saved = localStorage.getItem('landing_sections');
        if (saved) return JSON.parse(saved);
    } catch { /* fallback */ }
    return DEFAULT_SECTIONS;
};

const loadNavItems = (): NavMenuItem[] => {
    try {
        const saved = localStorage.getItem('landing_nav_items');
        if (saved) return JSON.parse(saved);
    } catch { /* fallback */ }
    return DEFAULT_NAV_ITEMS;
};

const isSectionVisible = (sections: PageSection[], id: string) =>
    sections.find(s => s.id === id)?.visible ?? true;

// ─── Component ───
const LandingPage = () => {
    const [sections] = useState<PageSection[]>(loadSections);
    const [navItems] = useState<NavMenuItem[]>(loadNavItems);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const visibleNavLinks = navItems.filter(n => n.visible && !n.isButton);
    const visibleNavButtons = navItems.filter(n => n.visible && n.isButton);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        if (url.startsWith('#')) {
            e.preventDefault();
            const el = document.getElementById(url.slice(1));
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            setMobileOpen(false);
        }
    };

    return (
        <div className="landing-page">
            {/* ════════ NAVBAR ════════ */}
            <nav className={`landing-navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="landing-navbar-inner">
                    <a href="/" className="landing-navbar-logo">
                        <img src="/src/assets/images/logos/dark-logo.svg" alt="Mindwhile ERP" />
                    </a>

                    <ul className="landing-navbar-links">
                        {visibleNavLinks.map(item => (
                            <li key={item.id}>
                                <a href={item.url} onClick={(e) => handleSmoothScroll(e, item.url)}>{item.title}</a>
                            </li>
                        ))}
                    </ul>

                    <div className="landing-navbar-actions">
                        {visibleNavButtons.map(item => (
                            <a key={item.id} href={item.url} className="landing-btn landing-btn-primary">
                                {item.title}
                            </a>
                        ))}
                        <a href="/auth/auth2/login" className="landing-btn landing-btn-outline">Log In</a>
                    </div>

                    <button
                        className="landing-mobile-toggle"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <Icon icon={mobileOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'} width={28} />
                    </button>
                </div>

                {/* Mobile menu */}
                <div className={`landing-mobile-menu ${mobileOpen ? 'open' : ''}`}>
                    {visibleNavLinks.map(item => (
                        <a key={item.id} href={item.url} onClick={(e) => handleSmoothScroll(e, item.url)}>{item.title}</a>
                    ))}
                    {visibleNavButtons.map(item => (
                        <a key={item.id} href={item.url} className="landing-btn landing-btn-primary" style={{ textAlign: 'center' }}>
                            {item.title}
                        </a>
                    ))}
                    <a href="/auth/auth2/login" className="landing-btn landing-btn-outline" style={{ textAlign: 'center' }}>Log In</a>
                </div>
            </nav>

            {/* ════════ HERO ════════ */}
            {isSectionVisible(sections, 'hero') && (
                <section id="hero" className="landing-hero">
                    <div className="landing-hero-inner">
                        <div className="landing-hero-content">
                            <div className="landing-hero-badge">
                                <Icon icon="solar:star-bold" width={14} />
                                #1 Multi-School ERP Platform
                            </div>
                            <h1>
                                School ERP |<br />
                                <span>Multi School Management</span><br />
                                System with Apps
                            </h1>
                            <p>
                                Experience the future of education management. Streamline admissions,
                                academics, finance, and communication — all from one powerful platform
                                designed for modern schools.
                            </p>
                            <div className="landing-hero-actions">
                                <a href="/auth/auth2/register" className="landing-btn landing-btn-lg landing-btn-white">
                                    <Icon icon="solar:play-bold" width={18} style={{ marginRight: '0.5rem' }} />
                                    Start Free Trial
                                </a>
                                <a href="#contact" className="landing-btn landing-btn-lg landing-btn-ghost"
                                    onClick={(e) => handleSmoothScroll(e, '#contact')}>
                                    Request a Demo
                                </a>
                            </div>
                        </div>

                        <div className="landing-hero-visual">
                            <div className="landing-float-shape" />
                            <div className="landing-float-shape" />
                            <div className="landing-float-shape" />
                            {/* Gradient card as dashboard mockup placeholder */}
                            <div style={{
                                width: '100%',
                                maxWidth: 540,
                                aspectRatio: '16/10',
                                borderRadius: 20,
                                background: 'linear-gradient(145deg, rgba(79,70,229,0.2) 0%, rgba(6,182,212,0.15) 50%, rgba(30,27,75,0.9) 100%)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '1.5rem',
                                gap: '0.75rem',
                            }}>
                                {/* Fake toolbar */}
                                <div style={{ display: 'flex', gap: 6, marginBottom: '0.5rem' }}>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }} />
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
                                </div>
                                {/* Fake sidebar + content */}
                                <div style={{ display: 'flex', flex: 1, gap: '0.75rem' }}>
                                    <div style={{
                                        width: '25%',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: 10,
                                        padding: '0.75rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.5rem',
                                    }}>
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} style={{
                                                height: 8,
                                                background: i === 0 ? 'rgba(79,70,229,0.5)' : 'rgba(255,255,255,0.08)',
                                                borderRadius: 4,
                                                width: i === 0 ? '80%' : `${60 + Math.random() * 30}%`,
                                            }} />
                                        ))}
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {/* Stat cards */}
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {['#4f46e5', '#06b6d4', '#22c55e', '#f59e0b'].map((c, i) => (
                                                <div key={i} style={{
                                                    flex: 1,
                                                    height: 52,
                                                    borderRadius: 10,
                                                    background: `linear-gradient(135deg, ${c}33, ${c}11)`,
                                                    border: `1px solid ${c}44`,
                                                }} />
                                            ))}
                                        </div>
                                        {/* Chart area */}
                                        <div style={{
                                            flex: 1,
                                            borderRadius: 10,
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.06)',
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ════════ FEATURES ════════ */}
            {isSectionVisible(sections, 'features') && (
                <section id="features" className="landing-section landing-section-dark">
                    <div className="landing-container">
                        <div className="landing-section-header">
                            <h2>Explore Our <span className="text-gradient">Top Features</span></h2>
                            <p>Everything you need to manage a modern school — from admissions to report cards, all in one place.</p>
                        </div>
                        <div className="landing-features-grid">
                            {FEATURES.map((f, i) => (
                                <div key={i} className="landing-feature-card">
                                    <div className="landing-feature-icon">
                                        <Icon icon={f.icon} width={26} />
                                    </div>
                                    <h4>{f.title}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ════════ PANEL PREVIEW ════════ */}
            {isSectionVisible(sections, 'panel_preview') && (
                <section id="panel_preview" className="landing-panel-section">
                    <div className="landing-container">
                        <div className="landing-panel-grid">
                            <div className="landing-panel-content">
                                <h2>Intuitive School Admin Panel</h2>
                                <p>Manage your entire school's operations from a single, powerful, and easy-to-use dashboard.</p>

                                <div className="landing-panel-feature">
                                    <div className="landing-panel-feature-icon">
                                        <Icon icon="solar:user-plus-bold" width={22} />
                                    </div>
                                    <div>
                                        <h5>Effortless Student Management</h5>
                                        <p>Create admission forms, add students individually or in bulk, and manage parent details seamlessly.</p>
                                    </div>
                                </div>

                                <div className="landing-panel-feature">
                                    <div className="landing-panel-feature-icon">
                                        <Icon icon="solar:calendar-bold" width={22} />
                                    </div>
                                    <div>
                                        <h5>Flexible Timetable Creation</h5>
                                        <p>Customize schedules for divisions and teachers effortlessly with our dynamic timetable.</p>
                                    </div>
                                </div>

                                <div className="landing-panel-feature">
                                    <div className="landing-panel-feature-icon">
                                        <Icon icon="solar:bell-bold" width={22} />
                                    </div>
                                    <div>
                                        <h5>Announcements Made Simple</h5>
                                        <p>Keep your school community informed with targeted SMS, email, and in-app messaging.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="landing-panel-image">
                                {/* Dashboard preview mockup */}
                                <div style={{
                                    width: '100%',
                                    aspectRatio: '16/10',
                                    borderRadius: 16,
                                    background: '#fff',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'hidden',
                                }}>
                                    {/* Top bar */}
                                    <div style={{ height: 40, background: '#0f172a', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#eab308' }} />
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
                                        <div style={{ flex: 1, height: 20, background: 'rgba(255,255,255,0.06)', borderRadius: 6, marginLeft: 16 }} />
                                    </div>
                                    {/* Body */}
                                    <div style={{ flex: 1, display: 'flex' }}>
                                        {/* Sidebar */}
                                        <div style={{
                                            width: '22%',
                                            background: '#1e293b',
                                            padding: '12px 8px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 6,
                                        }}>
                                            {['Dashboard', 'Students', 'Teachers', 'Finance', 'Exams', 'Reports'].map((label, i) => (
                                                <div key={i} style={{
                                                    padding: '6px 8px',
                                                    borderRadius: 6,
                                                    background: i === 0 ? 'rgba(79,70,229,0.3)' : 'transparent',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 6,
                                                }}>
                                                    <div style={{ width: 6, height: 6, borderRadius: 2, background: i === 0 ? '#818cf8' : 'rgba(255,255,255,0.2)' }} />
                                                    <span style={{ fontSize: 7, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.5)', fontWeight: i === 0 ? 600 : 400 }}>{label}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Main content */}
                                        <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            {/* Stat cards */}
                                            <div style={{ display: 'flex', gap: 8 }}>
                                                {[
                                                    { label: 'Students', val: '1,234', color: '#4f46e5' },
                                                    { label: 'Teachers', val: '89', color: '#06b6d4' },
                                                    { label: 'Revenue', val: '₹4.5L', color: '#22c55e' },
                                                    { label: 'Classes', val: '48', color: '#f59e0b' },
                                                ].map((s, i) => (
                                                    <div key={i} style={{
                                                        flex: 1,
                                                        padding: '8px 6px',
                                                        borderRadius: 8,
                                                        background: `${s.color}11`,
                                                        border: `1px solid ${s.color}22`,
                                                        textAlign: 'center',
                                                    }}>
                                                        <div style={{ fontSize: 10, fontWeight: 700, color: s.color }}>{s.val}</div>
                                                        <div style={{ fontSize: 6, color: '#64748b', marginTop: 2 }}>{s.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                            {/* Chart placeholder */}
                                            <div style={{
                                                flex: 1,
                                                borderRadius: 8,
                                                background: '#f8fafc',
                                                border: '1px solid #e2e8f0',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                padding: '8px 4px 4px',
                                                gap: 3,
                                            }}>
                                                {[40, 65, 45, 80, 60, 75, 55, 90, 70, 85, 50, 95].map((h, i) => (
                                                    <div key={i} style={{
                                                        flex: 1,
                                                        height: `${h}%`,
                                                        background: `linear-gradient(to top, #4f46e5, #818cf8)`,
                                                        borderRadius: '3px 3px 0 0',
                                                        opacity: 0.7 + (h / 300),
                                                    }} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ════════ PRICING ════════ */}
            {isSectionVisible(sections, 'pricing') && (
                <section id="pricing" className="landing-section landing-section-gradient">
                    <div className="landing-container">
                        <div className="landing-section-header">
                            <h2>Flexible <span className="text-gradient">Pricing Packages</span></h2>
                            <p>Choose the plan that fits your school. Upgrade, downgrade, or cancel anytime.</p>
                        </div>
                        <div className="landing-pricing-grid">
                            {PRICING.map((plan, i) => (
                                <div key={i} className={`landing-pricing-card ${plan.featured ? 'featured' : ''}`}>
                                    {plan.featured && <div className="landing-pricing-badge">Most Popular</div>}
                                    <h3>{plan.name}</h3>
                                    <div className="landing-pricing-price">
                                        {plan.price}<span>{plan.period}</span>
                                    </div>
                                    <ul className="landing-pricing-features">
                                        {plan.features.map((f, j) => (
                                            <li key={j}>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <a href="/auth/auth2/register" className={`landing-btn ${plan.featured ? 'landing-btn-primary' : 'landing-btn-outline'}`}>
                                        Get Started
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ════════ CONTACT ════════ */}
            {isSectionVisible(sections, 'contact') && (
                <section id="contact" className="landing-section landing-section-dark">
                    <div className="landing-container">
                        <div className="landing-section-header">
                            <h2>Let's Get <span className="text-gradient">In Touch</span></h2>
                            <p>Have a question or need a custom solution? We'd love to hear from you.</p>
                        </div>
                        <div className="landing-contact-grid">
                            <div className="landing-contact-info">
                                <div className="landing-contact-card">
                                    <div className="landing-contact-card-icon">
                                        <Icon icon="solar:phone-bold" width={22} />
                                    </div>
                                    <div>
                                        <h5>Phone</h5>
                                        <p>+91 6263056779</p>
                                    </div>
                                </div>
                                <div className="landing-contact-card">
                                    <div className="landing-contact-card-icon">
                                        <Icon icon="solar:letter-bold" width={22} />
                                    </div>
                                    <div>
                                        <h5>Email</h5>
                                        <p>support@mindwhile.com</p>
                                    </div>
                                </div>
                                <div className="landing-contact-card">
                                    <div className="landing-contact-card-icon">
                                        <Icon icon="solar:map-point-bold" width={22} />
                                    </div>
                                    <div>
                                        <h5>Address</h5>
                                        <p>123 Tech Avenue, Innovation Park, India</p>
                                    </div>
                                </div>
                            </div>

                            <form className="landing-contact-form" onSubmit={(e) => e.preventDefault()}>
                                <h3>Send us a message</h3>
                                <p>Fill in the form and our team will get back to you shortly.</p>
                                <div className="landing-form-row">
                                    <div className="landing-form-group">
                                        <label htmlFor="contact-name">Your Name</label>
                                        <input id="contact-name" type="text" className="landing-form-input" placeholder="John Doe" />
                                    </div>
                                    <div className="landing-form-group">
                                        <label htmlFor="contact-email">Email Address</label>
                                        <input id="contact-email" type="email" className="landing-form-input" placeholder="john@school.com" />
                                    </div>
                                </div>
                                <div className="landing-form-group">
                                    <label htmlFor="contact-subject">Subject</label>
                                    <input id="contact-subject" type="text" className="landing-form-input" placeholder="How can we help?" />
                                </div>
                                <div className="landing-form-group">
                                    <label htmlFor="contact-message">Message</label>
                                    <textarea id="contact-message" className="landing-form-input" placeholder="Tell us about your school's needs..." />
                                </div>
                                <button type="submit" className="landing-btn landing-btn-primary" style={{ width: '100%' }}>
                                    <Icon icon="solar:plain-bold" width={18} style={{ marginRight: '0.5rem' }} />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            )}

            {/* ════════ FAQ ════════ */}
            {isSectionVisible(sections, 'faq') && (
                <section id="faq" className="landing-section landing-section-gradient">
                    <div className="landing-container">
                        <div className="landing-section-header">
                            <h2>Frequently Asked <span className="text-gradient">Questions</span></h2>
                            <p>Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.</p>
                        </div>
                        <Accordion.Root type="single" collapsible className="landing-faq-list">
                            {FAQS.map((faq, i) => (
                                <Accordion.Item key={i} value={`faq-${i}`} className="landing-faq-item">
                                    <Accordion.Header>
                                        <Accordion.Trigger className="landing-faq-trigger">
                                            {faq.q}
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </Accordion.Trigger>
                                    </Accordion.Header>
                                    <Accordion.Content className="landing-faq-content">
                                        <div className="landing-faq-answer">{faq.a}</div>
                                    </Accordion.Content>
                                </Accordion.Item>
                            ))}
                        </Accordion.Root>
                    </div>
                </section>
            )}

            {/* ════════ FOOTER ════════ */}
            <footer className="landing-footer">
                <p>© {new Date().getFullYear()} Mindwhile School ERP. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
