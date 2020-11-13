"use strict";

var models = require("./../models");

var types = require("../types");

var _require = require("body-parser"),
    json = _require.json;

module.exports = {
  vote: function vote(req, res) {
    var current_member, member, topic, exists, vote, _vote, _topic, _topc;

    return regeneratorRuntime.async(function vote$(_context) {
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
            return regeneratorRuntime.awrap(models.Topics.findById(req.params.topicId));

          case 9:
            topic = _context.sent;

            if (topic) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              errors: "No topic found"
            }));

          case 12:
            exists = models.Votes.find({
              topic: topic._id,
              member: member._id
            });

            if (!(exists.length > 0)) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              errors: "Member cannot vote multiple times on one topic"
            }));

          case 15:
            vote = new models.Votes({
              topic: topic._id,
              member: member._id
            });
            _context.next = 18;
            return regeneratorRuntime.awrap(vote.save());

          case 18:
            _vote = _context.sent;

            if (_vote) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("return", res.status(500).json({
              errors: "Couldn't save vote"
            }));

          case 21:
            _topic = new types.Topic(topic);
            _context.next = 24;
            return regeneratorRuntime.awrap(_topic.addVote(_vote._id));

          case 24:
            _topc = _context.sent;

            if (_topc) {
              _context.next = 27;
              break;
            }

            return _context.abrupt("return", res.status(500).json({
              errors: "Encountered an  error"
            }));

          case 27:
            res.status(201).json({
              success: "Success",
              vote: _vote
            });
            _context.next = 33;
            break;

          case 30:
            _context.prev = 30;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              errors: _context.t0.message
            }));

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 30]]);
  }
};