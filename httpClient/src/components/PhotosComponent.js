import Services from '../services.js';
import PhotoViewComponent from './PhotoViewComponent.js';
import EditCategoryModal from './EditCategoryModal.js';
import EditPhotoModal from './EditPhotoModal.js';
import ShareModal from './ShareModal.js';

export default {
    components: {
        PhotoViewComponent,
        EditCategoryModal,
        EditPhotoModal,
        ShareModal
    },
    props: {
        displayCategories: {
            type: Boolean,
            default() {
                return true;
            }
        },
        category: {
            type: String,
            default() {
                return '';
            }
        }
    },
    template: `
    <div class="photo-display">
        <h2 class="w3-blue-grey" v-once>{{ text.title }}</h2>
        <div class="categories-container" v-if="displayCategories">
            <h3 class="w3-blue-grey">{{ text.categoriesTitle }}</h3>
            <div class="category" v-for="category, index in categories">
                <span>{{ category.name }}</span>
                <img @click="showCategory(category.name)" src="images/folder.png" />
                <button @click="editCategory(category.name, index)" class="w3-btn w3-blue-grey">{{ text.edit }}</button>
                <button @click="deleteCategory(category.name, index)" class="w3-btn w3-blue-grey">{{ text.delete }}</button>
                <button @click="shareCategory(category.name)" class="w3-btn w3-blue-grey">{{ text.share }}</button>
            </div>
            <div v-if="categories.length === 0">
                <h4>{{ text.noCategories }}</h4>
            </div>
            <edit-category-modal
                :categoryValue="categoryModal.category"
                :index="categoryModal.index"
                :modalId="modalId.category"
                @update="updateCategoryView"
            ></edit-category-modal>
        </div>
        <div class="photos-container">
            <h3 class="w3-blue-grey">{{ photosTitle }}</h3>
            <photo-view-component v-for="image, index in images"
                :image="image.image"
                :imageName="image.displayName"
                :imageId="image.photoNum"
                :category="image.category"
                :key="image.photoNum"
                @edit="editPhoto($event, index)"
                @delete="deletePhoto($event, index)"
                @share="shareContent"
            ></photo-view-component>
            <edit-photo-modal
                :modalId="modalId.photo"
                :imageId="photoModal.imageId"
                :image="photoModal.image"
                :imageNameValue="photoModal.imageName"
                :categoryValue="photoModal.category"
                :index="photoModal.index"
                @update="updatePhotoView"
            ></edit-photo-modal>
        </div>
        <share-modal
            :title="shareModal.title"
            :modalId="shareModal.id"
            :shareLink="shareModal.shareLink"
        ></share-modal>
    </div>
    `,

    data () {
        return {
            text: {
                title: 'MY PHOTOS',
                categoriesTitle: 'CATEGORIES',
                unCategoriesTitle: 'NOT CATEGORIZED',
                edit: 'Edit',
                delete: 'Delete',
                share: 'Share',
                noCategories: 'NO CATEGORIES :(',
                noImages: 'NO IMAGES :('
            },
            images: [],
            categories: [],
            categoryModal: {
                category: '',
                index: 0
            },
            photoModal: {
                image: '',
                category: '',
                imageName: '',
                imageId: '',
                index: 0
            },
            modalId: {
                category: 'categoryModal',
                photo: 'photoModal'
            },
            shareModal: {
                id: 'shareModal',
                title: 'LINK TO SHARE',
                shareLink: ''
            }
        }
    },

    methods: {
        deletePhoto(imageData, index) {
            let vm = this;
            $.ajax({
                method: 'DELETE',
                contentType: 'application/json',
                xhrFields: { withCredentials: true },
                url: Services.photo.deletePhoto,
                data: JSON.stringify({ photoNum: imageData.imageId }),
                success: function (data) {
                    if (data) {
                        alert('SUCCESS');
                        vm.$delete(vm.images, index);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) { console.log(`${jqXHR} ${textStatus} ${errorThrown}`); }
            });
        },

        editPhoto(imageData, index) {
            console.log(imageData);
            this.photoModal = imageData;
            this.photoModal.index = index;
            document.getElementById(this.modalId.photo).style.display = 'block';
        },

        updatePhotoView(data) {
            console.log(data);
            let photo = this.images[data.index];
            photo.displayName = data.name;
            if (photo.category != data.category)
                this.$delete(this.images, data.index);
        },

        shareContent(shareLink) {
            console.log(shareLink);
            this.shareModal.shareLink = shareLink;
            document.getElementById(this.shareModal.id).style.display = 'block';
        },

        deleteCategory(category, index) {
            let vm = this;
            $.ajax({
                method: 'DELETE',
                contentType: 'application/json',
                xhrFields: { withCredentials: true },
                url: Services.photo.deleteCategory,
                data: JSON.stringify({ name: category }),
                success: function (data) {
                    if (data) {
                        alert('SUCCESS');
                        vm.$delete(vm.categories, index);
                    } else {
                        alert('FAIL');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) { console.log(`${jqXHR} ${textStatus} ${errorThrown}`); }
            });
        },

        editCategory(category, index) {
            this.categoryModal.category = category;            
            this.categoryModal.index = index;
            document.getElementById(this.modalId.category).style.display = 'block';
        },

        updateCategoryView(data) {
            this.categories[data.index].name = data.category;
        },

        shareCategory(category) {
            let vm = this;
            let request = {
                category: category
            }
            $.ajax({
                method: 'POST',
                contentType: 'application/json',
                xhrFields: { withCredentials: true },
                url: Services.share.getSharedCategoryLink,
                data: JSON.stringify(request),
                success: function (data) {
                    let shareLink = `${location.href}share?link=${data}`;
                    vm.shareContent(shareLink);
                },
                error: function (jqXHR, textStatus, errorThrown) { console.log(`${jqXHR} ${textStatus} ${errorThrown}`); }
            });
        },

        showCategory(category) {
            let data = {
                isLoggedIn: true,
                component: 'category',
                eventData: { category }
            }
            this.$emit('component-change', data);
        },

        getCategories() {
            let vm = this;
            $.ajax({
                method: 'GET',
                xhrFields: { withCredentials: true },
                url: Services.photo.getCategories,
                success: function (data) {
                    console.log(data);
                    vm.categories = data;
                },
                error: function (jqXHR, textStatus, errorThrown) { console.log(`${jqXHR} ${textStatus} ${errorThrown}`); }
            });
        },

        getPhotos() {
            let vm = this;
            let url = this.getImagesUrl;
            $.ajax({
                method: 'GET',
                xhrFields: { withCredentials: true },
                url: url,
                success: function (data) {
                    console.log(data);
                    vm.images = data;
                },
                error: function (jqXHR, textStatus, errorThrown) { console.log(`${jqXHR} ${textStatus} ${errorThrown}`); }
            });
        }
    },

    computed: {
        getImagesUrl() {
            if (!this.category)
                return Services.photo.getUncategorizedPhotos;
            return Services.photo.getPhotosForCategory + `/${this.category}`;
        },

        photosTitle() {
            if (this.category !== '')
                return this.category;
            return this.text.unCategoriesTitle;
        }
    },

    mounted: function () {
        if (this.displayCategories)
            this.getCategories();
        this.getPhotos();
    },
}