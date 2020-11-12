"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Topics = require("./../models/topics");

var Group =
/*#__PURE__*/
function () {
  /**
   * @param {MongooseDocument} group 
   */
  function Group(group) {
    _classCallCheck(this, Group);

    this.group = group;
  }

  _createClass(Group, [{
    key: "addMember",
    value: function addMember(id) {
      var members, _group;

      return regeneratorRuntime.async(function addMember$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              members = this.group.members;

              if (members.includes(id)) {
                _context.next = 5;
                break;
              }

              members.push(id);
              _context.next = 6;
              break;

            case 5:
              throw new Error("Member is in group already");

            case 6:
              this.group.members = members;
              _context.next = 9;
              return regeneratorRuntime.awrap(this.group.save());

            case 9:
              _group = _context.sent;
              return _context.abrupt("return", _group);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
    /**
     * Get list of topics in a group
     */

  }, {
    key: "topics",
    value: function topics() {
      var topics;
      return regeneratorRuntime.async(function topics$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(Topics.find({
                group: this.group._id
              }));

            case 2:
              topics = _context2.sent;
              return _context2.abrupt("return", topics);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
    /**
     * Get number of topics in a group
     */

  }, {
    key: "numberOfTopics",
    value: function numberOfTopics() {
      var topics;
      return regeneratorRuntime.async(function numberOfTopics$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(Topics.find({
                group: this.group._id
              }));

            case 2:
              topics = _context3.sent;
              return _context3.abrupt("return", topics.length);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
    /**
     * Update group name
     * @param {String} name 
     */

  }, {
    key: "changeName",
    value: function changeName(name) {
      var _group;

      return regeneratorRuntime.async(function changeName$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.group.name = name;
              _context4.next = 3;
              return regeneratorRuntime.awrap(this.group.save());

            case 3:
              _group = _context4.sent;
              return _context4.abrupt("return", _group);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
    /**
     * Update group description
     * @param {String} description 
     */

  }, {
    key: "updateDescription",
    value: function updateDescription(description) {
      var _group;

      return regeneratorRuntime.async(function updateDescription$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              this.group.description = description;
              _context5.next = 3;
              return regeneratorRuntime.awrap(this.group.save());

            case 3:
              _group = _context5.sent;
              return _context5.abrupt("return", _group);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Group;
}();

module.exports = Group;