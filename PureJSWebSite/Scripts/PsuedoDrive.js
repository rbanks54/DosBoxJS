// Code for our fake disk drive and file system that we're using
var psuedoDrive = (function () {
    var module = {};

    module.directory = function(name) {
        this.Name = name;
    };

    module.drive = function (driveName) {
        var driveLetter = driveName.charAt(0).toUpperCase() + ':';
        this.DriveLetter = driveLetter;
        this.RootDirectory = new module.directory(driveLetter);
        this.CurrentDirectory = this.RootDirectory;
    };
    
    return module;
})();
