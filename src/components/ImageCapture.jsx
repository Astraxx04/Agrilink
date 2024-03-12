import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';

function ImageCapture() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    if(hasCameraPermission === false) {
        return <Text>No access to Camera</Text>
    }

    const takePicture = async () => {
        if(cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data.uri);
                setImage(data.uri);
            } catch(err) {
                console.log(err);
            }
        }
    };

    const saveImage = async () => {
        if(image) {
            try {
                await MediaLibrary.createAssetAsync(image);
                
                alert('Image saved successfully!');
                
                setImage(null);
                navigation.navigate('Market');
            } catch(err) {
                console.log(err);
            }
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            {!image ?
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
                :
                (
                    <Image source={{uri: image}} style={styles.camera} />
                )
            }
            <View>
                {image ? 
                <View style={styles.multiButtons}>
                    <CustomButton title={'Retake'} icon="repeat" color='#f1f1f1' onPress={() => setImage(null)} />
                    <CustomButton title={'Save'} icon="save" color='#f1f1f1' onPress={saveImage} />
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