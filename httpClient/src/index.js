import RegisterComponent from './components/RegisterComponent.js';
import LoginComponent from './components/LoginComponent.js';
import PhotosComponent from './components/PhotosComponent.js';
import AddPhotoComponent from './components/AddPhotoComponent.js';
import CategoryComponent from './components/CategoryComponent.js';

let ControlBar = {
    photos: {
        name: 'MY PHOTOS',
        display: true,
        component: PhotosComponent,
        eventData: {}
    },
    addPhoto: {
        name: "ADD PHOTO",
        display: true,
        component: AddPhotoComponent,
        eventData: {}
    },
    register: {
        name: 'REGISTER',
        display: true,
        component: RegisterComponent,
        eventData: {}
    },
    login: {
        name: 'LOGIN',
        display: true,
        component: LoginComponent,
        eventData: {}
    },
    logout: {
        name: 'LOGOUT',
        display: true,
    }
}

let RoutesComponents = {
    error: {
        name: 'ERROR',
        component: '',
        eventData: {}
    },
    registerSuccess: {
        name: "REGISTER SUCCESS",
        component: '',
        eventData: {}
    },
    photos: {
        name: 'MY PHOTOS',
        component: PhotosComponent,
        eventData: {}
    },
    login: {
        name: 'LOGIN',
        component: LoginComponent,
        eventData: {}
    },
    category: {
        name: 'CATEGORY',
        component: CategoryComponent,
        eventData: {}
    }
}

export {ControlBar, RoutesComponents};