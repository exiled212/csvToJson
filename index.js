(()=>{

    require('rootpath');
    let csv = require("fast-csv");
    let fs = require('fs');
    let path = require('path');
    let args = require('yargs').argv;

    let fileInput = `${args.input}.csv`;
    let fileOutput = `${args.input}.json`;

    let numberRow = 0;

    let stream = fs.createReadStream(fileInput);
    let filecontent = [];
    let csvStream = csv
        .parse({
            delimiter:'|',
        })
        .on("data", function(data){

            // Obtenemos el ultimo nombre del campo separado por /
            if(numberRow == 0 && args.clear_header){
                data = data.map(item=>item.split('/')[item.split('/').length - 1]);
            } else if (args.clear_html && numberRow > 0){
                data = data.map(item=>{
                    while(item.indexOf('“') > -1) item = item.replace('“', '\\\"'); 
                    return item; 
                });
            }
            numberRow++;
            filecontent.push(data);
        })
        .on("end", function(){
            let header = filecontent.filter((value,key)=>key == 0)[0];
            let body = filecontent.filter((value, key) => key > 0);
            let contentData = [];

            for (let i in body){
                let row = body[i];
                let newRow = {};
                for(let o in header){
                    let column = (header[o] || `label_${o}`).replace('\'', '');
                    newRow[column] = (row[o] || '').replace('\'', '');
                }
                contentData.push(newRow);
            }

            fs.writeFile(fileOutput, JSON.stringify(contentData), function(error){
                if (!error){
                    console.log('success');
                }
            });
        });

    stream.pipe(csvStream);

})();