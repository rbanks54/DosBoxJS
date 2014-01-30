// Code for our fake disk drive and file system that we're using
var psuedoDrive = (function () {
    var module = {};

    module.drive = function (driveName) {
        this.driveLetter = driveName.charAt(0).toUpperCase() + ':';
        this.rootDirectory = new module.directory('\\');
        this.currentDirectory = this.rootDirectory;
    };

    module.drive.prototype.pathExists = function (pathToCheck) {
        
        return true;
    };

    module.drive.prototype.setDirectory = function(targetPath) {
        var isValid = this.pathExists(targetPath);
        //TODO - finish this off
        return isValid;
    };

    module.directory = function (name) {
        this.name = name;
        this.items = [];
        this.isDirectory = true;
    };

    module.directory.prototype.addDirectory = function (subDirName) {
        var subDir = new module.directory(subDirName);
        this.items.push(subDir);
        subDir.parent = this;
        return subDir;
    };

    module.directory.prototype.addFile = function (fileName, content) {
        var f = new file(fileName, content);
        this.items.push(f);
        file.parent = this;
        return f;
    };

    module.drive.prototype.getItemFromPath = function (rawPath) {
        // Remove any "/" with "\"
        var path = rawPath.replace('/', '\\');

        // Remove ending "\"
        path = path.trim();
        if (path.charAt(path.length - 1) === '\\' && path.length >= 2) {
            path = path.substr(0, path.length - 1);
        }

        // Test for special paths
        if (path === '\\') {
            return rootDirectory;
        }

        if (path === '..') {
            var parent = currentDirectory.parent || rootDirectory;
            return parent;
        }

        if (path === '.') {
            return currentDirectory;
        }

        // Check for .\
        if (path.length >= 2) {
            if (path.substring(0, 2) === '.\\') {
                path = path.substring(2, path.length - 2);
            }
        }

        // Check for ..\
        if (path.length >= 3) {
            if (path === '..\\') {
                path = this.currentDirectory.parent.getPath() + '\\' + path.substring(3, path.length - 3);
            }
        }

        // Add drive name if path starts with "\"
        if (path[0] == '\\') {
            path = this.driveLetter + ":" + path;
        }

        // Make absolute path from relative paths
        if (path.length == 1 || path[1] !== ':') {
            path = this.currentDirectory + "\\" + path;
        }

        // Find more complex paths recursive
        if (path === rootDir.getPath()) {
            return rootDir;
        }

        return rootDirectory.getItemFromDirectory(path);
    };

    module.directory.prototype.getItemFromDirectory = function (path) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            var pathName = item.getPath();
            if (pathName.toUpperCase() === path.toUpperCase()) {
                return item;
            }
            if (item.isDirectory) {
                var result = item.getItemFromDirectory(path);
                if (result)
                    return result;
            }
        }
        return undefined;
    };

    var file = function (fileName, content) {
        this.name = fileName;
        this.content = content;
        this.isFile = true;
    };

    module.directory.prototype.getPath = function() {
        if (this.parent)
            return this.parent.getPath() + '\\' + this.name;
        return this.name;
    };
    file.prototype.getPath = module.directory.prototype.getPath;

    return module;
})();
