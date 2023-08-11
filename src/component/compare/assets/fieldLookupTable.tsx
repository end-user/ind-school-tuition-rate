// These are the 'prettified' versions of the fields to be displayed in the Compare and Update screen
const fieldLookupTable =
    {
        firstName: {
            label: "First Name",
            type: "text",
            required: true
        },
        lastName: {
            label: "Last Name",
            type: "text",
            required: true
        },
        sex: {
            label: "Sex",
            type: "radio",
            required: true,
            options: ['M', 'F']
        },
        birthDate: {
            label: "Birth Date",
            type: "date",
            required: true
        },
        usEntryDate: {
            label: "US Entry Date",
            type: 'date',
            required: true
        },
        firstUSEnrollmentDate: {
            label: "First Enrollment Date (US)",
            type: "date",
            required: true
        },
        enrollingAt: {
            label: "Enrolling At (School Code)",
            type: "select",
            optionsUrl: '/public/schools',
            required: true
        },
        firstVtEnrollmentDate: {
            label: "First VT Enrollment Date",
            type: "date",
            required: true
        },
        enrollingAtDate: {
            label: "1st School Year for Current School",
            type: "text",
            required: true
        },
        // responseId: {
        //     label: "Survey ID",
        //     type: "number",
        //     required: true
        // },
        gradeEntering: {
            label: "Entering Grade",
            type: "select",
            required: true,
            options: ["PreK", "K", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((l) => ({
                value: l,
                label: l,
            })),
            optionsUrl: null
        },
        screenerName: {
            label: "Screener Name",
            type: "none",
            required: true
        },
        screenedDate: {
            label: "Date of Screening",
            type: "none",
            required: true
        },
        permNumber: {
            label: "PERM Number",
            type: "text",
            required: true,
            isShown: true,
            isDisabled: true
        },
        countryOfBirth: {
            label: "Country of Birth",
            type: "select"
        },
        // entryDate: {
        //     label: "Form Entry Date",
        //     type: "none",
        //     required: true
        // }
        dateFieldsToFormat: ['birthDate', 'usEntryDate', 'firstUSEnrollmentDate', 'firstVtEnrollmentDate', 'screenedDate', 'enrollingAtDate']
        ,
        fieldOrder: ['firstName', 'lastName', 'sex', 'birthDate', 'countryOfBirth', 'usEntryDate', 'firstUSEnrollmentDate', 'enrollingAt', 'enrollingAtDate', 'gradeEntering', 'permNumber', 'screenerName', 'screenedDate',]

    }


export default fieldLookupTable