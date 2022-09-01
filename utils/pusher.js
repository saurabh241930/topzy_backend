const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1459055",
  key: "7e4c08f6b6f630769b3c",
  secret: "674c1a071c4a05404ec2",
  cluster: "ap2",
  useTLS: true
});


module.exports = pusher;