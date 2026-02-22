/**
 * React Query hooks for the Branch Admin module.
 *
 * Example usage in a component:
 *
 *   import { useBranchStats, useBranchProfile } from '@/hooks/queries/useBranch';
 *
 *   function BranchDashboard() {
 *     const { data: stats, isLoading } = useBranchStats();
 *     if (isLoading) return <Spinner />;
 *     return <div>Students: {stats.student_count}</div>;
 *   }
 */
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api-client';
import { queryKeys } from '../../lib/query-keys';

// ── Types ──

interface BranchStats {
    branch_id: number;
    branch_name: string;
    branch_code: string;
    is_main_branch: boolean;
    student_count: number;
    teacher_count: number;
    course_count: number;
    total_fees_collected: number;
    pending_fees: number;
}

interface BranchProfile {
    id: number;
    name: string;
    code: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    is_main_branch: boolean;
    is_active: boolean;
}

// ── Hooks ──

/**
 * Fetch branch dashboard statistics.
 * Only call this for branch_admin / branch_principal users.
 */
export const useBranchStats = (branchId?: number) => {
    return useQuery({
        queryKey: queryKeys.branches.stats(branchId),
        queryFn: () => api.get<BranchStats>('/branch/stats'),
        // Only run if user is authenticated (token exists)
        enabled: !!localStorage.getItem('auth_token'),
    });
};

/**
 * Fetch branch profile information.
 */
export const useBranchProfile = (branchId?: number) => {
    return useQuery({
        queryKey: queryKeys.branches.profile(branchId),
        queryFn: () => api.get<BranchProfile>('/branch/profile'),
        enabled: !!localStorage.getItem('auth_token'),
    });
};

/**
 * Fetch list of all branches (for school admins).
 */
export const useBranches = () => {
    return useQuery({
        queryKey: queryKeys.branches.list(),
        queryFn: () => api.get<BranchProfile[]>('/branches'),
        enabled: !!localStorage.getItem('auth_token'),
    });
};

/**
 * Fetch a single branch by ID.
 */
export const useBranch = (id: number) => {
    return useQuery({
        queryKey: queryKeys.branches.detail(id),
        queryFn: () => api.get<BranchProfile>(`/branches/${id}`),
        enabled: !!id && !!localStorage.getItem('auth_token'),
    });
};
