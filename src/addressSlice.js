import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fields: [
        {
            id: 'firstname',
            type: 'text',
            title: 'First Name',
            value: '',
            status: true,
            width: 'half',
            class: '',
            validation: ['required'],
            validate: false,
            validateError: "",
            options: []
        },
        {
            id: 'lastname',
            type: 'text',
            title: 'Last Name',
            value: '',
            status: true,
            width: 'half',
            class: '',
            validation: ['required'],
            validate: false,
            validateError: "",
            options: []
        },
        {
            id: 'street',
            type: 'text',
            title: 'Street',
            value: '',
            status: true,
            width: 'half',
            class: '',
            validation: ['required'],
            validate: false,
            validateError: "",
            options: []
        },
        {
            id: 'city',
            type: 'text',
            title: 'City',
            value: '',
            status: true,
            width: 'half',
            class: '',
            validation: ['required'],
            validate: false,
            validateError: "",
            options: []
        },
        {
            id: 'country',
            type: 'select',
            title: 'Country',
            value: '',
            status: true,
            width: 'half',
            class: '',
            validation: ['required'],
            validate: false,
            validateError: "",
            options: [
                { text: "India", value: "in" },
                { text: "United State", value: "us" }
            ]
        },
        {
            id: 'state',
            type: 'select',
            title: 'State',
            value: '',
            status: true,
            width: 'half',
            class: '',
            validation: ['required'],
            validate: false,
            validateError: "",
            options: [
                { text: "Gujarat", value: "guj" },
                { text: "Delhi", value: "del" }
            ]
        },
        {
            id: 'zipcode',
            type: 'text',
            title: 'Zipcode',
            value: '',
            status: true,
            width: 'half',
            class: '',
            validation: ['required', 'number'],
            validate: false,
            validateError: "",
            options: []
        },
        {
            id: 'mobile',
            type: 'text',
            title: 'Mobile',
            value: '',
            status: true,
            width: 'half',
            class: '',
            validation: ['required', 'number'],
            validate: false,
            validateError: "",
            options: []
        },
    ],
    buttons: [
        {
            id: 'submit',
            type: 'submit',
            title: 'Submit',
            disabled: true
        }
    ]
};

function validateField(field) {
    if (field.validation.includes('required') && !field.value) {
        return false;
    }
    if (field.validation.includes('number') && !/^\d+$/.test(field.value)) {
        return false;
    }
    return true;
}

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        updateField: (state, action) => {
            const field = state.fields.find(f => f.id === action.payload.id);
            if (field) {
                field.value = action.payload.value;
                field.validate = validateField(field);
                field.validateError = field.validate ? "" : `${field.title} is ${field.validation.includes('number') ? 'not a valid number' : 'required'}`;
            }
            const allFieldsValid = state.fields.every(f => f.validate);
            state.buttons[0].disabled = !allFieldsValid;
        },
        updateCountry: (state, action) => {
            const countryField = state.fields.find(f => f.id === 'country');
            const stateField = state.fields.find(f => f.id === 'state');
            if (countryField && stateField) {
                countryField.value = action.payload;
                stateField.options = action.payload === 'us'
                    ? [{ text: "California", value: "cal" }, { text: "Arkansas", value: "ark" }]
                    : [{ text: "Gujarat", value: "guj" }, { text: "Delhi", value: "del" }];
                stateField.value = '';
                stateField.validate = false;
                stateField.validateError = "State is required";
            }
        },
    },
});

export const { updateField, updateCountry } = addressSlice.actions;
export default addressSlice.reducer;