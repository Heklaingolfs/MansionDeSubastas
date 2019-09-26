const Schema = require('mongoose').Schema;

// Schema fyrir viðskiptavini

module.exports = new Schema(

{
    // Nafn viðskiptavinar
    name: { type: String, required: true },

    // Notendanafn viðskiptavinar fyrir uppboð
    username: { type: String, required: true },

    // Tölvupóstur viðskiptavinar
    email: { type: String, required: true },

    // Heimilisfang viðskiptavinar
    address: { type: String, required: true },

}, { collection: 'customers' });
