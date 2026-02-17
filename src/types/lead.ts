export interface LeadType {
    Id: number;
    name: string;
    email: string;
    phone: string;
    company: string;
    source: string;
    status: string;
    notes: string;
    assignedTo: string;
    createdDate: Date;
    deleted: boolean;
}
