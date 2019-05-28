import Services from '../services.js';
import AddPhotoForm from './AddPhotoForm.js';

export default {
    components: {
        AddPhotoForm
    },
    template: `
    <add-photo-form ref="photoForm"
        v-bind="formAttr"
        @submit="postToApi">
    </add-photo-form>
    `,

    data() {
        return {
            formAttr: {
                title: 'Upload Photo',
                buttonLabel: 'Submit'
            }
        }
    },

    methods: {
        postToApi(imageInfo) {
            let vm = this;
            let request = {
                displayName: imageInfo.imageName,
                fileName: imageInfo.fileName,
                category: imageInfo.category,
                image: imageInfo.imageDataUrl.split(',')[1]
            }
            console.log(request);
            $.ajax({
                method: 'POST',
                xhrFields: { withCredentials: true },
                url: Services.photo.addPhoto,
                contentType: 'application/json',
                data: JSON.stringify(request),
                success: function (data) {
                    if (data) {
                        alert('SUCCESS');
                        vm.$refs.photoForm.reset();
                    } else {
                        alert('FAIL');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(`${textStatus} ${errorThrown}`); 
                }
            });
        }
    }
}