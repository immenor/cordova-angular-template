'use strict';

angular.module('template.services', []).
    factory('portfolioContentService', function($log) {
        return {
            interfaceExamples:  {
                promo: { name: 'promo', image: 'images/flava.png', large: null, larger: null, description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'},
                canary: { name: 'canary', image: 'images/moniker.jpg', large: null, larger: null, description: null},
                analytics: { name: 'analytics', image: 'images/gap.jpg', large: null, larger: null, description: null},
                skuloop: { name: 'skuloop', image: 'images/flava.png', large: null, larger: null, description: null}, 
                test: { name: 'test', image: 'images/gap.jpg', large: null, larger: null, description: null},
                thing: { name: 'thing', image: 'images/gap.jpg', large: null, larger: null, description: null}
                
            },
            identityExamples: {
                sayagain: { name: 'sayagain', image: 'images/flava.png', large: null, larger: null, description: null},
                solidbump: { name: 'solidbump', image: 'images/flava.png', large: null, larger: null, description: null},
                skuloop: { name: 'skuloop', image: 'images/flava.png', large: null, larger: null, description: null},
                machocity: { name: 'machocity', image: 'images/flava.png', large: null, larger: null, description: null},
                hoover: { name: 'hoover', image: 'images/flava.png', large: null, larger: null, description: null},
                po2: { name: 'po2', image: 'images/flava.png', large: null, larger: null, description: null}
            },
            musicExamples: {
                solidbump: { name: 'solidbump', image: 'images/flava.png', large: null, larger: null, description: null},
                smashhit: { name: 'smashhit', image: 'images/flava.png', large: null, larger: null, description: null},
                test: { name: 'test', image: 'images/gap.jpg', large: null, larger: null, description: null},
                skuloop: { name: 'skuloop', image: 'images/flava.png', large: null, larger: null, description: null}, 
                iris: { name: 'iris', image: 'images/flava.png', large: null, larger: null, description: null}
            }
    }
})