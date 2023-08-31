/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2023-08-31 16:59:59.

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

export interface NetProgramCosts {
    id?: number;
    salaryActuals?: number;
    salaryNet?: number;
    benefitActuals?: number;
    benefitNet?: number;
    expenseActuals?: number;
    expenseNet?: number;
    serviceActuals?: number;
    serviceNet?: number;
    revenueActuals?: number;
    revenueNet?: number;
}

export interface RateApplication {
    id?: number;
    schoolYear?: string;
    schoolHead?: SchoolHead;
    submittedDate?: Date;
    approvedDate?: Date;
    netProgramCosts?: NetProgramCosts;
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
    schoolProfile?: SchoolProfile;
    rateApplications?: RateApplication[];
}

export interface SchoolProfile {
    id?: number;
    orgId?: string;
    name?: string;
    gradeRange?: string;
    address?: string;
    cityStateZip?: string;
    schoolHead?: SchoolHead;
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
