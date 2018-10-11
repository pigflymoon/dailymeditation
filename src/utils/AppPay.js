import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Text,
    Alert,
    Linking,
    Share as NativeShare,
    ImageBackground
} from 'react-native';
import {NativeModules} from 'react-native';
import axios from 'axios';
import {auth, db} from '../config/FirebaseConfig';

const {InAppUtils}  = NativeModules;
import {onceGetReceipts, doCreateReceipt} from '../config/db';

import Config from '../config/ApiConfig';

// var verifysandboxHost = Config.receiptVerify.Host.sandboxHost;
// var verifyHost = verifysandboxHost;

var verifyproductionHost = Config.receiptVerify.Host.productionHost;
var verifyHost = verifyproductionHost;
export function sendRecipt(receipt) {
    var transactionKey = ((receipt.in_app)[0].transaction_id) ? ( (receipt.in_app)[0].transaction_id).toString() : null;
    if (transactionKey) {
        onceGetReceipts().then(snapshot => {
            if (snapshot) {
                if (snapshot.hasChild(transactionKey)) {
                    console.log('exists')
                } else {
                    // Create a receipt in your own accessible Firebase Database too
                    doCreateReceipt(transactionKey, receipt)
                        .then(() => {
                            console.log('Got the receipt!')
                        })
                        .catch(error => {
                            console.log(('error', error))
                        });
                    //
                }
            }
        });


    }
}

export function onPay() {
    var self = this;
    return new Promise(function (resolve, reject) {
        // some async operation here
        setTimeout(function () {
            InAppUtils.canMakePayments((enabled) => {

                if (enabled) {
                    var productIdentifier = Config.products.productIdentifier;
                    var products = [
                        productIdentifier,
                    ];

                    InAppUtils.loadProducts(products, (error, products) => {
                        //update store here.
                        var productIdentifier = Config.products.productIdentifier;
                        InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
                            // NOTE for v3.0: User can cancel the payment which will be available as error object here.
                            //transactionReceipt
                            if (response && response.transactionReceipt) {
                                InAppUtils.receiptData((error, receiptData) => {
                                    if (error) {
                                        Alert.alert('itunes Error', 'Receipt not found.');
                                    } else {
                                        //send to validation server
                                        axios.post(verifyHost, {
                                            'receipt-data': receiptData,
                                        })
                                            .then(function (response) {
                                                if (response.data.receipt) {
                                                    sendRecipt(response.data.receipt);
                                                    var status = response.data.status;
                                                    var statusCode = Config.receiptVerify.statusCode;
                                                    resolve({status: status, statusCode: statusCode});
                                                } else {
                                                    resolve({status: {}, statusCode: {}});
                                                }

                                            })
                                            .catch(function (error) {
                                                Alert.alert(error)
                                            })
                                    }
                                });
                            }

                        });
                    });

                } else {
                    Alert.alert('IAP disabled');
                }
            });
        }, 500);
    });
    //

}

export function onRestore() {

    return new Promise(function (resolve, reject) {
        // some async operation here
        setTimeout(function () {
            InAppUtils.restorePurchases((error, response) => {
                if (error) {
                    Alert.alert('itunes Error', 'Could not connect to itunes store.');
                } else {
                    if (response.length === 0) {
                        Alert.alert('No Purchases', "We didn't find any purchases to restore.");
                        return;
                    } else {


                        var productIdentifier = Config.products.productIdentifier;

                        response.forEach((purchase) => {
                            if (purchase.productIdentifier === productIdentifier) {
                                resolve({restore: true})
                            }
                        });
                    }

                }
            });
        }, 500);
    });

}

export function upDateRole() {
    //update db user
    auth.onAuthStateChanged(function (authUser) {
        if (authUser) {
            var userId = auth.currentUser.uid;
            db.ref('/users/' + userId).update({
                role: {
                    admin: false,
                    free_user: true,
                    paid_user: true,
                }
            })

        }
    });
}
