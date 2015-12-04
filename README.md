# dcmscope


![DCMScope v0.6.10](https://raw.githubusercontent.com/andrwj/dcmscope/master/docs/dcmscope-v0.6.10.png)

##Overview
DCMScope is a NWJS/ASM.JS powered DICOM viewer which runs on OSX/Win/Linux environments. It supports limited functionalities for now.



##Usage
This a NWJS application, so you need to install from [http://nwjs.io](http://nwjs.io) and build.

You can download pre-built packages for your environments
* OSX32, [OSX64](https://www.dropbox.com/s/lxv8vfdis5nsb0m/DCMScope-OSX64.dmg?dl=0), Win32, Win64, Linux32, Linux64

- [download sample .dcm files](https://www.dropbox.com/s/mlv5jbljnqi472k/CT-1.zip?dl=0) from Dropbox.


To adjust window/level, you have to move left mouse clicked with CMD key in OSX (CTRL for Window, Linux).  To speed up, press with SHIFT key.

To skip the splash screen, just press enter key. To stay, press space key.


##Building

```bash
#clone or copy NWJS application first and copy 'nwjs.app' into current folder.

$ git clone https://github.com/andrwj/dcmscope
$ cd dcmscope
$ rm -f ../nwjs.app/Contents/Resources/app.nw
$ cd src; zip -r ../nwjs.app/Contents/Resources/app.nw * 
$ cd ../..
$ open ./nwjs.app
```

##Caveats
Due to the lack of thread function in NWJS, browsing big series cause lack of responsiveness. (If you select other directory while loading, DCMScope will stop the loading)


##License

See License.txt for information on using and contributing.

