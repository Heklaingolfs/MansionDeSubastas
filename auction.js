const Schema = require('mongoose').Schema;

// schema fyrir uppboð

module.exports = new Schema(

    {
        // Auðikenni ats sem fer á uppboð
        artId: { type: Schema.Types.ObjectId, required: true },
    
        // Lágmarksverð fyrir tilboð á uppboði
        minimumPrice: { type: Number, default: 1000 },
    
        // Dagsetning þegar uppboð klárast
        endDate: { type: Date, required: true },
    
        // Auðkenni viðskiptavinar sem er með hæðsta verð á tilboðinu
        auctionWinner: Schema.Types.ObjectId
        
    }, { collection: 'auctions' });



