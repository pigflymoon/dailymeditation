import {
    Alert,
} from 'react-native';
import {db} from '../config/FirebaseConfig';


export function getAudiosByCategoryAndType(category = 'beginner', type = 'beginner') {
    var self = this;

    return new Promise(function (resolve, reject) {
        // some async operation here
        setTimeout(function () {
            // resolve the promise with some value
            // var dataType = (category === 'beginner') ? 'beginner' : `meditationCategory/${type}`
            if (category === 'beginner') {
                db.ref().child(`${type}`).once("value", function (snapshot) {
                       if (snapshot.val()) {
                        var downloadAudios = snapshot.val(), audioCategoryArray = {};
                        for (const key of Object.keys(downloadAudios)) {
                            var audios = downloadAudios[key], childArray = [];
                            for (const subKey of Object.keys(audios)) {
                                // audioCategoryArray[key] = audios[subKey];
                                // audios[subKey].push({id: subKey});
                                audios[subKey].id = subKey;
                                audios[subKey].isDownloaded = false;
                                childArray.push(audios[subKey]);
                            }
                            audioCategoryArray[key] = childArray;
                        }
                        resolve(audioCategoryArray);
                    } else {
                        resolve([])
                    }

                }).catch(function (e) {
                    console.log('no data', e); // "oh, no!"
                });
            } else {
                db.ref().child(`${category}/${type}`).once("value", function (snapshot) {
                    if (snapshot.val()) {
                        var downloadAudios = snapshot.val(), audioCategoryArray = {};
                        //
                        var result = [];
                        var keys = Object.keys(downloadAudios);
                        keys.forEach(function (key) {
                            downloadAudios[key].id = key;
                            downloadAudios[key].isDownloaded = false;
                            result.push(downloadAudios[key]);
                        });

                        resolve(result);
                    } else {
                        resolve([])
                    }


                });
            }


        }, 500);
    });
}

