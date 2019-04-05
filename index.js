(async ()=>{
    require('rootpath');

    let fs = require('fs');
    let http = require('http');

    const orders = require('./data.json');
    const config = require('./config.json');

    let contentFile = [];


    // send orders
    for(let i in orders){
        let resultJson = {};
        let order = orders[i];
        let resultRequest = await sendDataLocal(order);

        resultJson.response = JSON.parse(resultRequest);
        resultJson.request = order;
        contentFile.push(resultJson);
    }

    // Save content in file
    fs.writeFile('./result.json', JSON.stringify(contentFile), function(err){
        if(err){
            console.log(err);
        } else {
            console.log('success');
        }
    });


    // Functions
    function sendDataLocal(body){
        return new Promise(
            function(resolve, reject){
                let send = http.request(config, function(res) {
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                        resolve(chunk);
                    });
                    res.on('error', function(error){
                        reject(error);
                    });
                });

                send.write(JSON.stringify(body));
                send.end();
            }
        );
    }

})();

