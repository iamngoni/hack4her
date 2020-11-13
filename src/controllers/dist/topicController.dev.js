"use strict";

var models = require("./../models");

var types = require("../types");

module.exports = {
  getPosts: function getPosts(req, res) {
    var current_member, member, topic, _topic, posts;

    return regeneratorRuntime.async(function getPosts$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            current_member = req.member;
            _context.next = 3;
            return regeneratorRuntime.awrap(models.Members.findById(current_member.id));

          case 3:
            member = _context.sent;

            if (member) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              errors: "Member not found"
            }));

          case 6:
            _context.next = 8;
            return regeneratorRuntime.awrap(models.Topics.findById(req.params.topicId).populate("posts"));

          case 8:
            topic = _context.sent;

            if (topic) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              errors: "Topic not found"
            }));

          case 11:
            _topic = new types.Topic(topic);
            _context.next = 14;
            return regeneratorRuntime.awrap(_topic.getPosts());

          case 14:
            posts = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              success: "Success",
              posts: posts
            }));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};