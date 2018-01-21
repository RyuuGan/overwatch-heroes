'use strict';

const mongoose = require('mongoose');

let Hero = mongoose.Schema({

  _id: {
    type: String,
    required: true
  },

  type: String,

  links: {},

  attributes: {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    image_portrait: {
      type: String,
      required: true
    },
    image_splash: String,
    updated_at: {
      type: Date,
      required: true
    },
    image_card_background: String
  },

  relationships: {
    hero_relationships: {
      links: {}
    },
    hero_general_tips: {
      links: {}
    },
    hero_stat_percentiles: {
      links: {}
    },
    hero_role: {
      links: {}
    }
  }

});

Hero.plugin(require('./plugins/paginate'));

Hero.virtual('client').get(function () {
  return {
    _id: this._id,
    type: this.type,
    links: this.links,
    attributes: this.attributes,
    relationships: this.relationships
  };
});

module.exports = exports = mongoose.model('Hero', Hero);
