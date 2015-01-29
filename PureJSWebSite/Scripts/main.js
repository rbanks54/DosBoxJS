require.config({
    baseUrl: 'Scripts/app',
    paths: {
        jquery: '../lib/jquery-2.1.0',
        wterm: '../lib/wterm.jquery',
        moment: '../lib/moment.min'
    },
    shim:{
        wterm: 'jquery'
    }
});

require(['jquery','wterm','app'],function(){});