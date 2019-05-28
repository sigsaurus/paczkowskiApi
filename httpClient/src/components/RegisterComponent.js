import Services from '../services.js';
import BaseForm from './VForm.js';

export default {
    components: {
        BaseForm,
    },
    template: `
    <base-form
        :title="title"
        :button-label="buttonLabel"
        :form-inputs="formInputs"
        :form-valid="formValid"
        @submit="postToApi"
        @input="fieldValidation"
    ></base-form>
    `,

    data: function () {
        return {
            title: "Create Account",
            buttonLabel: "Register",
            formInputs: {
                name: { label: "Name", inputType: "text", placeholder: 'ex. Johny', value: '' },
                email: { label: "Email", inputType: "email", placeholder: 'ex. Johny@photos.com', isValid: true, value: '' },
                password: { label: "Password", inputType: "password", placeholder: '', isValid: true, value: '' },
                confirmPassword: { label: "Confirm Password", inputType: "password", placeholder: '', isValid: true, value: '' }
            }
        }
    },

    methods: {
        postToApi: function () {
            let vm = this;
            let request = {
                name: this.formInputs.name.value,
                email: this.formInputs.email.value,
                password: this.formInputs.password.value
            }

            console.log(request);

            $.ajax({
                method: 'POST',
                contentType: 'application/json',
                url: Services.register.newUser,
                data: JSON.stringify(request),
                success: function (data) {
                    alert(`SUCCESS ${data}`);
                    if (data === 'ok')
                        vm.$emit('component-change', { isLoggedIn: false, component: 'login' })
                },
                error: function (jqXHR, textStatus, errorThrown) { alert(`${textStatus} ${errorThrown}`); }
            });
        },

        fieldValidation() {
            if (this.formInputs.email.value === '')
                this.formInputs.email.isValid = false;
            else
                this.formInputs.email.isValid = true;

            if (this.formInputs.password.value !== ''
                && (this.formInputs.password.value !== this.formInputs.confirmPassword.value)) {
                this.formInputs.confirmPassword.isValid = false;
            } else {
                this.formInputs.confirmPassword.isValid = true;
            }
        }
    },

    computed: {
        formValid() {
            return this.formInputs.password.value !== ''
                && (this.formInputs.password.value === this.formInputs.confirmPassword.value)
                && this.formInputs.email.value !== ''
        }
    }
}