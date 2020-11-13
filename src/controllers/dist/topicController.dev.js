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

            return _context.abrupt("return", res.status(200).json({
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
            return regeneratorRuntime.awrap(models.Topics.findById(req.params.topicId).populate("posts"));

          case 14:
            topic = _context.sent;

            if (topic) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              errors: "Topic not found"
            }));

          case 17:
            _topic = new types.Topic(topic);
            _context.next = 20;
            return regeneratorRuntime.awrap(_topic.getPosts());

          case 20:
            posts = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              success: "Success",
              posts: posts
            }));

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              errors: _context.t0.message
            }));

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 24]]);
  },
  getNumberOfVotes: function getNumberOfVotes(req, res) {
    var current_member, member, group, topic, _topic, votes;

    return regeneratorRuntime.async(function getNumberOfVotes$(_context2) {
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

            return _context2.abrupt("return", res.status(200).json({
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
            return regeneratorRuntime.awrap(models.Topics.findById(req.params.topicId).populate("votes"));

          case 14:
            topic = _context2.sent;

            if (topic) {
              _context2.next = 17;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              errors: "Topic not found"
            }));

          case 17:
            _topic = new types.Topic(topic);
            _context2.next = 20;
            return regeneratorRuntime.awrap(_topic.votesCount());

          case 20:
            votes = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              success: "Success",
              votes: votes
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
  }
};