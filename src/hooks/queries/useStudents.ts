/**
 * React Query hooks for Students module.
 *
 * Example usage:
 *
 *   import { useStudents, useStudent } from '@/hooks/queries/useStudents';
 *
 *   function StudentList() {
 *     const { data, isLoading, error } = useStudents({ class_id: 5 });
 *     if (isLoading) return <Spinner />;
 *     if (error) return <ErrorMessage error={error} />;
 *     return <Table data={data} />;
 *   }
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api-client';
import { queryKeys } from '../../lib/query-keys';

// ── Types (match your backend schemas) ──

interface Student {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    class_id?: number;
    section_id?: number;
    branch_id?: number;
    admission_number?: string;
    is_active: boolean;
}

interface StudentFilters {
    class_id?: number;
    section_id?: number;
    branch_id?: number;
    search?: string;
    page?: number;
    limit?: number;
    [key: string]: unknown;
}

interface CreateStudentData {
    first_name: string;
    last_name: string;
    email?: string;
    class_id?: number;
    section_id?: number;
    [key: string]: unknown;
}

// ── Query Hooks ──

/**
 * Fetch paginated/filtered student list.
 */
export const useStudents = (filters?: StudentFilters) => {
    return useQuery({
        queryKey: queryKeys.students.list(filters),
        queryFn: () => api.get<Student[]>('/students', { params: filters }),
        enabled: !!localStorage.getItem('auth_token'),
    });
};

/**
 * Fetch a single student by ID.
 */
export const useStudent = (id: number) => {
    return useQuery({
        queryKey: queryKeys.students.detail(id),
        queryFn: () => api.get<Student>(`/students/${id}`),
        enabled: !!id && !!localStorage.getItem('auth_token'),
    });
};

// ── Mutation Hooks ──

/**
 * Create a new student.
 * Automatically invalidates the student list cache on success.
 */
export const useCreateStudent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateStudentData) => api.post<Student>('/students', data),
        onSuccess: () => {
            // Invalidate all student list queries so they refetch with new data
            queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
        },
    });
};

/**
 * Update an existing student.
 */
export const useUpdateStudent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<CreateStudentData> }) =>
            api.patch<Student>(`/students/${id}`, data),
        onSuccess: (_data, variables) => {
            // Invalidate both the list and the specific student detail
            queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.students.detail(variables.id) });
        },
    });
};

/**
 * Delete a student.
 */
export const useDeleteStudent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => api.delete(`/students/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
        },
    });
};
