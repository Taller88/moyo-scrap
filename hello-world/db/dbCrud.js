
const AWS  = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
 
class DbQuery {
    constructor(){
    }

    async insert(data){
        console.log("insert init");
        let statusCode = 200;
        let body;
        try{
            let requestJSON = data;
            console.log("requestJSON: "+ requestJSON.id);
            const result = await dynamo.put({
                TableName: "moyo-scrap-items",
                Item: requestJSON
              }).promise();
            body = `Put item ${requestJSON.id}`;

        }catch (err) {
            console.log("insert Error");
            console.log(err.message)
            statusCode = 400;
            body = err.message;
        } finally {
          console.log("[LGU]Finally test Completed!")
            body = JSON.stringify(body);
        }

        return {
            statusCode,
            body};
    }
    select(uuid){}
    delete(){}
    update(){}
}


const dbQuery = async (event)=>{

    let body;
    switch (event.routeKey) {
        case "DELETE /items/{id}":
            await dynamo
              .delete({
                TableName: "moyo-scrap-items",
                Key: {
                  id: event.pathParameters.id
                }
              })
              .promise();
            body = `Deleted item ${event.pathParameters.id}`;
            break;
          case "GET /items/{id}":
            body = await dynamo
              .get({
                TableName: "moyo-scrap-items",
                Key: {
                  id: event.pathParameters.id
                }
              })
              .promise();
            break;
          case "GET /items":
            body = await dynamo.scan({ TableName: "moyo-scrap-items" }).promise();
            break;
          case "PUT /items":
            let requestJSON = JSON.parse(event.body);
            await dynamo
              .put({
                TableName: "moyo-scrap-items",
                Item: {
                  id: requestJSON.id,
                  price: requestJSON.price,
                  name: requestJSON.name
                }
              })
              .promise();
            body = `Put item ${requestJSON.id}`;
            break;
          default:
            throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
}


module.exports = DbQuery;