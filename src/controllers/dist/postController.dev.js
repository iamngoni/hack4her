"use strict";

var models = require("./../models");

var types = require("../types");

module.exports = {
  comment: function comment(req, res) {
    var current_member, member, post, comment, _comment, _post, _postc;

    return regeneratorRuntime.async(function comment$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            current_member = req.member;
            _context.next = 4;
            return regeneratorRuntime.awrap(models.Members.findById(current_member.id));

          case 4:
            member = _context.sent;

            if (member) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              errors: "Member not found"
            }));

          case 7:
            _context.next = 9;
            return regeneratorRuntime.awrap(models.Posts.findById(req.params.postId));

          case 9:
            post = _context.sent;

            if (post) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              errors: "Post not found"
            }));

          case 12:
            comment = new models.Comments({
              member: member._id,
              text: req.body.text,
              post: post._id
            });
            _context.next = 15;
            return regeneratorRuntime.awrap(comment.save());

          case 15:
            _comment = _context.sent;

            if (_comment) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", res.status(500).json({
              errors: "Comment not saved"
            }));

          case 18:
            _post = new types.Post(post);
            _context.next = 21;
            return regeneratorRuntime.awrap(_post.addComment(_comment._id));

          case 21:
            _postc = _context.sent;

            if (_postc) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return", res.status(500).json({
              errors: "Couldn't attach comments to post"
            }));

          case 24:
            return _context.abrupt("return", res.status(200).json({
              success: "Success",
              post: _postc
            }));

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(500).json({
              errors: _context.t0.message
            }));

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 27]]);
  }
};