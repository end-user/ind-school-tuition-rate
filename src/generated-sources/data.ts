/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2023-05-04 17:06:10.

export interface AbstractItem extends AbstractLedgerEntry {
    quantity: number;
    unitCost: number;
}

export interface AbstractLedgerEntry {
    id: number;
    actual: number;
    budget: number;
    rateApplication: RateApplication;
    comments: Comment[];
}

export interface Benefit extends AbstractLedgerEntry {
    benefit: string;
}

export interface Comment {
    id: number;
    comment: string;
    entry: AbstractLedgerEntry;
}

export interface ContractedService extends AbstractLedgerEntry {
    service: string;
    provider: string;
}

export interface Equipment extends AbstractItem {
    equipment: string;
}

export interface OperationalExpense extends AbstractItem {
    item: string;
}

export interface RateApplication {
    id: number;
    schoolYear: string;
    school: SchoolHead;
    staffSalaries: StaffSalary[];
    benefits: Benefit[];
    travels: Travel[];
    contractedServices: ContractedService[];
    supplies: Supply[];
    equipment: Equipment[];
    operationalExpenses: OperationalExpense[];
    revenues: Revenue[];
    expenses: AbstractLedgerEntry[];
}

export interface Revenue extends AbstractLedgerEntry {
    revenueSource: string;
}

export interface SchoolHead {
    id: number;
    name: string;
    phone: string;
    email: string;
    rateApplications: RateApplication[];
}

export interface SchoolProfile {
    id: number;
    name: string;
    address: string;
    head: SchoolHead;
    approvedCapacity: number;
    priorYearEnrollment: number;
    expectedEnrollment: number;
}

export interface StaffSalary extends AbstractLedgerEntry {
    positionTitle: string;
    staffCategory: string;
    status: string;
    fte: number;
    speEdu: number;
    payRate: number;
}

export interface Supply extends AbstractItem {
    supply: string;
}

export interface Travel extends AbstractLedgerEntry {
    purpose: string;
    origin: string;
    destination: string;
    transportationType: string;
}
