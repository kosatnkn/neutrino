function transform(data, transformer, asCollection)
{
    asCollection = asCollection || false;

    if(asCollection)
    {
        return _transformCollection(data, transformer);
    }

    return transformer.transform(data);
}


function _transformCollection(data, transformer)
{
    let collection = [];

    data.forEach(function(datum)
    {
        collection.push(transformer.transform(datum));
    });

    return collection;
}


module.exports = {
    transform: transform
};