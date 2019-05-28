import Services from './services.js';

let Commons = {
    isLoggedIn() {
        let isLoggedIn = false;
        $.ajax({
            method: 'POST',
            async: false,
            xhrFields: { withCredentials: true },
            url: Services.login.isLoggedIn,
            success: function (data) {
                console.log(data);
                isLoggedIn = data.isLoggedIn;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(`${textStatus} ${errorThrown}`);
                isLoggedIn = true;
            }
        });

        return isLoggedIn;
    },

    logout() {
        $.ajax({
            method: 'POST',
            xhrFields: { withCredentials: true },
            url: Services.login.logout,
            success: function (data) {
                console.log(`logout: ${data}`);
            },
            error: function (jqXHR, textStatus, errorThrown) { console.log(`${textStatus} ${errorThrown}`); }
        });
    }
}

export default Commons;