import BaseInput from './VInput.js';
import FileInput from './VInputFile.js';
import { ImageInfo } from '../dataObjects.js';

export default {
    components: {
        BaseInput,
        FileInput
    },
    props: {
        title: {
            type: String,
            required: true
        },
        buttonLabel: {
            type: String,
            required: true
        }
    },
    template: `
    <div class="form-data">
        <h2 class="w3-blue-grey" v-once>{{ title }}</h2>
        <base-input
            v-bind="nameInputAttr"
            v-model="imageInfo.imageName">
        </base-input>
        <base-input
            v-bind="categoryInputAttr"
            v-model="imageInfo.category">
        </base-input>
        <file-input v-if="!imageInfo.imageDataUrl"
            :label="uploadFileLabel"
            accept="image/jpeg"
            @change="uploadFile">
        </file-input>
        <div class="img-preview" v-else>
            <img :src="imageInfo.imageDataUrl" />
            <button class="w3-btn w3-blue-grey" @click="reset">{{ removeImgae }}</button>
        </div>
        <button
            class="w3-btn w3-blue-grey"
            @click="$emit('submit', imageInfo)"
            type="button"
            :disabled="!valid">
            {{ buttonLabel }}            
        </button>
    </div>
    `,
    data() {
        return {
            imageInfo: new ImageInfo(),
            nameInputAttr: {
                label: "Name",
                inputType: "text"
            },
            categoryInputAttr: {
                label: "Category",
                inputType: "text"
            },
            removeImgae: 'Remove Image',
            uploadFileLabel: 'Click or Drag image to upload'
        }
    },
    methods: {
        uploadFile(files) {
            if (files.length !== 0) {
                this.createImage(files[0]);
            }
        },
        createImage(file) {
            if (file.type !== 'image/jpeg') {
                alert(`Unsuporrted format [${file.type}]. Upload [jpg/jpeg] only`);
                return;
            }
            var reader = new FileReader();
            var vm = this;
            vm.imageInfo.fileName = file.name;
            if (vm.imageInfo.imageName === '')
                vm.imageInfo.imageName = file.name;

            reader.onload = (e) => {
                vm.imageInfo.imageDataUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        reset() {
            this.imageInfo = new ImageInfo();
        }
    },
    computed: {
        valid() {
            return this.imageInfo.imageDataUrl !== '';
        }
    }
}