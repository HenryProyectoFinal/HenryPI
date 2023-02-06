const  cloudinary  = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dy5msftwe',
    api_key: 825797338458983,
    api_secret:'7nfOP_9iuV-4-W4mjvHzpLq-lOI',
  });


//que se guarde en una carpeta llamada folder
const uploadImage = async (filePath) => {
    const cosa= await cloudinary.uploader.upload(filePath, {
    folder: "Products",
});
    return cosa
};


//  const deleteImg = async (imgId) => {
//   await cloudinary.uploader.destroy(imgId);
// };

module.exports=  {uploadImage};
