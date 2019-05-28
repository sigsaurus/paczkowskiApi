import BaseInput from "./VInput.js";

export default {
    components: {
        BaseInput
    },
    props: {
        title: {
            type: String,
            required: true
        },
        inputs: {
            type: Object,
            required: true
        },
        image: {
            type: String,
            required: false,
            default() {
                return '';
            }
        },
        modalId: {
            type: String,
            required: true
        }

    },
    template: `
    <div :id="modalId" class="w3-modal">
        <div class="w3-modal-content w3-animate-top">
            <header class="w3-container w3-blue-grey">
                <span @click="close" class="w3-button w3-display-topright">&times;</span>
                <h2>{{ title }}</h2>
            </header>
            
            <div class="w3-container">
                <base-input v-for="dataInput in dataInputs"
                    v-bind="dataInput"
                    v-model="dataInput.value"
                    :key="dataInput.label"
                ></base-input>
            </div>

            <div class="img-preview" v-if="image !== ''">
                <img :src="image" />
            </div>

            <footer class="w3-container">
                <button @click="submit" class="w3-btn w3-blue-grey">{{ buttonLabel }}</button>            
            </footer>
        </div>
    </div>
    `,

    data() {
        return {
            dataInputs: this.inputs,
            buttonLabel: 'Submit'
        }
    },

    methods: {
        close() {
            document.getElementById(this.modalId).style.display = 'none';
        },

        submit() {
            this.$emit('submit', this.dataInputs);
        }
    }
}