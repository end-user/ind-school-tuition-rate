import {RateApplication, SchoolHead, SchoolProfile} from "./ts-model-data.ts";

export const mockSchoolList: SchoolProfile[] = [
    {name: 'CENTERPOINT', approvedCapacity: 13, orgId: 'IS999'},
    {name: 'ORCHARD VALLEY WALDORF SCHOOL', approvedCapacity: 36, orgId: 'IS109'},
    {name: 'PACEM SCHOOL', approvedCapacity: 24, orgId: 'IS252'},
    {name: 'PUTNEY SCHOOL', approvedCapacity: 58, orgId: 'IS062'},
    {name: 'ST PAULS ELEMENTARY SCHOOL', approvedCapacity: 65, orgId: 'IS077'}
]
export const mockSchoolHead: SchoolHead[] =
    [{
        id: 83,
        name: 'John Smith',
        email: 'jsmith@example.com',
        schoolProfile: {
            orgId: 'IS044',
            name: 'LONG TRAIL SCHOOL',
            gradeRange: '6-12',
            approvedCapacity: 25,
            address: '1045 KIRBY HOLLOW RD',
            cityStateZip: 'DORSET, VT 05251'
        }
    },
        {
            id: 94, name: 'Joseph Morrison', email: 'morrison@school.edu', schoolProfile: {
                orgId: 'IS035',
                name: 'HILLTOP MONTESSORI SCHOOL',
                gradeRange: 'K-8',
                approvedCapacity: 30,
                address: '99 STAFFORD FARM HILL',
                cityStateZip: 'BRATTLEBORO, VT 05301'

            }
        },
        {id: 113, name: 'Mary', email: 'B2', schoolProfile: {name: 'CENTERPOINT'}},
        {id: 118, name: 'Patricia', email: 'B3', schoolProfile: {name: 'ORCHARD VALLEY WALDORF SCHOOL'}},
        {id: 120, name: 'Elizabeth', email: 'B4', schoolProfile: {name: 'PACEM SCHOOL'}},
        {id: 129, name: 'Eric', email: 'B5', schoolProfile: {name: 'PUTNEY SCHOOL'}},
        {id: 137, name: 'William', email: 'B6', schoolProfile: {name: 'ST PAULS ELEMENTARY SCHOOL'}},

    ]
export const mockRateApplications: RateApplication[] =
    [

        {
            id: 1,
            schoolYear: '2022',
            enrollment: 36,
            schoolHead: {
                id: 322,
                name: 'John Smith',
                email: 'jsmith@example.com',
                schoolProfile: {
                    orgId: 'IS295',
                    name: 'BRIGHTALITY',
                    gradeRange: '6-12',
                    approvedCapacity: 38,
                    address: '448 Swanton Road, Suite 300',
                    cityStateZip: 'St Albans, VT 05478'

                }
            },
            submittedDate: new Date('5/28/2023'),
            netProgramCosts: {
                salaryActuals: 35000,
                salaryNet: 36000,

            },
            staffSalaries: [{
                id: 510,
                status: 'filled',
                genEdu: 50,
                speEdu: 50,
                positionTitle: 'English Instructor',
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
                {benefit: 'M', actual: 150, budget: 230, comment: 'not a valid benefit'}
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
        }
    ]