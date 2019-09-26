const Schema = require('mongoose').Schema;

// schema fyrir tilboðsuppboð

module.exports = new Schema(

{
    // Auðkenni uppboðs fyrir tilboð 
    auctionId: { type: Schema.Types.ObjectId, required: true },

    // Auðkenni viðskiptavinar sem gerði tilboð
    customerId: { type: Schema.Types.ObjectId, required: true },

    // Tioboðsverð
    price: { type: Number, required: true }
    
}, { collection: 'auctionBids' });
