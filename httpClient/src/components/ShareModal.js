export default {
    props: {
        title: {
            type: String,
            required: true
        },
        modalId: {
            type: String,
            required: true
        },
        shareLink: { 
            type: String,
            required: true
        }
    },
    template: `
    <div :id="modalId" class="w3-modal">
        <div class="w3-modal-content w3-animate-top">
            <header class="w3-container w3-blue-grey">
                <span @click="close" class="w3-button w3-display-topright">&times;</span>
                <h2>{{ title }}</h2>
            </header>
            
            <div class="w3-container">
                <input class="w3-input w3-border" type="text" id="shareLink" :value="shareLink" />
            </div>

            <footer class="w3-container">
                <button @click="copyToClipBoard" class="w3-btn w3-blue-grey">{{ buttonLabel }}</button>            
            </footer>
        </div>
    </div>
    `,

    data() {
        return {
            buttonLabel: 'Copy'
        }
    },

    methods: {
        close() {
            document.getElementById(this.modalId).style.display = 'none';
        },
        copyToClipBoard() {
            let copyText = document.getElementById('shareLink');
            copyText.select();
            document.execCommand("copy");
            alert('Copied to clipboard');
        }
    }
}