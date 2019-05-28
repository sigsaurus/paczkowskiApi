import BaseInput from './VInput.js';

export default {
    components: {
        BaseInput
    },
    props: {
        title: {
            type: String,
            required: true
        },
        buttonLabel: {
            type: String,
            required: true
        },
        formInputs: {
            label: String,
            inputType: String,
            placeholder: String,
            isValid: {
                type: Boolean,
                default() {
                    return true;
                }
            },
            value: String
        },
        formValid: {
            type: Boolean,
            default() {
                return true;
            }
        }
    },
    template: `
    <div class="form-data">
        <h2 class="w3-blue-grey" v-once>{{ title }}</h2>
        <base-input v-for="(formInput, name) in formInputs"
            v-bind="formInput"
            v-model="formInput.value"
            @input="$emit('input')"
            :key="name"
        ></base-input>
        <button class="w3-btn w3-blue-grey"
            @click="$emit('submit')"
            :disabled="!formValid"
            type="button">
            {{ buttonLabel }}
        </button>
    </div>
    `
}