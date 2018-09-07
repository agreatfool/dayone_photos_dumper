#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const LibFs = require("mz/fs");
const LibOs = require("os");
const LibPath = require("path");
const LibUtil = require("util");
const program = require("commander");
const sqlite3 = require("sqlite3");
const mkdir = require("mkdirp");
const pkg = require('../package.json');
const mkdirp = LibUtil.promisify(mkdir);
const DAYONE_DIR = LibPath.join(LibOs.homedir(), '/Library/Group Containers/5U8NS4GX82.dayoneapp2');
const DAYONE_DOCUMENTS = LibPath.join(DAYONE_DIR, 'Data/Documents');
const DAYONE_PHOTOS_NAME = 'DayOnePhotos';
const DAYONE_PHOTOS = LibPath.join(DAYONE_DOCUMENTS, DAYONE_PHOTOS_NAME);
const DAYONE_ENTRY_URL_PREFIX = 'dayone2://view?entryId=';
const DAYONE_DUMP_BASE_DIR = 'Dayone2Photos';
program.version(pkg.version)
    .description('Dayone2 photo dumper, supports only MacOS & Dayone2')
    .option('-e, --entry <string>', `entry id, like: E002D19B76E74474B6FCC2C74E3E05B2 OR entry url, like: dayone2://view?entryId=E002D19B76E74474B6FCC2C74E3E05B2`)
    .option('-o, --output_dir <dir>', 'output dir')
    .option('-s, --source_dir <dir>', `source dir, default is Dayone2 document path: ${DAYONE_DOCUMENTS}, could switch to your backup dir`)
    .parse(process.argv);
const ARGS_ENTRY_INFO = program.entry === undefined ? undefined : program.entry;
const ARGS_OUTPUT_DIR = program.output_dir === undefined ? undefined : program.output_dir;
const ARGS_SOURCE_DIR = program.source_dir === undefined ? DAYONE_DOCUMENTS : program.source_dir;
class DayOnePhotosDumper {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Dump start ...');
            yield this._validate();
            yield this._process();
        });
    }
    _validate() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Dump validating ...');
            // os
            if (LibOs.platform() !== 'darwin') {
                console.log('Only MacOS supported!');
                process.exit(1);
            }
            // dayone2
            if (!(yield LibFs.stat(DAYONE_DIR)).isDirectory()) {
                console.log(`No Dayone2 data found, files shall be: ${DAYONE_DIR}`);
                process.exit(1);
            }
            // -e, entry
            if (ARGS_ENTRY_INFO === undefined) {
                console.log('Entry information required, please provide -e option');
                process.exit(1);
            }
            // -o, output_dir
            if (ARGS_OUTPUT_DIR === undefined) {
                console.log('Output directory required, please provide -o option');
                process.exit(1);
            }
            let destStat = LibFs.statSync(ARGS_OUTPUT_DIR);
            if (!destStat.isDirectory()) {
                console.log('Valid output directory required, please check -o option');
                process.exit(1);
            }
            // -s, source_dir
            if (ARGS_SOURCE_DIR !== DAYONE_DOCUMENTS && !(yield LibFs.exists(LibPath.join(DAYONE_DOCUMENTS, 'DayOne.sqlite')))) {
                console.log('Valid source directory required, please check -s option');
                process.exit(1);
            }
        });
    }
    _process() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Dump processing ...');
            // parse entry uuid
            let entryUUID = ARGS_ENTRY_INFO.indexOf(DAYONE_ENTRY_URL_PREFIX) === 0
                ? ARGS_ENTRY_INFO.replace(DAYONE_ENTRY_URL_PREFIX, '')
                : ARGS_ENTRY_INFO;
            console.log(`Entry UUID: ${entryUUID}`);
            // ensure base path
            let dumpPath = LibPath.join(ARGS_OUTPUT_DIR, DAYONE_DUMP_BASE_DIR, entryUUID);
            if (!(yield LibFs.exists(dumpPath))) { // target path does not exists
                yield mkdirp(dumpPath);
            }
            console.log(`Dump path ensured: ${dumpPath}`);
            // define sqlite db file path
            let dbPath = LibPath.join(ARGS_SOURCE_DIR, 'DayOne.sqlite');
            console.log(`DB file path: ${dbPath}`);
            // connect db
            let db = new sqlite3.Database(dbPath, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(err);
                }
                console.log('DB connected ...');
                let entryId = yield this._selectEntryId(db, entryUUID);
                let photos = yield this._selectPhotos(db, entryId);
                db.close();
                if (photos.length === 0) {
                    console.log(`No photos in entry: ${entryUUID}, stop ...`);
                    return;
                }
                for (let photo of photos) {
                    let srcPath = LibPath.join(DAYONE_PHOTOS, `${photo.ZMD5}.${photo.ZTYPE}`);
                    let destPath = LibPath.join(dumpPath, `${photo.Z_PK}.${photo.ZTYPE}`);
                    yield LibFs.copyFile(srcPath, destPath);
                    console.log(`Copy, from: ${srcPath}, to: ${destPath}`);
                }
                console.log('Dump done ...');
            }));
        });
    }
    _selectEntryId(db, entryUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.all(`SELECT Z_PK FROM ZENTRY WHERE ZUUID="${entryUUID}";`, [], (err, rows) => {
                    if (err) {
                        return reject(err);
                    }
                    if (rows.length === 0) {
                        console.log(`No entry found for UUID: ${entryUUID}`);
                        process.exit(1);
                    }
                    let entryId = rows[0].Z_PK;
                    console.log(`Entry ID: ${entryId}`);
                    return resolve(entryId);
                });
            });
        });
    }
    _selectPhotos(db, entryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.all(`SELECT Z_PK, ZMD5, ZTYPE FROM ZPHOTO WHERE ZENTRY=${entryId};`, [], (err, rows) => {
                    if (err) {
                        return reject(err);
                    }
                    console.log(`Count of photos found: ${rows.length}`);
                    return resolve(rows);
                });
            });
        });
    }
}
new DayOnePhotosDumper().run().then(_ => _).catch(_ => console.log(_));
process.on('uncaughtException', (error) => {
    console.error(`Process on uncaughtException error = ${error.stack}`);
});
process.on('unhandledRejection', (error) => {
    console.error(`Process on unhandledRejection error = ${error.stack}`);
});
//# sourceMappingURL=index.js.map