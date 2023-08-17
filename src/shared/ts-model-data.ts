/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2023-08-17 11:14:07.

export interface AbstractLedgerEntry {
    id?: number;
    actual?: number;
    budget?: number;
    rateApplication?: RateApplication;
    comments?: Comment[];
}

export interface AllowableExpense extends AbstractLedgerEntry {
    expense?: string;
    type?: string;
}

export interface Benefit extends AbstractLedgerEntry {
    benefit?: string;
}

export interface Comment {
    id?: number;
    comment?: string;
    entry?: AbstractLedgerEntry;
}

export interface ContractedService extends AbstractLedgerEntry {
    service?: string;
    fte?: number;
}

export interface RateApplication {
    id?: number;
    schoolYear?: string;
    school?: SchoolHead;
    submittedDate?: Date;
    staffSalaries?: StaffSalary[];
    benefits?: Benefit[];
    allowableExpenses?: AllowableExpense[];
    contractedServices?: ContractedService[];
    revenues?: Revenue[];
    expenses?: AbstractLedgerEntry[];
}

export interface Revenue extends AbstractLedgerEntry {
    revenueSource?: string;
}

export interface SchoolHead {
    id?: number;
    name?: string;
    phone?: string;
    email?: string;
    school?: SchoolProfile;
    rateApplications?: RateApplication[];
}

export interface SchoolProfile {
    id?: number;
    name?: string;
    address?: string;
    head?: SchoolHead;
    approvedCapacity?: number;
    priorYearEnrollment?: number;
    expectedEnrollment?: number;
}

export interface StaffSalary extends AbstractLedgerEntry {
    positionTitle?: string;
    staffCategory?: string;
    status?: string;
    fte?: number;
    speEdu?: number;
    payRate?: number;
}
