"use strict";

var types = require("../types");

var mongoose = require("mongoose");

var config = require("./../config");

var models = require("./../models");

var _require = require('express-validator'),
    validationResult = _require.validationResult;

var connect = mongoose.createConnection(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var gfs;
connect.once("open", function () {
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "uploads"
  });
});
module.exports = {
  getMemberDetails: function getMemberDetails(req, res) {
    var current_member, member;
    return regeneratorRuntime.async(function getMemberDetails$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            current_member = req.member;
            _context.next = 3;
            return regeneratorRuntime.awrap(models.Members.findById(current_member.id).populate('image'));

          case 3:
            member = _context.sent;

            if (member) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              errors: "member details not found"
            }));

          case 6:
            res.status(200).json({
              id: member._id,
              name: member.fullName,
              email: member.email,
              bio: member.bio,
              image: member.image,
              occupation: member.occupation,
              dateOfBirth: member.dateOfBirth,
              socialProfiles: member.socialProfiles
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  postImage: function postImage(req, res) {
    var current_member, member, _member, image, _image;

    return regeneratorRuntime.async(function postImage$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            current_member = req.member;
            _context2.next = 3;
            return regeneratorRuntime.awrap(models.Members.findById(current_member.id));

          case 3:
            member = _context2.sent;

            if (member) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              errors: "Member not found"
            }));

          case 6:
            _member = new types.Member(member);
            image = new models.Images({
              filename: req.file.filename,
              fileId: req.file.id
            });
            _context2.next = 10;
            return regeneratorRuntime.awrap(image.save());

          case 10:
            _image = _context2.sent;

            if (_image) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", res.status(500).json({
              errors: "Couldn't save image"
            }));

          case 13:
            _context2.next = 15;
            return regeneratorRuntime.awrap(_member.addImage(_image._id));

          case 15:
            return _context2.abrupt("return", res.status(201).json({
              success: "Success"
            }));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  createGroup: function createGroup(req, res) {
    var errors, current_member, member, _member, group;

    return regeneratorRuntime.async(function createGroup$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            errors = validationResult(req);

            if (errors.isEmpty()) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(422).json({
              errors: errors.array()
            }));

          case 3:
            current_member = req.member;
            _context3.next = 6;
            return regeneratorRuntime.awrap(models.Members.findById(current_member.id));

          case 6:
            member = _context3.sent;

            if (member) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              errors: "Member not found"
            }));

          case 9:
            _member = new types.Member(member);
            _context3.prev = 10;
            _context3.next = 13;
            return regeneratorRuntime.awrap(_member.createGroup(req.body.name, req.body.description));

          case 13:
            group = _context3.sent;

            if (group) {
              _context3.next = 16;
              break;
            }

            return _context3.abrupt("return", res.status(500).json({
              errors: "Couldn't create group"
            }));

          case 16:
            return _context3.abrupt("return", res.status(201).json({
              success: "Success",
              group: group
            }));

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](10);

            if (!(_context3.t0.code == 11000)) {
              _context3.next = 23;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              errors: "types.Group name already registered"
            }));

          case 23:
            return _context3.abrupt("return", res.status(500).json({
              errors: "Server error"
            }));

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[10, 19]]);
  },
  getMemberAvatar: function getMemberAvatar(req, res) {
    var filename;
    return regeneratorRuntime.async(function getMemberAvatar$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            filename = req.params.filename;
            gfs.find({
              filename: filename
            }).toArray(function (error, files) {
              if (error) {
                return res.status(500).json({
                  errors: "Encountered and error"
                });
              }

              if (!files[0] || files.length === 0) {
                return res.status(4040).json({
                  errors: "No files available"
                });
              }

              if (files[0].contentType === "image/jpeg" || files[0].contentType === "image/png" || files[0].contentType === "image/svg+xml") {
                gfs.openDownloadStreamByName(filename).pipe(res);
              } else {
                res.status(404).json({
                  errors: "File not an image"
                });
              }
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  createTopic: function createTopic(req, res) {
    var current_member, member, group, _member, topic;

    return regeneratorRuntime.async(function createTopic$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            current_member = req.member;
            _context5.next = 3;
            return regeneratorRuntime.awrap(models.Members.findById(current_member.id));

          case 3:
            member = _context5.sent;

            if (member) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              errors: "Couldn't find member"
            }));

          case 6:
            _context5.next = 8;
            return regeneratorRuntime.awrap(models.Groups.findById(req.params.groupId));

          case 8:
            group = _context5.sent;

            if (group) {
              _context5.next = 11;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              errors: "Group not found"
            }));

          case 11:
            _member = new types.Member(member);
            _context5.prev = 12;
            _context5.next = 15;
            return regeneratorRuntime.awrap(_member.createTopic(req.params.groupId, req.body.title, req.body.description));

          case 15:
            topic = _context5.sent;

            if (topic) {
              _context5.next = 18;
              break;
            }

            return _context5.abrupt("return", res.status(500).json({
              errors: "Couldn't save topic"
            }));

          case 18:
            return _context5.abrupt("return", res.status(201).json({
              success: "Success",
              topic: topic
            }));

          case 21:
            _context5.prev = 21;
            _context5.t0 = _context5["catch"](12);

            if (!(_context5.t0.code == 11000)) {
              _context5.next = 25;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              errors: "Topic already exists"
            }));

          case 25:
            return _context5.abrupt("return", res.status(500).json({
              errors: "Server error"
            }));

          case 26:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[12, 21]]);
  },
  requestGroupEntry: function requestGroupEntry(req, res) {
    var current_member, member, group, _member, request;

    return regeneratorRuntime.async(function requestGroupEntry$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            current_member = req.member;
            _context6.next = 3;
            return regeneratorRuntime.awrap(models.Members.findById(current_member.id));

          case 3:
            member = _context6.sent;

            if (member) {
              _context6.next = 6;
              break;
            }

            return _context6.abrupt("return", res.status(404).json({
              errors: "Member not found"
            }));

          case 6:
            _context6.next = 8;
            return regeneratorRuntime.awrap(models.Groups.findById(req.params.groupId));

          case 8:
            group = _context6.sent;

            if (group) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt("return", res.status(404).json({
              errors: "Group not found"
            }));

          case 11:
            _member = new types.Member(member);
            _context6.prev = 12;
            _context6.next = 15;
            return regeneratorRuntime.awrap(_member.requestGroupEntry(req.params.groupId));

          case 15:
            request = _context6.sent;

            if (request) {
              _context6.next = 18;
              break;
            }

            return _context6.abrupt("return", res.status(500).json({
              errors: "Request not processed"
            }));

          case 18:
            return _context6.abrupt("return", res.status(201).json({
              success: "Success",
              request: request
            }));

          case 21:
            _context6.prev = 21;
            _context6.t0 = _context6["catch"](12);
            console.log(_context6.t0);
            return _context6.abrupt("return", res.status(500).json({
              errors: _context6.t0.message
            }));

          case 25:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[12, 21]]);
  },
  approveMemberEntry: function approveMemberEntry(req, res) {
    var current_member, member, requestId, request, group, _group, modifiedGroup, isRequestApproved;

    return regeneratorRuntime.async(function approveMemberEntry$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            current_member = req.member;
            _context7.next = 3;
            return regeneratorRuntime.awrap(models.Members.findById(current_member.id));

          case 3:
            member = _context7.sent;

            if (member) {
              _context7.next = 6;
              break;
            }

            return _context7.abrupt("return", res.status(404).json({
              errors: "Couldn't find member"
            }));

          case 6:
            requestId = req.params.requestId;
            _context7.next = 9;
            return regeneratorRuntime.awrap(models.Requestx.findById(requestId));

          case 9:
            request = _context7.sent;

            if (request) {
              _context7.next = 12;
              break;
            }

            return _context7.abrupt("return", res.status(404).json({
              errors: "Request doesn't exist"
            }));

          case 12:
            _context7.next = 14;
            return regeneratorRuntime.awrap(models.Groups.findById(request.group));

          case 14:
            group = _context7.sent;

            if (group) {
              _context7.next = 17;
              break;
            }

            return _context7.abrupt("return", res.status(404).json({
              errors: "Group related to request doesn't exist"
            }));

          case 17:
            if (!(group.admin._id.toString() !== member._id.toString())) {
              _context7.next = 19;
              break;
            }

            return _context7.abrupt("return", res.status(403).json({
              errors: "You cannot approve requets to groups for which you're not an admin"
            }));

          case 19:
            _group = new types.Group(group);
            _context7.prev = 20;
            _context7.next = 23;
            return regeneratorRuntime.awrap(_group.addMember(request.member));

          case 23:
            modifiedGroup = _context7.sent;

            if (modifiedGroup) {
              _context7.next = 26;
              break;
            }

            return _context7.abrupt("return", res.status(500).json({
              errors: "Failure"
            }));

          case 26:
            request.approved = true;
            _context7.next = 29;
            return regeneratorRuntime.awrap(request.save());

          case 29:
            isRequestApproved = _context7.sent;

            if (isRequestApproved) {
              _context7.next = 32;
              break;
            }

            return _context7.abrupt("return", res.status(500).json({
              errors: "Couldn't approve request"
            }));

          case 32:
            return _context7.abrupt("return", res.status(201).json({
              success: "Success",
              group: modifiedGroup
            }));

          case 35:
            _context7.prev = 35;
            _context7.t0 = _context7["catch"](20);
            return _context7.abrupt("return", res.status(409).json({
              errors: _context7.t0.message
            }));

          case 38:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[20, 35]]);
  },
  exitGroup: function exitGroup(req, res) {
    var current_member, member, group, _member, _group2;

    return regeneratorRuntime.async(function exitGroup$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            current_member = req.member;
            _context8.next = 3;
            return regeneratorRuntime.awrap(models.Members.findById(current_member.id));

          case 3:
            member = _context8.sent;

            if (member) {
              _context8.next = 6;
              break;
            }

            return _context8.abrupt("return", res.status(404).json({
              errors: "Member not found"
            }));

          case 6:
            _context8.next = 8;
            return regeneratorRuntime.awrap(models.Groups.findById(req.params.groupId));

          case 8:
            group = _context8.sent;

            if (group) {
              _context8.next = 11;
              break;
            }

            return _context8.abrupt("return", res.status(404).json({
              errors: "Group not found"
            }));

          case 11:
            _member = new types.Member(member);
            _context8.prev = 12;
            _context8.next = 15;
            return regeneratorRuntime.awrap(_member.exitGroup(req.params.groupId));

          case 15:
            _group2 = _context8.sent;

            if (_group2) {
              _context8.next = 18;
              break;
            }

            return _context8.abrupt("return", res.status(400).json({
              errors: "Failed to exit"
            }));

          case 18:
            return _context8.abrupt("return", res.status(200).json({
              success: "Success",
              group: _group2
            }));

          case 21:
            _context8.prev = 21;
            _context8.t0 = _context8["catch"](12);
            return _context8.abrupt("return", res.status(500).json({
              errors: _context8.t0.message
            }));

          case 24:
          case "end":
            return _context8.stop();
        }
      }
    }, null, null, [[12, 21]]);
  },
  makeAPost: function makeAPost(req, res) {
    var current_member, member, group, topic, _group, topics, match, _member, post, _topic, _topc;

    return regeneratorRuntime.async(function makeAPost$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            current_member = req.member;
            _context9.next = 4;
            return regeneratorRuntime.awrap(models.Members.findById(current_member.id));

          case 4:
            member = _context9.sent;

            if (member) {
              _context9.next = 7;
              break;
            }

            return _context9.abrupt("return", res.status(404).json({
              errors: "Member not found"
            }));

          case 7:
            _context9.next = 9;
            return regeneratorRuntime.awrap(models.Groups.findById(req.params.groupId));

          case 9:
            group = _context9.sent;

            if (group) {
              _context9.next = 12;
              break;
            }

            return _context9.abrupt("return", res.status(404).json({
              errors: "Group not found"
            }));

          case 12:
            _context9.next = 14;
            return regeneratorRuntime.awrap(models.Topics.findById(req.params.topicId));

          case 14:
            topic = _context9.sent;

            if (topic) {
              _context9.next = 17;
              break;
            }

            return _context9.abrupt("return", res.status(404).json({
              errors: "Topic not found"
            }));

          case 17:
            _group = new types.Group(group);
            _context9.next = 20;
            return regeneratorRuntime.awrap(_group.topics());

          case 20:
            topics = _context9.sent;
            match = topics.filter(function (tpx) {
              return tpx._id.toString() !== topic._id.toString();
            });
            console.log(match);

            if (!(match.length > 0)) {
              _context9.next = 25;
              break;
            }

            return _context9.abrupt("return", res.status(403).json({
              errors: "Topic doesn't belong to selected group"
            }));

          case 25:
            _member = new types.Member(member);
            _context9.next = 28;
            return regeneratorRuntime.awrap(_member.createPost(topic._id, req.body.text));

          case 28:
            post = _context9.sent;

            if (post) {
              _context9.next = 31;
              break;
            }

            return _context9.abrupt("return", res.status(500).json({
              errors: "Couldn't create post"
            }));

          case 31:
            _topic = new types.Topic(topic);
            _context9.next = 34;
            return regeneratorRuntime.awrap(_topic.addPost(post._id));

          case 34:
            _topc = _context9.sent;

            if (_topc) {
              _context9.next = 37;
              break;
            }

            return _context9.abrupt("return", res.status(500).json({
              errors: "Couldn't save post"
            }));

          case 37:
            return _context9.abrupt("return", res.status(200).json({
              success: "Success",
              post: post
            }));

          case 40:
            _context9.prev = 40;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            return _context9.abrupt("return", res.status(500).json({
              errors: _context9.t0.message
            }));

          case 44:
          case "end":
            return _context9.stop();
        }
      }
    }, null, null, [[0, 40]]);
  },
  getGroupsJoined: function getGroupsJoined(req, res) {
    var member, _member, groups;

    return regeneratorRuntime.async(function getGroupsJoined$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return regeneratorRuntime.awrap(models.Members.findById(req.params.memberId));

          case 3:
            member = _context10.sent;

            if (member) {
              _context10.next = 6;
              break;
            }

            return _context10.abrupt("return", res.status(404).json({
              errors: "member details not found"
            }));

          case 6:
            _member = new types.Member(member);
            _context10.next = 9;
            return regeneratorRuntime.awrap(_member.getGroupsJoined());

          case 9:
            groups = _context10.sent;
            return _context10.abrupt("return", res.status(200).json({
              success: "Success",
              groups: groups
            }));

          case 13:
            _context10.prev = 13;
            _context10.t0 = _context10["catch"](0);
            return _context10.abrupt("return", res.status(500).json({
              errors: _context10.t0.message
            }));

          case 16:
          case "end":
            return _context10.stop();
        }
      }
    }, null, null, [[0, 13]]);
  }
};