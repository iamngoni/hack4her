"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Topic =
/*#__PURE__*/
function () {
  function Topic(topic) {
    _classCallCheck(this, Topic);

    this.topic = topic;
  }

  _createClass(Topic, [{
    key: "addPost",
    value: function addPost(id) {
      var posts, _topic;

      return regeneratorRuntime.async(function addPost$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              posts = this.topic.posts;

              if (posts.includes(id)) {
                _context.next = 5;
                break;
              }

              posts.push(id);
              _context.next = 6;
              break;

            case 5:
              throw new Error("Post already exists");

            case 6:
              _context.next = 8;
              return regeneratorRuntime.awrap(this.topic.save());

            case 8:
              _topic = _context.sent;
              return _context.abrupt("return", _topic);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getPosts",
    value: function getPosts() {
      return this.topic.posts;
    }
  }, {
    key: "addVote",
    value: function addVote(id) {
      var votes, _topic;

      return regeneratorRuntime.async(function addVote$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              votes = this.topic.votes;

              if (!votes.includes(id)) {
                _context2.next = 3;
                break;
              }

              throw new Error("Cannot vote multiple times on the same topic");

            case 3:
              votes.push(id);
              this.topic.votes = votes;
              _context2.next = 7;
              return regeneratorRuntime.awrap(this.topic.save());

            case 7:
              _topic = _context2.sent;
              return _context2.abrupt("return", _topic);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Topic;
}();

module.exports = Topic;