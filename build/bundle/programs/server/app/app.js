var require = meteorInstall({"imports":{"api":{"tasks.js":["meteor/meteor","meteor/mongo","meteor/check",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// imports/api/tasks.js                                                    //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
module.export({Tasks:function(){return Tasks}});var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var Mongo;module.import('meteor/mongo',{"Mongo":function(v){Mongo=v}});var check;module.import('meteor/check',{"check":function(v){check=v}});
                                                                           // 2
                                                                           // 3
                                                                           //
var Tasks = new Mongo.Collection('tasks');                                 // 5
                                                                           //
if (Meteor.isServer) {                                                     // 7
  // This code only runs on the server                                     //
  // Only publish tasks that are public or belong to the current user      //
  Meteor.publish('tasks', function tasksPublication() {                    // 10
    return Tasks.find({                                                    // 11
      $or: [{ 'private': { $ne: true } }, { owner: this.userId }]          // 12
    });                                                                    // 11
  });                                                                      // 17
}                                                                          // 18
                                                                           //
Meteor.methods({                                                           // 20
  'tasks.insert': function tasksInsert(text) {                             // 21
    check(text, String);                                                   // 22
                                                                           //
    // Make sure the user is logged in before inserting a task             //
    if (!this.userId) {                                                    // 25
      throw new Meteor.Error('not-authorized');                            // 26
    }                                                                      // 27
                                                                           //
    Tasks.insert({                                                         // 29
      text: text,                                                          // 30
      createdAt: new Date(),                                               // 31
      owner: this.userId,                                                  // 32
      username: Meteor.users.findOne(this.userId).username                 // 33
    });                                                                    // 29
  },                                                                       // 35
  'tasks.remove': function tasksRemove(taskId) {                           // 36
    check(taskId, String);                                                 // 37
                                                                           //
    var task = Tasks.findOne(taskId);                                      // 39
    if (task['private'] && task.owner !== this.userId) {                   // 40
      // If the task is private, make sure only the owner can delete it    //
      throw new Meteor.Error('not-authorized');                            // 42
    }                                                                      // 43
                                                                           //
    Tasks.remove(taskId);                                                  // 45
  },                                                                       // 46
  'tasks.setChecked': function tasksSetChecked(taskId, setChecked) {       // 47
    check(taskId, String);                                                 // 48
    check(setChecked, Boolean);                                            // 49
                                                                           //
    var task = Tasks.findOne(taskId);                                      // 51
    if (task['private'] && task.owner !== this.userId) {                   // 52
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');                            // 54
    }                                                                      // 55
                                                                           //
    Tasks.update(taskId, { $set: { checked: setChecked } });               // 57
  },                                                                       // 58
  'tasks.setPrivate': function tasksSetPrivate(taskId, setToPrivate) {     // 59
    check(taskId, String);                                                 // 60
    check(setToPrivate, Boolean);                                          // 61
                                                                           //
    var task = Tasks.findOne(taskId);                                      // 63
                                                                           //
    // Make sure only the task owner can make a task private               //
    if (task.owner !== this.userId) {                                      // 66
      throw new Meteor.Error('not-authorized');                            // 67
    }                                                                      // 68
                                                                           //
    Tasks.update(taskId, { $set: { 'private': setToPrivate } });           // 70
  }                                                                        // 71
});                                                                        // 20
/////////////////////////////////////////////////////////////////////////////

}]}},"server":{"main.js":["../imports/api/tasks.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// server/main.js                                                          //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
module.import('../imports/api/tasks.js');                                  // 1
/////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json",".jsx"]});
require("./server/main.js");
//# sourceMappingURL=app.js.map
