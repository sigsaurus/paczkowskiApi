import Services from '../services.js';

export default {
    props: {
        image: {
            type: String,
            required: true
        },
        imageName: {
            type: String,
            required: true
        },
        imageId: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    },
    template: `
    <div class="single-photo">
        <img v-img:title="imageName" :src="dataUrl" alt=":(" />
        <div>
            <button @click="edit" class="w3-btn w3-blue-grey">{{ button.edit }}</button>
            <button @click="$emit('delete', imageData)" class="w3-btn w3-blue-grey">{{ button.delete }}</button>
            <button @click="share" class="w3-btn w3-blue-grey">{{ button.share }}</button>
        </div>        
    </div>
    `,

    data() {
        return {
            imageData: {
                imageName: this.imageName,
                category: this.category,
                imageId: this.imageId,
                image: ''
            },
            dataType: 'data:image/jpeg;base64',
            button: {
                edit: 'Edit',
                delete: 'Delete',
                share: 'Share'
            },
            sharedResource: ''
        }
    },

    methods: {
        edit() {
            this.imageData.image = this.dataUrl;
            this.$emit('edit', this.imageData);
        },

        share() {
            let vm = this;
            let request = {
                photoNum: this.imageData.imageId
            }
            $.ajax({
                method: 'POST',
                contentType: 'application/json',
                xhrFields: { withCredentials: true },
                url: Services.share.getSharedImageLink,
                data: JSON.stringify(request),
                success: function (data) {
                    vm.sharedResource = data;
                    vm.$emit('share', vm.shareLink);
                },
                error: function (jqXHR, textStatus, errorThrown) { console.log(`${jqXHR} ${textStatus} ${errorThrown}`); }
            });
        }
    },

    computed: {
        dataUrl() {
            return `${this.dataType},${this.image}`;
        },

        shareLink() {
            return `${location.href}share?link=${this.sharedResource}`;
        }
    },

    watch: {
        imageName(newValue) {
            this.imageData.imageName = newValue;
        }
    }
}