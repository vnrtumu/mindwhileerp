import React, { useState, useContext, useMemo, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentContext } from '../../../context/StudentContext';
import { FeeContext } from '../../../context/FeeContext';
import { PlaceholderAvatar } from '../../../components/Icons';
import BackButton from '../StudentInformation/components/BackButton';
import './AssignFees.css';

/* ── Default fee templates ───────────────────────────────── */
const DEFAULT_FEES = [
    { name: 'Admission', amount: 1000, enabled: true },
    { name: 'Tuition', amount: 200, enabled: true },
    { name: 'Books', amount: 500, enabled: true },
    { name: 'Transport', amount: 3000, enabled: true },
    { name: 'Uniform', amount: 1500, enabled: true },
];

/* ── Toast helper ────────────────────────────────────────── */
const showSnack = (msg, type = 'success') => {
    const prev = document.getElementById('af-snack');
    if (prev) prev.remove();
    const el = document.createElement('div');
    el.id = 'af-snack';
    el.className = `af-snack af-snack-${type}`;
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => { el.classList.add('af-snack-out'); setTimeout(() => el.remove(), 320); }, 2800);
};

/* ── Skeleton row ────────────────────────────────────────── */
const SkeletonRow = ({ cols }) => (
    <tr className="af-skeleton-row">
        {Array.from({ length: cols }).map((_, i) => (
            <td key={i}><div className="af-skeleton" /></td>
        ))}
    </tr>
);

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
const AssignFees = () => {
    const navigate = useNavigate();
    const { students } = useContext(StudentContext);

    /* ── Phase: 'select' → 'assign' ──────────── */
    const [phase, setPhase] = useState('select');

    /* ── Step 1 state ────────────────────────── */
    const [cls, setCls] = useState('10');
    const [section, setSection] = useState('A');
    const [feeRows, setFeeRows] = useState(() => DEFAULT_FEES.map(r => ({ ...r })));
    const [customName, setCustomName] = useState('');
    const [customAmount, setCustomAmount] = useState('');

    /* ── Step 2 state ────────────────────────── */
    const [isLoading, setIsLoading] = useState(false);
    const [studentList, setStudentList] = useState([]);
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [studentFeeMap, setStudentFeeMap] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [assignStatus, setAssignStatus] = useState(null);

    const tableRef = useRef(null);
    const headerCheckRef = useRef(null);

    /* ── Enabled fees ────────────────────────── */
    const enabledFees = useMemo(() =>
        feeRows
            .filter(r => r.enabled && r.name.trim() && Number(r.amount) > 0)
            .map(r => ({ name: r.name.trim(), amount: Number(r.amount) })),
        [feeRows]);

    const feeTotal = useMemo(() =>
        enabledFees.reduce((s, f) => s + f.amount, 0), [enabledFees]);

    /* ── Fee row helpers ─────────────────────── */
    const updateRow = (i, k, v) => setFeeRows(rows => rows.map((r, idx) => idx === i ? { ...r, [k]: v } : r));
    const removeRow = (i) => setFeeRows(rows => rows.filter((_, idx) => idx !== i));
    const addCustomFee = () => {
        if (!customName.trim() || !customAmount || Number(customAmount) <= 0) return;
        setFeeRows(rows => [...rows, { name: customName.trim(), amount: Number(customAmount), enabled: true }]);
        setCustomName(''); setCustomAmount('');
    };

    /* ── Load students ───────────────────────── */
    const handleLoad = () => {
        if (enabledFees.length === 0) { showSnack('Enable at least one fee first', 'warn'); return; }
        setPhase('assign');
        setIsLoading(true);
        setSearchQuery('');
        setSelectedIds(new Set());
        setTimeout(() => {
            const matched = students.filter(s => String(s.class) === String(cls) && s.section === section);
            setStudentList(matched);
            const map = {};
            matched.forEach(s => {
                map[s.id] = {};
                enabledFees.forEach(f => { map[s.id][f.name] = true; });
            });
            setStudentFeeMap(map);
            setSelectedIds(new Set(matched.map(s => s.id)));
            setIsLoading(false);
            setTimeout(() => tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }, 800);
    };

    /* ── Displayed students (search filtered) ── */
    const displayed = useMemo(() => {
        if (!searchQuery.trim()) return studentList;
        const q = searchQuery.toLowerCase();
        return studentList.filter(s =>
            (s.name || '').toLowerCase().includes(q) ||
            (s.admissionNo || s.id || '').toLowerCase().includes(q)
        );
    }, [studentList, searchQuery]);

    /* ── Header checkbox indeterminate ────────── */
    useEffect(() => {
        if (!headerCheckRef.current || phase !== 'assign') return;
        const all = displayed.length > 0 && displayed.every(s => selectedIds.has(s.id));
        const some = displayed.some(s => selectedIds.has(s.id)) && !all;
        headerCheckRef.current.indeterminate = some;
        headerCheckRef.current.checked = all;
    }, [selectedIds, displayed, phase]);

    /* ── Selection ───────────────────────────── */
    const toggleAll = useCallback(() => {
        setSelectedIds(prev => {
            const ids = displayed.map(s => s.id);
            const allOn = ids.every(id => prev.has(id));
            const next = new Set(prev);
            allOn ? ids.forEach(id => next.delete(id)) : ids.forEach(id => next.add(id));
            return next;
        });
    }, [displayed]);

    const toggleRow = useCallback(id => {
        setSelectedIds(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
    }, []);

    /* ── Per-student fee toggle ──────────────── */
    const toggleFee = useCallback((sid, fname) => {
        setStudentFeeMap(prev => ({
            ...prev,
            [sid]: { ...(prev[sid] || {}), [fname]: !(prev[sid] || {})[fname] }
        }));
    }, []);

    const toggleAllFees = useCallback(sid => {
        setStudentFeeMap(prev => {
            const cur = prev[sid] || {};
            const allOn = enabledFees.every(f => cur[f.name]);
            const upd = {};
            enabledFees.forEach(f => { upd[f.name] = !allOn; });
            return { ...prev, [sid]: upd };
        });
    }, [enabledFees]);

    /* ── Totals ──────────────────────────────── */
    const getTotal = useCallback(sid => {
        const map = studentFeeMap[sid] || {};
        return enabledFees.reduce((s, f) => s + (map[f.name] ? f.amount : 0), 0);
    }, [studentFeeMap, enabledFees]);

    const grandTotal = useMemo(() => {
        let t = 0; selectedIds.forEach(id => { t += getTotal(id); }); return t;
    }, [selectedIds, getTotal]);

    /* ── Submit ──────────────────────────────── */
    const handleSubmit = () => {
        if (selectedIds.size === 0 || enabledFees.length === 0) return;
        showSnack(`Fees assigned to ${selectedIds.size} student${selectedIds.size !== 1 ? 's' : ''}!`, 'success');
        setAssignStatus('success');
        setTimeout(() => setAssignStatus(null), 4000);
    };

    /* ── Back ────────────────────────────────── */
    const handleBack = () => {
        setPhase('select');
        setStudentList([]);
        setSelectedIds(new Set());
        setStudentFeeMap({});
    };

    /* ═══════ RENDER ═══════ */
    return (
        <div className="af-page">

            {/* ── Header ───────────────────────────────── */}
            <div className="af-header">
                <div className="af-header-left">
                    <BackButton title="Go back to Finance" />
                    <div>
                        <h4 className="af-title">Assign Fees</h4>
                        <nav className="af-breadcrumb">Finance / <span>Assign Fees</span></nav>
                    </div>
                </div>
                {/* Step indicator */}
                <div className="af-steps">
                    <div className={`af-step ${phase === 'select' ? 'af-step-active' : 'af-step-done'}`}>
                        <span className="af-step-num">{phase === 'assign' ? '✓' : '1'}</span>
                        Configure Fees
                    </div>
                    <div className="af-step-line" />
                    <div className={`af-step ${phase === 'assign' ? 'af-step-active' : ''}`}>
                        <span className="af-step-num">2</span>
                        Select Students
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════════
                STEP 1 — Fee Configuration Card
                ════════════════════════════════════════════ */}
            <div className={`af-card af-step1-card ${phase === 'assign' ? 'af-card-collapsed' : ''}`}>
                <div className="af-card-head">
                    <div className="af-card-head-left">
                        <span className="af-badge-num">1</span>
                        <div>
                            <div className="af-card-title">Select Class, Section &amp; Fees</div>
                            {phase === 'assign' && (
                                <div className="af-card-subtitle">
                                    Class {cls} · Section {section} · {enabledFees.length} fee{enabledFees.length !== 1 ? 's' : ''} · ₹{feeTotal.toLocaleString('en-IN')} per student
                                </div>
                            )}
                        </div>
                    </div>
                    {phase === 'assign' && (
                        <button className="af-change-btn" onClick={handleBack}>← Change</button>
                    )}
                </div>

                {/* Collapsed summary chips */}
                {phase === 'assign' && (
                    <div className="af-fee-summary-chips">
                        {enabledFees.map(f => (
                            <span key={f.name} className="af-fee-summary-chip">
                                {f.name} <strong>₹{f.amount.toLocaleString('en-IN')}</strong>
                            </span>
                        ))}
                    </div>
                )}

                {/* Full form (visible in select phase) */}
                {phase === 'select' && (
                    <>
                        {/* Class + Section */}
                        <div className="af-form-row af-form-row-2">
                            <div className="af-field">
                                <label className="af-label">Class</label>
                                <select className="af-select" value={cls} onChange={e => setCls(e.target.value)}>
                                    {Array.from({ length: 12 }, (_, i) => String(i + 1)).map(c => (
                                        <option key={c} value={c}>Class {c}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="af-field">
                                <label className="af-label">Section</label>
                                <select className="af-select" value={section} onChange={e => setSection(e.target.value)}>
                                    {['A', 'B', 'C', 'D'].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Fee rows */}
                        <div className="af-fees-section">
                            <div className="af-fees-header">
                                <span className="af-label">Fee Items</span>
                                <span className="af-fees-total">
                                    {enabledFees.length} active · ₹{feeTotal.toLocaleString('en-IN')} total
                                </span>
                            </div>

                            <div className="af-fee-list">
                                {feeRows.map((row, idx) => (
                                    <div key={idx} className={`af-fee-row ${!row.enabled ? 'af-fee-row-disabled' : ''}`}>
                                        <label className="af-fee-toggle">
                                            <input
                                                type="checkbox"
                                                checked={!!row.enabled}
                                                onChange={e => updateRow(idx, 'enabled', e.target.checked)}
                                            />
                                            <span className="af-toggle-slider" />
                                        </label>
                                        <input
                                            className="af-input af-fee-name"
                                            value={row.name}
                                            onChange={e => updateRow(idx, 'name', e.target.value)}
                                            placeholder="Fee name"
                                            disabled={!row.enabled}
                                        />
                                        <div className="af-amount-wrap">
                                            <span className="af-rupee">₹</span>
                                            <input
                                                className="af-input af-fee-amount"
                                                type="number"
                                                min="0"
                                                value={row.amount}
                                                onChange={e => updateRow(idx, 'amount', e.target.value)}
                                                placeholder="0"
                                                disabled={!row.enabled}
                                            />
                                        </div>
                                        <button className="af-remove-btn" onClick={() => removeRow(idx)} title="Remove">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        </button>
                                    </div>
                                ))}

                                {/* Add custom fee row */}
                                <div className="af-fee-row af-fee-row-add">
                                    <span className="af-add-icon">+</span>
                                    <input
                                        className="af-input af-fee-name"
                                        placeholder="New fee name"
                                        value={customName}
                                        onChange={e => setCustomName(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && addCustomFee()}
                                    />
                                    <div className="af-amount-wrap">
                                        <span className="af-rupee">₹</span>
                                        <input
                                            className="af-input af-fee-amount"
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={customAmount}
                                            onChange={e => setCustomAmount(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && addCustomFee()}
                                        />
                                    </div>
                                    <button className="af-add-btn" onClick={addCustomFee}>Add</button>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="af-step1-footer">
                            <button
                                className="af-load-btn"
                                onClick={handleLoad}
                                disabled={enabledFees.length === 0}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                                Load Students
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* ════════════════════════════════════════════
                STEP 2 — Student Table
                ════════════════════════════════════════════ */}
            {phase === 'assign' && (
                <div ref={tableRef} className="af-card af-animate-in" style={{ marginBottom: 90 }}>

                    {/* Card header */}
                    <div className="af-card-head">
                        <div className="af-card-head-left">
                            <span className="af-badge-num">2</span>
                            <div>
                                <div className="af-card-title">
                                    Select Students — Class {cls}, Section {section}
                                </div>
                                <div className="af-card-subtitle">
                                    {studentList.length} student{studentList.length !== 1 ? 's' : ''} found · click a fee tag to toggle it for that student
                                </div>
                            </div>
                        </div>
                        {/* Search */}
                        <div className="af-search-wrap">
                            <svg className="af-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                className="af-search"
                                placeholder="Search name or adm no…"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Stats bar */}
                    {!isLoading && studentList.length > 0 && (
                        <div className="af-stats-bar">
                            <span>{selectedIds.size} of {studentList.length} selected</span>
                            <span className="af-grand-total">
                                Grand Total: <strong>₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
                            </span>
                        </div>
                    )}

                    {/* Table */}
                    <div className="af-table-wrap">
                        <table className="af-table">
                            <thead>
                                <tr>
                                    <th className="af-th-check">
                                        <input ref={headerCheckRef} type="checkbox" onChange={toggleAll}
                                            disabled={isLoading || displayed.length === 0} />
                                    </th>
                                    <th className="af-th-photo">Photo</th>
                                    <th className="af-th-adm">Adm No</th>
                                    <th className="af-th-name">Name</th>
                                    <th className="af-th-class">Class</th>
                                    <th className="af-th-section">Sec</th>
                                    <th className="af-th-fees">Applicable Fees</th>
                                    <th className="af-th-total">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <><SkeletonRow cols={8} /><SkeletonRow cols={8} /><SkeletonRow cols={8} /><SkeletonRow cols={8} /></>
                                ) : displayed.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="af-empty-row">
                                            <div className="af-empty-content">
                                                <div className="af-empty-icon">👨‍🎓</div>
                                                <strong>{searchQuery ? 'No students match your search' : `No students in Class ${cls}, Section ${section}`}</strong>
                                                <p>{searchQuery ? 'Try a different keyword' : 'Add students first, then come back to assign fees'}</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : displayed.map(s => {
                                    const isSel = selectedIds.has(s.id);
                                    const feeMap = studentFeeMap[s.id] || {};
                                    const studentTot = getTotal(s.id);
                                    return (
                                        <tr key={s.id} className={`af-tr ${isSel ? 'af-row-selected' : ''}`}>
                                            {/* Checkbox */}
                                            <td className="af-td-check">
                                                <input type="checkbox" checked={isSel} onChange={() => toggleRow(s.id)} />
                                            </td>

                                            {/* Photo */}
                                            <td className="af-td-photo">
                                                {s.image
                                                    ? <img src={s.image} alt={s.name} className="af-avatar" />
                                                    : <PlaceholderAvatar gender={s.gender} size={34} />
                                                }
                                            </td>

                                            {/* Adm */}
                                            <td className="af-td-adm">
                                                <span className="af-adm-badge">{s.admissionNo || s.id || '—'}</span>
                                            </td>

                                            {/* Name */}
                                            <td className="af-td-name">{s.name || '—'}</td>

                                            {/* Class */}
                                            <td>
                                                <span className="af-class-pill">{s.class}</span>
                                            </td>

                                            {/* Section */}
                                            <td className="af-td-sec">{s.section}</td>

                                            {/* Fee tags */}
                                            <td className="af-td-fees">
                                                <div className="af-tags">
                                                    {enabledFees.map(f => (
                                                        <button
                                                            key={f.name}
                                                            className={`af-tag ${feeMap[f.name] ? 'af-tag-on' : 'af-tag-off'}`}
                                                            onClick={() => toggleFee(s.id, f.name)}
                                                            title={`${f.name}: ₹${f.amount.toLocaleString('en-IN')} — click to toggle`}
                                                        >
                                                            {feeMap[f.name] && (
                                                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M20 6L9 17l-5-5" />
                                                                </svg>
                                                            )}
                                                            {f.name}
                                                        </button>
                                                    ))}
                                                    {enabledFees.length > 1 && (
                                                        <button
                                                            className="af-tag af-tag-all"
                                                            onClick={() => toggleAllFees(s.id)}
                                                            title="Toggle all fees"
                                                        >
                                                            All
                                                        </button>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Total */}
                                            <td className="af-td-total">
                                                <span className={`af-total-badge ${studentTot > 0 ? 'has-amount' : 'zero'}`}>
                                                    ₹{studentTot.toLocaleString('en-IN')}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ── Sticky Footer ─────────────────────────── */}
            {phase === 'assign' && (
                <div className="af-footer">
                    <div className="af-footer-inner">
                        <div className="af-footer-left">
                            {selectedIds.size > 0 && enabledFees.length > 0 ? (
                                <>
                                    <span className="af-footer-count">
                                        {selectedIds.size} student{selectedIds.size !== 1 ? 's' : ''}
                                    </span>
                                    <span className="af-footer-dot">·</span>
                                    <span className="af-footer-fees">
                                        {enabledFees.length} fee{enabledFees.length !== 1 ? 's' : ''}
                                    </span>
                                    <span className="af-footer-dot">·</span>
                                    <span className="af-footer-total">
                                        ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                    </span>
                                </>
                            ) : (
                                <span className="af-footer-warn">
                                    ⚠ {selectedIds.size === 0 ? 'Select at least 1 student' : 'Enable at least 1 fee'}
                                </span>
                            )}
                        </div>
                        <div className="af-footer-right">
                            <button className="af-cancel-btn" onClick={handleBack}>Cancel</button>
                            <button
                                className="af-assign-btn"
                                onClick={handleSubmit}
                                disabled={selectedIds.size === 0 || enabledFees.length === 0}
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                Assign Fees
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Empty hint (no table yet) ──────────────── */}
            {phase === 'select' && (
                <div className="af-card af-hint-card">
                    <div className="af-hint-icon">👨‍🎓</div>
                    <div className="af-hint-title">Configure fees above, then click Load Students</div>
                    <div className="af-hint-sub">You'll be able to select individual students and toggle which fees apply to each.</div>
                </div>
            )}
        </div>
    );
};

export default AssignFees;
