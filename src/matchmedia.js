'use strict';

const staticMatch = require('css-mediaquery').match;
const dynamicMatch = typeof window !== 'undefined' ? window.matchMedia : null;

// our fake MediaQueryList
function Mql(query, values) {
  const self = this;
  if(dynamicMatch && !values) {
    const mql = dynamicMatch.call(window, query);
    this.matches = mql.matches;
    this.media = mql.media;
    // TODO: is there a time it makes sense to remove this listener?
    mql.addListener(update);
  } else {
    this.matches = staticMatch(query, values);
    this.media = query;
  }

  this.addListener = addListener;
  this.removeListener = removeListener;

  function addListener(listener){
    if(typeof mql !== 'undefined'){
      mql.addListener(listener);
    }
  }

  function removeListener(listener) {
    if(typeof mql !== 'undefined') {
      mql.removeListener(listener);
    }
  }

  // update ourselves!
  function update(evt) {
    self.matches = evt.matches;
    self.media = evt.media;
  }
}

function matchMedia(query, values){
  return new Mql(query, values);
}

module.exports = matchMedia;
