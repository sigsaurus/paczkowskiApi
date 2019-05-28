import PhotosComponent from './PhotosComponent.js';

export default {
    components: {
        PhotosComponent
    },
    props: {
        eventData: {
            type: Object,
            required: true
        }
    },    
    template: `
    <photos-component
        :displayCategories="displayCategories"
        :category="eventData.category"
    ></photos-component>
    `,

    data () {
        return {
            displayCategories: false
        }
    },
}