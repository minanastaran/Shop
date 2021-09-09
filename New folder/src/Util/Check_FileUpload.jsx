import React from 'react'

 function Check_FileUpload(file){
    console.log(file+" - "+ file.length)
    let filelist=[]
    let filenamelist=[]
    // let filelength=file.length;
    // if(file.length>0){
        for(let i=0 ; i<file.length ; i++){
            filelist.push(file[i])
            if (file[i].name) {
                let file_type = file[i].type
                if (file_type && file_type.split("/")[1] === 'png' || 
                    file_type && file_type.split("/")[1] === 'jpg' ||
                    file_type && file_type.split("/")[1] === 'jfif' ||  
                    file_type && file_type.split("/")[1] === 'jpeg' )
                { 
                    filenamelist.push(file[i].name)
                }
                else {
                    filenamelist.push('type')
                }
            }
        }
        return {
            filelist,
            filenamelist
        };
    // }
}

export  {Check_FileUpload}
