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
            db.ref().child(`${type}`).once("value", function (snapshot) {
                var downloadAudios = snapshot.val(), audioCategoryArray = {};
                for (const key of Object.keys(downloadAudios)) {
                    console.log('key is :', key, 'data is :', downloadAudios[key]);
                    var audios = downloadAudios[key], childArray = [];
                    for (const subKey of Object.keys(audios)) {
                        console.log('subKey: ', subKey, 'value is :', audios[subKey])
                        // audioCategoryArray[key] = audios[subKey];
                        // audios[subKey].push({id: subKey});
                        audios[subKey].id = subKey;
                        audios[subKey].isDownloaded = false;
                        childArray.push(audios[subKey]);
                    }
                    audioCategoryArray[key] = childArray;
                }
                console.log('*******audioCategoryArray is********* ', audioCategoryArray);
                resolve(audioCategoryArray);
            });


        }, 500);
    });
}

