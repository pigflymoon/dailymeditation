import {
    Alert,
} from 'react-native';
import {db} from '../config/FirebaseConfig';


export function getAudiosByCategoryAndType(category = 'beginner', type = '') {
    var self = this;
    return new Promise(function (resolve, reject) {
        // some async operation here
        setTimeout(function () {
            // resolve the promise with some value
            if (category == 'beginner') {
                // db.ref().child(category).once("value", function (snapshot) {
                //     var downloadAudios = snapshot.val(), audiosArray = [];
                //     // console.log('********88downloadAudios are**********: ', downloadAudios)
                //     snapshot.forEach(function (childSnap) {
                //         // console.log('child snap is ', childSnap.val());
                //         // var childSnap = childSnap.val();
                //         childSnap.forEach(function (snap) {
                //             // console.log('snap is ', snap.val());
                //             audiosArray.push(snap.val())
                //         })
                //     })
                //     console.log('*********beginner  audiosArray is******** ', audiosArray)
                //     resolve(audiosArray);
                // });

                db.ref().child(`${type}`).once("value", function (snapshot) {
                    var downloadAudios = snapshot.val(), audiosArray = [], audioCategoryArray = {};
                    console.log('********downloadAudios are**********: ', downloadAudios)

                    for (var k in downloadAudios) {
                        if (downloadAudios.hasOwnProperty(k)) {
                            console.log('key is ', k, 'value is******* ', downloadAudios[k])
                            var childArray = []
                            for (var key in downloadAudios[k]) {
                                if (downloadAudios[k].hasOwnProperty(key)) {
                                    console.log('child key is ', key, 'child value is******* ', downloadAudios[k][key])
                                    //obj["key3"] = "value3";
                                    childArray.push(downloadAudios[k][key]);

                                }
                            }
                            audioCategoryArray[k] = childArray;
                        }
                    }
                    resolve(audioCategoryArray);
                });
            } else {//
                db.ref().child(`${type}`).once("value", function (snapshot) {
                    var downloadAudios = snapshot.val(), audiosArray = [], audioCategoryArray = {};
                    console.log('********downloadAudios are**********: ', downloadAudios)

                    for (var k in downloadAudios) {
                        if (downloadAudios.hasOwnProperty(k)) {
                            console.log('key is ', k, 'value is******* ', downloadAudios[k])
                            var childArray = []
                            for (var key in downloadAudios[k]) {
                                if (downloadAudios[k].hasOwnProperty(key)) {
                                    console.log('child key is ', key, 'child value is******* ', downloadAudios[k][key])
                                    //obj["key3"] = "value3";
                                    childArray.push(downloadAudios[k][key]);

                                }
                            }
                            audioCategoryArray[k] = childArray;
                        }
                    }
                    resolve(audioCategoryArray);
                });
            }


        }, 500);
    });
}

