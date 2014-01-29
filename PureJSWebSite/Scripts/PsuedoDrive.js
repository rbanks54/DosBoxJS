// Code for our fake disk drive and file system that we're using
var psuedoDrive = (function () {
    var module = {};

    module.drive = function (driveName) {
        var driveLetter = driveName.charAt(0).toUpperCase() + ':';
        this.DriveLetter = driveLetter;
        this.RootDirectory = new module.directory(driveLetter);
        this.CurrentDirectory = this.RootDirectory;
    };

    module.directory = function (name) {
        this.Name = name;
        this.files = [];
        this.subDirectories = [];
    };

    module.directory.prototype.addDirectory = function (subDirName) {
        var subDir = new module.directory(subDirName);
        this.subDirectories.join(subDir);
        return subDir;
    };

    module.directory.prototype.addFile = function (fileName, content) {
        var f = new file(fileName, content);
        this.files.join(f);
        return f;
    };

    module.directory.prototype.getItemFromPath = function (path) {
        return undefined;
    };


    var file = function (fileName, content) {
        this.FileName = fileName;
        this.Content = content;
    };

    return module;
})();
