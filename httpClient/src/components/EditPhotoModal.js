import VModal from './VModal.js';
import Services from '../services.js';

export default {
    components: {
        VModal
    },
    props: {
        imageId: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        imageNameValue: {
            type: String,
            required: true
        },
        categoryValue: {
            type: String,
            required: true
        },
        modalId: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    template: `
    <v-modal ref="vmodal"
        :title="modalTitle"
        :inputs="dataInputs"
        :image="localImage"
        :modalId="modalId"
        @submit="submit"
    ></v-modal>
    `,

    data() {
        return {
            dataInputs: {
                imageName: {
                    label: 'Name',
                    inputType: 'text',
                    value: this.imageNameValue
                },
                category: {
                    label: 'Category',
                    inputType: 'text',
                    value: this.categoryValue
                }
            },
            modalTitle: 'EDIT PHOTO',
            localImage: this.image
        }
    },

    methods: {
        submit(data) {
            let vm = this;
            console.log(data);
            
            let request = {
                photoNum: this.imageId,
                category: data.category.value,
                displayName: data.imageName.value,
            }
            console.log(request);

            $.ajax({
                type: 'PUT',
                contentType: 'application/json',
                xhrFields: { withCredentials: true },
                url: Services.photo.editPhoto,
                data: JSON.stringify(request),
                success: function (data) {
                    if (data) {
                        alert('SUCCESS');
                        vm.closeModal();
                        vm.$emit('update', vm.eventData);
                    }                    
                },
                error: function (jqXHR, textStatus, errorThrown) { console.log(`${jqXHR} ${textStatus} ${errorThrown}`); }
            });
        },

        closeModal() {
            this.$refs.vmodal.close();
        }
    },

    watch: {
        imageNameValue(newValue) {
            this.dataInputs.imageName.value = newValue;
        },
        categoryValue(newValue) {
            this.dataInputs.category.value = newValue;
        },
        image(newValue) {
            this.localImage = newValue;
        }
    },

    computed: {
        eventData() {
            return {
                category: this.dataInputs.category.value,
                name: this.dataInputs.imageName.value,
                index: this.index
            }
        }
    }
}