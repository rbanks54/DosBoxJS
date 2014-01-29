String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};

$(document).ready(function () {
    $('#wterm').wterm({ WIDTH: '100%', HEIGHT: '100%', WELCOME_MESSAGE: 'Welcome to DOS Box - JavaScript edition. For the list of commands type <strong>help</strong>' });

    var command_directory = {
        'date': function (tokens) {
            var now = new Date();
            return now.getDate() + '-' +
                   now.getMonth() + '-' +
                   (1900 + now.getYear())
        },

        'cap': function (tokens) {
            tokens.shift();
            return tokens.join(' ').toUpperCase();
        },

        'go': function (tokens) {
            var url = tokens[1];
            document.location.href = url;
        },

        'strrev': {
            PS1: 'strrev $',

            EXIT_HOOK: function () {
                return 'exit interface commands';
            },

            START_HOOK: function () {
                return 'exit interface commands';
            },

            DISPATCH: function (tokens) {
                return tokens.join('').reverse();
            }
        }
    };

    for (var j in command_directory) {
        $.register_command(j, command_directory[j]);
    }

    $.register_command('help', function () {
        return 'Wterminal' + '<br>' +
            'eval - Usage eval &lt;any javascript exression&gt;<br>' +
            'date - Returns Current Date<br>' +
            'cap  - Usage cap &lt;string&gt; - Turns the string to upcase<br>' +
            'go - Usage go &lt;url&gt; - Sets the browser location to URL<br>';
    });

});
