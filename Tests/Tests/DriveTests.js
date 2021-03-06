﻿require(['fakeDrive'], function (drive) {
    'use strict';

    describe('drive tests', function () {
        var drive;

        beforeEach(function () {
            drive = new drive('C');
            var rootDir = drive.rootDirectory;
            rootDir.addFile('FileInRoot1', '');
            rootDir.addFile('FileInRoot2', '');

            var subDir1 = rootDir.addDirectory('subDir1');
            subDir1.addFile('File1InDir1', '');
            subDir1.addFile('File2InDir1', '');

            rootDir.addDirectory('subDir2');
        });

        it('should create a new drive', function () {
            var driveName = 'd';

            var testdrive = new drive(driveName);
            expect(testdrive.rootDirectory).toEqual(testdrive.currentDirectory);
            expect(testdrive.currentDirectory.name).toBe('D:');
            expect(testdrive.rootDirectory.name).toBe('D:');
            expect(testdrive.driveLetter).toBe('D:');

            testdrive = new drive('Hello');
            expect(testdrive.driveLetter).toBe('H:');
        });

        it('should show correct paths for root directory', function () {
            expect(drive.rootDirectory.getPath()).toBe('\\');
        });

        it ('should know if a path exists', function() {
            var path = '\\subDir1\\';
            var exists = drive.pathExists(path);
            expect(exists).toBeTruthy();
        });

        //it('should be able to change directory', function () {
        //    expect(drive.currentDirectory.Name).toBe('C:');

        //    var subDir = drive.changeCurrentDirectory('subDir1');
        //    expect(drive.CurrentDirectory.Name).toBe('subDir1');
        //    expect(subDir.Name).toBe('subDir1');
        //});

        //it('should return items using absolute paths', function() {
        //        var testpath;

        //        testpath = rootDir.Path;
        //        Assert.AreSame(drive.GetItemFromPath(testpath), rootDir);
        //        testpath = subDir1.Path;
        //        Assert.AreSame(drive.GetItemFromPath(testpath), subDir1);
        //        testpath = subDir2.Path;
        //        testpath = testpath.Replace('\\', '/');
        //        Assert.AreSame(drive.GetItemFromPath(testpath), subDir2);

        //        testpath = file2InDir1.Path;
        //        Assert.AreSame(drive.GetItemFromPath(testpath), file2InDir1);
        //        testpath = fileInRoot1.Path;
        //        Assert.AreSame(drive.GetItemFromPath(testpath), fileInRoot1);

        //        testpath = "g:\\gaga\\gugus";
        //        Assert.IsTrue(drive.GetItemFromPath(testpath) == null);

        //        testpath = "\\" + subDir1.Name;
        //        Assert.AreSame(drive.GetItemFromPath(testpath), subDir1);

        //        Assert.AreSame(drive.GetItemFromPath("C:\\subDir1"), subDir1);
        //        Assert.AreSame(drive.GetItemFromPath("c:\\subDir1"), subDir1);
        //        Assert.AreSame(drive.GetItemFromPath("c:/subDir1"), subDir1);
        //});
    });
});