import VModal from './VModal.js';
import Services from '../services.js';

export default {
    components: {
        VModal
    },
    props: {
        categoryValue: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        modalId: {
            type: String,
            required: true
        }
    },
    template: `
    <v-modal ref="vmodal"
        :title="modalTitle"
        :inputs="dataInputs"
        :modalId="modalId"
        @submit="submit"
    ></v-modal>
    `,

    data() {
        return {
            dataInputs: {
                category: {
                    label: 'Category',
                    inputType: 'text',
                    value: this.categoryValue
                }
            },
            modalTitle: 'EDIT CATEGORY',
            oldCategory: this.categoryValue
        }
    },

    methods: {
        submit(data) {
            let vm = this;
            if (data.category.value == this.oldCategory) {
                vm.closeModal()
                return;
            }
                
            let request = {
                newCategory: data.category.value,
                oldCategory: this.oldCategory
            }
            console.log(request);

            $.ajax({
                type: 'PUT',
                contentType: 'application/json',
                xhrFields: { withCredentials: true },
                url: Services.photo.editCategory,
                data: JSON.stringify(request),
                success: function (data) {
                    alert(data);
                    vm.closeModal();
                    vm.$emit('update', vm.eventData);
                },
                error: function (jqXHR, textStatus, errorThrown) { console.log(`${jqXHR} ${textStatus} ${errorThrown}`); }
            });            
        },

        closeModal() {
            this.$refs.vmodal.close();
        }
    },

    watch: {
        categoryValue(newValue) {
            this.dataInputs.category.value = newValue;
            this.oldCategory = newValue;
        }
    },

    computed: {
        eventData() {
            return {
                index: this.index,
                category: this.dataInputs.category.value
            }
        }
    }
}