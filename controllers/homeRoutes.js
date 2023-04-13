const router = require ('express').Router();

router.get('/',(req,res)=>{

    // DB call, API call
    const dbData = [{name: 'george'}, {name: 'solo'}];
    const dbData2 = {name: 'Chad'};

    res.render('home', 
    {
        dbData,
        dbData2,
        layout: 'main'
    });
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.get('/home',(req,res)=>{
    res.render('home')
})
router.get('/new-user',(req,res)=>{
    res.render('new-user')
})
router.get('/new-trip',(req,res)=>{
    res.render('new-trip')
})

module.exports = router;