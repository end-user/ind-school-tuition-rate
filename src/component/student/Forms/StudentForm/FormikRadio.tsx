import React from 'react';
import { useField, Field } from 'formik';
import { Label, FormGroup } from 'reactstrap';


export default function FormikRadio({ label, ...props }) {
    const [field] = useField(props)
    return (
        <FormGroup check>
            <Label >
                <Field {...field}{...props} />{' '}
                {label}
            </Label>
        </FormGroup>
    )
}
