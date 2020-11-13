"use strict";

var models = require("./../models");

var types = require("../types");

module.exports = {
  comment: function comment(req, res) {
    var current_member, member, group, post, comment, _comment, _post, _postc;

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
            return regeneratorRuntime.awrap(models.Groups.findById(req.params.groupId));

          case 9:
            group = _context.sent;

            if (group) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              errors: "Group not found"
            }));

          case 12:
            _context.next = 14;
            return regeneratorRuntime.awrap(models.Posts.findById(req.params.postId));

          case 14:
            post = _context.sent;

            if (post) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              errors: "Post not found"
            }));

          case 17:
            comment = new models.Comments({
              member: member._id,
              text: req.body.text,
              post: post._id
            });
            _context.next = 20;
            return regeneratorRuntime.awrap(comment.save());

          case 20:
            _comment = _context.sent;

            if (_comment) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("return", res.status(500).json({
              errors: "Comment not saved"
            }));

          case 23:
            _post = new types.Post(post);
            _context.next = 26;
            return regeneratorRuntime.awrap(_post.addComment(_comment._id));

          case 26:
            _postc = _context.sent;

            if (_postc) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("return", res.status(500).json({
              errors: "Couldn't attach comments to post"
            }));

          case 29:
            return _context.abrupt("return", res.status(200).json({
              success: "Success",
              post: _postc
            }));

          case 32:
            _context.prev = 32;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(500).json({
              errors: _context.t0.message
            }));

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 32]]);
  },
  getComments: function getComments(req, res) {
    var current_member, member, group, post, _post, comments;

    return regeneratorRuntime.async(function getComments$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            current_member = req.member;
            _context2.next = 4;
            return regeneratorRuntime.awrap(models.Members.findById(current_member.id));

          case 4:
            member = _context2.sent;

            if (member) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              errors: "Member not found"
            }));

          case 7:
            _context2.next = 9;
            return regeneratorRuntime.awrap(models.Groups.findById(req.params.groupId));

          case 9:
            group = _context2.sent;

            if (group) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              errors: "Group not found"
            }));

          case 12:
            _context2.next = 14;
            return regeneratorRuntime.awrap(models.Posts.findById(req.params.postId).populate("comments"));

          case 14:
            post = _context2.sent;

            if (post) {
              _context2.next = 17;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              errors: "Post not found"
            }));

          case 17:
            _post = new types.Post(post);
            _context2.next = 20;
            return regeneratorRuntime.awrap(_post.getComments());

          case 20:
            comments = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              success: "Success",
              comments: comments
            }));

          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              errors: _context2.t0.message
            }));

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 24]]);
  },
  getCommentsCount: function getCommentsCount(req, res) {
    var current_member, member, group, post, _post, comments;

    return regeneratorRuntime.async(function getCommentsCount$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            current_member = req.member;
            _context3.next = 4;
            return regeneratorRuntime.awrap(models.Members.findById(current_member.id));

          case 4:
            member = _context3.sent;

            if (member) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              errors: "Member not found"
            }));

          case 7:
            _context3.next = 9;
            return regeneratorRuntime.awrap(models.Groups.findById(req.params.groupId));

          case 9:
            group = _context3.sent;

            if (group) {
              _context3.next = 12;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              errors: "Group not found"
            }));

          case 12:
            _context3.next = 14;
            return regeneratorRuntime.awrap(models.Posts.findById(req.params.postId).populate("comments"));

          case 14:
            post = _context3.sent;

            if (post) {
              _context3.next = 17;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              errors: "Post not found"
            }));

          case 17:
            _post = new types.Post(post);
            _context3.next = 20;
            return regeneratorRuntime.awrap(_post.getNumberOfComments());

          case 20:
            comments = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              success: "Success",
              commentsCount: comments
            }));

          case 24:
            _context3.prev = 24;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500).json({
              errors: _context3.t0.message
            }));

          case 27:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 24]]);
  }
};