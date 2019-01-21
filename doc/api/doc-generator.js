const flattener = require('flat-raml');

var srcFile = './doc/api/api-doc.raml';
var dstFile = './public/doc/console/api-doc.raml';

flattener.flatten(srcFile, dstFile)
.then(function (outFile)
{
    console.info(outFile, "written");
})
.catch(function (error)
{
    console.error(error);
});
