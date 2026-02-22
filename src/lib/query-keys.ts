/**
 * React Query key factory.
 *
 * Centralizing query keys avoids typos and makes cache invalidation reliable.
 * Every module gets its own key namespace.
 *
 * Usage:
 *   useQuery({ queryKey: queryKeys.students.list(classId), queryFn: ... })
 *   queryClient.invalidateQueries({ queryKey: queryKeys.students.all })
 */
export const queryKeys = {
    // ── Auth ──
    auth: {
        all: ['auth'] as const,
        me: () => [...queryKeys.auth.all, 'me'] as const,
    },

    // ── Branch ──
    branches: {
        all: ['branches'] as const,
        list: () => [...queryKeys.branches.all, 'list'] as const,
        detail: (id: number) => [...queryKeys.branches.all, 'detail', id] as const,
        stats: (id?: number) => [...queryKeys.branches.all, 'stats', id] as const,
        profile: (id?: number) => [...queryKeys.branches.all, 'profile', id] as const,
    },

    // ── Students ──
    students: {
        all: ['students'] as const,
        list: (filters?: Record<string, unknown>) => [...queryKeys.students.all, 'list', filters] as const,
        detail: (id: number) => [...queryKeys.students.all, 'detail', id] as const,
        attendance: (classId?: number, date?: string) =>
            [...queryKeys.students.all, 'attendance', classId, date] as const,
    },

    // ── Teachers / Staff ──
    teachers: {
        all: ['teachers'] as const,
        list: (filters?: Record<string, unknown>) => [...queryKeys.teachers.all, 'list', filters] as const,
        detail: (id: number) => [...queryKeys.teachers.all, 'detail', id] as const,
    },

    // ── Academics ──
    academics: {
        all: ['academics'] as const,
        classes: () => [...queryKeys.academics.all, 'classes'] as const,
        sections: (classId?: number) => [...queryKeys.academics.all, 'sections', classId] as const,
        subjects: (classId?: number) => [...queryKeys.academics.all, 'subjects', classId] as const,
        timetable: (classId?: number) => [...queryKeys.academics.all, 'timetable', classId] as const,
    },

    // ── Finance / Fees ──
    fees: {
        all: ['fees'] as const,
        structure: (classId?: number) => [...queryKeys.fees.all, 'structure', classId] as const,
        transactions: (filters?: Record<string, unknown>) =>
            [...queryKeys.fees.all, 'transactions', filters] as const,
        dues: (filters?: Record<string, unknown>) => [...queryKeys.fees.all, 'dues', filters] as const,
        types: () => [...queryKeys.fees.all, 'types'] as const,
        groups: () => [...queryKeys.fees.all, 'groups'] as const,
    },

    // ── Exams ──
    exams: {
        all: ['exams'] as const,
        schedule: (filters?: Record<string, unknown>) =>
            [...queryKeys.exams.all, 'schedule', filters] as const,
        results: (examId?: number) => [...queryKeys.exams.all, 'results', examId] as const,
    },

    // ── Communication ──
    communication: {
        all: ['communication'] as const,
        notices: () => [...queryKeys.communication.all, 'notices'] as const,
        messages: () => [...queryKeys.communication.all, 'messages'] as const,
    },

    // ── HR ──
    hr: {
        all: ['hr'] as const,
        departments: () => [...queryKeys.hr.all, 'departments'] as const,
        designations: () => [...queryKeys.hr.all, 'designations'] as const,
        leave: (filters?: Record<string, unknown>) => [...queryKeys.hr.all, 'leave', filters] as const,
        payroll: (month?: string) => [...queryKeys.hr.all, 'payroll', month] as const,
    },

    // ── Settings ──
    settings: {
        all: ['settings'] as const,
        general: () => [...queryKeys.settings.all, 'general'] as const,
        roles: () => [...queryKeys.settings.all, 'roles'] as const,
    },
};
