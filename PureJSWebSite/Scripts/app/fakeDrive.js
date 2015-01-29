// Code for our fakedisk drive and file system that we're using
define(function(){
    function drive(driveLetter){
        this.letter = driveLetter.charAt(0).toUpperCase() + ':';
        this.rootDirectory = new directory('',this,this);
        this.currentDirectory = this.rootDirectory;
    };

    drive.prototype.pathExists = function (pathToCheck) {
        var item = this.getItemFromPath(pathToCheck);
        return (item === undefined);
    };

    drive.prototype.getPath = function(){
        return this.letter;
    }

    drive.prototype.setDirectory = function(targetPath) {
        var item = this.getItemFromPath(targetPath);
        var isValid = item !== undefined && item.isDirectory;
        if (isValid)
            this.currentDirectory = item;
        return isValid;
    };

    function directory(name, parentDirectory, baseDrive) {
        this.name = name;
        this.parent = parentDirectory;
        this.baseDrive = baseDrive;
        this.items = [];
        this.isDirectory = true;
    };

    directory.prototype.addDirectory = function (subDirName) {
        var subDir = new directory(subDirName, this, this.baseDrive);
        this.items.push(subDir);
        return subDir;
    };

    directory.prototype.addFile = function (fileName, content) {
        var f = new file(fileName, content);
        this.items.push(f);
        file.parent = this;
        return f;
    };

    drive.prototype.getItemFromPath = function (rawPath) {
        // Remove any "/" with "\"
        var path = rawPath.replace('/', '\\');

        // Remove ending "\"
        path = path.trim();
        if (path.charAt(path.length - 1) === '\\' && path.length >= 2) {
            path = path.substring(0, path.length - 1);
        }

        // Test for special paths
        if (path === '\\') {
            return this.rootDirectory;
        }

        if (path === '..') {
            var parent = this.currentDirectory.parent || this.rootDirectory;
            return parent;
        }

        if (path === '.') {
            return this.currentDirectory;
        }

        // Check for .\
        if (path.length >= 2) {
            if (path.substring(0, 2) === '.\\') {
                path = path.substring(2);
            }
        }

        // Check for ..\
        if (path.length >= 3) {
            if (path === '..\\') {
                path = this.currentDirectory.parent.getPath() + '\\' + path.substring(3);
            }
        }

        // Add drive name if path starts with "\"
        if (path[0] == '\\') {
            path = this.rootDirectory.getPath() + path.substring(1);
        }

        // Make absolute path from relative paths
        if (path.length == 1 || path[1] !== ':') {
            path = this.currentDirectory.getPath() + '\\' + path;
        }

        // Find more complex paths recursive
        if (path === this.rootDirectory.getPath()) {
            return this.rootDirectory;
        }

        return this.rootDirectory.getItemFromDirectory(path);
    };

    directory.prototype.getItemFromDirectory = function (path) {
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

    function file(fileName, content) {
        this.name = fileName;
        this.content = content;
        this.isFile = true;
    };

    directory.prototype.getPath = function() {
        if (this.parent === this.baseDrive.rootDirectory)
            return this.parent.getPath() + this.name;
        else
            return this.parent.getPath() + '\\' + this.name;
    }

    file.prototype.getPath = directory.prototype.getPath;

    return drive;
});
