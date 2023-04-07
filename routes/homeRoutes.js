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

module.exports = router;