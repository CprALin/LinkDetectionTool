const Tesseract = require('tesseract.js')
/**
 * Function used to extract text from an image
 * @param {*} image - Name of the image document and the format .
 * @returns - A log with the extracted text 
 */
async function extractTextFromImage(image){
    try{
        const result = await Tesseract.recognize(`./images/${image}`, 'eng');
        return result.data.text; 
    }catch(error){
        console.log(error.message);
    }
}

module.exports = extractTextFromImage;
