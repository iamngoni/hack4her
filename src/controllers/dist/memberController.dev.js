"use strict";

var Images = require("./../models/images");

var Members = require("../models/members");

var Member = require("../types/members");

var mongoose = require("mongoose");

var config = require("./../config");

var Groups = require("../models/groups");

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
            return regeneratorRuntime.awrap(Members.findById(current_member.id).populate('image'));

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
            return regeneratorRuntime.awrap(Members.findById(current_member.id));

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
            _member = new Member(member);
            image = new Images({
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
    var current_member, member, _member, group;

    return regeneratorRuntime.async(function createGroup$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            current_member = req.member;
            _context3.next = 3;
            return regeneratorRuntime.awrap(Members.findById(current_member.id));

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
            _member = new Member(member);
            _context3.prev = 7;
            _context3.next = 10;
            return regeneratorRuntime.awrap(_member.createGroup(req.body.name, req.body.description));

          case 10:
            group = _context3.sent;

            if (group) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt("return", res.status(500).json({
              errors: "Couldn't create group"
            }));

          case 13:
            return _context3.abrupt("return", res.status(201).json({
              success: "Success",
              group: group
            }));

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](7);

            if (!(_context3.t0.code == 11000)) {
              _context3.next = 20;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              errors: "Group name already registered"
            }));

          case 20:
            return _context3.abrupt("return", res.status(500).json({
              errors: "Server error"
            }));

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[7, 16]]);
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
    var current_member, member, _member, topic;

    return regeneratorRuntime.async(function createTopic$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            current_member = req.member;
            _context5.next = 3;
            return regeneratorRuntime.awrap(Members.findById(current_member.id));

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
            _member = new Member(member);
            _context5.prev = 7;
            _context5.next = 10;
            return regeneratorRuntime.awrap(_member.createTopic(req.params.groupId, req.body.title, req.body.description));

          case 10:
            topic = _context5.sent;

            if (topic) {
              _context5.next = 13;
              break;
            }

            return _context5.abrupt("return", res.status(500).json({
              errors: "Couldn't save topic"
            }));

          case 13:
            return _context5.abrupt("return", res.status(201).json({
              success: "Success",
              topic: topic
            }));

          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5["catch"](7);

            if (!(_context5.t0.code == 11000)) {
              _context5.next = 20;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              errors: "Topic already exists"
            }));

          case 20:
            return _context5.abrupt("return", res.status(500).json({
              errors: "Server error"
            }));

          case 21:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[7, 16]]);
  }
};