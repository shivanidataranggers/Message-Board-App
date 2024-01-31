const mongoose = require('mongoose');

const SubscriberModel = new mongoose.Schema({
  message: String,
  invitationLink: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
    }, 
  expiryDate: { 
    type: Date, default: Date.now() + 48 * 60 * 60 * 1000 
    }, // 48 hrs expiry
  role: { 
    type: Number, 
    default: 0 
}, 
  createdBy: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User' }, 
},
{
    timeStamp: true,
  }
  );

const Subsceiber = mongoose.model('Subscriber', SubscriberModel);

module.exports = Subsceiber;
