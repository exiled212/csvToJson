(()=>{

    require('rootpath');
    let csv = require("fast-csv");
    let fs = require('fs');
    let path = require('path');
    let args = require('yargs').argv;

    let fileInput = `${args.input}.csv`;
    let fileOutput = `${args.input}.json`;

    let stream = fs.createReadStream(fileInput);
    let filecontent = [];
    let csvStream = csv()
        .on("data", function(data){
            filecontent.push(data[0].split('|'));
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