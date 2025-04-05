import 'package:app_v1/auth/button.dart';
import 'package:app_v1/auth/text_field.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'login.dart';

class RegisterPage extends StatefulWidget {
  // final Function()? onTap;

  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  //text editing controllers
  final emailTextController = TextEditingController();
  final passwordTextController = TextEditingController();
  final confirmPasswordTextController = TextEditingController();

  // Display error message
  void displayMessage(String message) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(message),
        );
      },
    );
  }

  //User Sign up
  void signUp() async {
    // Show Laoding Circle
    showDialog(
        context: context,
        builder: (context) => const Center(
              child: CircularProgressIndicator(),
            ));

    // Check if the password and confirm password match
    if (passwordTextController.text != confirmPasswordTextController.text) {
      //pop the loading circle
      Navigator.pop(context);
      // Show error message
      displayMessage('Passwords do not match');
      return;
    }

    // try creating a new user
    try {
      await FirebaseAuth.instance.createUserWithEmailAndPassword(
          email: emailTextController.text,
          password: passwordTextController.text);

      //pop the loading circle
      if (context.mounted) Navigator.pop(context);

      // Show success message
      displayMessage('Account created successfully');

      // Navigate to the login page
      Navigator.pushReplacementNamed(context, '/login');
    } on FirebaseAuthException catch (e) {
      //pop the loading circle
      Navigator.pop(context);
      // Show error message
      displayMessage(e.code);
      return;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.white),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 30.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Image.asset('assets/logo.png',
                  width: 200, height: 83, fit: BoxFit.cover),
              SizedBox(height: 30),
              Text(
                'Let\'s create an account for you',
                style: TextStyle(fontSize: 13, color: Colors.white),
              ),
              SizedBox(height: 80),
              // Email text field
              MyTextField(
                  controller: emailTextController,
                  hintText: 'Email',
                  obscureText: false),
              SizedBox(height: 20),
              // Password text field
              MyTextField(
                  controller: passwordTextController,
                  hintText: 'Password',
                  obscureText: true),
              SizedBox(height: 20),
              // Confirm Password text field
              MyTextField(
                  controller: confirmPasswordTextController,
                  hintText: 'Confirm Password',
                  obscureText: true),
              SizedBox(height: 80),
              // Register button
              AuthButton(
                icon: Icons.app_registration_rounded,
                text: 'Register',
                onTap: signUp,
              ),
              SizedBox(height: 30),
              // register here button text
              Row(
                children: [
                  Text('Already have an account?',
                      style: TextStyle(color: Colors.white)),
                  GestureDetector(
                    onTap: () {
                      Navigator.of(context).pushNamed('/login');
                    },
                    child: Text('   Login here',
                        style: TextStyle(
                            color: Colors.blue, fontWeight: FontWeight.bold)),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
