import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, Button, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as FS from "expo-file-system";
import * as Location from 'expo-location';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';

function ImageCapture() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [imageFromCamera, setImageFromCamera] = useState(false);
    const [predictionResults, setPredictionResults] = useState({});
    const [location, setLocation] = useState(null);
    const cameraRef = useRef(null);

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            console.log(location.coords.latitude, location.coords.longitude);
        })();
    }, [])

    if(hasCameraPermission === false) {
        return <Text>No access to Camera</Text>
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect:[1,1],
            quality: 1,
        });
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setImageFromCamera(false);
        }
    };

    const takePicture = async () => {
        if(cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);
                setImageFromCamera(true);
            } catch(err) {
                console.log(err);
            }
        }
    };

    const saveImage = async() => {
        if(image) {
            try {
                if(imageFromCamera) {
                    await MediaLibrary.createAssetAsync(image);
                    alert('Image saved successfully!');
                } else {
                    alert('Image selected successfully!');
                }

                try {
                    let response = await FS.uploadAsync("http://127.0.0.1:8000/predictionImage", image, {
                        headers: {
                        "content-type": "image/jpg",
                        },
                        httpMethod: "POST",
                        uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
                    });
                    console.log(response.body);
                    navigation.navigate('ResultsPage', { results: response.body });
                } catch(error){
                    console.log(error);
                    Alert.error(error);
                    navigation.navigate('CropRecommend1');
                }
                setImage(null);
            } catch(err) {
                console.log(err);
            }
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            {image ?
                (
                    <Image source={{uri: image}} style={styles.camera} />
                )
                :
                (
                    <Camera style={ styles.camera } type={Camera.Constants.Type.back} flashMode={flash} ref={cameraRef} >
                        <View style={styles.topMultiButtons}>
                            <CustomButton icon="folder" color='#f1f1f1' onPress={pickImage}
                            />
                            <CustomButton color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#f1f1f1'} icon="zap" onPress={() => {
                                setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off);
                            }} />
                        </View>
                    </Camera>
                )
            }
            <View>
                {image ? 
                <View style={styles.multiButtons}>
                    <CustomButton title={'Retake'} icon="repeat" color='#f1f1f1' onPress={() => setImage(null)} />
                    <CustomButton title={'Select'} icon="save" color='#f1f1f1' onPress={saveImage} />
                </View>
                :
                <View style={styles.picButton}>
                    <CustomButton title={'Capture'} icon='aperture' color='#f1f1f1' onPress={takePicture} />
                </View>
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#000000",
        paddingBottom: 30,
    },
    camera: {
        flex: 1,
        borderRadius: 2,
        paddingBottom: 80,
    },
    multiButtons: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        paddingBottom: 20,
        paddingTop: 20,
    },
    topMultiButtons: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        paddingTop: 20,
    },
    picButton: {
        paddingTop: 20,
        paddingBottom: 20,
    }
});

export default ImageCapture;