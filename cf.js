//include files Methode [dont ask about require plz :)]

/*
    autor : moad abdou {nodejs beginner} 
     date : 2020 - 8 - 2 15:58 
*/
module.exports.CopyFiles = copyfiles ;
module.exports.Compress = compress;  

// get files by Types 
function getFilesBy(dir, types){
    let dirFiles = fs.readdirSync(dir) , files = [];
    dirFiles.forEach(f => {
        if(types.indexOf(f.split('.').reverse()[0]) != -1){
            files.push(f);
        }
    });
    return  files; 
}

//    copy files from dir to another by types 

function copyfiles(dir, to , Types){
    dir.forEach(d=> {
        let files = getFilesBy(d, Types);
        files.forEach(f=> {
            fs.writeFileSync(to+'/'+f, fs.readFileSync(d+'/'+f, {encoding:'utf-8'}));
        });
    });
}

//compress files to one file 

function compress(dir , toFile ,types ){
    let egnores = dir[1];
    fs.writeFileSync(toFile, '');
    dir[0].forEach(d=> {
        let files = getFilesBy(d , types);
        files.forEach(f=>{
            if(egnores.indexOf(f)== -1){
                fs.writeFileSync(toFile , fs.readFileSync(d+'/'+f, {encoding:'utf-8'})+'\r\n', 
                {flag : 'a'});
            }
        });
    });
}