import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
// import 'package:image_picker/image_picker.dart';
// import 'package:cloudinary_url_gen/cloudinary.dart';
// import 'package:cloudinary_flutter/image/cld_image.dart';
// import 'package:cloudinary_flutter/cloudinary_context.dart';
import 'dart:io';
// import 'package:http/http.dart' as http;

class UserProfilePage extends StatefulWidget {
  const UserProfilePage({super.key});

  @override
  State<UserProfilePage> createState() => UserProfilePageState();
}

class UserProfilePageState extends State<UserProfilePage> {
  // late String userName;
  // late String profileImageUrl;
  // late String userId;
  // File? selectedImage;
  // XFile? pickedImage;
  // late bool isLoading;
  // late bool isUploading;
  // late bool isSaving;

  // final formKey = GlobalKey<FormState>();
  // final nameController = TextEditingController();

  // void initState(){

  // }

  // pickImage(){

  // }

  // uploadImageToCloudinary(){

  // }

  // updateUserProfile(){

  // }

  // getUserData(){

  // }

  // buildProfileImage(){

  // }

  // buildNameField(){

  // }

  // buildSaveButton(){

  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.white),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: const Text('Profile', style: TextStyle(color: Colors.white)),
        backgroundColor: Colors.black,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout, color: Colors.white),
            onPressed: () {
              _logout(context);
            },
          ),
        ],
      ),
    );
  }

  Future<void> _logout(BuildContext context) async {
    // Logout user
    await FirebaseAuth.instance.signOut();

    Navigator.pushReplacementNamed(context, '/login');
  }
}
