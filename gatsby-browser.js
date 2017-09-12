var scrollTo = require('scroll-to');

exports.shouldUpdateScroll = args => {
  if (args.prevRouterProps) {
    scrollTo(0, 0, {
      ease: 'inQuad',
      duration: 500
    });

    return false
  }

  return true
}
