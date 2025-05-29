const Tesseract = require('tesseract.js')
/**
 * Function used to extract text from an image
 * @param {*} image - Name of the image document and the format .
 * @returns - A log with the extracted text 
 */
function extractTextFromImage(image){
    
    Tesseract.recognize(`./images/${image}` , 'eng' , {logger : m => console.log(m)}).then(({data : {text}}) => {
        console.log(`Extracted text : ${text}`);
    }).catch((error) => {
        console.log(error.message);
    })
}

module.exports = extractTextFromImage;
