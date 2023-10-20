
const alerts = [];

var Webhook = function(){
};
Webhook.webhookReceive = async (req, res) => {
    var Reqdata = req.body;
    alerts.push(Reqdata);
    console.log(Reqdata,"------------- webhook received");
    return res.status(200).send(Reqdata);
};

Webhook.webhookSend = async (req, res) => {
    var user_id = req.query['u_id'];
    var SendData = {"status":"","severity":"","device":{"device_id":"","ip":"","location":", "},"user":{"user_id":user_id.toString(),"email":"","username":""},"message":""};
    for (let i = alerts.length - 1; i >= 0; i--) {
        if (parseInt(alerts[i]['user']['user_id']) === parseInt(user_id)) {
            SendData = alerts[i];
            alerts.splice(i, 1);
        }
    }
    console.log(SendData,"------------- webhook sent");
    return res.status(200).send(SendData);
};

module.exports = Webhook;