dayone_photos_dumper
====================

Dump photos in Day One2 entry into specified dir. Only MacOS & Day One2 supported.

## Install

```
npm install -g dayone_photos_dumper
```

## Usage

```
$ dayone-photos-dumper -h

  Usage: index [options]

  Dayone2 photo dumper, supports only MacOS & Dayone2

  Options:

    -V, --version           output the version number
    -e, --entry <string>    entry id, like: E002D19B76E74474B6FCC2C74E3E05B2 OR entry url, like: dayone2://view?entryId=E002D19B76E74474B6FCC2C74E3E05B2
    -o, --output_dir <dir>  output dir
    -h, --help              output usage information
```

## Sample

```
$ dayone-photos-dumper -o ~/Downloads/ -e dayone2://view?entryId=499ADF09AFBB4220855EDB517EAAF593
Dump start ...
Dump validating ...
Dump processing ...
Entry UUID: 499ADF09AFBB4220855EDB517EAAF593
Dump path ensured: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593
DB file path: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOne.sqlite
DB connected ...
Entry ID: 2851
Count of photos found: 28
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/c8f421de95f452798b5316ff683d5621.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1242.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/ca07c39cb967045f16b11f7f8104d44f.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1243.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/8f71d269c4f7a4bb78a61d53acd5e4c3.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1244.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/29d7f03a52483ed5ca2cb29a1382c5dc.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1245.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/8459df04faee9ba0ea279cde8ea2d58b.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1246.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/b7bcadcb10063f393f093604dab686af.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1247.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/bf5fd922fa30fdd271afc6c433814a4c.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1248.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/53ceb364bc2c00449337c414609f8080.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1249.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/d20daaa4b82e4bae1b1c1a77d8df3c88.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1250.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/3de32f65b28c7a89a29191f7a8967162.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1251.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/c8fe064e5df0c23c8a2e1dc9280e4c31.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1252.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/a8d409c99b94139b21c33ad596c09455.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1253.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/b6d61726e47cc81ff5456b5241b3894a.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1254.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/7e8bfe757c988dcf6c2c42faa5d9c209.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1255.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/e0da133c529ec72cb30fe612f3d66ad1.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1256.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/25f2855990924ee83d282b7022dbc81c.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1257.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/f763f9453939aaf56ba9b97428d8bfba.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1258.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/7f10052d77e99e6436ff8a74040e956c.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1259.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/6d3361befe46891ad83538b2b5ffd88b.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1260.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/104d5556639da762d85fde69975e9e11.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1261.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/d64098320deb3f19fec3f9ffb962b5a2.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1262.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/56465d724ec9e02daeb53eb1d57c0d65.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1263.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/42f27b8e5c3a0e2bf1153b0042dd00f9.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1264.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/e192e5d5ca2c834832e69d3d8b8f293e.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1265.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/d6ba2637306881a792b6035b2f4b7360.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1266.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/635f0460636d2b4ec1a28910d1b11f8d.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1267.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/68f41c088115e2a649b928e8b73bd431.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1268.jpeg
Copy, from: /Users/XXX/Library/Group Containers/5U8NS4GX82.dayoneapp2/Data/Documents/DayOnePhotos/0319f1bb918f24aeb6b33bc511ea3191.jpeg, to: /Users/XXX/Downloads/Dayone2Photos/499ADF09AFBB4220855EDB517EAAF593/1269.jpeg
Dump done ...
```
