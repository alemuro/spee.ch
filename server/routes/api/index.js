// middleware
const multipartMiddleware = require('../../middleware/multipartMiddleware');
const torCheckMiddleware = require('../../middleware/torCheckMiddleware');
// route handlers
const channelAvailability = require('../../controllers/api/channel/availability');
const channelClaims = require('../../controllers/api/channel/claims');
const channelData = require('../../controllers/api/channel/data');
const channelShortId = require('../../controllers/api/channel/shortId');
const claimAvailability = require('../../controllers/api/claim/availability');
const claimData = require('../../controllers/api/claim/data/');
const claimGet = require('../../controllers/api/claim/get');
const claimList = require('../../controllers/api/claim/list');
const claimLongId = require('../../controllers/api/claim/longId');
const claimPublish = require('../../controllers/api/claim/publish');
const claimResolve = require('../../controllers/api/claim/resolve');
const claimShortId = require('../../controllers/api/claim/shortId');
const fileAvailability = require('../../controllers/api/file/availability');
const userPassword = require('../../controllers/api/user/password');
const publishingConfig = require('../../controllers/api/config/site/publishing');
const getTorList = require('../../controllers/api/tor');
const getBlockedList = require('../../controllers/api/blocked');
const getOEmbedData = require('../../controllers/api/oEmbed');

module.exports = {
  // channel routes
  '/api/channel/availability/:name': { controller: [ torCheckMiddleware, channelAvailability ] },
  '/api/channel/short-id/:longId/:name': { controller: [ torCheckMiddleware, channelShortId ] },
  '/api/channel/data/:channelName/:channelClaimId': { controller: [ torCheckMiddleware, channelData ] },
  '/api/channel/claims/:channelName/:channelClaimId/:page': { controller: [ torCheckMiddleware, channelClaims ] },
  // claim routes
  '/api/claim/availability/:name': { controller: [ torCheckMiddleware, claimAvailability ] },
  '/api/claim/data/:claimName/:claimId': { controller: [ torCheckMiddleware, claimData ] },
  '/api/claim/get/:name/:claimId': { controller: [ torCheckMiddleware, claimGet ] },
  '/api/claim/list/:name': { controller: [ torCheckMiddleware, claimList ] },
  '/api/claim/long-id': { method: 'post', controller: [ torCheckMiddleware, claimLongId ] }, // note: should be a 'get'
  '/api/claim/publish': { method: 'post', controller: [ torCheckMiddleware, multipartMiddleware, claimPublish ] },
  '/api/claim/resolve/:name/:claimId': { controller: [ torCheckMiddleware, claimResolve ] },
  '/api/claim/short-id/:longId/:name': { controller: [ torCheckMiddleware, claimShortId ] },
  // file routes
  '/api/file/availability/:name/:claimId': { controller: [ torCheckMiddleware, fileAvailability ] },
  // user routes
  '/api/user/password/': { method: 'put', controller: [ torCheckMiddleware, userPassword ] },
  // configs
  '/api/config/site/publishing': { controller: [ torCheckMiddleware, publishingConfig ] },
  // tor
  '/api/tor': { controller: [ torCheckMiddleware, getTorList ] },
  // blocked
  '/api/blocked': { controller: [ torCheckMiddleware, getBlockedList ] },
  // open embed
  '/api/oembed': { controller: [ torCheckMiddleware, getOEmbedData ] },
};
