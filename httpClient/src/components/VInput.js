export default {
    props: {
        label: String,
        inputType: String,
        placeholder: String,
        value: String,
        isValid: {
            type: Boolean,
            default() {
                return true;
            }
        }
    },
    template: `
    <div class="form-row">
        <label class="w3-text-grey" v-once>{{ label }}</label>
        <input class="w3-input"
            :class="['w3-border', { 'data-error': !isValid }]"
            :value="value"
            @input="$emit('input', $event.target.value)"
            :type="inputType"
            :placeholder="placeholder" />
    </div>
    `
}