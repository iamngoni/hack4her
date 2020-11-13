"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Post =
/*#__PURE__*/
function () {
  function Post(post) {
    _classCallCheck(this, Post);

    this.post = post;
  }

  _createClass(Post, [{
    key: "addComment",
    value: function addComment(id) {
      var comments, _post;

      return regeneratorRuntime.async(function addComment$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              comments = this.post.comments;
              comments.push(id);
              this.post.comments = comments;
              _context.next = 5;
              return regeneratorRuntime.awrap(this.post.save());

            case 5:
              _post = _context.sent;
              return _context.abrupt("return", _post);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getComments",
    value: function getComments() {
      return this.post.comments;
    }
  }, {
    key: "getNumberOfComments",
    value: function getNumberOfComments() {
      return this.post.comments.length;
    }
  }]);

  return Post;
}();

module.exports = Post;