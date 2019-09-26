// breytir götnum í art kerfinu
const artService = () => {
    const getAllArts = (cb, errorCb) => {
        Art.find({}, (error, arts) => 
        {
            if(error)
            {
                err(error);
            }
            else
            {
                cb(arts);
            }
        });    };

    const getArtById = (id, cb, errorCb) => {
        {
            if(error)
            {
                err(error);
            }        
            else if(art === null)
            {
                err(getNotFoundError('art', 'id', id));
            }
            else
            {
                cb(arts);
            }
        };
    }

    // Athuga til að byrja með hvort auðkenni sé til
    const createArt = (art, cb, errorCb) => 
    {
        {
            if(error)
            {
                err(error);
            }
            else {
                // senda error ef auðkenni er ekki til
                if(artist === null) err(getExternalIdNotFoundError('artistId', art.artistId));
                // annars búa til módel
                else {
                    Art.create(
                        {
                        title: art.title,
                        artistId: art.artistId,
                        date: art.date,
                        images: art.images,
                        description: art.description,
                        isAuctionItem: art.isAuctionItem
                        }, error => { 
                            if(error)
                            {
                                err(error);
                            }
                            else
                            {
                                cb(true); 
                            }
                        }
                    );
                }
            }
        };
    };


    return {
        getAllArts,
        getArtById,
        createArt
    };
};

