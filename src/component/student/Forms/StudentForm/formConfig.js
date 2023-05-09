import {date, mixed, number, object, string} from 'yup'

const schema = object().shape({
        firstName: string().trim().required("First Name Required"),
        lastName: string().trim().required("Last Name Required"),
        permNumber: number().required("PERM number required").typeError("PERM number required"),
        sex: mixed().oneOf(['M', 'F'], "Please specify gender"),
        birthDate: date().nullable()
            .max(new Date(), "cannot be a future date")
            .transform((curr, orig) => orig === '' ? null : curr)
            .required("please supply date of birth"),
        countryOfBirth: object({
            code: string().trim().required("Country of birth required"),
            name: string().trim().required("Country of birth required")
        }),
        usEntryDate: mixed().when(
            'countryOfBirth', {
                is: countryOfBirth => countryOfBirth.code === 'US',
                then: string().trim().nullable(),
                otherwise: date().required().typeError("US Entry Date Required")
            }
        ),
        firstUSEnrollmentDate: date()
            .nullable()
            .transform((curr, orig) => orig === '' ? null : curr)
            .required("missing first enrollment date").typeError("First Enrollment Date Required"),

        enrollingAt: string().trim().required("please enter school code").typeError("Please Select School"),
        enrollingAtDate: string().trim().matches(/\d\d\d\d-\d\d\d\d/).nullable().required("Date of Enrollment must be concurrent year (i.e. 2000-2001)"),

        gradeEntering: mixed().oneOf(["PreK", "K", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"], "Please select grade").required("Please select grade"),
        languageContexts: mixed()
    }
)

const formConfig = {
    validationSchema: schema
}
export default formConfig
