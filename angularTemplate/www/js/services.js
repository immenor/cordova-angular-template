'use strict';

angular.module('template.services', []).
    factory('portfolioContentService', function($log) {
        return {
            interfaceExamples:  {
                promo: { name: 'flava', image: 'images/flava.png', large: null, larger: null, description: null},
                canary: { name: 'moniker', image: 'images/moniker.jpg', large: null, larger: null, description: null},
                analytics: { name: 'gap', image: 'images/gap.jpg', large: null, larger: null, description: null},
                skuloop: { name: 'skuloop', image: 'images/sayagain.jpg', large: null, larger: null, description: null},
                shopping: { name: 'shopping', image: 'images/sbr.png', large: null, larger: null, description: null}
                
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