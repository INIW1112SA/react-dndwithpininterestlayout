const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const schema = new mongoose.Schema({
    id: {
      type: Number,
      required: true
    },
    emailId: {
      type: String,
      required: true
    },
    profile: {
      picture: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      dob: {
        type: String,
        default: ''
      },
      gender: {
        type: String,
        default: ''
      },
      address: {
        Line1: {
          type: String,
          default: ''
        },
        Line2: {
          type: String,
          default: ''
        },
        country: {
          type: String,
          default: ''
        },
        region: {
          type: String,
          default: ''
        },
        city: {
          type: String,
          default: ''
        },
        postalCode: {
          type: String,
          default: ''
        }
        },
      education: {
        primary: {
          type: String,
          default: ''
        },
        highSchool: {
          type: String,
          default: ''
        },
        university: {
          type: String,
          default: ''
        }
      },
      phone: {
        type: String,
        default: ''
      }
    },
    lists: [{
      id: {
        type: Number
      },
      heading: {
        type: String,
      dafault: ''
    },
      category: {
        type: String,
      dafault: ''
    },
      statement: {
        type: String,
      dafault: ''
    },
      image: {
        type: String,
      dafault: ''},
      displayImage: {
        type: String,
      dafault: ''
    },
      addedOn: {
        type: String,
      dafault: ''
    },
      upVote: {
        type: String,
      dafault: 0
    },
      postedBy: {
        type: String,
      dafault: ''
    },
      acceptedCount: {
        type: String,
      dafault: 0
    },
      downVote: {
        type: String,
      dafault: 0
    }
    }],
    answers: [{
      id: {
        type: Number
      },
      statement: {
        type: String,
        dafault: ''
    },
      addedOn: {
        type: String,
      dafault: ''
    },
      image: {
        type: String,
      dafault: ''
    },
      upVote: {
        type: Number,
      dafault: 0
    },
      downVote: {
        type: Number,
      dafault: 0
    }
    }],
    watchingList: [{
      heading: String,
      category: String,
      statement: String,
      postedBy: String,
      addedOn: String,
      noofans: Number,
      upVotes: Number,
      downVotes: Number
    }],
    watchingTopic: [{
      type: String
    }],
    interestCategory: [{
      type: String
    }],
    reputation: {
      type: Number,
      dafault: 0
    },
    followingUser: [{
      type: Number
    }],
    followerCount: {
      type: Number,
      dafault: 0
    }
});
const model = mongoose.model('userDoc', schema);
module.exports = {
    userModel: model
};
