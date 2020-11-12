"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var models = require("./../models");

var Member =
/*#__PURE__*/
function () {
  function Member(member) {
    _classCallCheck(this, Member);

    this.member = member;
  }
  /**
   * Update member profile
   * @param {String} id
   */


  _createClass(Member, [{
    key: "addImage",
    value: function addImage(id) {
      return regeneratorRuntime.async(function addImage$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.member.image = id;
              this.member.save().then(function () {
                console.log("Member profile image updated");
              })["catch"](function (error) {
                console.log(error);
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "createGroup",
    value: function createGroup(name, description) {
      var group, _group;

      return regeneratorRuntime.async(function createGroup$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              group = new models.Groups({
                name: name,
                description: description,
                admin: this.member._id,
                members: [this.member._id]
              });
              _context2.next = 3;
              return regeneratorRuntime.awrap(group.save());

            case 3:
              _group = _context2.sent;
              return _context2.abrupt("return", _group);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "requestGroupEntry",
    value: function requestGroupEntry(groupId) {
      var rx, request, _request;

      return regeneratorRuntime.async(function requestGroupEntry$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log(groupId);
              _context3.next = 3;
              return regeneratorRuntime.awrap(models.Requestx.find({
                member: this.member._id,
                group: groupId,
                approved: false
              }));

            case 3:
              rx = _context3.sent;

              if (!(rx.length > 0)) {
                _context3.next = 6;
                break;
              }

              throw new Error("Request was posted is still waiting for approval");

            case 6:
              request = new Requestx({
                member: this.member._id,
                group: groupId
              });
              _context3.next = 9;
              return regeneratorRuntime.awrap(request.save());

            case 9:
              _request = _context3.sent;
              return _context3.abrupt("return", _request);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "exitGroup",
    value: function exitGroup(groupId) {
      var _this = this;

      var group, members, _group;

      return regeneratorRuntime.async(function exitGroup$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(models.Groups.findById(groupId));

            case 2:
              group = _context4.sent;

              if (group) {
                _context4.next = 5;
                break;
              }

              throw new Error("Group doesn't exists");

            case 5:
              if (!(this.member._id.toString() == group.admin.toString())) {
                _context4.next = 7;
                break;
              }

              throw new Error("Admin cannot leave group");

            case 7:
              members = group.members;
              members = members.filter(function (membr) {
                return membr.toString() !== _this.member._id.toString();
              });
              group.members = members;
              _context4.next = 12;
              return regeneratorRuntime.awrap(group.save());

            case 12:
              _group = _context4.sent;
              return _context4.abrupt("return", _group);

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "createPost",
    value: function createPost() {}
  }, {
    key: "createTopic",
    value: function createTopic(groupId, title, description) {
      var topic, _topic;

      return regeneratorRuntime.async(function createTopic$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              topic = new models.Topics({
                title: title,
                description: description,
                group: groupId,
                initiator: this.member._id
              });
              _context5.next = 3;
              return regeneratorRuntime.awrap(topic.save());

            case 3:
              _topic = _context5.sent;
              return _context5.abrupt("return", _topic);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "vote",
    value: function vote() {}
  }]);

  return Member;
}();

module.exports = Member;