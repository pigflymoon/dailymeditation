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
                console.log('********downloadAudios are**********: ', downloadAudios)

                for (var key in downloadAudios) {
                    if (downloadAudios.hasOwnProperty(key)) {
                        console.log('key is ', key, 'value is******* ', downloadAudios[key])
                        var childArray = []
                        for (var subKey in downloadAudios[key]) {
                            if (downloadAudios[key].hasOwnProperty(subKey)) {
                                console.log('child key is ', subKey, 'child value is******* ', downloadAudios[key][subKey])
                                childArray.push(downloadAudios[key][subKey]);
                            }
                        }
                        audioCategoryArray[key] = childArray;
                    }
                }
                resolve(audioCategoryArray);
            });


        }, 500);
    });
}

