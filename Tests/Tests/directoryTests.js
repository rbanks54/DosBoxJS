require(['fakeDrive'], function (drive) {
    'use strict';

    describe('drive tests', function() {
        var drive;

        beforeEach(function() {
            drive = new drive('C');
            var rootDir = drive.rootDirectory;
            rootDir.addFile('FileInRoot1', '');
            rootDir.addFile('FileInRoot2', '');

            var subDir1 = rootDir.addDirectory('subDir1');
            subDir1.addFile('File1InDir1', '');
            subDir1.addFile('File2InDir1', '');

            rootDir.addDirectory('subDir2');
        });

        it('should know if an item is in a directory', function() {
            var result = drive.rootDirectory.getItemFromDirectory('fileinroot1');
            expect(result).not.toBeUndefined();
        });
    });
});