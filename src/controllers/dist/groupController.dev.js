"use strict";

var models = require("./../models");

var types = require("./../types");

module.exports = {
  getTopics: function getTopics(req, res) {
    var group, _group, topics;

    return regeneratorRuntime.async(function getTopics$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(models.Groups.findById(req.params.groupId));

          case 2:
            group = _context.sent;

            if (group) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              errors: "Group not found"
            }));

          case 5:
            _group = new types.Group(group);
            _context.next = 8;
            return regeneratorRuntime.awrap(_group.topics());

          case 8:
            topics = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              success: "Success",
              topics: topics
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  getAllGroups: function getAllGroups(req, res) {
    var groups;
    return regeneratorRuntime.async(function getAllGroups$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(models.Groups.find());

          case 2:
            groups = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              success: "Success",
              groups: groups
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  addMember: function addMember(req, res) {
    var current_member, member, group, _group, modifiedGroup;

    return regeneratorRuntime.async(function addMember$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            current_member = req.member;
            _context3.next = 3;
            return regeneratorRuntime.awrap(models.Members.findById(current_member.id));

          case 3:
            member = _context3.sent;

            if (member) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              errors: "Member not found"
            }));

          case 6:
            _context3.next = 8;
            return regeneratorRuntime.awrap(models.Groups.findById(req.params.groupId));

          case 8:
            group = _context3.sent;

            if (group) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              errors: "Group not found"
            }));

          case 11:
            if (!(group.admin._id.toString() !== member._id.toString())) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt("return", res.status(403).json({
              errors: "Only group admin can add a member"
            }));

          case 13:
            _group = new types.Group(group);
            _context3.prev = 14;
            _context3.next = 17;
            return regeneratorRuntime.awrap(_group.addMember(req.params.memberId));

          case 17:
            modifiedGroup = _context3.sent;

            if (modifiedGroup) {
              _context3.next = 20;
              break;
            }

            return _context3.abrupt("return", res.status(418).json({
              errors: "Cannot brew coffee"
            }));

          case 20:
            return _context3.abrupt("return", res.status(201).json({
              success: "Success",
              group: modifiedGroup
            }));

          case 23:
            _context3.prev = 23;
            _context3.t0 = _context3["catch"](14);
            return _context3.abrupt("return", res.status(409).json({
              errors: _context3.t0.message
            }));

          case 26:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[14, 23]]);
  },
  getMembers: function getMembers(req, res) {
    var current_member, member, group, _group;

    return regeneratorRuntime.async(function getMembers$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            current_member = req.member;
            _context4.next = 3;
            return regeneratorRuntime.awrap(models.Members.findById(current_member.id));

          case 3:
            member = _context4.sent;

            if (member) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              errors: "Couldn't find member"
            }));

          case 6:
            _context4.next = 8;
            return regeneratorRuntime.awrap(models.Groups.findById(req.params.groupId).populate("members"));

          case 8:
            group = _context4.sent;

            if (group) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              errors: "Group not found"
            }));

          case 11:
            _group = new types.Group(group);
            return _context4.abrupt("return", res.status(200).json({
              success: "Success",
              group: group.name,
              members: _group.getMembers()
            }));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    });
  }
};