const Handlebars = require('handlebars');
const config = require('../config/speechConfig.js');

module.exports = {
  googleAnalytics () {
    const googleApiKey = config.analytics.googleId;
    const gaCode = `<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', '${googleApiKey}', 'auto');
        ga('send', 'pageview');</script>`;
    return new Handlebars.SafeString(gaCode);
  },
  addOpenGraph (title, mimeType, showUrl, source, description, thumbnail) {
    if (title === null || title.trim() === '') {
      title = 'Spee.ch';
    }
    if (description === null || description.trim() === '') {
      description = 'Open-source, decentralized image and video sharing.';
    }
    const ogTitle = `<meta property="og:title" content="${title}" >`;
    const ogUrl = `<meta property="og:url" content="${showUrl}" >`;
    const ogSiteName = `<meta property="og:site_name" content="Spee.ch" >`;
    const ogDescription = `<meta property="og:description" content="${description}" >`;
    const ogImageWidth = '<meta property="og:image:width" content="600" >';
    const ogImageHeight = '<meta property="og:image:height" content="315" >';
    const basicTags = `${ogTitle} ${ogUrl} ${ogSiteName} ${ogDescription} ${ogImageWidth} ${ogImageHeight}`;
    let ogImage = `<meta property="og:image" content="${source}" >`;
    let ogImageType = `<meta property="og:image:type" content="${mimeType}" >`;
    let ogType = `<meta property="og:type" content="article" >`;
    if (mimeType === 'video/mp4') {
      const ogVideo = `<meta property="og:video" content="${source}" >`;
      const ogVideoSecureUrl = `<meta property="og:video:secure_url" content="${source}" >`;
      const ogVideoType = `<meta property="og:video:type" content="${mimeType}" >`;
      ogImage = `<meta property="og:image" content="${thumbnail}" >`;
      ogImageType = `<meta property="og:image:type" content="image/png" >`;
      ogType = `<meta property="og:type" content="video" >`;
      return new Handlebars.SafeString(`${basicTags} ${ogImage} ${ogImageType} ${ogType} ${ogVideo} ${ogVideoSecureUrl} ${ogVideoType}`);
    } else {
      if (mimeType === 'image/gif') {
        ogType = `<meta property="og:type" content="video.other" >`;
      };
      return new Handlebars.SafeString(`${basicTags} ${ogImage} ${ogImageType} ${ogType}`);
    }
  },
  addTwitterCard (mimeType, source, embedUrl, directFileUrl) {
    const basicTwitterTags = `<meta name="twitter:site" content="@spee_ch" >`;
    if (mimeType === 'video/mp4') {
      const twitterName = '<meta name="twitter:card" content="player" >';
      const twitterPlayer = `<meta name="twitter:player" content="${embedUrl}" >`;
      const twitterPlayerWidth = '<meta name="twitter:player:width" content="600" >';
      const twitterTextPlayerWidth = '<meta name="twitter:text:player_width" content="600" >';
      const twitterPlayerHeight = '<meta name="twitter:player:height" content="337" >';
      const twitterPlayerStream = `<meta name="twitter:player:stream" content="${directFileUrl}" >`;
      const twitterPlayerStreamContentType = '<meta name="twitter:player:stream:content_type" content="video/mp4" >';
      return new Handlebars.SafeString(`${basicTwitterTags} ${twitterName} ${twitterPlayer} ${twitterPlayerWidth} ${twitterTextPlayerWidth} ${twitterPlayerHeight} ${twitterPlayerStream} ${twitterPlayerStreamContentType}`);
    } else {
      const twitterCard = '<meta name="twitter:card" content="summary_large_image" >';
      return new Handlebars.SafeString(`${basicTwitterTags} ${twitterCard}`);
    }
  },
  ifConditional (varOne, operator, varTwo, options) {
    switch (operator) {
      case '===':
        return (varOne === varTwo) ? options.fn(this) : options.inverse(this);
      case '!==':
        return (varOne !== varTwo) ? options.fn(this) : options.inverse(this);
      case '<':
        return (varOne < varTwo) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (varOne <= varTwo) ? options.fn(this) : options.inverse(this);
      case '>':
        return (varOne > varTwo) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (varOne >= varTwo) ? options.fn(this) : options.inverse(this);
      case '&&':
        return (varOne && varTwo) ? options.fn(this) : options.inverse(this);
      case '||':
        return (varOne || varTwo) ? options.fn(this) : options.inverse(this);
      case 'mod3':
        return ((parseInt(varOne) % 3) === 0) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  },
};
