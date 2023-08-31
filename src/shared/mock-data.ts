import {RateApplication, SchoolHead} from "./ts-model-data.ts";

export const mockSchoolHead: SchoolHead =
    {
        id: 83,
        name: 'John Smith',
        email: 'jsmith@example.com',
        schoolProfile: {
            orgId: 'IS044',
            name: 'LONG TRAIL SCHOOL',
            gradeRange: '6-12',
            address: '1045 KIRBY HOLLOW RD',
            cityStateZip: 'DORSET, VT 05251'
        }

    }
export const rateApplications: RateApplication[] =
    [
        {
            id: 1,
            schoolYear: '2022',
            schoolHead: {
                id: 322,
                name: 'John Smith',
                email: 'jsmith@example.com',
                schoolProfile: {
                    orgId: 'IS295',
                    name: 'BRIGHTALITY',
                    gradeRange: '6-12',
                    address: '448 Swanton Road, Suite 300',
                    cityStateZip: 'St Albans, VT 05478'

                }
            },
            submittedDate: new Date('5/28/2023'),
            netProgramCosts:{
                salaryActuals:35000,
                salaryNet:36000,

            },
            staffSalaries: [{
                id: 510,
                staffCategory: 'staff',
                status: 'employed',
                fte: 1,
                speEdu: 0,
                positionTitle: 'English Instructor',
                payRate: 60000,
                actual: 53535,
                budget: 55690
            }],
            allowableExpenses: [{
                expense: 'Postage',
                actual: 611,
                budget: 680
            }],
            benefits: [
                {benefit: 'FICA', actual: 450, budget: 500},
                {benefit: 'M', actual: 150, budget: 230, comments: [{comment: 'not a valid benefit'}]}
            ],
            revenues: [
                {revenueSource: 'Grant', actual: 1500, budget: 0}
            ]
        },


        {
            id: 15,
            schoolYear: '2023',
            schoolHead: {
                id: 128,
                name: 'William Smith',
                email: 'wsmith@example.com',
                schoolProfile: {
                    name: 'ST PAULS ELEMENTARY SCHOOL',
                    orgId: 'IS077',
                    gradeRange: 'K-8',
                    address: '54 EASTERN AVE',
                    cityStateZip: 'BARTON, VT 05822'
                }
            },
            submittedDate: new Date('5/31/2023')
        },
        {
            id: 20,
            schoolYear: '2022',
            schoolHead: {
                id: 83,
                name: 'Patricia Smith',
                email: 'psmith@example.com',
                schoolProfile: {
                    orgId: 'IS106',
                    name: 'RUTLAND AREA CHRISTIAN SCHOOL',
                    gradeRange: 'k-12',
                    address: '112 LINCOLN AVENUE, STATION A',
                    cityStateZip: 'RUTLAND, VT 05701'

                }
            },
            submittedDate: new Date('6/4/2023')
        }]