/// <reference path="../Scripts/jasmine.js" />
/// <reference path="../../purejswebsite/scripts/psuedodrive.js" />

describe('drive tests', function () {
    it('should create a new drive', function() {
        var driveName = "d";

        var testdrive = new psuedoDrive.drive(driveName);
        expect(testdrive.RootDirectory).toEqual(testdrive.CurrentDirectory);
        expect(testdrive.CurrentDirectory.Name).toBe('D:');
        expect(testdrive.RootDirectory.Name).toBe('D:');
        expect(testdrive.DriveLetter).toBe('D:');

        testdrive = new psuedoDrive.drive("Hello");
        expect(testdrive.DriveLetter).toBe('H:');
    });
});