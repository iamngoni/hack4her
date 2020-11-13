"use strict";

var models = require("./../models");

var types = require("../types");

module.exports = {
  getPosts: function getPosts(req, res) {
    var current_member, member, group, topic, _topic, posts;

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
            return regeneratorRuntime.awrap(models.Groups.findById(req.params.groupId));

          case 8:
            group = _context.sent;

            if (group) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              errors: "Group not found"
            }));

          case 11:
            _context.next = 13;
            return regeneratorRuntime.awrap(models.Topics.findById(req.params.topicId).populate("posts"));

          case 13:
            topic = _context.sent;

            if (topic) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              errors: "Topic not found"
            }));

          case 16:
            _topic = new types.Topic(topic);
            _context.next = 19;
            return regeneratorRuntime.awrap(_topic.getPosts());

          case 19:
            posts = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              success: "Success",
              posts: posts
            }));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};