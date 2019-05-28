import Services from '../services.js';
import BaseForm from './VForm.js';
import Commons from '../commons.js';

export default {
    components: {
        BaseForm,
    },
    template: `
    <base-form
        :title="title"
        :button-label="buttonLabel"
        :form-inputs="formInputs"
        @submit="postToApi"
    ></base-form>
    `,

    data: function () {
        return {
            title: "Login to Your account",
            buttonLabel: "Sign In",
            formInputs: {
                email: { label: "Email", inputType: "email", placeholder: 'ex. Johny@photos.com', value: '' },
                password: { label: "Password", inputType: "password", placeholder: '', value: '' },
            }
        };
    },

    methods: {
        postToApi: function () {
            let vm = this;
            let request = {
                email: this.formInputs.email.value,
                password: this.formInputs.password.value
            }

            console.log(request);

            $.ajax({
                method: 'POST',
                contentType: 'application/json',
                xhrFields: { withCredentials: true },
                url: Services.login.signIn,
                data: JSON.stringify(request),
                success: function (data) {
                    alert('SUCCESS');
                    console.log(data);
                    vm.$emit('component-change', { isLoggedIn: true, component: 'photos' })
                },
                error: function (jqXHR, textStatus, errorThrown) { console.log(`${textStatus} ${errorThrown}`); }
            });
        }
    },

    mounted() {
        Commons.logout();
    }
}