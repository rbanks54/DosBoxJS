String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};

$(document).ready(function () {
    $('#wterm').wterm({ WIDTH: '100%', HEIGHT: '100%', WELCOME_MESSAGE: 'Welcome to DOS Box - JavaScript edition. For the list of commands type <strong>help</strong>' });

    var currentDrive = new psuedoDrive("C");

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
                return 'String reversal disabled';
            },

            START_HOOK: function () {
                return 'String reversal enabled. Type <strong>exit</strong> to quit';
            },

            DISPATCH: function (tokens) {
                return tokens.join('').reverse();
            }
        },
        
        'cd': function (tokens) {
            if (tokens.length > 0)
                currentDrive.setDirectory(tokens[1]);
            return currentDrive.currentDirectory.path();
        }
    };

    for (var j in command_directory) {
        $.register_command(j, command_directory[j]);
    }

    $.register_command('help', function () {
        return 'DOS Box commands' + '<br>' +
            '<span class="helpcommand">clear</span> - clears the screen<br>' +
            '<span class="helpcommand">date</span> - Returns the current date<br>' +
            '<span class="helpcommand">cap</span>  - Usage cap &lt;string&gt; - Turns the string to uppercase<br>' +
            '<span class="helpcommand">go</span> - Usage go &lt;url&gt; - Sets the browser location to URL<br>' +
            '<span class="helpcommand">strrev</span> - reverses all strings, until you type <em>exit</em><br>'
            ;
    });

});
