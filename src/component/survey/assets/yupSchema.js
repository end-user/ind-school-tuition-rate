import { array, date, mixed, object, string } from 'yup'

const schema = object().shape({
  firstName: string().required('missing first name'),
  lastName: string().required('missing last name'),
  birthDate: date()
    .nullable()
    .max(new Date(), 'cannot be a future date')
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required('please supply date of birth'),
  sex: mixed().oneOf(['M', 'F'], 'please specify gender'),
  birthCountry: object({
    label: string().required(),
    value: string().required(),
  }).required('select the country of birth'),
  usEntryDate: date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .when('birthCountry', {
      is: (c) => c && c.value !== 'US',
      then: date()
        .nullable()
        .required('provide date of entry'),
    }),
  firstUSEnrollmentDate: date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required('missing first enrollment date'),
  // language questions
  spokenInHome: array()
    .of(
      object({
        label: string().required(),
        value: string().required(),
      })
    )
    .required('please select one or more languages'),
  // .min(1,"please select one or more languages").of(option),
  usedMostOftenWithChild: array()
    .of(
      object({
        label: string().required(),
        value: string().required(),
      })
    )
    .required('please select a language'),
  favored: array()
    .of(
      object({
        label: string().required(),
        value: string().required(),
      })
    )
    .required('please select a language'),
  parentLanguages: array()
    .of(
      object({
        label: string().required(),
        value: string().required(),
      })
    )
    .required('please select a language'),
  firstLearned: array()
    .of(
      object({
        label: string().required(),
        value: string().required(),
      })
    )
    .required('please select a language'),
  enrollingAt: object({
    label: string().required(),
    value: string().required(),
  }).required('please choose school name'),
  enrollingAtDate: date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr)),
  enrollingGrade: object({
    label: string().required(),
    value: string().required(),
  }).required('please specify the grade'),
  wasScreened: mixed().oneOf(['Y', 'N'], 'missing screening response'),
  screenerName: string().when('wasScreened', {
    is: (c) => c && c === 'Y',
    then: string(),
  }),
  screenedDate: date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr)),
  isImmigrant: mixed().when('wasScreened', {
    is: (c) => c && c === 'N',
    then: mixed().oneOf(['Y', 'N'], 'please specify immigrant status'),
  }),
})

export default schema
