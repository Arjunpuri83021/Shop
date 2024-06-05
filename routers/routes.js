const router=require('express').Router()
const cApi=require('../controllers/controller')
const multer= require('multer')


const MulterStorage =multer.diskStorage( {
    destination:function(req,file,cb){
        cb(null ,'./public/upload')
    },

    filename:function(req,file,cb){
        cb(null , Date.now() + file.originalname)
    }
})

const upload =multer({
  storage:MulterStorage,
  limits :{files:1024*1024 *6}
})


router.get('/regfind',cApi.Home)
router.delete('/userDelete/:id',cApi.DeleteUser)
router.put('/userUpdate/:id',cApi.UpdateUser)




/// for user 
router.post('/reg',cApi.Register)

router.post('/login',cApi.Login)

router.post('/idsprodects',cApi.idsprodects)

router.post('/query',cApi.query)

//for admin

router.post('/addproduct',upload.single('pimg'),cApi.addproduct)
router.get('/getproducts',cApi.getproducts)
router.get('/findQuery',cApi.findQuery)
router.get('/QuryreplyFind/:id',cApi.QuryreplyFind)
router.post('/QueryReply/:QueryId',cApi.QueryReply)
router.delete('/deleteQuery/:id',cApi.deleteQuery)


module.exports = router