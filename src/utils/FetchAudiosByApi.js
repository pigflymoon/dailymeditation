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
                db.ref().child(category).once("value", function (snapshot) {
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
                    resolve(audiosArray);
                });
            } else {//
                db.ref().child(`${type}`).once("value", function (snapshot) {
                    var downloadAudios = snapshot.val(), audiosArray = [];
                    console.log('********88downloadAudios are**********: ', downloadAudios)
                    snapshot.forEach(function (childSnap) {
                        console.log('child snap is ', childSnap.val());
                        childSnap.forEach(function (snap) {
                            console.log('snap is ', snap.val());
                            audiosArray.push(snap.val())
                        })
                    })
                    console.log('audiosArray is ', audiosArray)
                    resolve(audiosArray);
                });
            }


        }, 500);
    });
}

