'use strict';

angular.module('template.services', []).
    factory('portfolioContentService', function($log) {
        return {
            interfaceExamples:  {
                promo: { name: 'promo', image: 'images/flava.png', large: null, larger: null, description: null},
                canary: { name: 'canary', image: 'images/moniker.jpg', large: null, larger: null, description: null},
                analytics: { name: 'analytics', image: 'images/gap.jpg', large: null, larger: null, description: null},
                skuloop: { name: 'skuloop', image: 'images/flava.png', large: null, larger: null, description: null}, 
                test: { name: 'test', image: 'images/gap.jpg', large: null, larger: null, description: null},
                thing: { name: 'thing', image: 'images/gap.jpg', large: null, larger: null, description: null}
                
            },
            identityExamples: {
                sayagain: { name: 'sayagain', image: 'images/flava.png', large: null, larger: null, description: null},
                //solidbump: { name: 'solidbump', image: 'images/flava.png', large: null, larger: null, description: null},
                skuloop: { name: 'skuloop', image: 'images/flava.png', large: null, larger: null, description: null},
                machocity: { name: 'machocity', image: 'images/flava.png', large: null, larger: null, description: null},
                hoover: { name: 'hoover', image: 'images/flava.png', large: null, larger: null, description: null},
                po2: { name: 'po2', image: 'images/flava.png', large: null, larger: null, description: null}
            },
            musicExamples: {
                solidbump: { name: 'solidbump', image: 'images/flava.png', large: null, larger: null, description: null},
                smashhit: { name: 'smashhit', image: 'images/flava.png', large: null, larger: null, description: null},
                iris: { name: 'iris', image: 'images/flava.png', large: null, larger: null, description: null}
            }
    }
})