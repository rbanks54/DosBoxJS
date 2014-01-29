/// <reference path="../Scripts/jasmine.js" />
/// <reference path="../../purejswebsite/scripts/psuedodrive.js" />

describe('drive tests', function () {
    var drive;

    beforeEach(function () {
        drive = new psuedoDrive.drive('C');
        var rootDir = drive.RootDirectory;
        rootDir.addFile('FileInRoot1', '');
        rootDir.addFile('FileInRoot2', '');

        var subDir1 = rootDir.addDirectory('subDir1');
        subDir1.addFile('File1InDir1', '');
        subDir1.addFile('File2InDir1', '');

        rootDir.addDirectory('subDir2');
    });

    it('should create a new drive', function () {
        var driveName = 'd';

        var testdrive = new psuedoDrive.drive(driveName);
        expect(testdrive.RootDirectory).toEqual(testdrive.CurrentDirectory);
        expect(testdrive.CurrentDirectory.Name).toBe('D:');
        expect(testdrive.RootDirectory.Name).toBe('D:');
        expect(testdrive.DriveLetter).toBe('D:');

        testdrive = new psuedoDrive.drive('Hello');
        expect(testdrive.DriveLetter).toBe('H:');
    });

    it('should be able to change directory', function () {
        expect(drive.CurrentDirectory.Name).toBe('C:');

        var subDir = drive.ChangeCurrentDirectory('subDir1');
        expect(drive.CurrentDirectory.Name).toBe('subDir1');
        expect(subDir.Name).toBe('subDir1');
    });
});