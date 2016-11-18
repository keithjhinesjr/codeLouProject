var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text: {
        type: String,  // model for task text
        default: ''
    },
    priority: {
        type: String,   //model for priority
        default: ''
    }
});

