import {
    Alert,
} from 'react-native';
import {db} from '../config/FirebaseConfig';


export function getAllAudiosByType(imageType = 'beginner') {
    var self = this;
    return new Promise(function (resolve, reject) {
        // some async operation here
        setTimeout(function () {
            // resolve the promise with some value

            db.ref().child(imageType).once("value", function (snapshot) {
                var downloadAudios = snapshot.val(), audiosArray = [];
                console.log('********88downloadAudios are**********: ', downloadAudios)
                snapshot.forEach(function (childSnap) {
                    console.log('child snap is ', childSnap.val());
                    // var childSnap = childSnap.val();
                    childSnap.forEach(function (snap) {
                        console.log('snap is ', snap.val());
                        audiosArray.push(snap.val())
                    })
                })
                console.log('audiosArray is ', audiosArray)
                resolve(audiosArray)
                // downloadImages = Utils.reverseObject(downloadImages)
                // if (downloadAudios) {
                //     var audios = Object.keys(downloadAudios).map((audioType, key) => (
                //         // Object.keys(audioType).map((type, key) => (
                //         //         console.log('type is ', type, 'key is ', key)
                //         //
                //         //     )
                //         // )
                //
                //         console.log('audioType is ', audioType, 'key is ', key)
                //     ))
                //     // console.log('audios are', audios)
                //     // resolve(images)
                // }


            });


        }, 500);
    });
}


