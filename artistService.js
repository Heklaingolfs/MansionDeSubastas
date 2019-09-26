// breytir götnum í artist kerfinu
const artistService = () => 
{
    const getAllArtists = (cb, errorCb) => 
    Art.find({}, (error, artists) => 
    {
        if(error)
        {
            err(error);
        }
        else
        {
            cb(artists);
        }
    });

    const getArtistById = (id, cb, errorCb) => 
    Artist.findById(id, (error, artist) => 
    {
        if(error)
        {
            err(error);
        }        
        else if(artist === null)
        {
            err(getNotFoundError('artist', 'id', id));
        }
        else
        {
            cb(artist);
        }
    });

    const createArtist = (artist, cb, errorCb) => 
    {
        Artist.create(
            {
                name: artist.name,
                nickname: artist.nickname,
                address: artist.address,
                memberSince: artist.memberSince,
            }, error => { 
                if(error)
                {
                    err(error);
                }
                else{
                    cb(true);
                }
            }
        );
    };

    return {
        getAllArtists,
        getArtistById,
        createArtist
    };
};

module.exports = artistService();
