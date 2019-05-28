let baseUrl = 'http://localhost:58271/api';

export default {
    register: {
        newUser: `${baseUrl}/register/newuser`,
        getAllUsers: `${baseUrl}/register/GetAllUsers`
    },

    login: {
        signIn: `${baseUrl}/login/signin`,
        isLoggedIn: `${baseUrl}/login/IsLoggedIn`,
        logout: `${baseUrl}/login/logout`
    },

    photo: {
        addPhoto: `${baseUrl}/photo/addphoto`,
        getPhotos: `${baseUrl}/photo/GetPhotos`,
        getUncategorizedPhotos: `${baseUrl}/photo/GetUncategorizedPhotos`,
        getPhotosForCategory: `${baseUrl}/photo/GetPhotosForCategory`,
        editPhoto: `${baseUrl}/photo/EditPhoto`,
        deletePhoto: `${baseUrl}/photo/DeletePhoto`,
        getCategories: `${baseUrl}/photo/GetCategories`,
        deleteCategory: `${baseUrl}/photo/DeleteCategory`,
        editCategory: `${baseUrl}/photo/EditCategory`,
    },

    share: {
        getSharedContent: `${baseUrl}/share/GetSharedContent`,
        getSharedImageLink: `${baseUrl}/share/GetSharedImageLink`,
        getSharedCategoryLink: `${baseUrl}/share/GetSharedCategoryLink`,
    }
}