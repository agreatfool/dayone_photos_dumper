#!/usr/bin/env node

import * as LibFs from 'mz/fs';
import * as LibOs from 'os';
import * as LibPath from 'path';
import * as LibUtil from 'util';

import * as program from 'commander';
import * as sqlite3 from 'sqlite3';
import {Stats} from "fs";
import * as mkdir from 'mkdirp';

const pkg = require('../package.json');

const mkdirp = LibUtil.promisify(mkdir) as (path: string) => void;

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
    .parse(process.argv);

const ARGS_ENTRY_INFO = (program as any).entry === undefined ? undefined : (program as any).entry;
const ARGS_OUTPUT_DIR = (program as any).output_dir === undefined ? undefined : (program as any).output_dir;

interface EntryRow {
    Z_PK: number;
}
interface PhotoRow {
    Z_PK: number;
    ZMD5: string;
    ZTYPE: string;
}

class DayOnePhotosDumper {

    public async run() {
        console.log('Dump start ...');

        await this._validate();
        await this._process();
    }

    private async _validate() {
        console.log('Dump validating ...');

        // os
        if (LibOs.platform() !== 'darwin') {
            console.log('Only MacOS supported!');
            process.exit(1);
        }

        // dayone2
        if (!(await LibFs.stat(DAYONE_DIR)).isDirectory()) {
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
        let destStat: Stats = LibFs.statSync(ARGS_OUTPUT_DIR);
        if (!destStat.isDirectory()) {
            console.log('Valid output directory required, please check -o option');
            process.exit(1);
        }
    }

    private async _process() {
        console.log('Dump processing ...');

        // parse entry uuid
        let entryUUID = ARGS_ENTRY_INFO.indexOf(DAYONE_ENTRY_URL_PREFIX) === 0
            ? ARGS_ENTRY_INFO.replace(DAYONE_ENTRY_URL_PREFIX, '')
            : ARGS_ENTRY_INFO;
        console.log(`Entry UUID: ${entryUUID}`);

        // ensure base path
        let dumpPath = LibPath.join(ARGS_OUTPUT_DIR, DAYONE_DUMP_BASE_DIR, entryUUID);
        if (!(await LibFs.exists(dumpPath))) { // target path does not exists
            await mkdirp(dumpPath);
        }
        console.log(`Dump path ensured: ${dumpPath}`);

        // define sqlite db file path
        let dbPath = LibPath.join(DAYONE_DOCUMENTS, 'DayOne.sqlite');
        console.log(`DB file path: ${dbPath}`);

        // connect db
        let db = new sqlite3.Database(dbPath, async (err) => {
            if (err) {
                console.log(err);
            }
            console.log('DB connected ...');

            let entryId: number = await this._selectEntryId(db, entryUUID);
            let photos: Array<PhotoRow> = await this._selectPhotos(db, entryId);
            db.close();

            if (photos.length === 0) {
                console.log(`No photos in entry: ${entryUUID}, stop ...`);
                return;
            }

            for (let photo of photos) {
                let srcPath = LibPath.join(DAYONE_PHOTOS, `${photo.ZMD5}.${photo.ZTYPE}`);
                let destPath = LibPath.join(dumpPath, `${photo.Z_PK}.${photo.ZTYPE}`);

                await LibFs.copyFile(srcPath, destPath);

                console.log(`Copy, from: ${srcPath}, to: ${destPath}`);
            }

            console.log('Dump done ...');
        });
    }

    private async _selectEntryId(db: sqlite3.Database, entryUUID: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            db.all(`SELECT Z_PK FROM ZENTRY WHERE ZUUID="${entryUUID}";`, [], (err, rows) => {
                if (err) {
                    return reject(err);
                }

                if (rows.length === 0) {
                    console.log(`No entry found for UUID: ${entryUUID}`);
                    process.exit(1);
                }

                let entryId = (rows[0] as EntryRow).Z_PK;
                console.log(`Entry ID: ${entryId}`);

                return resolve(entryId);
            });
        });
    }

    private async _selectPhotos(db: sqlite3.Database, entryId: number): Promise<Array<PhotoRow>> {
        return new Promise<Array<PhotoRow>>((resolve, reject) => {
            db.all(`SELECT Z_PK, ZMD5, ZTYPE FROM ZPHOTO WHERE ZENTRY=${entryId};`, [], (err, rows) => {
                if (err) {
                    return reject(err);
                }

                console.log(`Count of photos found: ${rows.length}`);

                return resolve(rows as Array<PhotoRow>);
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