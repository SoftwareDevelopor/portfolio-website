const mongoose = require('mongoose');
const ModalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: async function (v) {
                const count = await this.constructor.findOne({ name: v });
            },
            message: (props) => `${props.value} already exists!`,
        },
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    created_At: {
        type: Date,
        default: Date.now()
    },
    deleted_at: {
        type: Date,
        default: Date.now()
    }

})
const ContactModal = mongoose.model('Contacts', ModalSchema);
module.exports = ContactModal;
