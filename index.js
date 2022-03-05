const br = require('BRhtml');
function run(){
    //html
    let dataPath ='./data/index.json' ; 
    async function prepare(){
        // json suggested for watchin data 
        br.data = JSON.parse(br.read(dataPath));
    }
    br.Watch('html' , [['./core/html', dataPath], [/*egnores*/]] ,['html'], ()=> {
        prepare().then(
            br.Export('./core/html/templates/index.html' , './dist/index.html'), 
            reason=> {console.log(reason)});
    });
    //js 
    let jsPath = [['./core/js'], ['nav.js']];
    br.Watch( 'js',jsPath, ['js'] ,()=>{
            br.Compress( jsPath, './dist/js/index.js', ['js'])
        }
    );
}
run();