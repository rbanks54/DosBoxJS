// Code for our fake disk drive and file system that we're using
var psuedoDrive = (function () {
    var module = {};

    module.drive = function (driveName) {
        this.driveLetter = driveName.charAt(0).toUpperCase() + ':';
        this.rootDirectory = new module.directory('\\');
        this.currentDirectory = this.rootDirectory;
    };

    module.directory = function (name) {
        this.name = name;
        this.items = [];
        this.isDirectory = true;
    };

    module.directory.prototype.addDirectory = function (subDirName) {
        var subDir = new module.directory(subDirName);
        this.items.join(subDir);
        subDir.parent = this;
        return subDir;
    };

    module.directory.prototype.addFile = function (fileName, content) {
        var f = new file(fileName, content);
        this.items.join(f);
        file.parent = this;
        return f;
    };

    module.directory.prototype.getItemFromPath = function (rawPath) {
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
                var temp = new StringBuilder();
                temp.Append(CurrentDirectory.Parent.Path);
                temp.Append("\\");
                temp.Append(givenItemPathPatched.Substring(3, givenItemPathPatched.Length - 3));
                givenItemPathPatched = temp.ToString();
            }
        }

        // Add drive name if path starts with "\"
        if (givenItemPathPatched[0] == '\\') {
            givenItemPathPatched = driveLetter + ":" + givenItemPathPatched;
        }

        // Make absolute path from relative paths
        if (givenItemPathPatched.Length == 1 || givenItemPathPatched[1] != ':') {
            givenItemPathPatched = CurrentDirectory + "\\" + givenItemPathPatched;
        }

        // Find more complex paths recursive
        if (givenItemPathPatched.CompareTo(rootDir.Path) == 0) {
            return rootDir;
        }

        return GetItemFromDirectory(givenItemPathPatched, rootDir);
    };


    var file = function (fileName, content) {
        this.name = fileName;
        this.content = content;
        this.isFile = true;
    };

    module.directory.prototype.path = function() {
        if (this.parent)
            return this.parent.path + '\\' + this.name;
        return this.name;
    };
    file.prototype.path = module.directory.prototype.path;

    return module;
})();
